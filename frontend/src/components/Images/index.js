import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetImages, thunkDeleteImages } from '../../store/images'

const Images = () => {
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const history = useHistory();
    const [images, setImages] = useState([])
    const imagesObj = useSelector(state => state.images)
    useEffect(() => {
        dispatch(thunkGetImages())
            .then(() => {
                let imagesArr = Object.values(imagesObj)
                setImages(imagesArr)
            })
    }, [dispatch])

    if (!images.length) return null

    const handleDelete = (id) => {
        dispatch(thunkDeleteImages(id))
            .then(() => {
                setImages(images.filter(el => el.id !== id))
            })
    }

    return (
        <div>
            <h2>Images</h2>
            {
                images.map((image) => (
                    <div
                        key={image.id}
                        value={image.id}
                    >
                        {image.title}
                        <button onClick={() => handleDelete(image.id)}>delete</button>
                        <NavLink to={`/images/${image.id}`}>
                            <img src={image.imageUrl}></img>
                        </NavLink>

                    </div>
                ))
            }
        </div>
    );
}

export default Images;
