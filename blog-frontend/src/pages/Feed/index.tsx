import { useEffect, useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import PostPreview from './PostPreview';

import { useErrorStatus } from '../../ErrorHandler';
import Button from '../../components/Button';

type FeedProps = {
  isAdmin: boolean
}
const Feed = ({ isAdmin }: FeedProps) => {
  const { setErrorStatusCode } = useErrorStatus();
  const [posts, setPosts] = useState<any[]>();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/posts', { withCredentials: true });
        setPosts(response.data.posts);
      } catch (error: any) {
        setErrorStatusCode(error.response.status);
      }
    })();
  }, []);

  if (!posts) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Feed</h1>
        <span>
          { isAdmin ? (
            <Link to="/posts/new">
              <Button color="primary">Create Post</Button>
            </Link>
          ) : null}
        </span>
      </div>
      { posts.map((post) => (
        <PostPreview key={uniqid()} post={post} />
      ))}
    </div>
  );
};

export default Feed;
