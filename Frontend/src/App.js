import Login from "./components/login/Login";
import Register from "./components/register/Register";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      </Routes>  
      </Router>
    </div>
  );
}

export default App;
