// import { csrfFetch } from '.csrf';
// import { response } from 'express';

// TYPES
const GET_PHOTOS = 'session/get_photos';
const POST_PHOTOS = 'session/post_photos';
const PUT_PHOTOS = 'session/put_photos';
const DELETE_PHOTOS = 'session/delete_photos';

// ACTION CREATORS
const getPhotos = (photos) => {
    return {
        type: GET_PHOTOS,
        photos,
        userId
    }
}

const postPhotos = (photos) => {
    return {
        type: POST_PHOTOS,
        photos
    }
}

const putPhotos = (photos) => {
    return {
        type: PUT_PHOTOS,
        photos
    }
}

const deletePhotos = (photosId, userId) => {
    return {
        type: DELETE_PHOTOS,
        photosId,
        userId
    }
}

// THUNKS
export const thunkGetPhotos = (userId) => async (dispatch) => {
    const response = await fetch(`/api/user/${userId}/photos`)

    if (response.ok) {
        const photos = await response.json();
        dispatch(getPhotos(photos, userId));
    }
}

export const thunkPutPhotos = data => async dispatch => {
    const response = await fetch(`/api/photos/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const photo = await response.json();
        dispatch(putPhotos(photo));
        return photo;
    }
};

export const thunkPostPhotos = (data, usersId) => async dispatch => {
    const response = await fetch(`/api/users/${usersId}/photos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const photo = await response.json();
        dispatch(postPhotos(photo));
        return photo;
    }
};

export const thunkDeletePhotos = (photoId, userId) => async dispatch => {
    const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedPhotoId } = await response.json();
        dispatch(deletePhotos(deletedPhotoId, userId));
        return deletedPhotoId;
    }
};

// REDUCER

const initialState = {};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            const newPhotos = {};
            action.photos.forEach(photo => {
                newPhotos[photo.id] = photo;
            })
            return {
                ...state,
                ...newPhotos
            }
        case DELETE_PHOTOS:
            const newState = { ...state };
            delete newState[action.photosId];
            return newState;
        case POST_PHOTOS:
        case PUT_PHOTOS:
            return {
                ...state,
                [action.photo.id]: action.photo
            };
        default:
            return state;
    }
};

export default imagesReducer;
