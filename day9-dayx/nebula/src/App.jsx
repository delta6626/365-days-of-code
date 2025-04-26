import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./features/core/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
