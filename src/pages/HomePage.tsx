import { useState } from 'react'

export function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple example of React Router with TDD</p>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      </div>
    </div>
  )
} 