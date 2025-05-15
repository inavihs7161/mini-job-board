import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import AddJob from './components/AddJob';
import JobDetails from './JobDetails';
import Navbar from './components/Navbar';

function App() {
    return (
        <div className='w-full bg-stone-800'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/add-job" element={<AddJob />} />
                    <Route path="/job/:id" element={<JobDetails />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
