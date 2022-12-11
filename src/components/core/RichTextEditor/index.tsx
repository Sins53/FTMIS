import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

interface IProps {
  setFieldValue: (fieldName: string, value: string) => void;
  value: string;
  fieldName: string;
  placeholder?: string;
}

const RichTextEditor = (props: IProps) => {
  const { setFieldValue, value, fieldName, placeholder } = props;
  return (
    <ReactQuill
      value={value}
      placeholder={placeholder || ''}
      onChange={(e) => {
        setFieldValue(fieldName, e);
      }}
    />
  );
};

export default RichTextEditor;
