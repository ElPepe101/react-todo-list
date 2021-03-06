'use strict'

import React, { PropTypes } from 'react'

var marked = typeof window !== 'undefined' ? window.marked : null

export default class Comment extends React.Component
{
  rawMarkup () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true})
    return { __html: rawMarkup }
  }

  render () {
    return (
        <div className='comment'>
            <h2 className='commentAuthor'>{this.props.author}</h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
    )
  }
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.any
}
