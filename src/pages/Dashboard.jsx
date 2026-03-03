// src/pages/Dashboard.jsx
import React from "react";
import TaskList from "../features/tasks/TaskList";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      <h1 className="dashboard-header">Smart Task Manager Dashboard</h1>
      <TaskList />
    </div>
  );
}

export default Dashboard;
