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
import './Navigation.css';
import PostImage from '../PostImage'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div>
                    <ProfileButton user={sessionUser} />
                </div>
                <div className='upload-button-container'>
                    <button >Add Cocktail</button>
                    <PostImage user={sessionUser} />
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
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </>
        );
    }

    return (
        <ul>
            <div>
                <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>liqr</NavLink>
                {isLoaded && sessionLinks}
            </div>
            <div>
                <NavLink to="/images" exact={true} activeStyle={{ fontWeight: "bold" }}>Images</NavLink>
            </div>
        </ul>
    );
}

export default Navigation;
