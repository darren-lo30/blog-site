import React, { useEffect, useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import { useHistory, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import Button from '../../components/Button';
import Input from '../../components/forms/Input';
import TextArea from '../../components/forms/TextArea';
import setErrorStatusCode from '../../ErrorHandler';

type PostFormProps = {
  action: 'edit' | 'create',
  signedInId?: string,
}

type Params = {
  id: string
}

const PostForm = ({ action, signedInId }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [published, setPublished] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const { id } = useParams<Params>();

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const response = await axios.get(`/posts/${id}`, { withCredentials: true });
          const { post } = response.data;

          // Redirect user if they are not the author of the post
          if (post.author._id !== signedInId) {
            history.push('/');
          }

          setTitle(post.title);
          setBody(post.body);
          setPublished(post.published);
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
          const response = await axios.post('/posts', { title, body, published }, { withCredentials: true });
          const createdPost = response.data.post;
          history.push(`/posts/${createdPost._id}`);
        } else {
          // Update post
          await axios.put(`/posts/${id}`, { title, body, published }, { withCredentials: true });
          history.push(`/posts/${id}`);
        }
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
        <div className="pt-4 pb-8">
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
          <div className="flex items-center">
            <span className="font-bold mr-3">Published</span>
            <Switch
              onChange={(nextChecked) => { setPublished(nextChecked); }}
              checked={published}
              onColor="#6EE7B7"
              onHandleColor="#10B981"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={15}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </div>
        </div>
        <Button type="submit" color="primary" className="mr-3">{action === 'create' ? 'Create' : 'Update'}</Button>
        <Button type="button" color="secondary" onClick={() => { history.goBack(); }}>Cancel</Button>
      </form>
    </div>
  );
};

export default PostForm;
