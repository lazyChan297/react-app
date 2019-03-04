import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }
    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }
    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}</span>
                </div>
                <p>{this.props.comment.content}</p>
                <div onClick={this.handleDeleteComment.bind(this)}>删除</div>
            </div>
        )
    }
}

export default Comment;