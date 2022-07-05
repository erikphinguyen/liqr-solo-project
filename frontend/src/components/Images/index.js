import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetImages, thunkDeleteImages } from '../../store/images'
import './images.css'

const Images = () => {
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const history = useHistory();
    const [images, setImages] = useState([])
    const imagesObj = useSelector(state => state.images)
    // let images = Object.values(imagesObj)
    useEffect(() => {
        // dispatch(thunkGetImages())
        // .then(() => {
        let imagesArr = Object.values(imagesObj)
        setImages(imagesArr)
        // })
    }, [dispatch])

    if (!images.length) return <h1>no images</h1>

    const handleDelete = (id) => {
        dispatch(thunkDeleteImages(id))
            .then(() => {
                setImages(images.filter(el => el.id !== id))
            })
    }

    // console.log("TESTING IMAGESOBJ", imagesObj)
    // console.log("===========================================================")
    // console.log("TESTING IMAGES IN IMAGES INDEX", images)
    return (
        <div>
            <h2>Feeling adventurous? Checkout these cocktails!</h2>
            <div className='grid-images-container'>
                {
                    images.map((image) => (
                        <div
                            key={image.id}
                            value={image.id}
                            className='image-container-main'
                        >
                            {/* {image.title} */}
                            {/* {`testing bug`} */}

                            {/* https://i.pinimg.com/564x/1f/90/4a/1f904af5ee37e0d250ae681a80e7efe1.jpg */}
                            <div className='image-container'>
                                <NavLink to={`/images/${image.id}`}>
                                    <img className='img' src={image.imageUrl}></img>
                                    {/* <img src={`https://i.pinimg.com/564x/1f/90/4a/1f904af5ee37e0d250ae681a80e7efe1.jpg`}></img> */}
                                </NavLink>
                            </div>
                            <button className='button' onClick={() => handleDelete(image.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Images;
