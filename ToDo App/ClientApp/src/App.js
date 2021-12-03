import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { TodoApp } from './components/ToDoApp';

import './custom.css'

export default class App extends Component {
  static displayName = "To Do List";

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/todos' component={TodoApp} />
      </Layout>
    );
  }
}
