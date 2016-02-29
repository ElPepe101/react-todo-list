"use strict";

class CommentBox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: []
        };

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    }

    loadCommentsFromServer()
    {
        $.ajax(
            {
                url: this.props.url,
                dataType: "json",
                cache: false,
                success: function(data)
                {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err)
                {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            }
        );
    }

    handleCommentSubmit(comment)
    {
        $.ajax(
            {
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: comment,
                success: function(data)
                {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err)
                {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            }
        );
    }

    /* ---- Changed to ES6
       ---- http://stackoverflow.com/questions/30720620/reactjs-w-ecmascript-6
    getInitialState()
    {
        return {data: []};
    }*/

    componentDidMount()
    {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }

    render()
    {
        return (
            /*jshint ignore:start */
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
            /*jshint ignore:end */
        );
    }
}
