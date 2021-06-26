import React, { useEffect, useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/forms/Input';
import TextArea from '../../components/forms/TextArea';
import setErrorStatusCode from '../../ErrorHandler';

type PostFormProps = {
  action: 'edit' | 'create',
}

type ParamProps = {
  id: string
}

const PostForm = ({ action }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const { id } = useParams<ParamProps>();

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const response = await axios.get(`/posts/${id}`, { withCredentials: true });
          const { post } = response.data;

          setTitle(post.title);
          setBody(post.body);
        } catch (error: any) {
          setErrorStatusCode(error.response.status);
        }
      }
    })();
  }, []);

  const handleSubmit = (event : React.SyntheticEvent) => {
    event.preventDefault();
    (async () => {
      try {
        if (action === 'create') {
          // Create post
          await axios.post('/posts', { title, body }, { withCredentials: true });
        } else {
          // Update post
          await axios.put(`/posts/${id}`, { title, body }, { withCredentials: true });
        }
        history.push(`/posts/${id}`);
      } catch (error: any) {
        if (error.response.data.validationErrs) {
          // Post data was invalid
          setErrors(error.response.data.validationErrs.errors.map((errorObj:any) => errorObj.msg));
        } else {
          // Different kind of error occured
          setErrors(['An error occured']);
        }
      }
    })();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-3">
          {action === 'create' ? 'Create A Post' : 'Update A Post'}
        </h1>
        <ul className="mb-3">
          { errors.map((error) => (
            <li key={uniqid()} className="text-red-200">{ error }</li>
          ))}
        </ul>
        <div className="py-4">
          <Input
            type="text"
            name="title"
            value={title}
            label="Title"
            onChange={
              (event) => { setTitle(event.target.value); }
            }
            className="text-gray-700"
          />
          <TextArea
            name="body"
            value={body}
            label="Body"
            onChange={
              (event) => { setBody(event.target.value); }
            }
            className="h-32"
          />
        </div>
        <Button type="submit" color="primary">{action === 'create' ? 'Create' : 'Update'}</Button>
      </form>
    </div>
  );
};

export default PostForm;
