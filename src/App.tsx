import {RouterProvider} from 'react-router'
import './App.css'
import {router} from './router'

function App() {

  return (
    <main id='app'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
