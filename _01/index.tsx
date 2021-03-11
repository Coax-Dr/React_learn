import React from 'react';
import ReactDOM, { textarea, input, form } from 'react-dom';
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
 * constructor()：如果不初始化state或不进行方法绑定，则不需要为React组件实现构造函数。在组件挂载之前调用构造函数。使用场景：在state初始化时调用，直接赋值，不需要使用setState，为事件处理函数绑定实例。
 * static getDerivedStateFromProps()、
 * render()：当render被调用时，首先检查state与props的变化。返回React元素，数组或者fragments，Portals。
 * componentDidMount()：当组件挂载以后会立即调用。可以进行网络请求。
 * 更新：当组件的state与props发生变化时
 * static  ()、
 * shouldComponentUpdate()：shouldComponentUpdate(nextProps, nextState)根据其返回值，判断React组件的输出是否受到state与state的影响。仅作为性能优化的选择
 * render()、
 * getSnapshotBeforeUpdate()：拿到组件在更新之前的快照。
 * componentDidUpdate()：会在更新后立即执行，首次渲染不会执行。可以对更新的props进行比较。shouldComponentUpdate()的返回值为false时不会执行compnentDidUpdate()。getSnapshotBeforeUpdate()可以拿到组件更新之前的快照，并将返回值作为componentDidUpdate的第三个参数。
 * 卸载：当组件从DOM中移除时
 * componentWillUnmount()：在组件卸载或者销毁之前直接调用。清理定时器，取消网络请求。
 */


/**
 * 其他生命周期：不常用
 * static getDerivedStateFromError()：在后代组件抛出错误时调用。
 * componentDidCatch(error，info)：在生命周期后代组件抛出错以后调用。接受两个参数，error抛出的错误。info包含相关组件引发错误的信息栈componentStack Key。
 */


/**
 * 事件处理：使用preventDefault()阻止默认事件。
 */


/**
 * 条件渲染：依据应用的不同状态，渲染不同的部分。
 * 常用方式：if语句 &&运算符 三目运算符 直接return阻止渲染。
 */


function UserGreeting(props) {
    return <h1>Welcome back !</h1>
}

function GuestGreeting(props) {
    return <h1>Place sign up.</h1>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn
    if(isLoggedIn) {
        return <UserGreeting />
    } else {
        return <GuestGreeting />
    }
}

/**
 * 列表渲染 key放在数组就近的元素才有意义。
 */


const numbers = [1,2,3,4,5]
const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>)

ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
)

/**
 * 表单: 
 */

// textarea

class EssayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '当晃晃'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event })
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    文章:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
        )
    }
}

/**
 * 状态提升：如果多个组件
 */

