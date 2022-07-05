import { csrfFetch } from './csrf';
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

const deleteImages = (id) => {
    return {
        type: DELETE_IMAGES,
        id
    }
}

// THUNKS
// GET ALL IMAGES
export const thunkGetImages = () => async (dispatch) => {
    const response = await csrfFetch(`/api/images`)

    if (response.ok) {
        const images = await response.json();
        dispatch(getImages(images));
    }
}

// GET ONE IMAGE
export const thunkGetOneImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`)

    // console.log("RESPONSE TEST", response)
    if (response.ok) {
        const images = await response.json();
        // console.log(images)
        dispatch(getOneImage(images));
        return images
    }
}

export const thunkPutImages = data => async dispatch => {
    const response = await csrfFetch(`/api/images/${data.id}`, {
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
    const response = await csrfFetch(`/api/images`, {
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
    const response = await csrfFetch(`/api/images/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedImageId } = await response.json();
        dispatch(deleteImages(deletedImageId));
        return deletedImageId;
    }
};

// REDUCER
// const initialState = { entries: {}, isLoading: true };


const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_IMAGES:
            const newImages = {};
            action.images.forEach(image => {
                newImages[image.id] = image;
            })
            return {
                ...newImages
            }
        case GET_ONE_IMAGE:
            const newState = { ...state };
            newState[action.images.id] = action.images
            return newState
        case DELETE_IMAGES:
            const deleteState = { ...state };
            delete deleteState[action.id]
            return deleteState;
        // const filteredImages = state.images.filter(image => image.id !== action.id)
        // return { ...state, images: filteredImages }
        case POST_IMAGES:
            const postState = { ...state };
            postState[action.images.id] = action.images
            return postState;
        case PUT_IMAGES:
            return {
                ...state,
                [action.images.id]: action.images
            };
        default:
            return state;
    }
};

export default imagesReducer;
