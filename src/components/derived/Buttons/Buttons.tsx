import React, { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
}

export default function Button(props: ButtonProps) {
  return <button {...props}></button>;
}

interface GhostButtonProps extends ButtonProps {
  title?: string;
  path?: string;
}

export const GhostButton = (props: GhostButtonProps) => {
  const navigate = useNavigate();
  const { title = 'Back', path, ...args } = props;

  return (
    <button {...args} onClick={() => (path ? navigate(path) : navigate(-1))}>
      <i className="ic-arrow-left"></i>
      {title}
    </button>
  );
};
