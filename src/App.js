import React, { Component } from 'react';
import { comment } from 'postcss';

// state 组件用于保存、控制、修改自己的可变状态，
// 一定要通过setState修改才会触发试图的更新
// 外部不能访问也不能修改

// props 可以通过父组件传入配置参数
// 外部传递进来的内部无法修改和控制，除非父组件重新渲染

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class Title extends Component {
  handleClickOntitle() {
    console.log(this)
  }
  render() {
    return (
      // 如果想获得当前的实例,需要通过bind(this)
      <h1 onClick={this.handleClickOntitle.bind(this)}>Title</h1>
    )
  }
}

class User extends Component {
  render() {
    const {user} = this.props
    return (
      <div>
        <div>name: {user.username}</div>
      </div>
    )
  }
}
class Header extends Component {
  render() {
    return (
      <div>
        <Title/>
        <h2>this is header</h2>
      </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
      <div>
        <h2>this is main content</h2>
        <LikeButton/>
        <LikeButton likedText="赞" unlikedText="已赞" />
        <div>{users.map((user,i)=> <User key={i} user={user}/>)}</div>
      </div>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <div>
        <h2>this is Footer</h2>
      </div>
    )
  }
}

class LikeButton extends Component{
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }
  constructor() {
    super()
    this.state = {
      isLiked: false
    }
  }
  handleClickOnLikeButton() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render() {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked?this.props.likedText:this.props.unlikedText}
      </button>
    )
  }
}

class Index extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }
}

export default Index;
