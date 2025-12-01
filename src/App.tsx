import { HomePage } from './pages/HomePage/HomePage'
import { Summary } from './pages/Summary/Summary'
import './App.css'
import { Route, Routes } from 'react-router'
import { useState } from 'react'

export interface Cat {
  id: string;
  tags: string[];
  created_at: string;
  url: string;
  mimetype: string
}

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);

  return (
    <Routes>
      <Route index element={<HomePage cats={cats} setCats={setCats} setLikedCats={setLikedCats} />} />
      <Route path='/summary' element={<Summary likedCats={likedCats}/>} />
    </Routes>
  )
}

export default App
