import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import ExpertsPage from './pages/Dashboard/ExpertsPage'
import PackagesPage from './pages/Dashboard/PackagesPage'
import ExpertsProfileMain from './pages/Dashboard/ExpertProfileMain'
import ExpertsBookingMain from './pages/Dashboard/ExpertBookingMain'
import BookingConfirmMain from './pages/Dashboard/BookingConfirmMain'
import HowItWorksMain from './pages/Dashboard/HowItWorksMain'
import ReachusMain from './pages/Dashboard/ReachusMain'
import Trainer from './pages/Trainer/Trainer'
import TrainerCalendar from './pages/Trainer/TrainerCalendar'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/our-experts" element={<ExpertsPage />} />
      <Route path="/our-packages" element={<PackagesPage />} />
      <Route path="/expert-profile" element={<ExpertsProfileMain />} />
      <Route path="/expert-booking" element={<ExpertsBookingMain />} />
      <Route path="/confirm-booking" element={<BookingConfirmMain />} />
      <Route path="/how-it-works-dashboard" element={<HowItWorksMain />} />
      <Route path="/reach-us" element={<ReachusMain />} />
      <Route path='/trainee' element={<Trainer/>} />
      <Route path='/traineeCalendar' element= {<TrainerCalendar/>}/>
     </Routes>
    </>
  )
}

export default App
