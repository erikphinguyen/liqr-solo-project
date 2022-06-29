// import { csrfFetch } from '.csrf';
// import { response } from 'express';

// TYPES
const GET_IMAGES = 'images/get_images';
const GET_ONE_IMAGE = 'images/get_one_image';
const POST_IMAGES = 'images/post_images';
const PUT_IMAGES = 'images/put_images';
const DELETE_IMAGES = 'images/delete_images';

// ACTION CREATORS
const getImages = (images) => {
    return {
        type: GET_IMAGES,
        images
    }
}

const getOneImage = (images) => {
    return {
        type: GET_ONE_IMAGE,
        images
    }
}

const postImages = (images) => {
    return {
        type: POST_IMAGES,
        images
    }
}

const putImages = (images) => {
    return {
        type: PUT_IMAGES,
        images
    }
}

const deleteImages = (imagesId, userId) => {
    return {
        type: DELETE_IMAGES,
        imagesId,
        userId
    }
}

// THUNKS
// GET ALL IMAGES
export const thunkGetImages = () => async (dispatch) => {
    const response = await fetch(`/api/images`)

    if (response.ok) {
        const images = await response.json();
        dispatch(getImages(images));
    }
}

// GET ONE IMAGE
export const thunkGetOneImage = (id) => async (dispatch) => {
    const response = await fetch(`/api/images/${id}`)

    if (response.ok) {
        const images = await response.json();
        dispatch(getOneImage(images));
    }
}

export const thunkPutImages = data => async dispatch => {
    const response = await fetch(`/api/images/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(putImages(image));
        return image;
    }
};

export const thunkPostImages = (data) => async dispatch => {
    const response = await fetch(`/api/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(postImages(image));
        return image;
    }
};

export const thunkDeleteImages = (id) => async dispatch => {
    const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedImageId } = await response.json();
        dispatch(deleteImages(deletedImageId));
        return deletedImageId;
    }
};

// REDUCER
const initialState = { entries: {}, isLoading: true };

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IMAGES:
            const newImages = {};
            action.images.forEach(image => {
                newImages[image.id] = image;
            })
            return {
                ...state,
                ...newImages
            }
        case GET_ONE_IMAGE:
            const newState = { ...state, entries: { ...state.entries } };
            newState.entries[action.image.id] = action.image
            return newState
        case DELETE_IMAGES:
            const deleteState = { ...state, entries: { ...state.entries } };
            delete deleteState[action.image.id];
            return deleteState;
        case POST_IMAGES:
            const postState = { ...state, entries: { ...state.entries } };
            postState.entries[action.image.id] = action.image
            return postState;
        case PUT_IMAGES:
            return {
                ...state,
                [action.image.id]: action.image
            };
        default:
            return state;
    }
};

export default imagesReducer;
