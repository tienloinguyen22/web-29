import React from 'react';
import './TodoItem.css';

// {
//   todoContent
//   done
//   index
//   handleDoneClick: func
// }
// condtion ? true : false
const TodoItem = (props) => {
  const handleDoneClick = (event) => {
    props.handleDoneClick(props.index);
  };

  return (
    <div className='todo-item mt-2'>
      {props.done ? (<strike>{props.todoContent}</strike>) : (<span>{props.todoContent}</span>)}

      <div className='btn-container'>
        <button onClick={handleDoneClick} className='btn btn-primary'>Done</button>
        <button className='btn btn-danger'>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;