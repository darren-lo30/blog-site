import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';
import axios from 'axios';
import Button from '../components/Button';

import Input from '../components/forms/Input';

type SignUpProps = {
  setUser: Function,
}

const SignUp = ({ setUser }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  function clearForm() {
    setName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setErrors([]);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const response = await axios.post('/sign-up', {
        name, email, username, password,
      }, { withCredentials: true });

      clearForm();
      setUser(response.data.user);
      // Redirect to home
      history.push('/');
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
          <h1 className="text-2xl text-center font-bold mb-5">Sign Up</h1>
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
              (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }
            }
          />
          <Input
            type="text"
            name="email"
            value={email}
            label="Email"
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }
            }
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
            required
          />
          <Button type="submit" color="primary" className="rounded w-full my-3">Sign Up</Button>
        </form>
      </div>
    </div>

  );
};

export default SignUp;
