import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Create from "./components/Create";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
