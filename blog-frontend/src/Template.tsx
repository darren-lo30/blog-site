import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './components/nav/NavBar';

type TemplateProps = {
  children: React.ReactNode,
  signedInId: string,
  setUser: Function,
}

const Template = ({ children, signedInId, setUser }: TemplateProps) => {
  const history = useHistory();

  const signOutHandler = async () => {
    axios.post('/sign-out', {}, { withCredentials: true }).then(() => {
      setUser(null);
      history.push('/');
    });
  };

  const navItems = signedInId ? [
    { to: '/', linkDesc: 'Home' },
    { to: '/posts', linkDesc: 'Feed' },
    { to: `/users/${signedInId}`, linkDesc: 'Profile' },
    { to: '/sign-out', linkDesc: 'Sign Out', onClick: signOutHandler },
  ] : [
    { to: '/', linkDesc: 'Home' },
    { to: '/sign-in', linkDesc: 'Sign In' },
    { to: '/sign-up', linkDesc: 'Sign Up' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-stretch bg-gray-900">
      <NavBar siteName="Console Log" navItems={navItems} />
      <div className="text-gray-100 container mx-auto mt-6 px-3 flex-1 flex flex-col">
        { children }
      </div>
    </div>
  );
};

export default Template;
