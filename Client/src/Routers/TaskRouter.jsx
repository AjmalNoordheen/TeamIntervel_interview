import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Detailpage from '../Components/Detailpage'
import ListTasks from '../Components/ListTasks'

function TaskRouter() {
  return (
    <>
    <Routes>
        <Route path='/' element={<ListTasks/>}/>
        <Route path='/detailpage' element={<Detailpage/>}/>
    </Routes>
    </>
  )
}

export default TaskRouter