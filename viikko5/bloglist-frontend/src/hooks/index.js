import { useState } from 'react';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  const emptyValue = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    emptyValue,
  };
};

export default useField;
