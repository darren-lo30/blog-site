import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/forms/Input';
import setErrorStatusCode from '../ErrorHandler';

type Params = {
  id: string,
}

type UserFormProps = {
  action: 'create' | 'edit',
  setUser: Function,
  signedInId: string
}

const UserForm = ({ action, setUser, signedInId }: UserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  const { id } = useParams<Params>();

  useEffect(() => {
    (async () => {
      // This means it is a User edit form
      if (id) {
        // Can not edit other users
        if (id !== signedInId) {
          history.push('/');
        }

        try {
          // Get current user data
          const response = await axios.get(`/users/${id}`, { withCredentials: true });
          const { user } = response.data;

          setName(user.name);
          setEmail(user.email);
          setUsername(user.username);
        } catch (error: any) {
          setErrorStatusCode(error.respons.status);
        }
      }
    })();
  }, []);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      if (action === 'create') {
        // Sign up user
        const response = await axios.post('/sign-up', {
          name, email, username, password,
        }, { withCredentials: true });

        setUser(response.data.user);

        // Redirect to home
        history.push('/');
      } else {
        // Update the user
        const response = await axios.put(`/users/${id}`, {
          name, email, username, password,
        }, { withCredentials: true });
        setUser(response.data.user);

        // Redirect user to their profil
        history.push(`/users/${id}`);
      }
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.validationErrs.errors.map((errorObj:any) => errorObj.msg));
      } else {
        setErrors(['An error occured']);
      }
    }
  }

  return (
    <div className="w-full flex-1 flex justify-center items-center">
      <div className="mx-3 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-700 rounded">
        <form onSubmit={handleSubmit} className="text-white w-full pt-6 px-9 pb-8">
          <h1 className="text-2xl text-center font-bold mb-5">{ action === 'create' ? 'Sign Up' : 'Edit Profile' }</h1>
          <ul className="mb-3">
            { errors.map((error) => (
              <li key={uniqid()} className="text-red-200">{ error }</li>
            ))}
          </ul>
          <Input
            type="text"
            name="name"
            value={name}
            label="Name"
            onChange={
              (event) => { setName(event.target.value); }
            }
            className="text-gray-700"
            required
          />
          <Input
            type="text"
            name="email"
            value={email}
            label="Email"
            onChange={
              (event) => { setEmail(event.target.value); }
            }
            className="text-gray-700"
            required
          />
          <Input
            type="text"
            name="username"
            value={username}
            label="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            className="text-gray-700"
            required
          />
          <Input
            type="password"
            name="password"
            value={password}
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="text-gray-700"
            required
          />
          <Button type="submit" color="primary" className="rounded w-full my-3">{ action === 'create' ? 'Sign Up' : 'Update' }</Button>
        </form>
      </div>
    </div>

  );
};

export default UserForm;
