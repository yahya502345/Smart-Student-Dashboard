import Header from './components/Header';
import TaskInput from './components/TaskInput';
import PomodoroTimer from './components/PomodoroTimer';
function App() {
  return (
    <div className="app-container">
      <Header studentName="Yahya" />
      <TaskInput />
      <PomodoroTimer/>
    </div>
  );
}

export default App;