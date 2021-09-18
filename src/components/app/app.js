import React from 'react';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {

    maxId = 100;

    state = {
      todoData: [
        this.createTodoItem('Learn React'),
        this.createTodoItem('Learn Ensglish'),
        this.createTodoItem('Don\'t give up'),
      ],
      term: '',
      filter: 'all',
    };
    
    createTodoItem(label) {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    }


    deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newArray = [
         ...todoData.slice(0, idx),
         ...todoData.slice(idx + 1)
        ];

        return {
          todoData: newArray
        };
      });
    };

    addItem = (text) => {
      const newItem = this.createTodoItem(text);

      this.setState(({ todoData }) => {
        const newArray = [
          ...todoData,
          newItem
        ];

        return {
          todoData: newArray
        };
      });
    };

    toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);

      // 1. update onject, copy arry
      const oldItem = arr[idx];
      const newItem = {...oldItem, 
        [propName]: !oldItem.[propName],
      };

      // 2. construct new array
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
       ];
    };

    onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        };
      });
    };
    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        };
      });
    };

    onSearchChange = (term) => {
      this.setState({ term });
    };

    onFilterChange = (filter) => {
      this.setState({ filter });
    };

    search(items, term) {
      if (term.length === 0) {
        return items;
      }

      return items.filter((item) => {
        return item.label
              .toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    }

    filter (items, filter) {
      switch (filter) {
        case 'all':
          return items;
        case 'active':
          return items.filter((item) => !item.done);
        case 'done':
          return items.filter((item) => item.done);
        default:
          return items;
      }
    }

    render() {

      const { todoData, term, filter } = this.state;

      const visibleItems = this.filter(
        this.search(todoData, term), filter);

      const doneCount = todoData
                        .filter((el) => el.done).length;
      const todoCount = todoData.length - doneCount;

      return (
        <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel 
            onSearchChange={this.onSearchChange}
            />
            <ItemStatusFilter 
              filter={filter}
              onFilterChange={this.onFilterChange}
              />
          </div>
          
          <TodoList 
          todos={visibleItems}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          />
          <ItemAddForm onItemAdded={this.addItem} />
        </div>
      );
    }
};