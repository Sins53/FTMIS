import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import Box from '../Box';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inline?: boolean;
}

export const RadioContainer = styled(Box)`
  display: flex;
`;

export default function Radio(props: RadioProps) {
  const { name, label, inline = true, ...args } = props;
  return (
    <div className={'form-check' + inline && 'ml-2'}>
      <input className="form-check-input" {...args} type="radio" name={name} />
      <label className="form-check-label ml-1" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
