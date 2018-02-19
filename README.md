
# TODO List application
Application aggregates TODO items into one list, every element has an option to be DONE, REMOVED or EDITED
## Getting Started
### Prerequisites
You’ll need to have Node >= 6 on your local development machine. [Here](https://nodejs.org/en/download/package-manager/) you can find information about installing Node.js via package manager
### Installation
The easiest and the fastest way to start your project with React is to use its boilerplate [create-react-app](https://github.com/facebook/create-react-app) .

```
npm install -g create-react-app
create-react-app to-do-app
cd to-do-app/
npm start 
```
Now your application is running on [http://localhost:3000](http://localhost:3000) . It should take you to the web automatically.

### Testing and deployment
Commands ```npm test``` and ``` npm run build``` are responsible for running tests and building the app for production respectively. Find more information about [running tests](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) and [deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) on create-react-app repository.

### Folder Structure

After creation to-do-app project, your directory path should look like this:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│ └── favicon.ico
│ └── index.html
│ └── manifest.json
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
5.<b>todoListItem (yellow)</b>: displays row for each task
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
Esentially to get started, you edit ```src/App.js``` with already imported react components
```import React, { Component } from 'react';``` and a declared React component class ```App``` with ```render()``` method that returns a React element, here simple HTML syntax.
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
Remeber that every time we are importing components used in class

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

### Step 3: Identify The Minimal Representation Of UI State 

Our UI state is an object with two properties:

- <b>item</b> - string of todo task
- <b>isDone</b> - boolean value of task's status 

Later considering TodoListItem component we will recognize there another state <b>isEditing</b>, but for current purpose let's omit it here

### Initial state of the application and displaying list on the page.

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

-	To ```const``` todos variable we assigned an object with ```item``` and ```isDone``` properties that reflects the structure of an initial state .
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
In TodoList component we have to serve all passed props and map it into every TodoListItem. To do so, we are creating function ```addListItems()``` that map every todo into TodoListItem passing props: ```index``` (every ```li``` element has to posses an unique key), ```todo.item``` and ```todo.isDone```. For most of computation there was used a javascript library [Lodash](https://lodash.com/docs/4.17.5) which involver ready to use functions, it is imported in the beginning of component ```import _ from 'lodash';```

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
Here we will build a functionality for serving user input in form, so that our state.todos will be updated along to this.
<b> App.js </b>

```
addTodo(todo) {
this.state.todos.push({
item: todo,
isDone:false
})
this.setState({todos: this.state.todos}) 
}
```
In the component we are adding function ```addTodo(todo)``` that push new todo into array of current todos state. Thanks to the ```setState()``` call, React knows the state has changed, and calls the render() method again to learn what should be on the screen. 
``` 
<TodoForm addTodo={this.addTodo.bind(this)}/>
```

We don't forget about passing this function into ```TodoForm``` component, so it can be triggered by its level.

<b> TodoForm.js </b>

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
Next goal is to update our state with new upcoming from user input. To do it we need to assign to ```onSubmit``` event ```handleAdd``` function which does these things:

-	The ```preventDefault()``` method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
-	setting ```const createInput``` to ```this.refs.createInput	``` thanks to that DOM node input is accessible 
-	using ```addTodo()``` function to push every task to todos array after submit 
-	cleaning input field after a submit action is triggered, by resetting term to the initial empty string value

After such instructions, we can start adding new tasks to out TODO list.
### Step 4: Removing and updating status isDone of items
<b>App.js</b>

```
toggleTodo(todo) {
const foundTodo = _.find(this.state.todos, foundTodo => foundTodo.item === todo);
foundTodo.isDone = !foundTodo.isDone
this.setState({todos: this.state.todos})
}

deleteTodo(todoToDelete) {
_.remove(this.state.todos, todo => todo.item === todoToDelete);
this.setState({todos: this.state.todos})
}
......

<TodoList 
todos={this.state.todos}
toggleTodo={this.toggleTodo.bind(this)}
deleteTodo = {this.deleteTodo.bind(this)} 
/>
```
<b>TodoListItem.js</b>
```
import React, { Component } from 'react';

class TodoListItem extends Component {

renderIsDoneSection(){
const todoStyle={
'color': this.props.isDone ? 'green': 'red',
'textDecoration': this.props.isDone ? 'line-through':'none',
'cursor':'pointer',
'display':'inline-block'
}

return(
<p style={todoStyle} 
onClick={this.props.toggleTodo.bind(this,this.props.item)}>{this.props.item}</p> 
)
}

render() {
return (
<li key={this.props.index}>{this.renderIsDoneSection()} 
<button>Edit</button>
<button 
onClick = {this.props.deleteTodo.bind(this, this.props.item)}>Delete</button>
</li>
) 
}
}

export default TodoListItem;
```

### Removing an item
To delete an item from our array of states we are using a function ```deleteTodo(todoToDelete)``` which with underscore method ```_.remove``` which iterates through our todos and finds the one that we target and later updates state.todos, which automatically calls method ```render()```.

Function ```deleteTodo(todoToDelete)``` is passed by props to ```onClick``` event in ```TodoListItem```. 
Note: every props coming from ```App``` to ```TodoListItem``` has to go through ```TodoList```

### Updating item's status isDone
In 