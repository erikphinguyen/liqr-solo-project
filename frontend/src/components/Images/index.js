import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetImages } from '../../store/images'

const Images = () => {
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const imagesObj = useSelector(state => state.images)
    const imagesArr = Object.values(imagesObj)
    const history = useHistory();

    useEffect(() => {
        dispatch(thunkGetImages());
    }, [dispatch])

    if (!imagesArr) return null

    return (
        <div>
            <h2>Images</h2>
            {
                imagesArr.map((image) => (
                    <div
                        key={image.id}
                        value={image.id}
                    >
                        {image.title}
                        <NavLink to={`/images/${image.id}`}>
                            <img src={image.imageUrl}></img>
                        </NavLink>
                        <input
                            type="text"
                            placeholder="New Cocktail..."
                            onChange
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default Images;
