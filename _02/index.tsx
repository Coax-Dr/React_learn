import ReactDOM from 'react-dom';

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