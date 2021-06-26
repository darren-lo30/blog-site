import { format } from 'date-fns';
import { Link } from 'react-router-dom';

type PostDisplayProps = {
  post: any
}

const PostPreview = ({ post }: PostDisplayProps) => (
  <Link to={`posts/${post._id}`}>
    <div className="bg-gray-700 rounded my-5 pt-3 pb-5 px-4">
      <div className="mb-2">
        <p className="font-bold">{ post.author.name }</p>
        <p className="text-sm text-gray-300">{ format(new Date(post.datePosted), " LLLL d, y 'at' h:mm a") }</p>
      </div>
      <h2 className="font-bold text-lg underline">{ post.title }</h2>
      <p className="max-h-16 text-sm overflow-hidden overflow-ellipsis">{ post.body }</p>
    </div>
  </Link>
);

export default PostPreview;
