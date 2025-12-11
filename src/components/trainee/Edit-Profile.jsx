import React, { useState, useEffect } from "react"
import { Eye, EyeOff, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../Loader/Loader"
import './Edit-Profile.css'
import { getTraineeProfile, updateTraineePersonalInfo } from "../../services/trainee/trainee"
import { setTrainee } from "../../features/slice/trainer/traineeSlice"
const LOCATIONS = ["Lusail, Qatar", "Doha, Qatar", "Al Wakrah, Qatar", "Al Khor, Qatar", "Umm Salal, Qatar"]
const GENDERS = ["Female", "Male", "Other"]

export default function EditProfileForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const traineeState = useSelector((state) => state.trainee)
  const [showPassword, setShowPassword] = useState(false)
  const [profileHeader, setProfileHeader] = useState({
    fullName: "",
    email: "",
    avatar: "",
  })
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+974",
    dateOfBirth: "",
    gender: "",
    password: "",
    location: "",
    avatar: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "phone") {
      const digitsOnly = value.replace(/[^0-9]/g, "")

      let rest = digitsOnly
      if (rest.startsWith("974")) {
        rest = rest.slice(3)
      }

      const finalValue = `+974${rest}`

      setFormData((prev) => ({
        ...prev,
        phone: finalValue,
      }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    const missingFields = []

    if (!formData.fullName.trim()) missingFields.push("Full name")
    if (!formData.dateOfBirth) missingFields.push("Date of birth")
    if (!formData.location) missingFields.push("Location")

    if (missingFields.length > 0) {
      toast.error(`${missingFields[0]} is required`)
      return
    }

    const rawPhone = formData.phone.trim()
    let countryCode
    let phoneNumber

    if (rawPhone) {
      if (!rawPhone.startsWith("+974")) {
        toast.error("Phone number must start with +974")
        return
      }

      const digits = rawPhone.replace(/\s+/g, "")
      const rest = digits.slice(4)

      if (!rest || !/^\d+$/.test(rest)) {
        toast.error("Please enter a valid mobile number after +974")
        return
      }

      countryCode = "974"
      phoneNumber = rest
    }

    try {
      const response = await updateTraineePersonalInfo({
        name: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        location: formData.location,
        countryCode,
        phoneNumber,
      })
      const message = response?.message || "Profile updated successfully"
      toast.success(message)

      const updatedName = formData.fullName
      if (traineeState?.user || traineeState?.token) {
        dispatch(
          setTrainee({
            user: {
              ...(traineeState.user || {}),
              name: updatedName,
            },
            token: traineeState.token,
            rememberMe: traineeState.rememberMe,
          })
        )
      }

      setProfileHeader((prev) => ({
        ...prev,
        fullName: formData.fullName,
      }))
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile. Please try again."
      toast.error(message)
      console.error("Failed to update trainee personal info", error)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await getTraineeProfile()
        const trainee = response?.data?.Trainee
        if (!trainee) {
          setLoading(false)
          return
        }

        setFormData((prev) => {
          const next = { ...prev }

          if (trainee.name) next.fullName = trainee.name
          if (trainee.email) next.email = trainee.email
          if (trainee.profileImage) next.avatar = trainee.profileImage

          if (trainee.countryCode && trainee.phoneNumber) {
            next.phone = `+${String(trainee.countryCode)}${String(trainee.phoneNumber)}`
          } else if (trainee.phone) {
            next.phone = trainee.phone
          }

          if (trainee.dateOfBirth) {
            let dob = trainee.dateOfBirth
            if (typeof dob === "string" && dob.includes("T")) {
              dob = dob.split("T")[0]
            }
            next.dateOfBirth = dob
          }

          if (trainee.gender) next.gender = trainee.gender
          if (trainee.location) next.location = trainee.location
          console.log("next",next);
          
          return next
        })

        setProfileHeader((prev) => {
          const next = { ...prev }

          if (trainee.name) next.fullName = trainee.name
          if (trainee.email) next.email = trainee.email
          if (trainee.profileImage) next.avatar = trainee.profileImage

          return next
        })
        setLoading(false)
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load profile. Please try again."
        toast.error(message)
        console.error("Failed to load trainee profile", error)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="edit-profile-container">
    <div className="edit-profile-wrapper" style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 10,
          }}
        >
          <Loader />
        </div>
      )}
      {/* Header */}
      <div className="edit-profile-header">
        <div className="profile-info">
          <button
            type="button"
            className="avatar-wrapper"
            onClick={() => navigate('/edit-traineeProfilePicture')}
          >
            <img
              src={profileHeader.avatar || formData.avatar}
              alt="Avatar"
              className="avatar-img"
            />
          </button>
          <div>
            <h2 className="profile-name">{profileHeader.fullName}</h2>
            <p className="profile-email">{profileHeader.email}</p>
          </div>
        </div>

        <div className="button-row">
  
  {/* CANCEL BUTTON */}
  <button onClick={()=>{window.location.reload()}} className="btn-secondary">
    {/* LEFT GLOW */}
    <span className="button-left-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="40" viewBox="0 0 8 40" fill="none">
        <g filter="url(#filter0_f_116_1818_cancel)">
          <path d="M2.65382 4.20659C2.7586 2.17645 4.26968 2.36175 4.95217 2.5513C5.13042 2.6008 5.19868 2.8048 5.11125 2.96784C4.79235 3.56249 4.12544 4.94503 3.96815 6.36709C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.796L2.65382 37.2312C2.65382 37.2312 2.17589 13.4658 2.65382 4.20659Z" fill="white" fillOpacity="0.3"/>
          <path d="M2.65382 4.20659C2.7586 2.17645 4.26968 2.36175 4.95217 2.5513C5.13042 2.6008 5.19868 2.8048 5.11125 2.96784C4.79235 3.56249 4.12544 4.94503 3.96815 6.36709C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.796L2.65382 37.2312C2.65382 37.2312 2.17589 13.4658 2.65382 4.20659Z" fill="url(#paint0_linear_116_1818_cancel)"/>
        </g>
        <defs>
          <filter id="filter0_f_116_1818_cancel" x="1.43051e-05" y="-9.53674e-07" width="7.59079" height="39.6726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_116_1818"/>
          </filter>
          <linearGradient id="paint0_linear_116_1818_cancel" x1="2.44141" y1="3.36732" x2="4.36996" y2="4.03926" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </span>

    {/* TOP GLOW */}
    <span className="button-top-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="6" viewBox="0 0 144 6" fill="none">
        <g filter="url(#filter0_f_116_1819_cancel)">
          <path d="M2.59375 2.59398H141.344" stroke="white" strokeWidth="0.305174" strokeLinecap="round"/>
        </g>
        <defs>
          <filter id="filter0_f_116_1819_cancel" x="1.43051e-05" y="-9.53674e-07" width="143.937" height="5.18796" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_116_1819"/>
          </filter>
        </defs>
      </svg>
    </span>

    <span>Cancel</span>
  </button>

  {/* SAVE BUTTON */}
  <button className="btn-primary" onClick={handleSave}>
    {/* LEFT GLOW */}
    <span className="button-left-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="40" viewBox="0 0 8 40" fill="none">
        <g filter="url(#filter0_f_116_1818_save)">
          <path d="M2.65382 4.20659C2.7586 2.17645 4.26968 2.36175 4.95217 2.5513C5.13042 2.6008 5.19868 2.8048 5.11125 2.96784C4.79235 3.56249 4.12544 4.94503 3.96815 6.36709C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.796L2.65382 37.2312C2.65382 37.2312 2.17589 13.4658 2.65382 4.20659Z" fill="white" fillOpacity="0.3"/>
          <path d="M2.65382 4.20659C2.7586 2.17645 4.26968 2.36175 4.95217 2.5513C5.13042 2.6008 5.19868 2.8048 5.11125 2.96784C4.79235 3.56249 4.12544 4.94503 3.96815 6.36709C3.16225 13.6531 3.46046 26.6432 3.57388 30.5402C3.59587 31.2957 3.5451 32.0511 3.41693 32.796L2.65382 37.2312C2.65382 37.2312 2.17589 13.4658 2.65382 4.20659Z" fill="url(#paint0_linear_116_1818_save)"/>
        </g>
        <defs>
          <filter id="filter0_f_116_1818_save" x="1.43051e-05" y="-9.53674e-07" width="7.59079" height="39.6726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_116_1818"/>
          </filter>
          <linearGradient id="paint0_linear_116_1818_save" x1="2.44141" y1="3.36732" x2="4.36996" y2="4.03926" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </span>

    {/* TOP GLOW */}
    <span className="button-top-glow">
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="6" viewBox="0 0 144 6" fill="none">
        <g filter="url(#filter0_f_116_1819_save)">
          <path d="M2.59375 2.59398H141.344" stroke="white" strokeWidth="0.305174" strokeLinecap="round"/>
        </g>
        <defs>
          <filter id="filter0_f_116_1819_save" x="1.43051e-05" y="-9.53674e-07" width="143.937" height="5.18796" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_116_1819"/>
          </filter>
        </defs>
      </svg>
    </span>

    <span>Save</span>
  </button>

</div>

      </div>

      {/* Form */}
      <div className="form-section">
        
        {/* Name + Email */}
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled />
          </div>
        </div>

        {/* Phone + DOB */}
        <div className="form-grid">
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+974XXXXXXXX"
            />
          </div>

  <div className="form-group date-group">
  <label>Date of Birth</label>

  <div className="date-input-wrapper">
    <input
      id="dob-input"
      type="date"
      name="dateOfBirth"
      value={formData.dateOfBirth}
      onChange={handleInputChange}
    />

    <Calendar
      className="calendar-icon" 
      size={20}
      onClick={() => document.getElementById("dob-input").showPicker()}
    />
  </div>



</div>


        </div>

        {/* Gender + Password */}
        <div className="form-grid">
          <div className="form-group">
            <label>Gender</label>
            <select value={formData.gender} onChange={(e) => handleSelectChange("gender", e.target.value)} disabled>
              {GENDERS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

         <div className="form-group password-group">
  <label>Password</label>

  <div className="password-input-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      disabled
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

        </div>

        {/* Location */}
        <div className="form-group small-width">
          <label>Location</label>
          <select
            value={formData.location}
            onChange={(e) => handleSelectChange("location", e.target.value)}
          >
            <option value="" disabled>
              First select a location
            </option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
            {formData.location && !LOCATIONS.includes(formData.location) && (
              <option value={formData.location}>{formData.location}</option>
            )}
          </select>
        </div>
      </div>
    </div>
    </div>
  )
}

