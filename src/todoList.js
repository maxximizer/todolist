import React, { Component } from 'react';
import TodoListItem from './todoListItem'
import _ from 'lodash';

class TodoList extends Component {
  
    addListItems () {
        return _.map(this.props.todos,(todo,index)=><TodoListItem key={index} item={todo.item} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} saveTodo={this.props.saveTodo} isDone={todo.isDone}/>)
    }

  render() 
  {   
    return (
      <ul>
        {this.addListItems()}
      </ul>
    );
  }
}

export default TodoList;