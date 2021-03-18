import React, { useState, useEffect, useContext, useReducer, useCallback, useRef } from 'react'
/**
 * 为什么需要使用hooks：在无需修改组件状态的情况下复用状态逻辑，使用非class的情况下使用更多的特性。
 */

/**
 * hooks使用规则：只在最顶层使用hook，确保总是在React函数的最顶部以及任何return之前使用它，不可以在if for或者嵌套函数中使用hook。
 */


/**
 * React根据hook的顺序来确定hook与状态的关系。
 */
// 首次渲染时，第一个hook
const [name, setName] = useState('Marry')
//首次渲染时， 第二个hook
useEffect(() => {
    console.log('xxx');
}, [])
// 首次渲染时，第三个hook
useState('Popins');

// 如果将第二个hook写进if语句。


// 更新时，第二个hook可能因为name为false，就不会执行，导致hook的顺序改变。其他的hook就会无法匹配。
if (name) {
    useEffect(() => {
        console.log('xxx')
    })
}





/**
 * useState
 * 两种更新state的方式：直接用setState更新，如果要更新的值不取决于旧的state。如果更新的值取决与旧的state，则使用函数式更新，setState((state) => { ... }) 。
 */

function Example() {
    const [count, setCount] = useState(0) // 返回当前状态和更新状态的函数。
    return (
        <div>{count}</div>
    )
}


/**
 * useEffect：给函数组件增加了操作副作用的能力，它整合了componentDidMount\componentWillUnmount\componentDidUpdate。
 * 使用时注意：使用多个effect实现多个独立的功能。
 */

useEffect(() => {
    // 一些副作用
    return () => {
        // 清除一些副作用，是effect的可选清除机制。React会在组件卸载时执行清除机制。
    }
})

useEffect(() => {
    // 副作用1
})

useEffect(() => {
    // 副作用2
})



// 通过跳过effect进行性能优化

useEffect(() => {
    // 一些副作用
}, [name]) // 仅仅在name更新时重新渲染，即前一次的name与当前刷新的name不相同时。


useEffect(() => {
    // 一些副作用
}, []) // 如果依赖数组为空数组，该effect只会在首次渲染以及卸载时执行，执行不依赖任何值。


/**
 * 函数是否应该被依赖
 */

function fnc({ someProp }) {
    function doSomething() {
        console.log(someProp)
    }
    useEffect(() => {
        doSomething()
    }, []) // 不安全，因为在doSomething函数中使用到了someProp这个prop，一旦someProps更新并不会被再次执行。

    useEffect(() => {
        function doSomething() {
            console.log(someProp)
        }
        doSomething()
    }, [someProp]) // 安全，对someProp进行监听，不会再someProp刷新时不执行。
}

function App() {
    const [appName, setAppName] = useState(null)
    const changeName = () => {
        console.log(name);
    }
    useEffect(() => {
        changeName()
    }, []) // 不安全，因为changeName函数依赖了 name 状态。

    useEffect(() => {
        changeName()
    }, [appName]) // 安全
}

/**
 * effect依赖频繁更新怎么办
 */

function Counter() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        const id = setInterval(() => {
            setCount(count + 1) // 由于effect在执行时会创建一个闭包，所以count将始终会是挂载时的0，因此count将始终为1
        }, 1000)
        return () => clearInterval(id) // 卸载时清除定时器
    }, []) // 如果将count添加为依赖，在count更新时就会导致每次都会新建一个定时器
    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1) // 使用更新函数，指定state的更新方式
        }, 1000)
        return () => clearInterval(id)
    }, [])
}

/**
 * useContex：接受一个context对象并返回该context值，当前context值由上层组件中距离最近的<MyContext.Provider>的value prop决定。
 */

const themes = {
    light: {
        foreground: '#000',
        background: '#eee'
    },
    dark: {
        foreground: '#fff',
        background: '#222'
    }
}

const ThemeContext = React.createContext(themes.light) // 设置themes.light为其默认值。

function Top() {
    return (
        <ThemeContext.Provider value={themes.dark}>
            {/* 生产者 */}
            <Toolbar />
        </ThemeContext.Provider>
    )
}

function Toolbar(props) {
    return (
        <div>
            <ThemeButton />
        </div>
    )
}

function ThemeButton() {
    const theme = useContext(ThemeContext) // 消费者
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>
            ...
        </button>
    )
}



/**
 * 自定义hook：
 * 当两个组件需要共享逻辑时，我们会把它提取到第三个参数中。这时就可以用自定义hook。
 * 自定义hook是一种遵循hook设计原则的约定，而不是React特性。
 * 自定义hook必须以use开头。
 */



/**
 * 额外的hook
 */

/**
 * useReducer：useState的替代方案，它接受一个形如(state, action) => newState的reducer，并返回当前的state以及与其配套的dispatch方法。
 * 使用场景：state的逻辑比较复杂，并且包含多个子值。或者当前的state依赖之前的state。
 */

const initialState = { count: 0 }

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            break;
    }
}

function Main() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            Count: { state.count}
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    )
}

// 指定初始state
const [state, dispatch] = useReducer(reducer, { count: 0 })

// 惰性初始化
function init(initialCount) {
    return { count: initialCount }
}

function reducerCount(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrment':
            return { count: state.count - 1 }
        case 'reset':
            return init(action.payload)
        default:
            break;
    }
}

function Home({ initialCount }) {
    const [state, dispatch] = useReducer(reducerCount, initialCount, init)
    return (
        <>
            Count: {state.count}
            <button
                onClick={() => dispatch({ type: 'reset', payload: initialCount })}
            >reset</button>
            <button onClick={() => dispatch({ type: 'decrment' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    )
}

/**
 * useCallback：把内联回调函数及依赖数组作为参数传入useCallback，他将返回回调函数的记忆版本，该回调函数仅在某个依赖项改变时才会更新。
 */


function Father() {
    const [val, setVal] = useState(0)
    const getData =  () => {
        setTimeout(() => {
            setVal(val => val + 1) // 改变state，触发渲染就会导致getData引用改变，形成死循环
        }, 500)
    }

    const getDataCallback = useCallback(() => { // 使用useCallback可以使每次渲染时，使getData的引用不再改变。只有[]中的依赖变化时才会执行useCallback的回调。
        setTimeout(() => {
            setVal(val => val + 1)
        }, 500)
    }, [])

    return <Child val={val} getData={getData} />
}

function Child({ val, getData }) {
    useEffect(() => {
        getData() // 触发getData
    }, [getData])
    return <div>{val}</div>
}


/**
 * useMemo：把更新函数和依赖项传入useMemo，仅仅在依赖项变化时执行更新函数。
 */

/**
 * useRef：返回一个可变的ref对象，其.current属性被初始化为传入的参数initialValue。返回的ref对象在组件的整个生命周期保持不变。
 */

 const AppRef = () => {
    const inputEl = useRef(null);
    const onButtononClick = () => {
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtononClick}> Focus </button>
      </>
    );
  };





