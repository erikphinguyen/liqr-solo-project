import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetComments, thunkPostCommments } from '../../store/comments';
import { thunkGetOneImage, thunkPutImages } from '../../store/images';
import './index.css';

const Comments = ({ comments }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log("TESTING COMMENTS IN COMMENTS.JS", comments)
    // const [comments, setComments] = useState([])
    // const commentsObj = useSelector(state => {
    //     return state.comments[id]
    // })
    // const commentsArr = Object.values(comments)

    // useEffect(() => {
    //     dispatch(thunkGetComments())
    //         .then(() => {
    //             let commentsArr = Object.values(commentsObj)
    //             setComments(commentsArr)
    //         })
    // }, [dispatch])

    // const [newComment, setNewComment] = useState(false);
    // handle submit for new comment

    // GET COMMENTS
    // useEffect(() => {
    //     dispatch(thunkGetComments(id))
    // }, [dispatch, id])

    // if (!commentsArr) return null

    // ON LINE __: isn't comment connected to User.username?

    return (
        <div>
            <h3>Comments</h3>
            {
                comments.map((comment) => (
                    <div
                        key={comment.id}
                    >
                        {/* <div>{`${comment.User.id} says`}</div> */}
                        {/* {`@${comment.User.username}`} */}
                        {comment.content}
                    </div>
                ))
            }
        </div>
    )

}

export default Comments
