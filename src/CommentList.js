import React, {Component} from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'

class CommentList extends Component {
    static propsTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }
    static defaultProps = {
        comments:[]
    }
    constructor() {
        super()
        this.state = {
            date: new Date(),
            reset: 10,
            canSendCode: true,
            buttonText: '发送验证码'
        }
    }
    componentWillMount(){
        console.log('componentwillmount')
    }
    componentDidMount(){
        // console.log('componentDidMount')
        
    }
    handleDeleteComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }
    handSendCode() {
        if(this.state.reset == 10 && this.state.canSendCode) {
            clearInterval(this.timer)
            this.timer = setInterval(()=>{
                this.setState((prevState)=>{
                    let _reset = prevState.reset>0?prevState.reset-1:10
                    return {
                        reset:_reset,
                        canSendCode: false,
                        buttonText: `${_reset}s`
                    }
                })
                if (this.state.reset <= 0) {
                    clearInterval(this.timer)
                    this.setState({
                        reset:10,
                        canSendCode: true,
                        buttonText: '发送验证码'
                    })
                }
            },1000)
        } 
    }
    render() {
        return (
            <div className='commentList'>
                <div>
                {this.props.comments.map((comment, i) =>
                <Comment 
                    comment={comment} 
                    key={i} 
                    onDeleteComment={this.handleDeleteComment.bind(this)}/>
                )}
                </div>
                {/* <div onClick={this.handSendCode.bind(this)}>{this.state.buttonText}</div> */}
            </div>
            
        )
    }
}

export default CommentList