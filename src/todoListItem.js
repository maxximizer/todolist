import React, { Component } from 'react';

class TodoListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        }
    }

    renderActionSection(){
        if(this.state.isEditing){
            return(
            <span className="buttons">
            <button onClick = {this.onSaveClick.bind(this)}>Save</button>
            <button onClick = {this.onCancelClick.bind(this)}>Cancel</button>
            </span>
        );
        }
        return(
            <span  className="buttons">
            <button onClick = {this.onEditClick.bind(this)}>Edit</button>
            <button onClick = {this.props.deleteTodo.bind(this, this.props.item)}>Delete</button>
            </span>
        );
    }

    renderIsDoneSection(){
        const todoStyle={
            'color': this.props.isDone ? 'green': 'red',
            'textDecoration': this.props.isDone ? 'line-through':'none',
            'cursor':'pointer',
            'display':'inline-block'
        }

        if(this.state.isEditing){
            return(
                <span>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                    <input type="text" defaultValue={this.props.item} ref="editInput" />
                    </form>
                </span>
            )
        }
        
        return(<p style={todoStyle} onClick={this.props.toggleTodo.bind(this,this.props.item)}>{this.props.item}</p> )
    }

    onEditClick(){
        this.setState({isEditing:true})
    }

    onCancelClick(){
        this.setState({isEditing:false})
    }

    onSaveClick(event){
        event.preventDefault();
        const oldTodo = this.props.item;
        const newTodo = this.refs.editInput.value;
        this.props.saveTodo(oldTodo, newTodo);
        this.setState({isEditing:false})
    }



    render() {
        return (
          <li key={this.props.index}>{this.renderIsDoneSection()} {this.renderActionSection()}</li>
        )  
    }
}

export default TodoListItem;
