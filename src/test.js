import React, { Component } from 'react';
import TodoList from './todoList';
import TodoForm from './todoForm';
import TodoHeader from './todoHeader';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoHeader/>       
        <TodoForm />
        <TodoList/>
      </div>
    );
  }
}

export default App;




import React, { Component } from 'react';
import TodoListItem from './todoListItem'
import todoList from './todoList';

class TodoList extends Component {

  render() 
  {   
    return (
      <ul>
        <todoListItem/>
      </ul>
    );
  }
}

export default TodoList;