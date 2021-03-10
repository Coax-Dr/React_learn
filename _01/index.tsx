import React from 'react';
import ReactDOM from 'react-dom';
/**
 * jsx：是一种JavaScript的扩展语法
 * 用法：在大括号内部可以使用任何JavScript表达式，例如函数调用，对象调用属性
*/

const element1 = (
    <h1 className='a'>
        XXX
    </h1>
)

// Babel会将JSX转译成React.createElement()的函数调用，返回一个React元素element2

const element2 = React.createElement(
    'h1',
    {className: 'a'},
    'XXX'
)


/**
 * 元素渲染：使用ReactDOM.render()
 * */

const element = <h1>Hello</h1>
ReactDOM.render(element, 'container') 


/**
 *  组件：组件分为函数式组件与类组件
 *  说明：组件允许你将UI拆分为独立的代码片段，并进行独立的构思。
 *  注意：React会将以小写开头的标签默认为HTML标签，会将以大写字母开头的标签识别为自定义标签。
 */


// 函数式组件
function Welcome1(props) {
    return (
        <h1>Hello, { props.name }</h1>
    )
}

// 类组件
class Welcome2 extends React.Component {
    render () {
        return <h1>...</h1>
    }
}

// 将组件赋值给变量

const element3 = <Welcome1 name='li' />

// 将element3渲染到容器

ReactDOM.render(
    element3,
    'container'
)

/**
 * 组件组合：组件可以在其输出中引用其他组件
 * 提取组件：将组件中功能独立的小组件拆分为更小的组件。
 */

function App() {
    return (
        <div>
            <Welcome2 name='li' />
            <Welcome2 name='li' />
            <Welcome2 name='li' />
        </div>
    )
}
 
ReactDOM.render(
    <App />,
    'container'
)

/**
 * setState：用来修改组件状态
 * 说明：setState修改组件状态是异步的，并不能直接修改， 要解决这个问题，可以将setState接受的函数参数，setState((state, props) => ({ counter: state.counter + props.increments }))
 * 数据是向下流动的(自上而下、单向数据流)：
 */

/**
 * 生命周期：可以广义的分为三个阶段：
 * 挂载：当组件实例被插入到DOM中
 * constructor()、
 * static getDerivedStateFromProps()、
 * render()：
 * componentDidMount()
 * 更新：当组件的state与props发生变化时
 * static getDerivedStateFromProps()、
 * shouldComponentUpdate()：shouldComponentUpdate(nextProps, nextState)根据其返回值，判断React组件的输出是否受到state与state的影响。仅作为性能优化的选择
 * render()、
 * getSnapshotBeforeUpdate()
 * componentDidUpdate()
 * 卸载：当组件从DOM中移除时
 * componentWillUnmount()
 */