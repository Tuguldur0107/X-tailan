import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx'
import Company from './pages/company/Company.jsx';

function App() {
    return (
        <Router>
            <Suspense fallback={<div>...</div>} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/company" element={<Company />} />
            </Routes>
        </Router>
    );
}

export default App;