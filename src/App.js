import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/header';
import Home from './components/Home/home';
import Menu from './components/Header/Menu/menu';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import JoinQueue from './components/JoinQueue/joinqueue';
import Profile from './components/Profile/profile';
import Queue from './components/Queue/queue';
import About from './components/About/about';
import Options from './components/QueueOptions/options';
import { useEffect, useState } from 'react';


function App() {
  const links = [{ 
    name:'Home', path:'/' 
  }, {
    name:'Step in', path: '/options' 
  }, {
    name: 'Queue', path: '/queue'
  }, {
    name: 'About', path: '/about' 
  },{
    name: 'Login', path: '/login' 
  }, {
    name: 'Signup', path: '/signup' 
  }]

  const [menu, SetMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    SetMenu(false)
  }, [location])

  const componentWithMenu = component => {
    return menu ? <Menu links={links} /> : component;
  }

  return (
    <>
      <Header handleClick={SetMenu} menu={menu} name='Cutting Edge' 
        links={links} />

      <main>
          <Routes>
            <Route path="/" element={ componentWithMenu(<Home/>) } />
            <Route path='/options' element={ componentWithMenu(<Options />) } />
            <Route path="/profile/:id" element={ componentWithMenu(<Profile />) } />
            <Route path="/login" element={ componentWithMenu(<Login />) } />
            <Route path="/signup" element={ componentWithMenu(<Signup />) } />
            <Route path="/join-queue" element={  componentWithMenu(<JoinQueue />) } />
            <Route path="/queue" element={ componentWithMenu(<Queue />) } />
            <Route path="/about" element={ componentWithMenu(<About />) } />
            <Route path="/*" element={ <Home /> } />
          </Routes>
      </main>
    </>
  );
}

export default App;
