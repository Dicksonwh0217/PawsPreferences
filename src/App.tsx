import { HomePage } from './components/HomePage'
import './App.css'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  )
}

export default App
