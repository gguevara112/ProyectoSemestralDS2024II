import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define la ruta para el componente Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
