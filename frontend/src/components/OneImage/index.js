
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { thunkGetOneImage, thunkPutImages } from '../../store/images'
import './onepage.css'
// import Comments from './comments'

const OneImage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const singleImage = useSelector(state => {
        return state.images[id]
    });
    const imagesArr = Object.values(singleImage)

    const [editMode, setEditMode] = useState(false)


    const [newImageData, setNewImageData] = useState({
        title: '',
        imageUrl: '',
        ingredients: ''
    })


    useEffect(() => {
        dispatch(thunkGetOneImage(id))
    }, [dispatch, id])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            id: singleImage.id,
            ...newImageData
        }
        dispatch(thunkPutImages(data))
    }

    if (!imagesArr) return null

    return (
        <div>
            <div>
                <h1>{singleImage.title}</h1>
                <img
                    src={singleImage.imageUrl}
                    alt={singleImage.title}
                />
                <p>
                    {singleImage.ingredients}
                </p>
                <button onClick={() => setEditMode(true)}>edit</button>
                {/* <div>
                    <Comments />
                </div> */}
            </div>

            {
                editMode ? (
                    <div>
                        <input
                            type='text'
                            placeholder={singleImage.title}
                            onChange={(e) => setNewImageData({ ...newImageData, title: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder={singleImage.imageUrl}
                            onChange={(e) => setNewImageData({ ...newImageData, imageUrl: e.target.value })} />

                        <input
                            type='text'
                            placeholder={singleImage.ingredients}
                            onChange={(e) => setNewImageData({ ...newImageData, ingredients: e.target.value })} />
                        <button onClick={handleSubmit}>save</button>
                    </div>
                ) : null
            }
        </div>
    )

    // return (
    //     <div>
    //         {
    //             imagesArr.map((image) => (
    //                 <div
    //                     key={image.id}
    //                     value={image.id}
    //                 >
    //                     {image.title}
    //                     <NavLink to={`/images/${image.id}`}>
    //                         <img src={image.imageUrl}></img>
    //                     </NavLink>

    //                     {/* <a href={`/images/${image.id}`}
    //                         onClick={event => {
    //                             event.preventDefault();
    //                             history.push(`/images/${image.id}`)
    //                         }}>
    //                         <img src={image.imageUrl}></img>
    //                     </a> */}

    //                 </div>
    //             ))
    //         }
    //     </div>
    // )
}

export default OneImage;


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, NavLink, Route, useParams } from 'react-router-dom';
// import { thunkGetOneImage } from '../../store/images'

// const OneImage = ({ images }) => {
//     const { id } = useParams();

//     const singleImage = images[id]

//     return (
//         <div>
//             <h1>{singleImage.title}</h1>
//             <img
//                 src={singleImage.imageUrl}
//                 alt={singleImage.title}
//             />
//             <p>
//                 {singleImage.ingredients}
//             </p>
//         </div>
//     );
// }

// export default OneImage;
