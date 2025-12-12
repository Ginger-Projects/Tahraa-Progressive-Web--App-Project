import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setWork, clearRegistration } from "../../features/slice/registrationSlice";
import { registerExpert } from "../../services/expertService";
import "./RegistrationBasics.css";
import leftImage from "../../assets/images/work-bg.png";
import logoImage from "../../assets/images/logo.png";
import LegalModal from "../../components/LegalModal";
import TermsOfUse from "../../pages/Legal/TermsOfUse";
import PrivacyPolicy from "../../pages/Legal/PrivacyPolicy";

const RegistrationWork = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registration = useSelector((state) => state.registration);
  const work = registration.work || {};

  const [officeAddressOption, setOfficeAddressOption] = useState(work.officeAddressOption || "");
  const [officeAddressText, setOfficeAddressText] = useState(work.officeAddressText || "");
  const [zipCode, setZipCode] = useState(work.zipCode || "");
  const [companyRegNumber, setCompanyRegNumber] = useState(work.companyRegNumber || "");
  const [termsAccepted, setTermsAccepted] = useState(work.termsAccepted || false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Guard: if basics or education data is missing (e.g. after reload), redirect to the appropriate step
    const basics = registration?.basics || {};
    const education = registration?.education || {};

    if (!basics || !basics.name || !basics.email) {
      navigate("/registration", { replace: true });
      return;
    }

    if (!education || !education.yearsOfExperience || !education.teachingCategory) {
      navigate("/registraion-education", { replace: true });
      return;
    }

    const handleBeforeUnload = (e) => {
      const message = "If you leave this page, your registration progress may be lost. Go to home page?";
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handlePopState = () => {
      if (window.confirm("If you go back, your registration may be lost. Go to home page?")) {
        navigate("/");
      } else {
        navigate(0);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, registration]);

  const handleClear = () => {
    setOfficeAddressOption("");
    setOfficeAddressText("");
    setZipCode("");
    setCompanyRegNumber("");
    setTermsAccepted(false);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const missingFields = [];

    if (!officeAddressOption) missingFields.push("Office address selection");

    if (officeAddressOption === "yes") {
      if (!officeAddressText.trim()) missingFields.push("Office address");
      if (!zipCode.trim()) missingFields.push("ZIP code");
      if (!companyRegNumber.trim()) missingFields.push("Company registration number");
    }
    if (!termsAccepted) missingFields.push("Acceptance of terms");

    if (missingFields.length > 0) {
      toast.error(`${missingFields[0]} is required`);
      return;
    }

    const workData = {
      officeAddressOption,
      officeAddressText,
      zipCode,
      companyRegNumber,
      termsAccepted,
      stepCompleted: true,
    };
    console.log("work", workData);

    dispatch(setWork(workData));

    // Debug identificationNumber type from basics
    const basicsDebug = registration.basics || {};
    console.log(
      "identificationNumber in Work (value, type):",
      basicsDebug.identificationNumber,
      typeof basicsDebug.identificationNumber
    );

    // Build main FormData for registerExpert: basics (with photo), education (including previous work), and work data
    const education = registration.education || {};
    const {
      previousWorks = [],
      previousWorksLinks = [],
      certificates = [],
      ...educationWithoutFiles
    } = education;

    const formData = new FormData();

    // Append basics, separating photoFile so we can send it as a real file
    const basics = registration.basics || {};
    const { photoFile, photoUrl, ...basicsWithoutPhotoFile } = basics; // exclude photoUrl from payload
    Object.entries(basicsWithoutPhotoFile).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });
    if (photoFile) {
      formData.append("profilePicture", photoFile);
    }

    // Append education without files/arrays that we handle separately
    Object.entries(educationWithoutFiles).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        formData.append(key, "");
      } else if (key === "languages" && Array.isArray(value)) {
        // Send languages as a JSON array
        formData.append("languages", JSON.stringify(value));
      } else if (typeof value === "boolean") {
        formData.append(key, String(value));
      } else {
        formData.append(key, value);
      }
    });

    // Append certificates as JSON array of objects
    if (Array.isArray(certificates) && certificates.length > 0) {
      formData.append("certificates", JSON.stringify(certificates));
    }

    // Append work data (haveOfficeAddress as boolean)
    formData.append("haveOfficeAddress", String(officeAddressOption === "yes"));

    // OfficeAddress is a single key whose value is a JSON object
    const officeAddress = {
      addressLine1: officeAddressText ?? "",
      zipCode: zipCode ?? "",
      registrationNumber: companyRegNumber ?? "",
    };
    formData.append("officeAddress", JSON.stringify(officeAddress));

    // Do not send termsAccepted to backend; only used for frontend validation

    // Append previous work links (YouTube etc.) as JSON array
    if (Array.isArray(previousWorksLinks) && previousWorksLinks.length > 0) {
      formData.append("previousWorksLinks", JSON.stringify(previousWorksLinks));
    }

    // Append previous work files directly to FormData so backend can handle storage
    (previousWorks || []).forEach((file) => {
      if (file) {
        formData.append("previousWorks", file);
      }
    });

    // Log a readable snapshot of FormData entries (including files)
    const debugFormData = {};
    for (const [key, value] of formData.entries()) {
      debugFormData[key] =
        value instanceof File
          ? { name: value.name, type: value.type, size: value.size }
          : value;
    }
    console.log(
      "DEBUG FORMDATA ENTRIES\n",
      JSON.stringify(debugFormData, null, 2)
    );

    setIsSubmitting(true);
    try {
      console.log("formData", formData);

      const response = await registerExpert(formData);
      const message = response?.message || "Registration completed successfully";
      toast.success(message);

      navigate("/welcome");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <section className="registration-main">
        <div className="registration-page">
          {/* LEFT PANEL - image + text */}
          <div className="registration-left">
            <button
              type="button"
              className="registration-logo"
              onClick={() => navigate("/")}
            >
              <img src={logoImage} alt="Yanmu logo" />
            </button>
            <div className="registration-left-image-wrap">
              <img src={leftImage} alt="Expert working" />
            </div>
            <div className="registration-left-overlay">
              <h2 className="registration-left-heading">
                To do what you love to do
              </h2>

              <div className="registration-left-follow">
                <span>Follow us on:</span>
                <div className="registration-left-socials">
                  <span className="registration-left-social">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H8V10.5H6V8H8V6C8 5.20435 8.31607 4.44129 8.87868 3.87868C9.44129 3.31607 10.2044 3 11 3H13V5.5H12C11.448 5.5 11 5.448 11 6V8H13.5L12.5 10.5H11V16H14C15.103 16 16 15.103 16 14V2C16 0.897 15.103 0 14 0Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="registration-left-social">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1.44578C10.1205 1.44578 10.4096 1.44578 11.2771 1.44578C12.0482 1.44578 12.4337 1.63855 12.7229 1.73494C13.1084 1.92771 13.3976 2.0241 13.6867 2.31325C13.9759 2.60241 14.1687 2.89157 14.2651 3.27711C14.3614 3.56627 14.4578 3.95181 14.5542 4.72289C14.5542 5.59036 14.5542 5.78313 14.5542 8C14.5542 10.2169 14.5542 10.4096 14.5542 11.2771C14.5542 12.0482 14.3614 12.4337 14.2651 12.7229C14.0723 13.1084 13.9759 13.3976 13.6867 13.6867C13.3976 13.9759 13.1084 14.1687 12.7229 14.2651C12.4337 14.3614 12.0482 14.4578 11.2771 14.5542C10.4096 14.5542 10.2169 14.5542 8 14.5542C5.78313 14.5542 5.59036 14.5542 4.72289 14.5542C3.95181 14.5542 3.56627 14.3614 3.27711 14.2651C2.89157 14.0723 2.60241 13.9759 2.31325 13.6867C2.0241 13.3976 1.83133 13.1084 1.73494 12.7229C1.63855 12.4337 1.54217 12.0482 1.44578 11.2771C1.44578 10.4096 1.44578 10.2169 1.44578 8C1.44578 5.78313 1.44578 5.59036 1.44578 4.72289C1.44578 3.95181 1.63855 3.56627 1.73494 3.27711C1.92771 2.89157 2.0241 2.60241 2.31325 2.31325C2.60241 2.0241 2.89157 1.83133 3.27711 1.73494C3.56627 1.63855 3.95181 1.54217 4.72289 1.44578C5.59036 1.44578 5.87952 1.44578 8 1.44578ZM8 0C5.78313 0 5.59036 0 4.72289 0C3.85542 0 3.27711 0.192772 2.79518 0.385543C2.31325 0.578314 1.83133 0.867471 1.3494 1.3494C0.867471 1.83133 0.674699 2.21687 0.385543 2.79518C0.192772 3.27711 0.0963856 3.85542 0 4.72289C0 5.59036 0 5.87952 0 8C0 10.2169 0 10.4096 0 11.2771C0 12.1446 0.192772 12.7229 0.385543 13.2048C0.578314 13.6867 0.867471 14.1687 1.3494 14.6506C1.83133 15.1325 2.21687 15.3253 2.79518 15.6145C3.27711 15.8072 3.85542 15.9036 4.72289 16C5.59036 16 5.87952 16 8 16C10.1205 16 10.4096 16 11.2771 16C12.1446 16 12.7229 15.8072 13.2048 15.6145C13.6867 15.4217 14.1687 15.1325 14.6506 14.6506C15.1325 14.1687 15.3253 13.7831 15.6145 13.2048C15.8072 12.7229 15.9036 12.1446 16 11.2771C16 10.4096 16 10.1205 16 8C16 5.87952 16 5.59036 16 4.72289C16 3.85542 15.8072 3.27711 15.6145 2.79518C15.4217 2.31325 15.1325 1.83133 14.6506 1.3494C14.1687 0.867471 13.7831 0.674699 13.2048 0.385543C12.7229 0.192772 12.1446 0.0963856 11.2771 0C10.4096 0 10.2169 0 8 0Z"
                        fill="white"
                      />
                      <path
                        d="M8 3.85542C5.68675 3.85542 3.85542 5.68675 3.85542 8C3.85542 10.3133 5.68675 12.1446 8 12.1446C10.3133 12.1446 12.1446 10.3133 12.1446 8C12.1446 5.68675 10.3133 3.85542 8 3.85542ZM8 10.6988C6.55422 10.6988 5.30121 9.54217 5.30121 8C5.30121 6.55422 6.45783 5.30121 8 5.30121C9.44578 5.30121 10.6988 6.45783 10.6988 8C10.6988 9.44578 9.44578 10.6988 8 10.6988Z"
                        fill="white"
                      />
                      <path
                        d="M12.241 4.72289C12.7733 4.72289 13.2048 4.29136 13.2048 3.75904C13.2048 3.22671 12.7733 2.79518 12.241 2.79518C11.7086 2.79518 11.2771 3.22671 11.2771 3.75904C11.2771 4.29136 11.7086 4.72289 12.241 4.72289Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Business Setup step */}
          <div className="registration-right">
            <div>
              <div className="registration-stepper">
                <div className="registration-step">
                  <div
                    className="registration-step-circle"
                    style={{ background: "#02B346", color: "#FFFFFF" }}
                  >
                    1
                  </div>
                  <div className="registration-step-text">
                    <div className="registration-step-title">Finished</div>
                    <div className="registration-step-sub">Basics</div>
                  </div>
                  <div className="registration-step-line" />
                </div>

                <div className="registration-step">
                  <div
                    className="registration-step-circle"
                    style={{ background: "#02B346", color: "#FFFFFF" }}
                  >
                    2
                  </div>
                  <div className="registration-step-text">
                    <div className="registration-step-title">Finished</div>
                    <div className="registration-step-sub">Experience &amp; Qualification</div>
                  </div>
                  <div className="registration-step-line" />
                </div>

                <div className="registration-step registration-step-active">
                  <div className="registration-step-circle">3</div>
                  <div className="registration-step-text">
                    <div className="registration-step-title">Finish Line</div>
                    <div className="registration-step-sub">Business Setup</div>
                  </div>
                  <div className="registration-step-line registration-step-line-end" />
                </div>
              </div>

              <h1 className="registration-title">
                Registration <span>| Business Setup</span>
              </h1>

              <div className="registration-form">
                {/* Do you have an office address? */}
                <div className="registration-row registration-row-textarea">
                  <div className="registration-field registration-field-full registration-field-visa">
                    <label>Do you have an office address?*</label>
                    <div className="registration-radio-group">
                      <label>
                        <input
                          style={{ padding: "10px" }}
                          type="radio"
                          name="officeAddress"
                          value="yes"
                          checked={officeAddressOption === "yes"}
                          onChange={(e) => setOfficeAddressOption(e.target.value)}
                        />{" "}
                        Yes
                      </label>
                      <label>
                        <input
                          style={{ padding: "10px" }}
                          type="radio"
                          name="officeAddress"
                          value="no"
                          checked={officeAddressOption === "no"}
                          onChange={(e) => setOfficeAddressOption(e.target.value)}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Office address */}
                <div className="registration-row registration-row-textarea">
                  <div className="registration-field registration-field-full">
                    <input
                      type="text"
                      placeholder="Office address (Street | Zone | Building No.)*"
                      value={officeAddressText}
                      onChange={(e) => setOfficeAddressText(e.target.value)}
                      disabled={officeAddressOption === "no"}
                    />
                  </div>
                </div>

                {/* ZIP code & Company registration number */}
                <div className="registration-row">
                  <div className="registration-field">
                    <input
                      type="text"
                      placeholder="ZIP code*"
                      value={zipCode}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                        setZipCode(onlyDigits);
                      }}
                      disabled={officeAddressOption === "no"}
                    />
                  </div>
                  <div className="registration-field">
                    <input
                      type="text"
                      placeholder="Company registration number*"
                      value={companyRegNumber}
                      onChange={(e) => setCompanyRegNumber(e.target.value)}
                      disabled={officeAddressOption === "no"}
                    />
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="registration-row registration-row-textarea">
                  <div className="registration-field registration-field-full">
                    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="checkbox"
                        style={{ marginRight: 8 }}
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <span>
                        By signing up you agree to our
                        <span
                          style={{ color: "#775da6", textDecoration: "underline", cursor: "pointer" }}
                          onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}
                        >
                          {" "}
                          Terms of use
                        </span>{" "}
                        and
                        <span
                          style={{ color: "#775da6", textDecoration: "underline", cursor: "pointer" }}
                          onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}
                        >
                          {" "}
                          Privacy policy
                        </span>
                        .
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="registration-buttons">
                <button
                  type="button"
                  className="registration-btn registration-btn-clear"
                  style={{ position: "relative", overflow: "hidden" }}
                  onClick={handleClear}
                >
                  {/* Left glossy strip */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 11 40"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                    }}
                  >
                    <g filter="url(#filter0_f_62_2361)">
                      <path
                        d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z"
                        fill="white"
                        fillOpacity="0.3"
                      />
                      <path
                        d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z"
                        fill="url(#paint0_linear_62_2361)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_62_2361"
                        x="0"
                        y="0"
                        width="10.6172"
                        height="39.6726"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          mode="normal"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="1.2207"
                          result="effect1_foregroundBlur_62_2361"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_62_2361"
                        x1="2.44141"
                        y1="3.36733"
                        x2="5.4245"
                        y2="5.61461"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Top highlight line */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 306 6"
                    preserveAspectRatio="none"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 4,
                      width: "100%",
                      height: 4,
                    }}
                  >
                    <g filter="url(#filter0_f_62_2362)">
                      <path
                        d="M2.59375 2.59399H302.594"
                        stroke="white"
                        strokeWidth="0.305174"
                        strokeLinecap="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_62_2362"
                        x="0"
                        y="0"
                        width="305.187"
                        height="5.18796"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          mode="normal"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="1.2207"
                          result="effect1_foregroundBlur_62_2362"
                        />
                      </filter>
                    </defs>
                  </svg>

                  Clear
                </button>
                <button
                  type="button"
                  className="registration-btn registration-btn-next"
                  style={{ position: "relative", overflow: "hidden", cursor: isSubmitting ? "not-allowed" : "pointer" }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {/* Left glossy strip */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 11 40"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                    }}
                  >
                    <g filter="url(#filter0_f_62_2361)">
                      <path
                        d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z"
                        fill="white"
                        fillOpacity="0.3"
                      />
                      <path
                        d="M2.90067 4.20661C3.12969 2.15452 6.46543 2.36603 7.91731 2.55746C8.17774 2.59179 8.2636 2.92163 8.06746 3.09635C7.33809 3.74607 6.06 5.03936 5.74247 6.3671C4.15774 12.9935 4.54759 24.3379 4.81564 29.2692C4.90214 30.8606 4.6796 32.4494 4.1239 33.9432L2.90067 37.2312C2.90067 37.2312 1.86732 13.4659 2.90067 4.20661Z"
                        fill="url(#paint0_linear_62_2361)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_62_2361"
                        x="0"
                        y="0"
                        width="10.6172"
                        height="39.6726"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          mode="normal"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="1.2207"
                          result="effect1_foregroundBlur_62_2361"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_62_2361"
                        x1="2.44141"
                        y1="3.36733"
                        x2="5.4245"
                        y2="5.61461"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Top highlight line */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 306 6"
                    preserveAspectRatio="none"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 4,
                      width: "100%",
                      height: 4,
                    }}
                  >
                    <g filter="url(#filter0_f_62_2362)">
                      <path
                        d="M2.59375 2.59399H302.594"
                        stroke="white"
                        strokeWidth="0.305174"
                        strokeLinecap="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_62_2362"
                        x="0"
                        y="0"
                        width="305.187"
                        height="5.18796"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          mode="normal"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="1.2207"
                          result="effect1_foregroundBlur_62_2362"
                        />
                      </filter>
                    </defs>
                  </svg>

                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>

            <p className="registration-recaptcha">
              Protected by reCAPTCHA and subject to the Yanmu
              <span> Privacy Policy</span> and <span>Terms of Use</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Terms of Use Modal */}
      {showTermsModal && (
        <LegalModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        >
          <TermsOfUse isModal={true} />
        </LegalModal>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <LegalModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
        >
          <PrivacyPolicy isModal={true} />
        </LegalModal>
      )}
    </>
  );
};

export default RegistrationWork;
