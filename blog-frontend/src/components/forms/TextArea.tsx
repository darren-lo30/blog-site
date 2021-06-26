import React from 'react';
import tw from 'tailwind-styled-components';

const StyledTextArea = tw.textarea`
  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
`;

const StyledLabel = tw.label`
  block text-sm font-bold text-md mb-2
`;

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string,
}

const TextArea = ({
  label = '',
  ...props
}: TextAreaProps) => (
  <div className="py-2">
    {label ? (
      <StyledLabel>
        {label}
      </StyledLabel>
    ) : null}
    <StyledTextArea
      {...props}
    />
  </div>
);

export default TextArea;
