import React from "react";
import TodoItem from './TodoItem';
import "./App.css";

class App extends React.Component {
  state = {
    inputValue: '',
    todos: [],
  };

  handleButtonClick = (event) => {
    const newTodo = {
      content: this.state.inputValue,
      finished: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      inputValue: '',
    });
  };

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleDoneClick = (index) => {
    const newTodos = [];
    for (let i = 0; i < this.state.todos.length; i += 1) {
      if (i === index) {
        newTodos.push({
          ...this.state.todos[i],
          finished: true,
        });
      } else {
        newTodos.push(this.state.todos[i]);
      }
    }

    this.setState({
      todos: newTodos,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="container mt-5">
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-4'>
            <div className="todo-list">
              {this.state.todos.map((value, index) => {
                return (
                  <TodoItem
                    key={index}
                    index={index}
                    done={value.finished}
                    todoContent={value.content}
                    handleDoneClick={this.handleDoneClick}
                  />
                );
              })}
            </div>
            <div className="todo-input">
              <input
                className="form-control input"
                placeholder="Input your todo"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
              />
              <button onClick={this.handleButtonClick} className='btn btn-primary'>Add</button>
            </div>
          </div>
          <div className='col-4'></div>
        </div>
      </div>
    );
  }
}

export default App;
