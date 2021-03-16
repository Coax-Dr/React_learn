import ReactDOM from 'react-dom';
import React from 'react';

/**
 * ReactDOM：const ref = ReactDOM.render(element, container[, callback])，
 * 说明：
 * 在container里渲染一个React元素，并返回对该组件的引用，对于无状态组件返回null。
 * 如果React元素之前已经在conttainer渲染过了，就会对其执行更新操作。--> 首次渲染会替换容器内的DOM元素，更新时会执行diff算法，进行高效的更新。
 * 如果提供了回调函数，那么该回调在组件被渲染或者更新之后被执行。
 * 
 */


ReactDOM.hydrate() // 用于在ReacrDOMServer渲染的容器中对HTML的内容进行hydrate操作。

ReactDOM.findDOMNode('component') // 是一个访问底层DOM节点的应急方案。大多数情况下，不推荐使用。

ReactDOM.unmountComponentAtNode() // 用于卸载DOM中的组件，会将事件处理器和state一并清除。如果移除成功就会返回true，否则返回false。

ReactDOM.createPortal('element', 'container') // 提供了一种将子节点渲染到存在于父组件以外的DOM节点的优秀方案。

/**
 * ReactDOM.createPortal('element', 'container')：提供了一种将子节点渲染到存在于父组件以外的DOM节点的优秀方案。
 */

/**
 * 代码分割：为了避免需要加载大体积的包，需要对代码进行分割，而不是在其第一次加载时就加载不会立即使用的包。
 * 1、动态使用import。
 * 2、React.lazy()。
 * 3、基于路由的代码分割。目前只支持default exports导出的。
 */

// 1
import { add } from './math'
//--->
import('./math').then(math => {
    //...
})

// 2
import otherComponent1 from './otherComponent'
// --- >
const otherComponent2 = React.lazy(() => import('./OtherComponent'))


/**
 * context：提供了一个无需手动添加props就能在组件树间进行数据传递的方法。
 * 注意：context不可以随意使用，不然会增加复杂性。提供的value发生变化引起的rerender不会被shouldComponentUpdate检测到。
 * 使用：一个消费组件允许和多个提供组件关联，一个提供组件允许有多个消费组件，提供组件的value发生变化时，消费组件自动渲染。
 */

const ThemeContext = React.createContext('light')

class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value='dark'>
                <toolbar/>
            </ThemeContext.Provider>
        )
    }
}

class ThemeButton extends React.Component {
    static contextType = ThemeContext;
    render() {
        return <Button theme={this.context} />
    }

}

function toolbar() {
    return (
        <div>
            <ThemeButton />
        </div>
    )
}

/**
 * Ref：允许某些组件接受ref，并将其向下传递给子组件。
 */
const Ref = React.createRef() // 创建了一个ref
const FancyButton = React.forwardRef((props, ref) => { // ref只在React.forwardRef中存在。
    <button ref={ref}>
        {/* ref完成挂载，ref.current指向该元素。 */}
        {props.children}
    </button>
})

<FancyButton  ref={Ref} /> // 将ref传递给子组件
// 在组件外部就可以获取到组件内部的DOM
