import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import Login from './pages/login'
import Register from './pages/register'
import Topbar from './components/shared/Topbar'
import { axiosInstance } from './utils/apiClient'
import { useCookies } from 'react-cookie'
import RestrictedPage from './components/shared/RestrictedPage'

function App() {
  const [cookies] = useCookies();

  axiosInstance.interceptors.request.use((config) => {
    if (cookies.token) {
        config.headers.Authorization = `Bearer ${cookies.token}`;
    }
    return config;
  });

  return (
    <BrowserRouter>
      <div className='w-screen h-screen'>
      <Topbar />
      <Routes>
        <Route path="/homepage" element={
          <RestrictedPage>
            <Homepage />
          </RestrictedPage>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
