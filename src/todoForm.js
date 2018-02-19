import React, { Component } from 'react';

class TodoForm extends Component {
    
handleAdd(event){
  event.preventDefault();
  const createInput = this.refs.createInput
  this.props.addTodo(createInput.value)
  createInput.value=''
}

  render() {     
    return (
      <form onSubmit={this.handleAdd.bind(this)}>
        <input type="text" placeholder="What to do" ref="createInput"/>
        <button>Add</button>
      </form>
    );
  }
}

export default TodoForm;
