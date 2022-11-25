// WITHOUT MODAL
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
// import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && (
//         <Switch>
//           <Route path="/login">
//             <LoginFormPage />
//           </Route>
//           <Route path="/signup">
//             <SignupFormPage />
//           </Route>
//         </Switch>
//       )}
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Images from "./components/Images"
import OneImage from "./components/OneImage"
// import PostImage from "./components/PostImage"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { thunkGetImages, thunkGetOneImage } from "./store/images";
import { thunkGetComments } from "./store/comments";
import HomePage from "./components/HomePage"
import Footer from "./components/Footer"
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faGithub, faGitHub, faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

// library.add(fas, faGithub, faGitHub, faTwitter, faFontAwesome)

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    // to hydrate on initial render
    dispatch(thunkGetImages())
      // .then(thunkGetOneImage())
      // .then(thunkGetComments())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  const [images, setImages] = useState([]);

  return (
    <>
      <Navigation isLoaded={isLoaded} images={images} setImages={setImages} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
            <Footer />
          </Route>
          <Route path="/images/:id">
            <OneImage />
          </Route>
          <Route path="/images">
            <Images />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
