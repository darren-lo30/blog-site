import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import capitalize from 'capitalize';
import uniqid from 'uniqid';
import Loader from '../../components/Loader';
import { useErrorStatus } from '../../ErrorHandler';
import Button from '../../components/Button';

type Params = {
  id: string,
}

type ProfileProps = {
  signedInId: string,
}
const Profile = ({ signedInId } : ProfileProps) => {
  const [user, setUser] = useState<any>();
  const { id } = useParams<Params>();
  const { setErrorStatusCode } = useErrorStatus();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/users/${id}`, { withCredentials: true });
        setUser(response.data.user);
      } catch (error: any) {
        setErrorStatusCode(error.response.status);
      }
    })();
  }, []);

  // Display while loading
  if (!user) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      <section className="py-3">
        <h2 className="text-3xl inline mr-3">{ user.name }</h2>
        <span className="text-green-300">{ `@${user.username}` }</span>
        <p className="text-gray-300 mb-3">{ user.email }</p>
        <p className="text-gray-300 mb-3">{ capitalize(user.role) }</p>
        {signedInId === user._id ? (
          <Link to={`/users/${user._id}/edit`}>
            <Button color="primary">Edit Profile</Button>
          </Link>
        ) : null}
      </section>

      {user.role === 'admin' ? (
        <div>
          <h2 className="text-xl mb-3">Posts</h2>
          <ul className="sm:w-2/3 lg:w-1/2">
            { user.posts.map((post: any) => (
              <Link to={`/posts/${post._id}`}>
                <li className="bg-gray-300 text-gray-900 my-3 rounded px-3 py-2" key={uniqid()}>{post.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : null}

      <section className="py-3">
        <h2 className="text-xl">Comments</h2>
        <ul className="sm:w-2/3 lg:w-1/2">
          { user.comments.map((comment: any) => (
            <li className="bg-gray-300 text-gray-900 my-3 rounded px-3 py-2" key={uniqid()}>{comment.message}</li>
          ))}
        </ul>

      </section>
    </div>
  );
};

export default Profile;
