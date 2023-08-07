import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import View from '../pages/View';
import Login from '../pages/Login';

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
