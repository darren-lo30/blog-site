import React, { useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import Button from '../../components/Button';
import Input from '../../components/forms/Input';
import TextArea from '../../components/forms/TextArea';

type PostFormProps = {
  action: 'updated' | 'create',
  postId?: string,
}

const PostForm = ({ action, postId = '' }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const clearForm = () => {
    setTitle('');
    setBody('');
  };

  const handleSubmit = (event : React.SyntheticEvent) => {
    event.preventDefault();
    (async () => {
      try {
        if (action === 'create') {
          // Create post
          await axios.post('/posts', { title, body }, { withCredentials: true });
        } else {
          // Update post
          await axios.post(`/posts/${postId}`, { title, body }, { withCredentials: true });
        }
        clearForm();
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
