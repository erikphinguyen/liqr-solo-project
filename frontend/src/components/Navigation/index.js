// WITHOUT MODAL
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);

//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <ProfileButton user={sessionUser} />
//         );
//     } else {
//         sessionLinks = (
//             <>
//                 <NavLink to="/login">Log In</NavLink>
//                 <NavLink to="/signup">Sign Up</NavLink>
//             </>
//         );
//     }

//     return (
//         <ul>
//             <li>
//                 <NavLink exact to="/">Home</NavLink>
//                 {isLoaded && sessionLinks}
//             </li>
//         </ul>
//     );
// }

// export default Navigation;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';
import PostImage from '../PostImage';
import { thunkPostImages } from '../../store/images';
import Demo from '../Demo';
import SearchBar from '../SearchBar/SearchBar';
import PostImageModal from '../PostImageModal';

function Navigation({ isLoaded, images, setImages }) {
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('test')
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div>
                    <ProfileButton user={sessionUser} />
                </div>
                <div>
                    {/* <NavLink to="/upload">Upload Drink</NavLink> */}
                    <PostImageModal images={images} setImages={setImages} />
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div>
                    <LoginFormModal />
                </div>
                <div>
                    <SignUpFormModal />
                </div>
                <div>
                    <Demo />
                </div>
            </>
        );
    }

    return (
        <nav>
            <ul className='navigation'>
                <div>
                    <div>
                        <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}> <b>liqr</b></NavLink>
                    </div>
                    <div>
                        <NavLink to="/images" exact={true} activeStyle={{ fontWeight: "bold" }}>Drinks</NavLink>
                    </div>
                    <div className='search-container'>
                    <SearchBar placeholder="Find a Drink Here!" />
                    </div>
                </div>
                <div>
                    {isLoaded && sessionLinks}
                </div>
            </ul>
        </nav>
    );
}

export default Navigation;
