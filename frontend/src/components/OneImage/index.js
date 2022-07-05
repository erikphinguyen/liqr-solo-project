
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { thunkGetOneImage, thunkPutImages } from '../../store/images'
import './index.css'
import Comments from './comments'
import { thunkPostCommments } from '../../store/comments';

const OneImage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const singleImage = useSelector(state => {
        return state.images[id]
    });
    // console.log("SINGLE IMAGE TESTING", singleImage?.Comments)
    // const imagesArr = Object.values(singleImage)
    const comments = singleImage?.Comments;
    // console.log('TESTING COMMENTS', comments)
    const [editMode, setEditMode] = useState(false)

    const [newComment, setNewComment] = useState({
        content: ''
    });

    const [oneImageComments, setOneImageComments] = useState([])


    const [newImageData, setNewImageData] = useState({
        title: '',
        imageUrl: '',
        contributor: '',
        ingredients: ''
    })


    useEffect(() => {
        dispatch(thunkGetOneImage(id))
            .then(res => {
                setOneImageComments(res.Comments)
            })
            .catch(err => console.log(err))
    }, [dispatch, id])

    // maybe call this handleSubmitImages so we can make handleSubmitComments (post)

    const handleSubmit = (e, type) => {
        e.preventDefault();

        if (type === 'edit') {
            let data = {
                id: singleImage.id,
                ...newImageData
            }
            dispatch(thunkPutImages(data))
        } else if (type === 'comment') {
            let data = {
                imageId: id,
                content: newComment.content
            }
            dispatch(thunkPostCommments(data))
                .then(res => setOneImageComments([...oneImageComments, res]))
        }
    }

    if (!singleImage) return null

    return (
        <div>
            <div>
                <h1>{singleImage.title}</h1>
                <img
                    src={singleImage.imageUrl}
                    alt={singleImage.title}
                />
                {/* <p>
                    <b>Ingredients:</b> {singleImage.ingredients}
                </p> */}
                <p>
                    <b>Contributor:</b> {singleImage.contributor}
                </p>
                <button className='button' onClick={() => setEditMode(true)}>Edit Drink</button>
                <div>
                    <button className='button' onClick={() => setNewComment(true)}>Add A Comment</button>
                </div>
            </div>

            {
                editMode ? (
                    <div>
                        <input
                            type='text'
                            placeholder='New Title'
                            onChange={(e) => setNewImageData({ ...newImageData, title: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='New Image URL'
                            onChange={(e) => setNewImageData({ ...newImageData, imageUrl: e.target.value })} />

                        <input
                            type='text'
                            placeholder='New Contributor'
                            onChange={(e) => setNewImageData({ ...newImageData, contributor: e.target.value })} />

                        <input
                            type='text'
                            placeholder='New Ingredients'
                            onChange={(e) => setNewImageData({ ...newImageData, ingredients: e.target.value })} />
                        <button className='button' onClick={() => handleSubmit('edit')}>Save</button>
                    </div>
                ) : null
            }

            {/* THIS BREAKS THE APP, NEED HANDLE SUBMIT TO MATCH COMMENT ACTION */}

            {
                newComment ? (
                    <div>
                        <input
                            type='text'
                            placeholder='New Comment'
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                        />
                        <button className='button' onClick={(e) => handleSubmit(e, 'comment')}>Save</button>
                    </div>
                ) : null
            }

            <div>
                <Comments comments={oneImageComments} setOneImageComments={setOneImageComments} />
            </div>

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
