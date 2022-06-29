import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { thunkGetOneImage } from '../../store/images'

const OneImage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const singleImage = useSelector(state => state.images[id]);
    const imagesArr = Object.values(singleImage)

    useEffect(() => {
        dispatch(thunkGetOneImage(id));
    }, [dispatch, id])

    if (!imagesArr) return null

    return (

        <div>
            <h1>{singleImage.title}</h1>
            <img
                src={singleImage.imageUrl}
                alt={singleImage.title}
            />
            <p>
                {singleImage.ingredients}
            </p>
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
