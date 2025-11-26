import React from 'react'
import '../style/tab.css'
import { useNavigate, useLocation } from 'react-router-dom'

const Tab = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "students", path: "/" },
    { name: "sections", path: "/sections" },
    { name: "results", path: "/results" },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`tab ${location.pathname === tab.path ? "active" : ""}`}
          onClick={() => navigate(tab.path)}
        >
          {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default Tab;
