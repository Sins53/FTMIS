import { convertToRoman } from '@/utils/romanizeMap';
import { TextareaHTMLAttributes } from 'react';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isNepali?: boolean;
}

export default function Textarea(args: InputProps) {
  const { isNepali } = args;

  return (
    <textarea
      className="form-control"
      {...args}
      onChange={(e) => {
        if (isNepali) {
          e.target.value = convertToRoman(e.target.value);
        }
        args.onChange && args.onChange(e);
      }}></textarea>
  );
}
