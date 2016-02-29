"use strict";

class CommentForm extends React.Component
{

    self() {
        return this;
    }

    constructor(props)
    {
        super(props);
        this.state = {
            author: "",
            text: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    /* ---- Changed to ES6
       ---- http://stackoverflow.com/questions/30720620/reactjs-w-ecmascript-6
    getInitialState()
    {
        return {author: "", text: ""};
    }*/

    handleAuthorChange(e)
    {
        this.setState({author: e.target.value});
    }

    handleTextChange(e)
    {
        this.setState({text: e.target.value});
    }

    handleSubmit(e)
    {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author)
        {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: "", text: ""});
    }

    render()
    {
        return (
            /*jshint ignore:start */
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post" />
            </form>
            /*jshint ignore:end */
        );
    }
}
