import tw from 'tailwind-styled-components';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';
import NavItem, { NavItemProps } from './NavItem';

const ExpandMenuButton = tw.div`
  sm:hidden
  inline-flex
  items-center
  justify-center
  m-2 
  rounded-md
  text-gray-400
  hover:text-white
  hover:bg-gray-700
  focus:outline-none
  focus:ring-2
  focus:ring-inset
  focus:ring-white
`;

type NavBarProps = {
  siteName: string,
  navItems: NavItemProps[],
}

const NavBar = ({ siteName, navItems }: NavBarProps) => (
  <nav className="bg-gray-900 px-2 sm:px-6 lg:px-8">
    <div className="relative max-w-7xl ml-auto mr-auto flex items-center justify-between h-16">
      <ExpandMenuButton aria-controls="mobile-menu" aria-expanded="false">
        <Hamburger direction="right" size={20} />
      </ExpandMenuButton>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex-shrink-0 flex items-center">
          <h1 className="text-white font-bold text-lg">
            <Link to="/">{ siteName }</Link>
          </h1>
        </div>
        <div className="hidden sm:block sm:ml-auto">
          <ul className="flex space-x-4">
            { navItems.map((navItem: NavItemProps) => (
              <NavItem
                key={navItem.linkDesc}
                to={navItem.to}
                linkDesc={navItem.linkDesc}
                onClick={navItem.onClick ? navItem.onClick : () => {}}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </nav>

);

export default NavBar;
