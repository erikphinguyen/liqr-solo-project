// import { csrfFetch } from '.csrf';
// import { response } from 'express';

// TYPES
const GET_COMMENTS = 'session/get_comments';
const POST_COMMENTS = 'session/post_comments';
const PUT_COMMENTS = 'session/put_comments';
const DELETE_COMMENTS = 'session/delete_comments';

// ACTION CREATORS
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments,
        userId
    }
}

const postComments = (comments) => {
    return {
        type: POST_COMMENTS,
        comments
    }
}

const putComments = (comments) => {
    return {
        type: PUT_COMMENTS,
        comments
    }
}

const deleteComments = (commentId, userId) => {
    return {
        type: DELETE_COMMENTS,
        commentId,
        userId
    }
}

// THUNKS
export const thunkGetComments = (userId) => async (dispatch) => {
    const reponse = await fetch(`/api/user/${userId}/comments`)

    if (response.ok) {
        const comments = await response.json();
        dispatch(getComments(comments, userId));
    }
}

export const thunkPutComments = data => async dispatch => {
    const response = await fetch(`/api/comments/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const comments = await response.json();
        dispatch(putComments(comments));
        return comments;
    }
};

export const thunkPostCommments = (data, usersId) => async dispatch => {
    const response = await fetch(`/api/users/${usersId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const comments = await response.json();
        dispatch(postComments(comments));
        return comments;
    }
};

export const thunkDeleteComments = (commentId, userId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedCommentId } = await response.json();
        dispatch(deleteComments(deletedCommentId, userId));
        return deletedCommentId;
    }
};

// REDUCER

const initialState = {};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            const newComments = {};
            action.comments.forEach(comment => {
                newComments[comment.id] = comment;
            })
            return {
                ...state,
                ...newComments
            }
        case DELETE_COMMENTS:
            const newState = { ...state };
            delete newState[action.commentId];
            return newState;
        case POST_COMMENTS:
        case PUT_COMMENTS:
            return {
                ...state,
                [action.comment.id]: action.comment
            };
        default:
            return state;
    }
};

export default commentsReducer;
