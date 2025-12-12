import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import TermsOfUse from './pages/Legal/TermsOfUse'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import CodeOfConduct from './pages/Legal/CodeOfConduct'
import ExpertsPage from './pages/Dashboard/ExpertsPage'
import PackagesPage from './pages/Dashboard/PackagesPage'
import ExpertsProfileMain from './pages/Dashboard/ExpertProfileMain'
import ExpertsBookingMain from './pages/Dashboard/ExpertBookingMain'
import BookingConfirmMain from './pages/Dashboard/BookingConfirmMain'
import HowItWorksLearnersMain from './pages/Dashboard/HowItWorksLearnersMain'
import HowItWorksExpertsMain from './pages/Dashboard/HowItWorksExpertsMain'
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
import WhatsappFloat from './components/WhatsappFloat'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import ChangePassword from './pages/ChangePassword'

function App() {
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  const hideWhatsapp =
    pathname.startsWith('/trainee') ||
    pathname.startsWith('/chat') ||
    pathname.startsWith('/edit-traineeProfile') ||
    pathname.startsWith('/edit-traineeProfilePicture') ||
    pathname.startsWith('/package-summary') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/registration') ||
    pathname.startsWith('/regitraion-education') ||
    pathname.startsWith('/registration-work') ||
    pathname.startsWith('/welcome')

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
  path="/signup"
  element={
    
      <SignupPage />
   
  }
/>

        <Route
  path="/login"
  element={
    
      <LoginPage />
   
  }
/>

        <Route
  path="/forgot-password"
  element={
    <PublicRoute>
      <ForgotPassword/>
    </PublicRoute>
  }
/>
<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword/>
    </ProtectedRoute>
  }
/>

        <Route path="/our-experts" element={
          <ProtectedRoute>
          <ExpertsPage />
          </ProtectedRoute>
          } />
        
        <Route path="/our-packages" element={
          <ProtectedRoute>
          <PackagesPage />
          </ProtectedRoute>
          } />
        <Route path="/expert-profile" element={
          
          <ExpertsProfileMain />
          
            } />

        <Route path="/expert-booking" element=
        {
          <ProtectedRoute>
        <ExpertsBookingMain />
        </ProtectedRoute>
      }
         />
        <Route path="/confirm-booking" element={
          <ProtectedRoute>
          <BookingConfirmMain />
          </ProtectedRoute>
          } />
        <Route path="/how-it-works-learners" element={<HowItWorksLearnersMain />} />
        <Route path="/how-it-works-experts" element={<HowItWorksExpertsMain />} />
        <Route path="/reach-us" element={<ReachusMain />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/code-of-conduct" element={<CodeOfConduct />} />

        {/* Trainer */}
        <Route
        path="/trainee"
        element={
          <ProtectedRoute>
            <Trainer />
          </ProtectedRoute>
        }
      />
        <Route path="/traineeCalendar" element={
          <ProtectedRoute>
          <TrainerCalendar />
          </ProtectedRoute>
          } />

        <Route path='/edit-traineeProfile' 
       
        element={
          <ProtectedRoute>
        <EditProfile/>
        </ProtectedRoute>
        } />
        
         <Route path='/edit-traineeProfilePicture' element={
          <ProtectedRoute>
          <EditTraineeProfilePicture />
          </ProtectedRoute>
          } />
         <Route
          path='/package-summary' element={
            <ProtectedRoute>
          <PackageSummaryPage/>
          </ProtectedRoute>
          } />

        {/* Chat */}
        <Route path="/chat" element={
          <ProtectedRoute>
          <Chat />
          </ProtectedRoute>
          } />
        <Route path="/chat/:conversationId" element={
          <ProtectedRoute>
          <Chat />
          </ProtectedRoute>
          } />
        {/* Registration */}
        <Route path="/registration" element={<RegistrationBasicsMain />} />
        <Route path="/registraion-education" element={<RegistrationEducationMain />} />
        <Route path="/registration-work" element={<RegistrationWorkMain />} />
        <Route path="/welcome" element={<WelcomeMain />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideWhatsapp && <WhatsappFloat />}
      <ToastContainer />
    </>
  )
}

export default App
