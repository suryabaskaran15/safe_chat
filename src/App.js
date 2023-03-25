import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./style/style.css";
import Routing from "./router/Routing";
import { Example } from "./components/example";
class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
  }
}

export default App;
