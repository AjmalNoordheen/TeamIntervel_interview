import { Route, Routes } from 'react-router-dom'
import './App.css'
import {Toaster} from 'react-hot-toast'
import TaskRouter from './Routers/TaskRouter'

function App() {
  return (   
   <>
   <Routes>
     <Route path='/*' element={<TaskRouter/>}/>
   </Routes>
   <Toaster/>
   </>
  )
}

export default App
