import './app.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Guess from './Guess';
import Header from './Header';
import Home from './Home';
import Setup from './Setup';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/guess' element={<Guess />}></Route>
            <Route path='/setup' element={<Setup />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
