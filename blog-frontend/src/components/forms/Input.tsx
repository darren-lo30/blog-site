import React from 'react';
import tw from 'tailwind-styled-components';

const StyledInput = tw.input`
  shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline
`;

const StyledLabel = tw.label`
  block text-sm font-bold text-md mb-2
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string,
}

const Input = ({
  label = '',
  ...props
}: InputProps) => (
  <div className="py-2">
    { label ? (
      <StyledLabel>
        {label}
      </StyledLabel>
    ) : null }
    <StyledInput
      {... props}
    />
  </div>
);

export default Input;
