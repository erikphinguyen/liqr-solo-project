import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetComments, thunkPostCommments } from '../../store/comments';
// import { thunkGetOneImage, thunkPutImages } from '../../store/images';
import './onepage.css';

const Comments = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const comments = useSelector(state => {
        return state.comments[id]
    })
    const commentsArr = Object.values(comments)

    // use this for POST COMMENTS
    // const [newComment, setNewComment] = useState(false);

    // GET COMMENTS
    useEffect(() => {
        dispatch(thunkGetComments(id))
    }, [dispatch, id])

    if (!commentsArr) return null

    return (
        <div>
            <h3>Comments</h3>
            {
                commentsArr.map((comment) => (
                    <div
                        key={comment.id}
                    >
                        <div>{`${comment.User.id} says`}</div>
                        {comment.content}
                    </div>
                ))
            }
        </div>
    )

}

export default Comments
