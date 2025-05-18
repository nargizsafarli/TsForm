import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import PrivateRoute from './Components/Private/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
function App() {
  return (
   <div>
     <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='dashboard' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }/>
    </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App