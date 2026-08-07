import { useState, useEffect } from 'react';
import TasksLists from './TasksLists';

function TaskInput() {
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggleComplete(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="card">
      <div className="flex-row">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task"
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <p>
        {completedTasks} of {totalTasks} tasks completed ({percentage}%)
      </p>
      <div
        style={{
          width: "100%",
          backgroundColor: "#333",
          height: "20px",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: "#4caf50",
            height: "100%",
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>

      <div className="flex-row">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <TasksLists
        tasks={visibleTasks}
        onToggle={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default TaskInput;