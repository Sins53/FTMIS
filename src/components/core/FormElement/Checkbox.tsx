import React from 'react';

import { InputHTMLAttributes } from 'react';

import styled from 'styled-components';
import Box from '../Box';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  checked?: boolean;
}

const StyledCheckbox = styled(Box)`
  input {
    height: 1.5rem;

    width: 1.5rem;

    border: 1px solid ${(props) => props.theme.color.border};

    border-radius: 0.25rem;

    margin-top: 0;
  }
`;

export default function CheckBox({ label, checked = false, name, ...args }: CheckboxProps) {
  return (
    <StyledCheckbox>
      <input {...args} className="form-check-input" type="checkbox" id={name} checked={checked} />

      {label && (
        <label className="form-check-label ml-2" htmlFor={name}>
          {label}
        </label>
      )}
    </StyledCheckbox>
  );
}
