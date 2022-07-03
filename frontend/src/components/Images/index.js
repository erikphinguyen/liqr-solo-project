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
    // let images = Object.values(imagesObj)
    useEffect(() => {
        dispatch(thunkGetImages())
            .then(() => {
                let imagesArr = Object.values(imagesObj)
                setImages(imagesArr)
            })
    }, [dispatch])

    if (!images.length) return <h1>no images</h1>

    const handleDelete = (id) => {
        dispatch(thunkDeleteImages(id))
            .then(() => {
                setImages(images.filter(el => el.id !== id))
            })
    }

    console.log("TESTING IMAGESOBJ", imagesObj)
    console.log("===========================================================")
    console.log("TESTING IMAGES IN IMAGES INDEX", images)
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
                        {/* {`testing bug`} */}

                        {/* https://i.pinimg.com/564x/1f/90/4a/1f904af5ee37e0d250ae681a80e7efe1.jpg */}
                        <NavLink to={`/images/${image.id}`}>
                            <img src={image.imageUrl}></img>
                            {/* <img src={`https://i.pinimg.com/564x/1f/90/4a/1f904af5ee37e0d250ae681a80e7efe1.jpg`}></img> */}
                        </NavLink>
                        <button onClick={() => handleDelete(image.id)}>Delete</button>
                    </div>
                ))
            }
        </div>
    );
}

export default Images;
