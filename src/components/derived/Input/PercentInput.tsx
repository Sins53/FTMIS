import Input, { InputProps } from '@/components/core/FormElement/Input';
import React from 'react';

export default function PercentInput(props: InputProps) {
  return <Input {...props} rightIcon={<h6 className="mr-2">%</h6>} type="number"></Input>;
}
