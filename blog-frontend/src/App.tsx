import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import axios from 'axios';
import Template from './Template';
import Feed from './pages/Feed';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import ErrorHandler from './ErrorHandler';
import Error from './pages/Error';
import Loader from './components/Loader';
import PostForm from './pages/PostForm';
import Post from './pages/Post';

type AuthRouteProps = {
  component: React.ComponentType<any>,
  exact: boolean,
  path: string,
  signedInId: string,
}

// A route that requires authentication
const AuthRoute = ({
  component, exact, path, signedInId,
}: AuthRouteProps) => (
  <Route
    exact={exact}
    path={path}
    render={() => (signedInId ? <Route component={component} /> : <Redirect to={{ pathname: '/sign-in' }} />)}
  />
);

type AdminRouteProps = {
  component: React.ComponentType<any>,
  exact: boolean,
  path: string,
  isAdmin: boolean,
}

// A route only accesible to admins
const AdminRoute = ({
  component, exact, path, isAdmin,
}: AdminRouteProps) => (
  <Route
    exact={exact}
    path={path}
    render={() => (isAdmin ? <Route component={component} /> : <Redirect to={{ pathname: '/' }} />)}
  />
);

const App = () => {
  const [signedInId, setSignedInId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [authDone, setAuthDone] = useState(false);

  const setUser = (user: any) => {
    if (!user) {
      setSignedInId('');
      setIsAdmin(false);
    } else {
      setSignedInId(user._id);
      setIsAdmin(user.role === 'admin');
    }
  };

  // Updates if user is logged in or not
  useEffect(() => {
    (async () => {
      const response = await axios.post('/auth', {}, { withCredentials: true });

      // If the user is logged in previously, then change the state to mirror that
      if (response.data.user) {
        const { user } = response.data;
        setUser(user);
      }

      setAuthDone(true);
    })();
  }, []);

  return (
    <BrowserRouter>
      <Template signedInId={signedInId} setUser={setUser}>
        {authDone ? (
          <ErrorHandler>
            <Switch>
              <Route exact path="/" component={() => <Landing signedInId={signedInId} />} />
              <AuthRoute exact path="/posts" component={() => <Feed isAdmin={isAdmin} />} signedInId={signedInId} />

              <AdminRoute exact component={() => <PostForm action="create" />} path="/posts/new" isAdmin={isAdmin} />
              <AdminRoute exact component={() => <PostForm action="edit" />} path="/posts/:id/edit" isAdmin={isAdmin} />
              <Route exact path="/posts/:id" component={() => <Post signedInId={signedInId} />} />
              {/* <AdminRoute exact path="/posts/update" isAdmin={isAdmin} /> */}
              <Route exact path="/users/:id" component={() => <Profile signedInId={signedInId} />} />
              {/* <AuthRoute exact path="/users/edit" signedInId={signedInId} component={() => <ProfileEdit userId={signedInId} />} /> */}
              { !signedInId ? (
                <div>
                  <Route exact path="/sign-up" component={() => <SignUp setUser={setUser} />} />
                  <Route exact path="/sign-in" component={() => <SignIn setUser={setUser} />} />
                </div>
              ) : null}
              <Route render={() => <Error statusCode="404" />} />
            </Switch>

          </ErrorHandler>
        ) : (
          <Loader />
        )}
      </Template>
    </BrowserRouter>
  );
};
export default App;
