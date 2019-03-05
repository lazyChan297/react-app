// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import App from './App';
// import CommentApp from './CommentApp'
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<CommentApp />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


// make redux 

function createStore(state,statecChanger) {
    const listeners = []
    const subscribe = (listener) => {
      listeners.push(listener)
    }
    const getState = () => state
    const dispatch = (action) => {
      console.log('0-----dispatch')
      state = stateChanger(state, action)
      listeners.forEach((listener) => {
        console.log('1-----listener')
        listener()
      })
    }
    return {getState, dispatch, subscribe}
  }
  function renderApp(newAppState, oldAppState={}) {
    if (newAppState === oldAppState) return //没有改变，不作任何渲染
    renderTitle(newAppState.title,oldAppState.title)
    renderContent(newAppState.content,oldAppState.content)
  }
  function renderTitle(newTitle,oldTilte={}) {
    if (newTitle === oldTilte) return
    console.log('render title')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
  }
  function renderContent(newContent,oldContent={}) {
    if (newContent === oldContent) return
    console.log('render content')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
  }
  let appState = {
    title: {
      text: 'React.js 小书',
      color: 'red',
    },
    content: {
      text: 'React.js 小书内容',
      color: 'blue'
    }
  }

  function stateChanger(state, action) {
    switch(action.type) {
        case 'UPDATE_TITLE_TEXT':
            // state.title.text = action.text
            return {
                ...state,
                title: {
                    ...state.title,
                    text:action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            // state.title.color = action.color
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }
  }

const store = createStore(appState, stateChanger)
let oldState = store.getState()
// subscribe 启动观察者每次state改变后自动更新视图

// 为什么每次修改数据后subscribe都会触发的原因:调用dispatch修改state,触发了listener观察者函数数组的循环,从而执行了renderApp
store.subscribe(()=>{
    console.log("2------subscribe-------")
    const newState = store.getState()
    renderApp(newState,oldState)
    oldState = newState
})

renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
// store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
// store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'yellow' }) 

// 纯函数
// 1 函数的返回结果只依赖于它的参数
// 2 函数执行时不会影响外部数据