import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import "./index.css"

class CommentApp extends Component {
    constructor(){
        super()
        this.state = {
            comments:[]
        }
    }
    componentDidMount() {
        this._loadComment()
    }
    _saveComment(comments) {
        localStorage.setItem('comments',JSON.stringify(comments))
    }
    _loadComment() {
        let comments = localStorage.getItem('comments')
        if(comments) {
            comments = JSON.parse(comments)
            this.setState({comments})
        }
    }
    handleSubmitComment(comment) {
        this.state.comments.push(comment)
        this.setState({
            comments:this.state.comments
        })
        this._saveComment(this.state.comments)
    }
    handleDeleteComment(index) {
        const comments = this.state.comments
        comments.splice(index,1)
        this.setState({comments})
        this._saveComment(comments)
    }
    render() {
        return (
            <div className='comment-app'>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList 
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}

export default CommentApp