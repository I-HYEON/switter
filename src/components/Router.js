import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const AppRouter = ({isLoggedIn}) => {
    // console.log('뭐지?',isLoggedIn)
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Switch>
                {
                    isLoggedIn? (
                      <>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile/>
                        </Route>
                        {/* <Redirect from="*" to="/" /> */}
                      </> )
                      : ( 
                        <>
                          <Route exact path="/">
                            <Auth />
                          </Route>
                          {/* <Redirect from="*" to="/" /> */}
                        </>
                    )
                   }
            </Switch>
        </Router>
    )
}

export default AppRouter;