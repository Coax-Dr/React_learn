import React, { useState, useEffect } from 'react'
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
if(name) {
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
    },[]) // 不安全，因为在doSomething函数中使用到了someProp这个prop，一旦someProps更新并不会被再次执行。

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
    },[]) // 如果将count添加为依赖，在count更新时就会导致每次都会新建一个定时器
    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1) // 使用更新函数，指定state的更新方式
        }, 1000)
        return () => clearInterval(id)
    }, [])
}

/**
 * 自定义hook：
 * 当两个组件需要共享逻辑时，我们会把它提取到第三个参数中。这时就可以用自定义hook。
 * 自定义hook是一种遵循hook设计原则的约定，而不是React特性。
 * 自定义hook必须以use开头。
 */



