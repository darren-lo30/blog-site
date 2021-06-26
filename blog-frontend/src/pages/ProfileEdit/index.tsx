import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import Button from '../../components/Button';
import Input from '../../components/forms/Input';
import setErrorStatusCode from '../../ErrorHandler';

type Params = {
  id: string,
}
const ProfileEdit = () => {
  const { id } = useParams<Params>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>();
  const history = useHistory();

  // Get user data and fill out fields
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/users/${id}`, { withCredentials: true });
        const { user } = response.data;

        setName(user.name);
        setEmail(user.email);
        setUsername(user.username);
      } catch (error: any) {
        setErrorStatusCode(error.respons.status);
      }
    })();
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      history.push(`/users/${id}}`);
    } catch (error: any) {

    }
  };

  return (
    <div className="w-2/3 mx-auto">
      <form onSubmit={handleSubmit} className="text-white w-full pt-6 px-9 pb-8">
        <h1 className="text-2xl text-center font-bold mb-5">Edit Profile</h1>
        {
          errors ? (
            <ul className="mb-3">
              { errors.map((error) => (
                <li key={uniqid()} className="text-red-200">{ error }</li>
              ))}
            </ul>
          ) : null
        }
        <Input
          type="text"
          name="name"
          value={name}
          label="Name"
          onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }
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
                (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }
              }
          className="text-gray-700"
          required
        />
        <Input
          type="text"
          name="username"
          value={username}
          label="Username"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          className="text-gray-700"
          required
        />
        <Button type="submit" color="primary" className="rounded w-full my-3">Update</Button>
      </form>
    </div>
  );
};

export default ProfileEdit;
