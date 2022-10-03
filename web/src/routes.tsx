import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import Login from './pages/Login'
import { NotFound } from './pages/NotFound'



export const RoutesList = () => {
  return (
   <Router>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="*" element={<NotFound/>}/>
      </Routes>
   </Router>

   )
}
