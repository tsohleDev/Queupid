import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Home from './components/Home/home';
import Menu from './components/Header/Menu/menu';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import JoinQueue from './components/JoinQueue/joinqueue';
import Profile from './components/Profile/profile';
import Queue from './components/Queue/queue';
import About from './components/About/about';

function App() {
  const links = [{ 
    name:'Home', path:'/' 
  }, {
    name:'Get Cut', path: '/join-queue' 
  }, {
    name: 'Queue', path: '/queue'
  }, {
    name: 'About', path: '/about' 
  },{
    name: 'Login', path: '/login' 
  }, {
    name: 'Signup', path: '/signup' 
  }]
  return (
    <>
      <Header name='Cutting Edge' 
        links={links} />

      <main>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/menu" element={ <Menu links={links} /> } />
            <Route path="/profile/:id" element={ <Profile /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
            <Route path="/join-queue" element={ <JoinQueue /> } />
            <Route path="/queue" element={ <Queue /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/*" element={<h1>Not Found</h1>} />
          </Routes>
      </main>
    </>
  );
}

export default App;
