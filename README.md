
# TODO List application
Application  aggreagates TODO items into one list, every element has an option to be DONE, REMOVED or EDITED
## Getting Started
### Prerequisites
You’ll need to have Node >= 6 on your local development machine.  [Here](https://nodejs.org/en/download/package-manager/) you can find information about installing Node.js via package manager
### Installation
The easiest and the fastest way to start your project with React is to use its boilerplate  [create-react-app](https://github.com/facebook/create-react-app) .

```
npm install -g create-react-app
create-react-app to-do-app
cd to-do-app/
npm start 
```
Now your application is running on [http://localhost:3000](http://localhost:3000) . It should take you to web automatically.

### Testing and deployment
Commands  ```npm test```   and ``` npm run build``` are responsible for running tests and building the app for production respectively.  Find more information about [running tests](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) and [deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) on create-react-app repository.

### Folder Structure

After creation to-do-app project, your directory path should look like this:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```
## Tutorial
### Step 1: Recognize Comoponent Hierarchy in Mockup
Above we can see application UI break up into components, that represent every piece of data model
![alt text](https://raw.githubusercontent.com/maxximizer/todolist/master/img/mytodolist.png)
We can distinct following pieces:
1.<b>App (violet)</b>: contains all data model
2.<b>todoHeader (pink)</b>: displays heading for application
3.<b> todoForm (green)</b> : includes user input for todo task
4.<b>todoList (red) </b>: wraps all items get from user input
5.<b>todoListItem (yellow)</b>:  displays row for each task
Hierarchy would present as follows:
<ul>
<li>App
<ul>
<li>todoHeader</li>
<li>todoForm</li>
<li>todoList</li>
<ul>
<li>todoListItem</li>
</ul>
</ul>
</li>
</ul>

### Essenstials

#### App.js
Esentially to get started,  you edit ```src/App.js``` with already imported react components
 ```import React, { Component } from 'react';```   and a declared React component class  ```App``` with ```render()``` method that returns a React element, here simple HTML syntax.
 #### index.js
In initial entry file ``` index.js ``` is defined ```ReactDOM.render()``` which insert a component ```App ```to an existing DOM node ```'root'``` in ```index.html``` :
```ReactDOM.render(<App />, document.getElementById('root'));```

### Step2: Build static version

As next step, let's build an app based on stateless components, there will be no interactivity for user
#### App.js
```import React, { Component } from 'react';
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
```
Remeber that every time we are importing  components used in class

#### TodoHeader.js
```
(...)
class TodoHeader extends Component {

  render() 
  {
    return(<h1>TODO List</h1>)
  }
}
export default TodoHeader;
```
#### TodoForm.js
```
class TodoForm extends Component {

  render() {     
    return (
      <form>
        <input type="text" placeholder="What to do" ref="createInput"/>
        <button>Add</button>
      </form>
    );
  }
}

export default TodoForm;
```

#### TodoList.js
```
(...)
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
```
#### TodoListItem.js
```
class TodoListItem extends Component {
   
    render() {
        return (
          <li>Go to shop <button>Edit</button> <button>Delete</button></li>
        )  
    }
}

export default TodoListItem;
```

### Step 3:  Identify The Minimal Representation Of UI State 

Our UI state is an object with two properties:

- <b>item</b> - string of todo task
- <b>isDone</b> - boolean value of task's status 

Later considering TodoListItem component   we will recognize there another state <b>isEditing</b>, but for current purpose let's omit it here

### Initial state of application and  displaying list on page.

<b> App.js </b>
```
import React, { Component } from 'react';
import TodoList from './todoList';
import TodoForm from './todoForm';
import TodoHeader from './todoHeader';

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

  render() {
    return (
      <div className="App">
        <TodoHeader/>       
        <TodoForm/>
        <TodoList 
        todos={this.state.todos}        
        />
      </div>
    );
  }
}

export default App;
```

-	To ```const``` todos variable we assigned an object with ```item``` and ```isDone``` properties that reflects structure of initial state .
- We add a class [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Constructor) that assigns the initial this.state
- We pass todos as a props to our list component from the App component.

<b>TodoList.js</b>
```
import React, { Component } from 'react';
import TodoListItem from './todoListItem'
import _ from 'lodash';

class TodoList extends Component {
  
    addListItems () {
        return _.map(this.props.todos,(todo,index)=><TodoListItem 
        key={index} item={todo.item} isDone={todo.isDone}/>)
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
```
In TodoList component we have to serve all passed props and map it into every TodoListItem. To do so, we are creating funtion ```addListItems()```  that map every todo into TodoListItem passing props: ```index``` (every ```li``` element  has to posses an unique key), ```todo.item``` and  ```todo.isDone```. For most of computation there was used a javascript library [Lodash](https://lodash.com/docs/4.17.5) which involver ready to use functions, it is imported in the beggining of component ```import _ from 'lodash';```

<b>TodoListItem.js </b>
```
import React, { Component } from 'react';

class TodoListItem extends Component {
   
    render() {
        return (
         <li key={this.props.index}>{this.props.item}
	         <button>Edit</button> <button>Delete</button>
         </li>
        )  
    }
}

export default TodoListItem;
```
In this component to every ```li``` element we are passing proper props : ```index``` and ```item```.
Now we are ready to see our initial todo task on the list on page

### Serve an user input

```import React, { Component } from 'react';

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
```
Next goal is to update our state with new upcomings from user input. To do it we need to assign to ```onSubmit``` event 	```handleAdd``` function which does these things:

-	The ```preventDefault()``` method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
-	setting ```const createInput```  to ```this.refs.createInput	``` thanks to that DOM  node input is accessable 
-	
