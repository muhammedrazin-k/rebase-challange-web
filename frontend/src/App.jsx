import { useState, useEffect } from 'react';
import SERVER_URL from './server/serverUrl';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = async () => {
    // INTENTIONAL ERROR: Incorrect body property name
    const response = await fetch(`${SERVER_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTodo }) 
    });

    
    console.log(response)
    
    
    // INTENTIONAL ERROR: Not updating state correctly or ignoring response
    const data = await response.json();
    setTodos([...todos, data]);
    setNewTodo('');
  };

  return (
    <div style={{ padding: '40px', background: '#0a0a0a', color: 'white', minHeight: '100vh' }}>
      <h1>Rebase Todo Challenge</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="New Task"
          style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: 'white' }}
        />
        <button onClick={addTodo} style={{ padding: '10px 20px', background: '#ec4899', color: 'white', border: 'none', marginLeft: '10px' }}>
          Add Task
        </button>
      </div>
      <ul>
        {todos.length > 0 ? todos.map(todo => (
          <li key={todo._id}>{todo.title}</li>
        )) : <li>No todos yet</li>}
      </ul>
    </div>
  );
}

export default App;