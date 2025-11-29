import React, { useState } from "react"
import { Eye, EyeOff, Calendar } from "lucide-react"
import './Edit-profile.css'
const LOCATIONS = ["Lusail, Qatar", "Doha, Qatar", "Al Wakrah, Qatar", "Al Khor, Qatar", "Umm Salal, Qatar"]
const GENDERS = ["Female", "Male", "Other"]

export default function EditProfileForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Kate Bishop",
    email: "katebishop@gmail.com",
    phone: "+974 1234 5678",
    dateOfBirth: "01/05/1997",
    gender: "Female",
    password: "••••••••••••••••••",
    location: "Lusail, Qatar",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="edit-profile-container">
    <div className="edit-profile-wrapper">
      {/* Header */}
      <div className="edit-profile-header">
        <div className="profile-info">
          <div className="avatar-wrapper">
            <img src={formData.avatar} alt="Avatar" className="avatar-img" />
          </div>
          <div>
            <h2 className="profile-name">{formData.fullName}</h2>
            <p className="profile-email">{formData.email}</p>
          </div>
        </div>

        <div className="button-row">
  
  {/* CANCEL BUTTON */}
  <button className="btn-secondary">
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
  <button className="btn-primary">
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
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
        </div>

        {/* Phone + DOB */}
        <div className="form-grid">
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
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
            <select value={formData.gender} onChange={(e) => handleSelectChange("gender", e.target.value)}>
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
          <select value={formData.location} onChange={(e) => handleSelectChange("location", e.target.value)}>
            {LOCATIONS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
    </div>
  )
}

