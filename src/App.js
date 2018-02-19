import React, { Component } from 'react';
import TodoList from './todoList';
import TodoForm from './todoForm';
import TodoHeader from './todoHeader';
import _ from 'lodash';

const todos = [
  {
    item: 'pack yourself',
    isDone: true
  },
  {
    item: 'exchange money',
    isDone: false
  }
]

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      todos
    }
  }

  addTodo(todo) {
    this.state.todos.push({
      item: todo,
      isDone:false
    })
    this.setState({todos: this.state.todos})  
  }

  toggleTodo(todo) {
    const foundTodo = _.find(this.state.todos, foundTodo => foundTodo.item === todo);
    foundTodo.isDone = !foundTodo.isDone
    this.setState({todos: this.state.todos})
  }

  saveTodo(oldTodo,newTodo) {    
    const foundTodo = _.find(this.state.todos, foundTodo => foundTodo.item === oldTodo);
    foundTodo.item=newTodo;
    this.setState({todos: this.state.todos});
  }

  deleteTodo(todoToDelete) {
    _.remove(this.state.todos, todo => todo.item === todoToDelete);
    this.setState({todos: this.state.todos})
  }

  render() {
    return (
      <div className="App">
        <TodoHeader/>       
        <TodoForm 
        addTodo={this.addTodo.bind(this)}
          />
        <TodoList 
        todos={this.state.todos}
        toggleTodo={this.toggleTodo.bind(this)}
        saveTodo={this.saveTodo.bind(this)}
        deleteTodo = {this.deleteTodo.bind(this)}        
        />
      </div>
    );
  }
}

export default App;
