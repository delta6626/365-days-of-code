import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./features/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
