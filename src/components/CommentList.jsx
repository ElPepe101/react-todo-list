'use strict'

import React from 'react'
import Comment from 'Comment.jsx'

export default class CommentList extends React.Component
{
  render () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
            {comment.text}
        </Comment>
      )
    })

    return (
      <div className='commentList'>
          {commentNodes}
      </div>
    )
  }
}

CommentList.propTypes = {
  data: React.PropTypes.array.isRequired
}
