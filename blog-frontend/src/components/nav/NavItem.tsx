import tw from 'tailwind-styled-components';
import { Link, useLocation } from 'react-router-dom';
import { MouseEventHandler } from 'react';

type NavLinkProps = {
  to: string,
  onClick?: MouseEventHandler<any>,
}

const NavLink = tw.span<NavLinkProps>`
  bg-gray-900
  text-white
  px-3
  py-2
  rounded-md
  text-sm
  font-medium
  ${(p) => (useLocation().pathname === p.to ? 'bg-green-300' : 'bg-transparent hover:bg-gray-700 hover:text-white')}
`;

export type NavItemProps = NavLinkProps & {
  linkDesc: string,
}

const NavItem = ({ to, linkDesc, onClick = () => {} }: NavItemProps) => (
  <Link to={to} onClick={(onClick)}>
    <NavLink to={to}>{linkDesc}</NavLink>
  </Link>
);

export default NavItem;
