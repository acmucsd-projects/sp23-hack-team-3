import './App.css';
import Post from "./Post/Post"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { BrowserRouter as Router, Route, Routes, UNSAFE_DataRouterStateContext } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
