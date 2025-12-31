// import logo from './logo.svg';
import './App.css';
import About from './component/About';
import Alert from './component/Alert';
import NoteState from './component/context/notes/NoteState';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './component/SignUp';
import Login from './component/Login';
import { useState } from 'react';
function App() {

  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    });

    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
    <NoteState>
        <BrowserRouter>
        
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
        <Routes>
        <Route path="/" element={<Home  showAlert={showAlert}/>}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
        <Route exact path="/signup" element={<SignUp  showAlert={showAlert}/>}></Route>
      </Routes>
      </div>
      
    </BrowserRouter>
    </NoteState>
    
    </>
  );
}

export default App;
