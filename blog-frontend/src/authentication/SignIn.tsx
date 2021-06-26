import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';
import Button from '../components/Button';

import Input from '../components/forms/Input';

type SignInProps = {
  setUser: Function,
}

const SignIn = ({ setUser }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  function clearForm() {
    setEmail('');
    setPassword('');
    setErrors([]);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      const response = await axios.post('/sign-in', {
        email, password,
      }, { withCredentials: true });

      clearForm();
      setUser(response.data.user);
      history.push('/');
    } catch (error: any) {
      if (error.response.data.msg) {
        // Unable to log in due to incorrect login info
        setErrors([error.response.data.msg]);
      } else if (error.response.data.validationErrs) {
        // Post data was invalid
        setErrors(error.response.data.validationErrs.errors.map((errorObj:any) => errorObj.msg));
      } else {
        // Different kind of error occured
        setErrors(['An error occured']);
      }
    }
  }

  return (
    <div className="w-full flex-1 flex justify-center items-center">
      <div className="mx-3 w-2/3 md:w-1/2 lg:w-1/3 bg-gray-700 rounded">
        <form onSubmit={handleSubmit} className="text-white w-full pt-6 px-9 pb-8">
          <h1 className="text-2xl text-center font-bold mb-5">Sign In</h1>
          <ul className="mb-3">
            { errors.map((error) => (
              <li key={uniqid()} className="text-red-200">{ error }</li>
            ))}
          </ul>
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
          <Button color="primary" type="submit" className="rounded w-full my-3">Sign In</Button>
        </form>
      </div>
    </div>

  );
};

export default SignIn;
