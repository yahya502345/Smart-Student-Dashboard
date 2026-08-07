function Header(props) {
  return (
    <div>
      <h1>Smart Student Productivity Dashboard</h1>
      <p>Stay organized. Stay focused. Get things done.</p>
       <p>Welcome back, {props.studentName}!</p>
    </div>
  );
}

export default Header;