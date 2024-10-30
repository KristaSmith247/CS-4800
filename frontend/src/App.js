import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Create from "./components/Create";
import Study from "./components/Study";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/account/:id" element={<Study />} />
      </Routes>
    </div>
  );
}

export default App;
