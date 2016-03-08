'use strict'

import React from 'react'
import io from 'socket.io-client'
import CommentList from 'CommentList.jsx'
import CommentForm from 'CommentForm.jsx'

// var fetch = typeof window !== 'undefined' ? window.fetch : null
// var Request = typeof window !== 'undefined' ? window.Request : null

export default class CommentBox extends React.Component
{
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this)
    this.socket = io.connect('http://localhost:3000/')
  }

  loadCommentsFromServer () {
    var socketGetComments = function (data) {
      this.setState({data: data})
    }.bind(this)

    this.socket.on('getComments', socketGetComments)
  }

  handleCommentSubmit (comment) {
    this.socket.emit('putComment', comment)
  }

  componentDidMount () {
    this.loadCommentsFromServer()
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  }

  render () {
    return (
      <div className='commentBox'>
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}

CommentBox.propTypes = {
  url: React.PropTypes.string.isRequired,
  pollInterval: React.PropTypes.number.isRequired
}
