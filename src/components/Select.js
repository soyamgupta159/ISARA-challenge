import { useState } from 'react';
const Input = ({ handleMain, shift, day, reset }) => {
  const [val, setVal] = useState('X');
  let className = 'pad';
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleMain(val, shift, day);
  };

  const resetState = () => {
    setVal('X');
  };
  const handleOnChange = (event) => {
    let value = event.target.value;
    setVal(value);
    handleMain(value, shift, day, resetState);
  };

  if (val !== 'X') {
    className = '';
    reset && setVal('X');
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <select className={className} onChange={handleOnChange} value={val}>
          <option value='X'>X</option>
          <option value='X1'>X1</option>
          <option value='X2'>X2</option>
          <option value='X3'>X3</option>
          <option value='X4'>X4</option>
          <option value='X5'>X5</option>
          <option value='X6'>X6</option>
          <option value='X7'>X7</option>
        </select>
      </form>
    </div>
  );
};

export default Input;
