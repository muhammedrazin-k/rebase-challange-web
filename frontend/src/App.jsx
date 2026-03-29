import { useState, useEffect } from 'react';
import SERVER_URL from './server/serverUrl';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${SERVER_URL}/api/todos`)
      .then(res => res.json())
      .then(data => {
        setTodos(data || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
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
        {isLoading ? (
          <li style={{ color: '#ec4899', fontWeight: 'bold', listStyle: 'none' }}>
            ✨ Loading your tasks...
          </li>
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo._id} style={{ marginBottom: '8px' }}>
              {todo.task || todo.title}
            </li>
          ))
        ) : (
          <li style={{ opacity: 0.5 }}>No todos yet</li>
        )}
      </ul>

      {/* Developer Notes Footer */}
      <footer style={{ 
        marginTop: '60px', 
        paddingTop: '20px', 
        borderTop: '1px solid #333', 
        color: '#666', 
        fontSize: '0.9rem',
        lineHeight: '1.6'
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '10px', color: '#888' }}>Developer Notes:</p>
        <ol style={{ paddingLeft: '20px' }}>
          <li>
            Please expect a short initial delay when fetching tasks. The backend is hosted on <strong>Render's free tier</strong>, 
            which may take a moment to "spin up" if the app hasn't been accessed for more than 20 minutes.
          </li>
          <li>
            The original UI design has been preserved as per your request, as there were no specific instructions regarding visual style changes.
          </li>
        </ol>
        <p style={{ marginTop: '20px', color: '#ec4899', fontWeight: 'bold' }}>Thank you!</p>
      </footer>
    </div>
  );
}

export default App;