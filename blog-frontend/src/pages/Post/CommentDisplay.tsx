import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import { format } from 'date-fns';
import Button from '../../components/Button';
import Input from '../../components/forms/Input';

type CommentDisplayProps = {
  comment: any
  getPosts: Function
}
const CommentDisplay = ({ comment, getPosts }: CommentDisplayProps) => {
  const [showControls, setShowControls] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>();

  const handleReplySubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    (async () => {
      try {
        await axios.post(`/comments/${comment._id}`, { message, parentModel: 'comment' }, { withCredentials: true });
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
    <div className="bg-gray-700 my-3 rounded px-3 py-3 w-2/3 md:w-1/2">
      <div className="flex justify-between">
        <Link to={`/users/${comment.author._id}`} className="font-bold">
          {comment.author.username}
        </Link>
        <span className="underline">{comment._id}</span>
      </div>
      <p className="text-sm text-gray-300">{ format(new Date(comment.datePosted), 'MM/dd/yy HH:mm:ss') }</p>
      { comment.parentModel === 'Comment' ? (
        <p className="text-sm text-green-300">{ comment.parent }</p>
      ) : null}
      <p className="pt-3">
        { comment.message }
      </p>
      <div>
        <Button type="button" className="text-sm mt-2" onClick={() => { setShowControls(true); }}>
          REPLY
        </Button>
      </div>
      {
        errors ? (
          <ul className="mb-3">
            { errors.map((error) => (
              <li key={uniqid()} className="text-red-200">{ error }</li>
            ))}
          </ul>
        ) : null
      }
      {
        showControls ? (
          <form onSubmit={handleReplySubmit}>
            <Input
              type="text"
              name="comment"
              value={message}
              placeholder="Reply with something"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMessage(event.target.value);
              }}
              onClick={() => { setShowControls(true); }}
              className="bg-transparent text-gray-200"
              required
              autoComplete="off"
            />
            <div className="flex justify-end">
              <Button type="button" className="text-gray-300 mr-3" onClick={() => { setShowControls(false); }}>
                CANCEL
              </Button>
              <Button type="submit" className="text-gray-300 bg-gray-600">
                REPLY
              </Button>
            </div>
          </form>
        ) : null
      }
    </div>
  );
};

export default CommentDisplay;
