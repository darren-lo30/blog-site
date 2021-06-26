import React from 'react';

import tw from 'tailwind-styled-components';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: 'primary' | 'secondary',
}

const StyledButton = tw.button`
  px-4
  py-1.5
  text-white
  ${(p) => (
    (p.color === 'primary' && 'bg-green-400 hover:bg-green-600')
    || (p.color === 'secondary' && 'bg-blue-300 hover:bg-blue-500')
    || ''
  )}
  ${(p) => (p.className)}
  rounded-sm
`;

export default function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      {...props}
    >
      { children }
    </StyledButton>
  );
}
