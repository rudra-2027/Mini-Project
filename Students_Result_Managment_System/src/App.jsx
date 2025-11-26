import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentTable from './pages/StudentTable'
import SectionTable from './pages/SectionTable'
import ResultTable from './pages/ResultTable'
import Header from './components/Header'
import Tab from './components/Tab'

const App = () => {
  return (
    <div className="maincontainer">
      <Header />
      <Tab />

      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/sections" element={<SectionTable />} />
        <Route path="/results" element={<ResultTable />} />
      </Routes>
    </div>
  )
}

export default App;
