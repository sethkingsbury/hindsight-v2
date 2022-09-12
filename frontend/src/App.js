import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';
import Question from './pages/Question';
import Whiteboard from './pages/Whiteboard';
import ActionItems from './pages/ActionItems';
import Summary from './pages/Summary';

function App() {
	return (
		<>
			<Router>
				<div className='app'>
					<Header />
					<div className='main-container'>
						<ToastContainer />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/create' element={<CreateRoom />} />
							<Route path='/join' element={<JoinRoom />} />
							<Route path='/room' element={<Room />} />
							<Route path='/question' element={<Question />} />
							<Route path='/whiteboard' element={<Whiteboard />} />
							<Route path='/actionitems' element={<ActionItems />} />
							<Route path='/summary' element={<Summary />} />
						</Routes>
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
