import './App.css';
import Signup from "./Signup/Signup"
import Login from "./Login/Login"
import Home from "./Home/Home"
import UserProfile from "./UserProfile/UserProfile"
import Post from "./Post/Post"
import { BrowserRouter as Router, Route, Routes, UNSAFE_DataRouterStateContext } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/home" element={<Home />} /> */}
          {/* <Route exact path="/userprofile" element={<UserProfile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
