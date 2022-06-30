import { csrfFetch } from './csrf';
// import { response } from 'express';

// TYPES
const GET_COMMENTS = 'images/get_comments';
const POST_COMMENTS = 'images/post_comments';
const DELETE_COMMENTS = 'images/delete_comments';

// ACTION CREATORS
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const postComments = (comments) => {
    return {
        type: POST_COMMENTS,
        comments
    }
}

const deleteComments = (comments) => {
    return {
        type: DELETE_COMMENTS,
        comments
    }
}

// THUNKS
// ALL COMMENTS ON ONE IMAGE
export const thunkGetComments = () => async (dispatch) => {
    const response = await csrfFetch(`/api/comments`)

    if (response.ok) {
        const comments = await response.json();
        dispatch(getComments(comments));
    }
}

export const thunkPostCommments = (data) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${data.imageId}`, {
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

export const thunkDeleteComments = (id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedCommentId } = await response.json();
        dispatch(deleteComments(deletedCommentId));
        return deletedCommentId;
    }
};

// REDUCER

const initialState = { entries: {}, isLoading: true };

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
            const deleteState = { ...state };
            delete deleteState[action.commentId];
            return deleteState;
        case POST_COMMENTS:
            const postState = { ...state, entries: { ...state.entries } };
            postState.entries[action.images.id] = action.images
            return postState;
        default:
            return state;
    }
};

export default commentsReducer;
