"use strict";

import React from 'react';
import CommentList from "CommentList.jsx";
import CommentForm from "CommentForm.jsx";

export default class CommentBox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: []
        };

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.goFetch = this.goFetch.bind(this);
    }

    goFetch(request)
    {
        var promise = fetch(request);

        var data = promise.then(function(response)
        {
            if (response.ok) {
                response.json().then(function(data)
                {
                    this.setState({data: data});
                }.bind(this));
            } else {
                console.log("Bad response: ", response.status);
            }
        }.bind(this))
        .catch(function(err)
        {
            throw new Error(err);
        });
    }

    loadCommentsFromServer()
    {
        var request = new Request(this.props.url,
        {
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.goFetch(request);
    }

    handleCommentSubmit(comment)
    {
        var request = new Request(this.props.url,
        {
            method: 'post',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });

        this.goFetch(request);
    }

    componentDidMount()
    {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render()
    {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}
