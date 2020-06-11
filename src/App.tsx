import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Article from "./components/Article";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Store from "./redux/store";
import "./style/App.scss";

export interface IArticle {
  title: string;
  abstract: string;
  byline: string;
  tags: Array<string>;
  image: string;
}
const App = () => {
  return (
    <Provider store={Store}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/article" component={Article} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
