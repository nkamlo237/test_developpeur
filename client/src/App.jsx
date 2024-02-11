import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
