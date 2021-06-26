import axios from 'axios';
import React, { useState } from 'react';
import uniqid from 'uniqid';
import Button from '../../components/Button';
import Input from '../../components/forms/Input';

type PostCommentInputProps = {
  postId: string,
  getPosts: Function
}
const PostCommentInput = ({ postId, getPosts }: PostCommentInputProps) => {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showControls, setShowControls] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    (async () => {
      try {
        await axios.post(`/comments/${postId}`, { message, parentModel: 'post' }, { withCredentials: true });
        await getPosts();

        setMessage('');
      } catch (error: any) {
        if (error.response.data.validationErrs) {
          // Comment data was invalid
          setErrors(error.response.data.validationErrs.errors.map((errorObj:any) => errorObj.msg));
        } else {
          // Different kind of error occured
          setErrors(['An error occured']);
        }
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="message"
        value={message}
        placeholder="Comment something"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(event.target.value);
        }}
        onClick={() => { setShowControls(true); }}
        required
        className="text-gray-700"
        autoComplete="off"
      />
      {
        errors ? (
          <ul className="mb-3">
            { errors.map((error) => (
              <li key={uniqid()} className="text-red-200">{ error }</li>
            ))}
          </ul>
        ) : null
      }
      { showControls ? (
        <div className="flex justify-end">
          <Button type="button" className="text-gray-300 mr-3" onClick={() => { setShowControls(false); }}>
            CANCEL
          </Button>
          <Button type="submit" className="text-gray-300 bg-gray-600">
            COMMENT
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export default PostCommentInput;
