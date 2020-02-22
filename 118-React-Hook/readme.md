
# React Hook API

    Hook 可以让你在不编写class的情况下"勾入"React的特性。例如 useState 是允许你在React函数组件中添加
    state的Hook。
    
    Hook就是JavaScript函数,但是使用它们会有两个额外的规则:
    1. 只能在函数最外层调用Hook.不要在循环,条件判断或者子函数中调用。
    2. 只能在React的函数组件中调用Hook。不要在JavaScript函数中调用。也不能在class组件中使用！
    
    使用Hooks的冬季动机：
        1. 在组件之间复用状态逻辑很难
        2. this指向问题
        3. 每个生命周期函数常常包含一些不想关的逻辑。相关关联并且需要对照修改的代码被进行了拆分。很容易产生bug,
        并且导致逻辑不一致。
    
## useState
    
    useState是一种新方法，一般来说，在函数退出后变量就会'消失',而state中的变量会被React保留。
    
    通过在函数组件里调用它来给组件添加一些内部state. useState会返回一对值:当前状态和一个让你更新它的函数。
    可以在事件处理函数中 或 其他一些地方调用这个函数。但是它不会把新的state和旧的state进行合并。
    const [count,setCount] = useState(0);
        1. 唯一的参数是初始state
        2. 需要成对 获取count 和 setCount
        
    tips:
        1. useState的唯一参数就是初始state，初始state只有在第一次渲染时会被用到。
        2. state不一定要是一个对象。
        3. 可以在一个组件中多次使用State Hook;
        4. useState必须按照固定的顺序和次数调用。
```jsx harmony
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。初始值是0
  // 更改它的函数是setCount
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
    如果useState的初始值依赖于父组件的传入,为避免每次更新组件都调用获取初始值的方法,可以使用下面的写法
```jsx harmony
function App(props){
    /*
    defaultCount只会在第一次渲染的时候才会使用,但是每次获取defaultCount的计算逻辑还是会运行
    const defaultCount = props.defaultCount || 0;
    const [count,setCount] = React.useState(defaultCount);
    */
    const [count,setCount] = React.useState(() => {
        // 延迟初始化,这个函数只在初始渲染的时候才会运行
        console.log("initial count");
        return props.defaultCount || 0;
    })
    function handleClick(){
        setCount(count+1);    
    }   
    return (
        <div>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}
```
    tips: 检查hooks语法的插件: eslint-plugin-react-hooks
    install:
        npm install eslint-plugin-react-hooks -D
    在package.json配置
```metadata json
//...
"eslintConfig":{
    "plugins":[
     "react-hooks"
    ],
    "rules":{
        "react-hooks/rules-of-hooks":"error"
    }
}
//...
```
    
## useEffect

    在React组件中执行过数据获取,订阅或者手动修改过DOM。我们统一把这些操作称为"副作用"。
    useEffect就是一个 Effect Hook,给函数组件增加了操作副作用的能力。它跟class组件的componentDidMount,
    componentDidUpdate和componentWillUnmount具有相同的用途。
```jsx harmony
// demo
function Example() {
  const [count, setCount] = useState(0);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
    tips:
    1. 由于副作用是在组件内声明的,所以它们可以访问到组件的props和state。默认情况下,React会在每次渲染后调用副作用
    --- 包括第一次渲染的时候！
    2. 可以在组件中多次使用useEffect.
    3. 如果你的effect返回一个函数,React将会在执行清除操作时调用它
    
*Demo*
```jsx harmony
function App(){
    const [size,setSize] = React.useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })
    const [count,setCount] = React.useState(0)
    function handleClick(){
        setCount(count+1);
    }
    function onResize(){
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        })
    }
    // 相当于componentDidUpdate 和 componentWillUnmount
    /*
    可以传递一个空数组,数组的每一项不变的情况下，才会阻止useEffect重新执行
    */
    React.useEffect(() => {
        window.addEventListener("resize",onResize,false);
        return () => {
            window.removeEventListener("resize",onResize)
        }
    },[])
    /*
    定义一个useEffect,输出count的变化,如果没有传入第二个参数 [count],则在点击事件自增count
    和调整窗口大小时都会执行 这个副作用
    传递 [count] 表示 只在 count变化时才执行此条副作用,调整窗口时不执行。
    */ 
    React.useEffect(() => {
        console.log("count",count);
    },[count])
    // 相当于componentDidMount 和 componentDidUpdate
    React.useEffect(() => {
        document.title = `${count}`;
    })
    return (
        <div>
            <button
                onClick={handleClick}
            >Click {count}</button>
            <p>size:{size.width} X {size.height}</p>
        </div>
    )
}
```














    