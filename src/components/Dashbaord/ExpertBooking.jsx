import React, { useState, useRef, useEffect } from "react";
import "./ExpertBooking.css";
import BookingConfirmationModal from "../BookingConfirmationModal";
import ebCheckoutIcon from "../../assets/images/checkoutIcon.png";
import natsha from "../../assets/images/natsha.png";
import courseImg1 from "../../assets/images/forPackages.jpg";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { getPackageById, bookPackage } from "../../services/trainee/trainee";
import { getExpertPackages, createExpertConversation } from "../../services/expertService";
import { DELIVERY } from "../../utils/package.core";
import { convertTimeTo12H } from "../../utils/helper";
import { DateTime } from "luxon";
import { toast } from "react-toastify";

const ExpertBooking = ({ setLoading = () => { } }) => {
  const [packageData, setPackageData] = useState(null);
  const [expertPackages, setExpertPackages] = useState([]);
  const [totalPackagesCount, setTotalPackagesCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const today = new Date();
  const navigate = useNavigate()
  const location = useLocation();
  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [enquiring, setEnquiring] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("packageId");
  const invite = searchParams.get("invite");

  const showInviteAlert = () => {
    toast(
      ({ closeToast }) => (
        <div
          style={{
            width: "100%",           // make full width
            display: "flex",
            flexDirection: "column",
            alignItems: "center",    // center horizontally
            justifyContent: "center",// center vertically
            textAlign: "center",
            padding: "8px 0",
          }}
        >
          <p
            style={{
              marginBottom: "12px",
              color: "black",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "20px",
            }}
          >
            You are invited!
          </p>

          <button
            style={{
              background: "#775da6",
              color: "white",
              padding: "6px 18px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              textAlign: "center",
            }}
            onClick={closeToast}
          >
            Continue
          </button>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        hideProgressBar: true,
        icon: false,
      }
    );
  };




  useEffect(() => {
    if (invite) {
      showInviteAlert()
    }
  }, [invite])
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("traineeToken") || sessionStorage.getItem('traineeToken');
    console.log("toke",token);
    
    if (!token) {
      // Parse params directly from location.search to avoid race conditions
      const currentParams = new URLSearchParams(location.search);
      const currentInvite = currentParams.get("invite");
      const currentPackageId = currentParams.get("packageId");
      console.log("currentInvite", currentInvite);
      console.log("currentPackageId", currentPackageId);  
      // Build login URL with query params
      const loginParams = new URLSearchParams();
      if (currentInvite) loginParams.set("invite", currentInvite);
      if (currentPackageId) loginParams.set("packageId", currentPackageId);

      const loginUrl = loginParams.toString()
        ? `/login?${loginParams.toString()}`
        : "/login";

      navigate(loginUrl, {
        replace: true,
        state: {
          from: {
            pathname: location.pathname,
            search: location.search,
          }
        },
      });
    }
  }, [location, navigate]);


  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    fetchPackageById();
  }, []);

  const fetchPackageById = async () => {
    try {
      setLoading(true);
      const response = await getPackageById(id);
      console.log("responseBooking", response.data.package);
      setPackageData(response.data.package);
    } catch (error) {
      console.error("Failed to load package", error);
    } finally {
      setLoading(false);
    }
  };

  // Calendar header should start from Sunday
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getCalendarMatrix = (baseDate) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // JS getDay(): 0 = Sun ... 6 = Sat, and we also display Sunday as the first column
    const startIndex = firstOfMonth.getDay();

    const weeks = [];
    let currentDayNumber = 1 - startIndex;

    while (currentDayNumber <= daysInMonth) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (currentDayNumber < 1 || currentDayNumber > daysInMonth) {
          week.push(null);
        } else {
          week.push(new Date(year, month, currentDayNumber));
        }
        currentDayNumber += 1;
      }
      weeks.push(week);
    }

    return weeks;
  };

  const calendarDays = getCalendarMatrix(currentMonthDate);

  const currentMonthLabel = currentMonthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Booking validity range based on selected date and packageValidityInDays
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const bookingStartDate = selectedDate
    ? DateTime.fromJSDate(selectedDate).setZone(browserTimeZone)
    : null;
  const bookingEndDate =
    bookingStartDate && packageData?.packageValidityInDays
      ? bookingStartDate.plus({ days: packageData.packageValidityInDays - 1 })
      : null;

  const bookingStartLabel = bookingStartDate
    ? bookingStartDate.toFormat("dd MMM yyyy")
    : "";
  const bookingEndLabel = bookingEndDate
    ? bookingEndDate.toFormat("dd MMM yyyy")
    : "";

  const isSameDay = (a, b) => {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  // Special highlight days in the design: Friday and Saturday
  const isSpecialDay = (dateObj) => {
    if (!dateObj) return false;
    const day = dateObj.getDay();
    // 5 = Fri, 6 = Sat
    return day === 5 || day === 6;
  };

  // Disable all dates before today (including yesterday)
  const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const todayOnlyDate = normalizeDate(today);

  const isBeforeToday = (dateObj) => {
    if (!dateObj) return false;
    return normalizeDate(dateObj) < todayOnlyDate;
  };

  // Expert id from the loaded package
  const expertId = packageData?.expert?._id;

  const handleEnquireExpert = async () => {
    if (!expertId) return;
    try {
      setEnquiring(true);
      const res = await createExpertConversation(expertId);
      navigate(`/chat/${res?.data.conversation._id}`)
      toast.success(res?.message || "Enquiry sent successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        (error?.message === "Network Error"
          ? "Network error while sending enquiry"
          : "Failed to send enquiry");
      toast.error(message);
    } finally {
      setEnquiring(false);
    }
  };

  // Fetch packages for this expert for the "Explore More Packages" slider
  useEffect(() => {
    if (!expertId) return;

    const fetchExpertPackagesForBooking = async () => {
      try {
        const limit = isMobile ? 1 : 4;
        const res = await getExpertPackages(expertId, 1, limit);

        const payload = res?.data || res;
        const pkgs = Array.isArray(payload?.packages) ? payload.packages : [];

        const totalCount =
          typeof payload?.totalPackagesCount === "number"
            ? payload.totalPackagesCount
            : pkgs.length;

        setExpertPackages(pkgs);
        setTotalPackagesCount(totalCount);
      } catch (err) {
        console.error("Failed to load expert packages for booking", err);
      }
    };

    fetchExpertPackagesForBooking();
  }, [expertId, isMobile]);

  const handlePrevMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const packagesSliderRef = useRef(null);

  // Map API packages into the view model used by the Explore More slider
  const mappedPackages = expertPackages.map((pkg) => {
    const imageSrc =
      pkg.listingPageImage ||
      pkg.detailPageImage ||
      (Array.isArray(pkg.images) && pkg.images.length > 0
        ? pkg.images[0]
        : courseImg1);

    const sessions = typeof pkg.noOfSessions === "number" ? pkg.noOfSessions : null;
    const modulesLabel =
      sessions != null
        ? `${sessions} Session${sessions > 1 ? "s" : ""}`
        : "";

    const priceLabel =
      typeof pkg.packageTotalPrice === "number"
        ? `Total : ${pkg.packageTotalPrice} QAR / session`
        : "";

    return {
      id: pkg._id || pkg.name,
      title: pkg.name,
      instructor: pkg.expert?.name || packageData?.expert?.name,
      category: pkg.category?.name,
      modules: modulesLabel,
      duration: priceLabel,
      image: imageSrc,
    };
  });

  const morePackages = mappedPackages;

  const visiblePackageSlots = isMobile ? 1 : 4;
  const effectiveTotalPackages =
    totalPackagesCount > 0 ? totalPackagesCount : morePackages.length;
  const canSlidePackages = effectiveTotalPackages > visiblePackageSlots;

  const handlePackagesSlideLeft = () => {
    if (!canSlidePackages) return;
    if (packagesSliderRef.current) {
      packagesSliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handlePackagesSlideRight = () => {
    if (!canSlidePackages) return;
    if (packagesSliderRef.current) {
      packagesSliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const appointments = [
    {
      id: 1,
      name: "Tony Stark",
      title: "Violin Expert",
      time: "10:00 - 11:00",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      id: 2,
      name: "Steve Rogers",
      title: "Yoga Expert",
      time: "11:00 - 12:00",
      avatar: "/path/to/avatar2.jpg",
    },
  ];

  // Expert name for the Explore More header
  const expertName = packageData?.expert?.name;

  const handleBookNow = () => {
    if (!packageData || !bookingEndDate || !packageData.end) {
      setIsBookingModalOpen(true);
      return;
    }

    const packageEnd = DateTime.fromISO(packageData.end).setZone(browserTimeZone).endOf("day");

    if (bookingEndDate > packageEnd) {
      toast.error("Selected date exceeds the package validity period. Please choose an earlier date.");
      return;
    }

    setIsBookingModalOpen(true);
  };

  return (


    <div className='eb-page-shell'>
      <div className='eb-container'>
        <div className='eb-content-wrapper'>
          {/* Left Sidebar */}
          <aside className='eb-sidebar'>
            {/* Expert Profile */}
            <div className='eb-expert-card'>
              <div className='eb-expert-avatar-wrap'>
                <div className='eb-expert-avatar'>
                  <img src={packageData?.expert?.profileImage} alt='Natasha Romanoff' />
                </div>
                <div className='eb-expert-crown'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
                    <g clip-path='url(#clip0_140_5747)'>
                      <path
                        d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
                        fill='#FFC107'
                      />
                      <path
                        d='M22.8833 22.6667H9.1153C8.62863 22.6667 8.21263 22.316 8.12997 21.836L6.68063 13.392C6.61663 13.0227 6.76597 12.648 7.06597 12.4227C7.3673 12.196 7.76597 12.16 8.10463 12.324L11.9633 14.2027L15.126 8.51333C15.478 7.87733 16.522 7.87733 16.874 8.51333L20.0366 14.2027L23.8953 12.324C24.2326 12.16 24.6326 12.196 24.934 12.4227C25.234 12.648 25.382 13.0213 25.3193 13.392L23.87 21.836C23.786 22.316 23.37 22.6667 22.8833 22.6667Z'
                        fill='#FF8F00'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_140_5747'>
                        <rect width='32' height='32' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              
              <div className='eb-country-flag'>
               <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M2.25 7.80188H14.625V28.1981H2.25V7.80188Z" fill="white"/>
  <path d="M13.6286 7.80188H8.13297L8.04297 7.83563L13.6286 9.86626L8.04297 11.8969L13.6286 13.9275L8.04297 15.9581L13.6286 17.9888L8.04297 20.0194L13.6286 22.0556L8.04297 24.0863L13.6286 26.1169L8.04297 28.1475L8.18359 28.1981H13.6286H33.7492V7.80188H13.6286Z" fill="#8D1B3D"/>
</svg>
              </div>
              {packageData && (
                <h2 className='eb-expert-name'>
                  {packageData.expert?.name}
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M7.3558 0.821454C7.66006 0.495917 8.17631 0.495917 8.48056 0.821454L9.88868 2.32807C10.0404 2.49044 10.2549 2.57929 10.4771 2.57179L12.5381 2.50214C12.9834 2.48709 13.3485 2.85213 13.3334 3.29746L13.2638 5.35849C13.2562 5.5806 13.3451 5.79512 13.5075 5.94687L15.0141 7.35498C15.3396 7.65923 15.3396 8.17548 15.0141 8.47974L13.5075 9.88785C13.3451 10.0396 13.2562 10.2541 13.2638 10.4762L13.3334 12.5373C13.3485 12.9826 12.9834 13.3476 12.5381 13.3326L10.4771 13.2629C10.2549 13.2554 10.0404 13.3443 9.88868 13.5066L8.48056 15.0133C8.17631 15.3388 7.66006 15.3388 7.35581 15.0133L5.94769 13.5066C5.79594 13.3443 5.58142 13.2554 5.35931 13.2629L3.29828 13.3326C2.85295 13.3476 2.48791 12.9826 2.50296 12.5373L2.57261 10.4762C2.58012 10.2541 2.49126 10.0396 2.3289 9.88785L0.822278 8.47974C0.496741 8.17548 0.49674 7.65924 0.822278 7.35498L2.3289 5.94687C2.49126 5.79512 2.58012 5.5806 2.57261 5.35849L2.50296 3.29746C2.48791 2.85213 2.85295 2.48709 3.29828 2.50214L5.35931 2.57179C5.58142 2.57929 5.79594 2.49044 5.94769 2.32807L7.3558 0.821454Z'
                      fill='url(#paint0_linear_140_5737)'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M6.93322 0.427268C7.46566 -0.142422 8.3691 -0.142423 8.90154 0.427268L10.3097 1.93389C10.3476 1.97448 10.4012 1.99669 10.4568 1.99482L12.5178 1.92516C13.2971 1.89883 13.9359 2.53765 13.9096 3.31698L13.8399 5.37801C13.8381 5.43354 13.8603 5.48717 13.9009 5.5251L15.4075 6.93322C15.9772 7.46566 15.9772 8.3691 15.4075 8.90154L13.9009 10.3097C13.8603 10.3476 13.8381 10.4012 13.8399 10.4568L13.9096 12.5178C13.9359 13.2971 13.2971 13.9359 12.5178 13.9096L10.4568 13.8399C10.4012 13.8381 10.3476 13.8603 10.3097 13.9009L8.90154 15.4075C8.3691 15.9772 7.46566 15.9772 6.93322 15.4075L5.5251 13.9009C5.48717 13.8603 5.43354 13.8381 5.37801 13.8399L3.31698 13.9096C2.53765 13.9359 1.89883 13.2971 1.92516 12.5178L1.99482 10.4568C1.99669 10.4012 1.97448 10.3476 1.93389 10.3097L0.427268 8.90154C-0.142422 8.3691 -0.142423 7.46566 0.427268 6.93322L1.93389 5.5251C1.97448 5.48717 1.99669 5.43354 1.99482 5.37801L1.92516 3.31698C1.89883 2.53765 2.53765 1.89883 3.31698 1.92516L5.37801 1.99482C5.43354 1.99669 5.48717 1.97448 5.5251 1.93389L6.93322 0.427268ZM8.05797 1.21568C7.98191 1.1343 7.85285 1.1343 7.77679 1.21568L6.36867 2.7223C6.10311 3.00644 5.7277 3.16194 5.33901 3.1488L3.27798 3.07915C3.16665 3.07539 3.07539 3.16665 3.07915 3.27798L3.1488 5.33901C3.16194 5.7277 3.00644 6.10311 2.7223 6.36867L1.21568 7.77679C1.1343 7.85285 1.1343 7.98191 1.21568 8.05797L2.7223 9.46609C3.00644 9.73165 3.16194 10.1071 3.1488 10.4958L3.07915 12.5568C3.07539 12.6681 3.16665 12.7594 3.27798 12.7556L5.33901 12.686C5.7277 12.6728 6.10311 12.8283 6.36867 13.1125L7.77679 14.6191C7.85285 14.7005 7.98191 14.7005 8.05797 14.6191L9.46609 13.1125C9.73165 12.8283 10.1071 12.6728 10.4958 12.686L12.5568 12.7556C12.6681 12.7594 12.7594 12.6681 12.7556 12.5568L12.686 10.4958C12.6728 10.1071 12.8283 9.73165 13.1125 9.46609L14.6191 8.05797C14.7005 7.98191 14.7005 7.85285 14.6191 7.77679L13.1125 6.36867C12.8283 6.10311 12.6728 5.7277 12.686 5.33901L12.7556 3.27798C12.7594 3.16665 12.6681 3.07539 12.5568 3.07915L10.4958 3.1488C10.1071 3.16194 9.73165 3.00644 9.46609 2.7223L8.05797 1.21568Z'
                      fill='url(#paint1_linear_140_5737)'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M11.2588 4.95388C11.5139 5.14518 11.5656 5.50705 11.3743 5.76213L8.13436 10.082C7.88097 10.4199 7.37864 10.4327 7.10827 10.1083L4.97172 7.54442C4.7676 7.29948 4.80069 6.93544 5.04563 6.73132C5.29058 6.5272 5.65462 6.5603 5.85874 6.80524L7.59026 8.88306L10.4505 5.06934C10.6419 4.81426 11.0037 4.76257 11.2588 4.95388Z'
                      fill='white'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear_140_5737'
                        x1='0.578125'
                        y1='7.91736'
                        x2='15.2582'
                        y2='7.91736'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stop-color='#049A0E' />
                        <stop offset='1' stop-color='#02B346' />
                      </linearGradient>
                      <linearGradient
                        id='paint1_linear_140_5737'
                        x1='0'
                        y1='7.91738'
                        x2='15.8348'
                        y2='7.91738'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stop-color='#049A0E' />
                        <stop offset='1' stop-color='#02B346' />
                      </linearGradient>
                    </defs>
                  </svg>
                </h2>
              )}
              <p className='eb-expert-role'>{packageData?.category?.name}</p>
              {packageData?.expert?.experienceAndQualifications?.yearsOfExperience && (
                <p className='eb-expert-exp'>
                  {packageData.expert.experienceAndQualifications.yearsOfExperience} Years of experience
                </p>
              )}

              <button
                className='eb-card-enquire-btn'
                type='button'
                onClick={handleEnquireExpert}
                disabled={enquiring}
              >
                <span className='eb-card-btn-left'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="37" viewBox="0 0 18 37" fill="none">
                    <g filter="url(#filter0_f_178_1398)">
                      <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="white" fillOpacity="0.3" />
                      <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="url(#paint0_linear_178_1398)" />
                    </g>
                    <defs>
                      <filter id="filter0_f_178_1398" x="-0.00147986" y="1.54972e-05" width="17.0186" height="36.4596" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1398" />
                      </filter>
                      <linearGradient id="paint0_linear_178_1398" x1="2.24219" y1="3.09462" x2="4.64423" y2="7.48478" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className='eb-card-btn-top'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="266" height="5" viewBox="0 0 266 5" fill="none">
                    <g filter="url(#filter0_f_178_1399)">
                      <path d="M2.38281 2.38391H263.249" stroke="white" strokeWidth="0.280458" strokeLinecap="round" />
                    </g>
                    <defs>
                      <filter id="filter0_f_178_1399" x="-0.00147986" y="1.54972e-05" width="265.636" height="4.76779" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1399" />
                      </filter>
                    </defs>
                  </svg>
                </span>
                <span className='eb-card-btn-label'>
                  {enquiring ? "Enquiring..." : "Enquire"}
                </span>
              </button>
            </div>

            {/* Calendar */}
            <div className='eb-calendar-section'>
              <div className='eb-section-header'>
                <h3>Appointment Calendar</h3>
                <div className='eb-section-header-nav'>
                  <button className='eb-month-nav eb-prev' onClick={handlePrevMonth}>
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <path
                        d='M10 12L6 8L10 4'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                  <button className='eb-month-nav eb-next' onClick={handleNextMonth}>
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <path
                        d='M6 4L10 8L6 12'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className='eb-calendar'>
                <div className='eb-calendar-header'>
                  <span className='eb-month-year'>{currentMonthLabel}</span>
                </div>

                <div className='eb-calendar-days-header'>
                  {daysOfWeek.map((day, idx) => {
                    const isSpecialHeaderDay = idx === 5 || idx === 6; // Fri, Sat
                    return (
                      <div
                        key={idx}
                        className={
                          isSpecialHeaderDay ? "eb-day-name eb-day-name-special" : "eb-day-name"
                        }
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <div className='eb-calendar-grid'>
                  {calendarDays.map((week, weekIdx) => (
                    <div key={weekIdx} className='eb-calendar-week'>
                      {week.map((dayObj, dayIdx) => {
                        const isDisabled = !dayObj || isBeforeToday(dayObj);
                        return (
                          <button
                            key={dayIdx}
                            className={`eb-calendar-day ${!dayObj ? "empty" : ""} ${isSameDay(dayObj, selectedDate) ? "selected" : ""
                              } ${isSpecialDay(dayObj) ? "highlighted" : ""}`}
                            onClick={() => {
                              if (!dayObj || isDisabled) return;
                              setSelectedDate(dayObj);
                            }}
                            disabled={isDisabled}
                          >
                            {dayObj ? dayObj.getDate() : ""}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className='eb-action-buttons'>
                {packageData?.freeTrial ? (<button className='eb-btn eb-btn-success' type='button' onClick={handleBookNow}>
                  <span className='eb-card-btn-left'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="37" viewBox="0 0 18 37" fill="none">
                      <g filter="url(#filter0_f_178_1398)">
                        <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="white" fillOpacity="0.3" />
                        <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="url(#paint0_linear_178_1398)" />
                      </g>
                      <defs>
                        <filter id="filter0_f_178_1398" x="-0.00147986" y="1.54972e-05" width="17.0186" height="36.4596" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1398" />
                        </filter>
                        <linearGradient id="paint0_linear_178_1398" x1="2.24219" y1="3.09462" x2="4.64423" y2="7.48478" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className='eb-card-btn-top'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="266" height="5" viewBox="0 0 266 5" fill="none">
                      <g filter="url(#filter0_f_178_1399)">
                        <path d="M2.38281 2.38391H263.249" stroke="white" strokeWidth="0.280458" strokeLinecap="round" />
                      </g>
                      <defs>
                        <filter id="filter0_f_178_1399" x="-0.00147986" y="1.54972e-05" width="265.636" height="4.76779" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1399" />
                        </filter>
                      </defs>
                    </svg>
                  </span>
                  <span className='eb-card-btn-label'>Book Free Trial</span>
                </button>) : (<button className='eb-btn eb-btn-primary' type='button' onClick={handleBookNow}>
                  <span className='eb-card-btn-left'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="37" viewBox="0 0 18 37" fill="none">
                      <g filter="url(#filter0_f_178_1398)">
                        <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="white" fillOpacity="0.3" />
                        <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="url(#paint0_linear_178_1398)" />
                      </g>
                      <defs>
                        <filter id="filter0_f_178_1398" x="-0.00147986" y="1.54972e-05" width="17.0186" height="36.4596" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1398" />
                        </filter>
                        <linearGradient id="paint0_linear_178_1398" x1="2.24219" y1="3.09462" x2="4.64423" y2="7.48478" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className='eb-card-btn-top'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="266" height="5" viewBox="0 0 266 5" fill="none">
                      <g filter="url(#filter0_f_178_1399)">
                        <path d="M2.38281 2.38391H263.249" stroke="white" strokeWidth="0.280458" strokeLinecap="round" />
                      </g>
                      <defs>
                        <filter id="filter0_f_178_1399" x="-0.00147986" y="1.54972e-05" width="265.636" height="4.76779" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1399" />
                        </filter>
                      </defs>
                    </svg>
                  </span>
                  <span className='eb-card-btn-label'>Book Now</span>
                </button>)}


              </div>
            </div>

            {/* Expert Appointment List */}
            {/* <div className='eb-appointments-section'>
              <div className='eb-section-header'>
                <h3>Expert Appointment List</h3>
                <button className='eb-more-btn'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <circle cx='12' cy='12' r='2' fill='currentColor' />
                    <circle cx='12' cy='6' r='2' fill='currentColor' />
                    <circle cx='12' cy='18' r='2' fill='currentColor' />
                  </svg>
                </button>
              </div>

              <div className='eb-appointments-list'>
                {appointments.map((appt) => (
                  <div key={appt.id} className='eb-appointment-item'>
                    <div className='eb-appointment-avatar'>
                      <div className='eb-avatar-placeholder'></div>
                    </div>
                    <div className='eb-appointment-info'>
                      <h4>{appt.name}</h4>
                      <p>{appt.title}</p>
                    </div>
                    <div className='eb-appointment-time'>
                      <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                        <circle cx='10' cy='10' r='8' stroke='currentColor' strokeWidth='1.5' />
                        <path d='M10 6V10L13 13' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                      </svg>
                      <span>{appt.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className='eb-see-all-btn' type='button'>
                <span className='eb-card-btn-left'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="37" viewBox="0 0 18 37" fill="none">
                    <g filter="url(#filter0_f_178_1398)">
                      <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="white" fillOpacity="0.3"/>
                      <path d="M3.26618 3.86592C3.77994 1.96845 11.3059 2.17688 14.5106 2.35357C14.818 2.37052 14.8751 2.81159 14.5868 2.91953C12.9369 3.5372 10.2822 4.67972 9.60234 5.85144C6.66426 10.9152 6.77027 18.977 7.233 24.1552C7.51358 27.2951 6.63443 30.4841 4.5223 32.8242L3.26618 34.2159C3.26618 34.2159 0.962196 12.3753 3.26618 3.86592Z" fill="url(#paint0_linear_178_1398)"/>
                    </g>
                    <defs>
                      <filter id="filter0_f_178_1398" x="-0.00147986" y="1.54972e-05" width="17.0186" height="36.4596" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1398"/>
                      </filter>
                      <linearGradient id="paint0_linear_178_1398" x1="2.24219" y1="3.09462" x2="4.64423" y2="7.48478" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/>
                        <stop offset="1" stopColor="white" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className='eb-card-btn-top'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="266" height="5" viewBox="0 0 266 5" fill="none">
                    <g filter="url(#filter0_f_178_1399)">
                      <path d="M2.38281 2.38391H263.249" stroke="white" strokeWidth="0.280458" strokeLinecap="round"/>
                    </g>
                    <defs>
                      <filter id="filter0_f_178_1399" x="-0.00147986" y="1.54972e-05" width="265.636" height="4.76779" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="1.12183" result="effect1_foregroundBlur_178_1399"/>
                      </filter>
                    </defs>
                  </svg>
                </span>
                <span className='eb-card-btn-label'>See All</span>
              </button>
            </div> */}

            {/* Checkout Info */}
            <div className='eb-checkout-info'>
              <div className='eb-checkout-icon'>
                <img src={ebCheckoutIcon} alt='' />
              </div>
              <div className='eb-checkout-text'>
                <ul className='eb-checkout-list'>
                  <li className='eb-checkout-item'>
                    Rescheduling must be done at least
                    <span>“24 hours”</span> before the session.
                  </li>
                  <li className='eb-checkout-item'>
                    Sessions can only be cancelled if requested
                    <span>“48 hours”</span> in advance.
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className='eb-main-content'>
            {/* Hero Banner */}
            {packageData && (
              <div className='eb-hero-banner' style={{ backgroundImage: `url(${packageData.detailPageImage})` }}>
                <div className='eb-hero-left'>
                  <h1>
                    Book Your
                    <br />
                    {packageData?.name}
                  </h1>
                  <p className='eb-hero-subtext'>
                    “Choose your package, schedule your sessions,
                    <br />
                    and start your journey.”
                  </p>
                  <div className='eb-hero-fee'>
                    <span className='eb-hero-fee-label'>Fee Range</span>
                    <span className='eb-hero-fee-value'>{`QAR ${packageData?.price}/Session`}</span>
                  </div>
                </div>
                <div className='eb-hero-image' />
              </div>
            )}


            {/* Package Details */}
            {packageData && (
              <div className='eb-package-details'>
                <h3 className='eb-section-title'>Package Details</h3>

                <div className='eb-detail-section'>
                  <h4>{packageData.name}</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: packageData.description }}
                  />
                </div>

                <div className='eb-detail-section'>
                  <h4>Strength Level:</h4>
                  <ul>
                    <li>
                      <strong>Suitable For:</strong>&nbsp;{packageData.skillLevel}
                    </li>
                    <li>
                      <strong>Size:</strong>&nbsp;{packageData.groupSettings.maxParticipants}
                    </li>
                  </ul>
                </div>

                {/* <div className='eb-warning-box'>
                <div className='eb-warning-icon' />
                <p>
                  Seats are filling fast! Just 5 spots left — book now to secure yours.
                  <br />
                  Reserve your seat now before it's too late and ensure your place in this exclusive session.
                </p>
              </div> */}

                <div className='eb-detail-section eb-detail-section-divider'>
                  <h4>Scheduling &amp; Duration:</h4>
                  <ul>
                    <li>Number of Sessions: {packageData.noOfSessions}</li>
                    <li>
                      Validity: Start:{" "}
                      {DateTime.fromISO(packageData.start)
                        .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
                        .toFormat("MMMM d")}{" "}
                      End:{" "}
                      {DateTime.fromISO(packageData.end)
                        .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
                        .toFormat("MMMM d")}
                    </li>
                    <li>
                      Preferred Timing:
                      <ul>
                        {packageData.timeSlots.map((slot) => {
                          const traineeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                          const start = convertTimeTo12H(slot.startTime, packageData.timeZone, traineeZone);
                          const end = convertTimeTo12H(slot.endTime, packageData.timeZone, traineeZone);

                          return (
                            <li key={slot._id}>
                              {slot.day}: {start} - {end}
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li>Type of Audience: {packageData.targetAudience.map((audience) => {
                      return `${audience}`
                    }).join(", ")}</li>
                  </ul>
                </div>

                <div className='eb-detail-section'>
                  <h4>Mode of Delivery:</h4>
                  <ul>
                    {packageData.delivery === DELIVERY.ONLINE ? (
                      <li>
                        <strong>Online:</strong> Live interactive sessions via video conferencing with personalized feedback and
                        progress tracking.
                      </li>
                    ) : (<li>
                      <strong>Offline:</strong> In-person classes at our training studio, including one-on-one guidance and group
                      practice sessions.
                    </li>)}

                  </ul>
                </div>

                <div className='eb-detail-section eb-detail-section-divider'>
                  <h4>Terms and Conditions:</h4>
                  <p>
                    Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                </div>
              </div>
            )}


            {/* Explore More Packages */}
            <div className='eb-more-packages'>
              <div className='eb-packages-header'>
                <h3>
                  Explore More Packages{expertName ? ` by ${expertName}` : ""}
                </h3>
                <div className='eb-packages-nav'>
                  <button
                    className='eb-nav-btn'
                    onClick={handlePackagesSlideLeft}
                    title='Previous'
                    disabled={!canSlidePackages}
                  >
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <path
                        d='M10 12L6 8L10 4'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                  <button
                    className='eb-nav-btn'
                    onClick={handlePackagesSlideRight}
                    title='Next'
                    disabled={!canSlidePackages}
                  >
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <path
                        d='M6 4L10 8L6 12'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className='eb-packages-slider-wrapper'>
                <div className='eb-packages-slider' ref={packagesSliderRef}>
                  {morePackages.map((pkg) => (

                    <div key={pkg.id} className='eb-package-card'>
                      <div className='eb-package-image'>
                        <img src={pkg.image} alt={pkg.title} />
                      </div>
                      <div className='eb-package-info'>
                        <h4>{pkg.title}</h4>
                        <div className='eb-package-author'>
                          <span>{pkg.instructor}</span>
                          <span>&bull;</span>
                          <span>{pkg.category}</span>
                        </div>
                        <div className='eb-package-meta'>
                          <span className='eb-package-modules'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='9'
                              height='10'
                              viewBox='0 0 9 10'
                              fill='none'
                            >
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M1.66853 0H5.64447C5.89206 0 6.12686 0.109975 6.28537 0.300181L8.14927 2.53686C8.27421 2.68679 8.34263 2.87578 8.34263 3.07094V7.50837C8.34263 8.42987 7.59561 9.17689 6.6741 9.17689H1.66853C0.747025 9.17689 0 8.42987 0 7.50837V1.66853C0 0.747025 0.747025 0 1.66853 0ZM7.5089 7.50839V3.33707H6.2575C5.79675 3.33707 5.42324 2.96356 5.42324 2.50281V0.834282H1.66906C1.20831 0.834282 0.834794 1.20779 0.834794 1.66855V7.50839C0.834794 7.96914 1.20831 8.34265 1.66906 8.34265H6.67463C7.13539 8.34265 7.5089 7.96914 7.5089 7.50839ZM7.03596 2.50292L6.25802 1.5694V2.50292H7.03596ZM2.50458 5.4228C2.27421 5.4228 2.08745 5.23605 2.08745 5.00567C2.08745 4.7753 2.27421 4.58854 2.50458 4.58854H5.84163C6.07201 4.58854 6.25876 4.7753 6.25876 5.00567C6.25876 5.23605 6.07201 5.4228 5.84163 5.4228H2.50458ZM2.50458 7.09127C2.27421 7.09127 2.08745 6.90451 2.08745 6.67414C2.08745 6.44376 2.27421 6.257 2.50458 6.257H5.00737C5.23775 6.257 5.4245 6.44376 5.4245 6.67414C5.4245 6.90451 5.23775 7.09127 5.00737 7.09127H2.50458ZM2.50458 3.75434C2.27421 3.75434 2.08745 3.56758 2.08745 3.33721C2.08745 3.10683 2.27421 2.92007 2.50458 2.92007H3.75598C3.98635 2.92007 4.17311 3.10683 4.17311 3.33721C4.17311 3.56758 3.98635 3.75434 3.75598 3.75434H2.50458Z'
                                fill='#775DA6'
                              />
                            </svg>
                            {pkg.modules}
                          </span>
                          <span className='eb-package-duration'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                            >
                              <path
                                d='M4.58887 0C7.12281 0.000217547 9.17675 2.05488 9.17676 4.58887C9.17655 7.12269 7.12268 9.17654 4.58887 9.17676C2.05487 9.17675 0.000206406 7.12282 0 4.58887C8.24809e-06 2.05475 2.05475 9.47444e-06 4.58887 0ZM4.58887 0.833984C2.5155 0.833994 0.834969 2.5155 0.834961 4.58887C0.835184 6.66205 2.51563 8.34276 4.58887 8.34277C6.6621 8.34277 8.34255 6.66205 8.34277 4.58887C8.34276 2.5155 6.66224 0.833991 4.58887 0.833984ZM4.58594 1.66895C4.81631 1.66895 5.00391 1.85556 5.00391 2.08594V4.38477L6.71973 5.71875C6.90156 5.86018 6.93437 6.12284 6.79297 6.30469C6.65153 6.48653 6.38888 6.51937 6.20703 6.37793L4.33008 4.91797C4.22858 4.83901 4.16906 4.71744 4.16895 4.58887V2.08594C4.16895 1.85571 4.35576 1.66918 4.58594 1.66895Z'
                                fill='#775DA6'
                              />
                            </svg>
                            {pkg.duration}
                          </span>
                        </div>
                        <div className='eb-package-cta'>
                          <button onClick={() => navigate(`/expert-booking?packageId=${pkg.id}`)} className='eb-package-cta-btn' type='button'>
                            <span className='eb-package-btn-left'>
                              <svg xmlns='http://www.w3.org/2000/svg' width='5' height='17' viewBox='0 0 5 17' fill='none'>
                                <g filter='url(#filter0_f_183_5675)'>
                                  <path
                                    d='M1.27382 1.79073C1.38904 0.919239 3.06869 1.00993 3.79745 1.09121C3.91567 1.10439 3.95169 1.25853 3.85682 1.33031C3.48805 1.6093 2.85986 2.15125 2.70228 2.70744C1.92865 5.43805 2.09119 10.0568 2.22462 12.2374C2.27324 13.0319 2.14426 13.8282 1.82324 14.5566L1.27382 15.8033C1.27382 15.8033 0.754401 5.71948 1.27382 1.79073Z'
                                    fill='white'
                                    fillOpacity='0.3'
                                  />
                                  <path
                                    d='M1.27382 1.79073C1.38904 0.919239 3.06869 1.00993 3.79745 1.09121C3.91567 1.10439 3.95169 1.25853 3.85682 1.33031C3.48805 1.6093 2.85986 2.15125 2.70228 2.70744C1.92865 5.43805 2.09119 10.0568 2.22462 12.2374C2.27324 13.0319 2.14426 13.8282 1.82324 14.5566L1.27382 15.8033C1.27382 15.8033 0.754401 5.71948 1.27382 1.79073Z'
                                    fill='url(#paint0_linear_183_5675)'
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id='filter0_f_183_5675'
                                    x='0.00122023'
                                    y='0'
                                    width='4.95068'
                                    height='16.845'
                                    filterUnits='userSpaceOnUse'
                                    colorInterpolationFilters='sRGB'
                                  >
                                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                                    <feBlend in='SourceGraphic' in2='BackgroundImageFix' mode='normal' result='shape' />
                                    <feGaussianBlur stdDeviation='0.520874' result='effect1_foregroundBlur_183_5675' />
                                  </filter>
                                  <linearGradient
                                    id='paint0_linear_183_5675'
                                    x1='1.04297'
                                    y1='1.43462'
                                    x2='2.35135'
                                    y2='2.60229'
                                    gradientUnits='userSpaceOnUse'
                                  >
                                    <stop stopColor='white' />
                                    <stop offset='1' stopColor='white' stopOpacity='0' />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </span>
                            <span className='eb-package-btn-top'>
                              <svg xmlns='http://www.w3.org/2000/svg' width='62' height='3' viewBox='0 0 62 3' fill='none'>
                                <g filter='url(#filter0_f_183_5676)'>
                                  <path d='M1.10547 1.10681H59.9166' stroke='white' strokeWidth='0.130219' strokeLinecap='round' />
                                </g>
                                <defs>
                                  <filter
                                    id='filter0_f_183_5676'
                                    x='-0.00268602'
                                    y='0'
                                    width='61.0249'
                                    height='2.21362'
                                    filterUnits='userSpaceOnUse'
                                    colorInterpolationFilters='sRGB'
                                  >
                                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                                    <feBlend in='SourceGraphic' in2='BackgroundImageFix' mode='normal' result='shape' />
                                    <feGaussianBlur stdDeviation='0.520874' result='effect1_foregroundBlur_183_5676' />
                                  </filter>
                                </defs>
                              </svg>
                            </span>
                            <span className='eb-package-cta-label'>Learn More</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={async () => {
          try {
            if (!packageData || !bookingStartDate || !bookingEndDate) {
              toast.error("Missing booking dates. Please select a valid date.");
              return;
            }
            const startDateUtc = bookingStartDate.toUTC().toISO();
            const endDateUtc = bookingEndDate.plus({ days: 1 }).toUTC().toISO();
            console.log("endDateUtc", endDateUtc);

            await bookPackage({
              packageId: packageData._id,
              startDateUtc,
              endDateUtc,
              invite,
            });
            setIsBookingModalOpen(false);
            setIsSuccessModalOpen(true);
          } catch (error) {
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to create booking. Please try again.";
            toast.error(message);
          }
        }}
        validityStart={bookingStartLabel}
        validityEnd={bookingEndLabel}
      />

      {/* Booking Success Modal */}
      {isSuccessModalOpen && (
        <div className="bcm-overlay">
          <div className="bcm-modal">
            <button className="bcm-close-btn" onClick={() => setIsSuccessModalOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="bcm-content">
              <div className="bcm-text-section">
                <h2 className="bcm-title">Booking Confirmed</h2>
                <p className="bcm-description">
                  Thank you for booking the package. Your session schedule will be available once the expert confirms your booking.
                </p>
              </div>
            </div>

            <div className="bcm-actions bcm-actions-single">
              <button
                className="bcm-btn bcm-btn-confirm"
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
              >
                <svg className="bcm-btn-glossy-top" width="272" height="6" viewBox="0 0 272 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_f_151_2845)">
                    <path d="M2.59375 2.59399H268.44" stroke="white" strokeWidth="0.305174" strokeLinecap="round" />
                  </g>
                  <defs>
                    <filter id="filter0_f_151_2845" x="1.43051e-05" y="1.43051e-05" width="271.033" height="5.18796" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_151_2845" />
                    </filter>
                  </defs>
                </svg>
                <svg className="bcm-btn-vector" width="10" height="40" viewBox="0 0 10 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_f_151_2844)">
                    <path d="M2.84839 4.20661C3.05104 2.15744 5.9989 2.36543 7.2884 2.55664C7.53645 2.59342 7.6217 2.90139 7.44446 3.07879C6.80129 3.72256 5.6506 5.02729 5.36666 6.3671C3.93727 13.1118 4.3207 24.7445 4.55795 29.5271C4.62839 30.9471 4.45094 32.3701 4.00581 33.7203L2.84839 37.2312C2.84839 37.2312 1.93268 13.4659 2.84839 4.20661Z" fill="white" fillOpacity="0.3" />
                    <path d="M2.84839 4.20661C3.05104 2.15744 5.9989 2.36543 7.2884 2.55664C7.53645 2.59342 7.6217 2.90139 7.44446 3.07879C6.80129 3.72256 5.6506 5.02729 5.36666 6.3671C3.93727 13.1118 4.3207 24.7445 4.55795 29.5271C4.62839 30.9471 4.45094 32.3701 4.00581 33.7203L2.84839 37.2312C2.84839 37.2312 1.93268 13.4659 2.84839 4.20661Z" fill="url(#paint0_linear_151_2844)" />
                  </g>
                  <defs>
                    <filter id="filter0_f_151_2844" x="1.43051e-05" y="1.43051e-05" width="9.98044" height="39.6726" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="1.2207" result="effect1_foregroundBlur_151_2844" />
                    </filter>
                    <linearGradient id="paint0_linear_151_2844" x1="2.44141" y1="3.36733" x2="5.30773" y2="5.2808" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>OK</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default ExpertBooking;
