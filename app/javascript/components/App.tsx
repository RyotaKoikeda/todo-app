import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { AddTodo, EditTodo, TodoList } from "./Todos";
import "../styles/base.scss";
import "../styles/mixin.scss";
import "../styles/reset.scss";

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="form-wrap">
          <Switch>
            <Route exact path="/" component={TodoList} />
            <Route exact path="/new" component={AddTodo} />
            <Route path="/:id/edit" component={EditTodo} />
          </Switch>
        </div>
      </main>
    </>
  );
};

export default App;
