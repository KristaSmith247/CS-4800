import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Create from "./components/Create";

function App() {
  return (
    <div className="App">
      <Login />
      <Create />
    </div>
  );
}

export default App;
