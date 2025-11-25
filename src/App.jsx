import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import ExpertsPage from './pages/Dashboard/ExpertsPage'
import ExpertsProfileMain from './pages/Dashboard/ExpertProfileMain'
import ExpertsBookingMain from './pages/Dashboard/ExpertBookingMain'
import BookingConfirmMain from './pages/Dashboard/BookingConfirmMain'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/our-experts" element={<ExpertsPage />} />
      <Route path="/expert-profile" element={<ExpertsProfileMain />} />
      <Route path="/expert-booking" element={<ExpertsBookingMain />} />
      <Route path="/confirm-booking" element={<BookingConfirmMain />} />
    </Routes>
    </>
  )
}

export default App
