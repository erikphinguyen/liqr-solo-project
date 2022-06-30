import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkPostImages } from '../../store/images'
// dont forget to make and import a css file

function PostImage() {
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const imagesObj = useSelector(state => state.images)
    const imagesArr = Object.values(imagesObj)
    const history = useHistory();

    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [contributor, setContributor] = useState('');
    const [ingredients, setIngredients] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newImage = {
            imageUrl,
            title,
            contributor,
            ingredients
        };

        const image = await dispatch(thunkPostImages(newImage))
        if (image) reset();
    };

    const reset = () => {
        setImageUrl('');
        setTitle('');
        setContributor('');
        setIngredients('');
    };

    return (
        <div className='inputImage'>
            <h1>Upload New Drink</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(event) => setImageUrl(event.target.value)}
                    value={imageUrl}
                    placeholder='Image URL'
                    name='imageUrl'
                />
                <input
                    type='text'
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    placeholder='Title'
                    name='title'
                />
                <input
                    type='text'
                    onChange={(event) => setContributor(event.target.value)}
                    value={contributor}
                    placeholder='Contributor'
                    name='contributor'
                />
                <input
                    type='text'
                    onChange={(event) => setIngredients(event.target.value)}
                    value={ingredients}
                    placeholder='Ingredients'
                    name='ingredients'
                />
                <button type='submit'>Submit</button>
            </form>
        </div>

    );

}

export default PostImage;
