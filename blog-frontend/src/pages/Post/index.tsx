import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import uniqid from 'uniqid';
import Loader from '../../components/Loader';
import { useErrorStatus } from '../../ErrorHandler';
import CommentDisplay from './CommentDisplay';
import PostCommentInput from './PostCommentInput';
import Button from '../../components/Button';

type ParamProps = {
  id: string
}

type PostProps = {
  signedInId: string
}

const Post = ({ signedInId }: PostProps) => {
  const [post, setPost] = useState<any>();
  const { id } = useParams<ParamProps>();
  const { setErrorStatusCode } = useErrorStatus();

  const getPosts = async () => {
    try {
      const response = await axios.get(`/posts/${id}`, { withCredentials: true });
      setPost(response.data.post);
    } catch (error: any) {
      setErrorStatusCode(error.response.status);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (!post) {
    return <Loader />;
  }

  return (
    <div>
      <section className="bg-gray-700 rounded pt-3 pb-5">
        <section className="px-4 pb-3">
          <h1 className="text-3xl">{ post.title }</h1>
          <div className="mb-6">
            <div>
              <Link to={`/users/${post.author._id}`}>
                <span>{ post.author.name }</span>
                <span className="ml-3 text-green-300">{ `@${post.author.username}` }</span>
              </Link>
            </div>
            <p className="text-sm text-gray-300">{ format(new Date(post.datePosted), " LLLL d, y 'at' h:mm a") }</p>
          </div>
          <p>{ post.body }</p>
        </section>

        {signedInId === post.author._id ? (
          <div>
            <hr className="h-0.5 border-gray-400 bg-gray-700" />
            <div className="py-3 px-3">
              <Link to={`/posts/${post._id}/edit`}>
                <Button color="primary">Edit Post</Button>
              </Link>
            </div>
          </div>
        ) : null}
        <hr className="h-0.5 border-gray-400 bg-gray-700" />
        <section className="px-3 pt-3">
          <PostCommentInput postId={post._id} getPosts={getPosts} />
        </section>
      </section>
      {
        post.comments.map(
          (comment: any) => <CommentDisplay comment={comment} key={uniqid()} getPosts={getPosts} />,
        )
      }
    </div>

  );
};

export default Post;
