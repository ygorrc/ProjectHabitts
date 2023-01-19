import { useState } from 'react'
import { Habits } from './components/Habits'

import'./styles/global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Habits completed={8}/>
      <Habits completed={3}/>
      <Habits completed={2}/>
      <Habits completed={10}/>
    </div>
  )
}

export default App
