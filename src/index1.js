import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import PropTypes from 'prop-types'
import * as serviceWorker from './serviceWorker';
import Header from './Header'
import Content from './Content'

class Index extends Component {
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext() {
        return {store}
    }
    render() {
        return (
            <div>
                <Header></Header>
                <Content></Content>
            </div>
        )
    }
}

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)

        listeners.forEach((listener)=>listener())
    }
    dispatch({})
    return {getState,dispatch,subscribe}
}

const themeReducer = (state,action) => {
    if (!state) {
        return {
            themeColor: 'red'
        }
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state,themeColor:action.themeColor}
        default:
            return state
    }
}

const store = createStore(themeReducer)
// store.dispatch({type:'CHANGE_COLOR',themeColor:'red'})

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
