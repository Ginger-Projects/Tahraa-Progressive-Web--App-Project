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
import PackageSummaryPage from './pages/Trainer/PackageSummaryPage'

import RegistrationBasicsMain from './pages/Dashboard/RegistrationBasicsMain'
import RegistrationEducationMain from './pages/Dashboard/RegistrationEducationMain'
import RegistrationWorkMain from './pages/Dashboard/RegistrationWorkMain'
import WelcomeMain from './pages/Dashboard/WelcomeMain'
import Chat from './pages/Chat/Chat'
import EditProfile from './pages/Trainer/EditProfile'
import EditTraineeProfilePicture from './pages/Trainer/EditTraineeProfilePicture'

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

        {/* Trainer */}
        <Route path="/trainee" element={<Trainer />} />
        <Route path="/traineeCalendar" element={<TrainerCalendar />} />
        <Route path='/edit-traineeProfile' element={<EditProfile/>} />
         <Route path='/edit-traineeProfilePicture' element={<EditTraineeProfilePicture />} />
         <Route path='/package-summary' element={<PackageSummaryPage/>} />

        {/* Chat */}
        <Route path="/chat" element={<Chat />} />
        {/* Registration */}
        <Route path="/registration" element={<RegistrationBasicsMain />} />
        <Route path="/regitraion-education" element={<RegistrationEducationMain />} />
        <Route path="/registration-work" element={<RegistrationWorkMain />} />
        <Route path="/welcome" element={<WelcomeMain />} />
      </Routes>
    </>
  )
}

export default App
