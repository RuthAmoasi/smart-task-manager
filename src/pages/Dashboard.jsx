// src/pages/Dashboard.jsx
import React from "react";
import TaskList from "../features/tasks/TaskList";

function Dashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Smart Task Manager Dashboard</h1>
      <TaskList />
    </div>
  );
}

export default Dashboard;