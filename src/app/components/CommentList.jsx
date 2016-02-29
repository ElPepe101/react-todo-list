"use strict";

class CommentList extends React.Component
{
    render()
    {
        var commentNodes = this.props.data.map(function(comment)
        {
            return (
                /*jshint ignore:start */
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
                /*jshint ignore:end */
            );
        });

        return (
            /*jshint ignore:start */
            <div className="commentList">
                {commentNodes}
            </div>
            /*jshint ignore:end */
        );
    }
}
