import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Dashboard from './components/Dashboard';
import FeedbackForm from './components/feedback-form/FeddbackForm';
import FeedbackDetail from './components/FeedbackDetail';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<FeedbackForm />} />
        <Route path="/form/:id" element={<FeedbackDetail />} />
        <Route path="/edit/:formd" element={<FeedbackForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
