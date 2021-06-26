import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faFontAwesome, faNode } from '@fortawesome/free-brands-svg-icons';
import tw from 'tailwind-styled-components';
import sitePreview from '../../assets/preview.png';
import Button from '../../components/Button';

const TechListItem = tw.li`
  mx-4
`;

type LandingProps = {
  signedInId: string,
}

export default function Landing({ signedInId }: LandingProps) {
  return (
    <div className="flex-auto bg-gray-900 text-white p-3">
      <div className="container mx-auto mt-6">
        <div className="flex flex-col md:flex-row items-center content-center justify-center">
          <div className="flex flex-col text-md items-center content-center justify-center p-3 md:mr-7 mb-4 text-center md:text-left">
            <h1 className="font-bold text-4xl mb-5">Welcome to Console Logger</h1>
            <p>This is a computer science oriented blogging website built in React</p>

            <div className="flex w-full justify-center md:justify-start mt-7">
              {
                signedInId ? (
                  <div>
                    <Button className="mr-3" color="primary"><Link to="/posts">Feed</Link></Button>
                  </div>
                ) : (
                  <div>
                    <Button className="mr-3" color="primary"><Link to="/sign-up">Sign Up</Link></Button>
                    <Button color="primary"><Link to="/sign-in">Sign in</Link></Button>
                  </div>
                )
              }
            </div>
          </div>
          <div className="p-5 lg:w-1/2 md:w-2/3">
            <img src={sitePreview} alt="Site preview" />
          </div>
        </div>

        <div className="mt-16 md:mt-48">
          <ul className="text-6xl flex justify-center">
            <TechListItem><FontAwesomeIcon icon={faReact} /></TechListItem>
            <TechListItem><FontAwesomeIcon icon={faFontAwesome} /></TechListItem>
            <TechListItem><FontAwesomeIcon icon={faNode} /></TechListItem>
          </ul>
        </div>
      </div>

    </div>
  );
}
