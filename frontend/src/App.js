import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';

function App() {
  return (
    <>
      <Router>
        <div className='app'>
          <Header />.
          <div className='main-container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/room' element={<Room />} />
              <Route path='/join' element={<JoinRoom />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
