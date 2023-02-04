import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import JoinQueue from './components/JoinQueue';
import Queue from './components/Queue';
import About from './components/About';

function App() {
  return (
    <>
      <Navbar />

      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="login" element={ <Login /> } />
            <Route path="signup" element={ <Signup /> } />
            <Route path="join-queue" element={ <JoinQueue /> } />
            <Route path="queue" element={ <Queue /> } />
            <Route path="about" element={ <About /> } />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
