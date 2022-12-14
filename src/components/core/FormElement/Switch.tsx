import React from 'react';
import { InputHTMLAttributes } from 'react';
interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
}
export default function Switch({ label, checked = false, name, ...args }: SwitchProps) {
  return (
    <div className="form-check form-switch">
      <input {...args} className="form-check-input" type="checkbox" id={name} checked={checked} />
      <label
        className={`${checked ? 'form-check-label text-primary' : 'form-check-label text-danger'}`}
        htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
