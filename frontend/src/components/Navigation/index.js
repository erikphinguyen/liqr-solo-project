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
import PostImage from '../PostImage'
import { thunkPostImages } from '../../store/images'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('test')
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <nav>
                <div className='right-nav-bar'>
                    <ProfileButton user={sessionUser} />
                </div>
                <div className='upload-button-container'>
                    {/* <NavLink to="/upload">Upload Drink</NavLink> */}
                    {/* <PostImage user={sessionUser} /> */}
                </div>
            </nav>
        );
    } else {
        sessionLinks = (
            <nav>
                <>
                    <li>
                        <LoginFormModal />
                    </li>
                    <li>
                        <SignUpFormModal />
                    </li>
                </>
                {/* <div className='right-nav-bar'>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div> */}
            </nav>
        );
    }

    return (
        <nav className='navigation'>
            <ul className='navigation'>
                <li>
                    <li className='left-nav-bar'>
                        <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>liqr</NavLink>
                    </li>
                    <div className='right-nav-bar'>
                        {isLoaded && sessionLinks}
                    </div>
                    <li class>
                        <NavLink to="/images" exact={true} activeStyle={{ fontWeight: "bold" }}>Drinks</NavLink>
                    </li>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
