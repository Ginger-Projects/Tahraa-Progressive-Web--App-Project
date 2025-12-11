import React, { useEffect, useRef, useState } from "react";
import "./ExpertProfile.css";
import LineSrc from "../../assets/images/bigline.png";

// dummy imports – replace with your real images
import pkg1 from "../../assets/images/package4.png";
import Button from "../../components/Button";
import { Link, useSearchParams } from "react-router-dom";
import { getExpertDetails, getExpertPackages, getExpertFeedbacks } from "../../services/expertService";
import { User } from "lucide-react";

const ExpertProfile = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expertPackages, setExpertPackages] = useState([]);
  const [totalPackagesCount, setTotalPackagesCount] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingStats, setRatingStats] = useState(null);
  const [reviewPage, setReviewPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams] = useSearchParams();
  const packageSliderRef = useRef(null);
  const prevWorksSliderRef = useRef(null);
  const suggestSliderRef = useRef(null);

 

  const languages = Array.isArray(expert?.languages) ? expert.languages : [];

  const expQual = expert?.experienceAndQualifications;
  const yearsOfExperience = expQual?.yearsOfExperience;
  const categoryName = expQual?.teachingCategory?.name;
  const delivery = expQual?.delivery;
  const feeRange = expQual?.feeRange;
  const certificates = Array.isArray(expQual?.certificates)
    ? expQual.certificates
    : [];

  const expertId = searchParams.get("expertId");

  const reviews = feedbacks
    .filter((fb) => (fb?.rating || 0) > 0)
    .map((fb) => {
      let date = "";
      let time = "";

      if (fb?.createdAt) {
        const created = new Date(fb.createdAt);
        if (!Number.isNaN(created.getTime())) {
          // Format as DD-MM-YYYY and HH:MM
          const d = created;
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          date = `${day}-${month}-${year}`;

          const hours = String(d.getHours()).padStart(2, "0");
          const minutes = String(d.getMinutes()).padStart(2, "0");
          time = `${hours}:${minutes}`;
        }
      }

      return {
        id: fb._id,
        name: fb.traineeName || "Anonymous",
        rating: fb.rating || 0,
        text: fb.comment || "",
        date,
        time,
      };
    });

  const REVIEWS_PER_PAGE = 5;
  const totalReviewPages =
    reviews.length > 0 ? Math.ceil(reviews.length / REVIEWS_PER_PAGE) : 0;
  const currentReviewPage =
    totalReviewPages > 0 ? Math.min(reviewPage, totalReviewPages) : 1;

  const paginatedReviews =
    totalReviewPages > 0
      ? reviews.slice(
          (currentReviewPage - 1) * REVIEWS_PER_PAGE,
          currentReviewPage * REVIEWS_PER_PAGE
        )
      : [];

  const averageRating = ratingStats?.averageRating ?? 0;
  const totalRatings = ratingStats?.totalRatings ?? 0;
  const ratingPercentages = ratingStats?.ratingPercentages || {};
  const ratingDistribution = ratingStats?.ratingDistribution || {};
  const ratingBars = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratingDistribution[star] || 0,
    width: `${ratingPercentages[star] || 0}%`,
  }));
  // track screen size for package limit (desktop: 4, mobile: 1)
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
    if (!expertId) return;

    const fetchExpert = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getExpertDetails(expertId);
        const expertData = res?.data?.expert || null;
        
        setExpert(expertData);
      } catch (err) {
        console.error("Failed to load expert details", err);
        setError("Failed to load expert details");
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [expertId]);

  // Fetch packages for this expert, with limit based on screen size
  useEffect(() => {
    if (!expertId) return;

    const fetchPackages = async () => {
      try {
        const limit = isMobile ? 1 : 4;
        const res = await getExpertPackages(expertId, 1, limit);
        console.log("exper", expertId);
        console.log("res", res);

        const payload = res?.data;
        const pkgs = Array.isArray(payload?.packages) ? payload.packages : [];

        const totalCount =
          typeof payload?.totalPackagesCount === "number"
            ? payload.totalPackagesCount
            : pkgs.length;

        setExpertPackages(pkgs);
        setTotalPackagesCount(totalCount);
      } catch (err) {
        console.error("Failed to load expert packages", err);
      }
    };

    fetchPackages();
  }, [expertId, isMobile]);

  useEffect(() => {
    if (!expertId) return;

    const fetchFeedbacks = async () => {
      try {
        const res = await getExpertFeedbacks(expertId);
        const payload = res?.data;
        const fb = Array.isArray(payload?.feedbacks) ? payload.feedbacks : [];
        setFeedbacks(fb);
        setRatingStats(payload?.ratingStats || null);
      } catch (err) {
        console.error("Failed to load expert feedbacks", err);
      }
    };

    fetchFeedbacks();
  }, [expertId]);

  const previousWorksUrls =
    expert?.experienceAndQualifications?.previousWorks || [];

  const isYouTubeUrl = (url = "") =>
    url.includes("youtube.com") || url.includes("youtu.be");

  const youtubeVideos = previousWorksUrls.filter(isYouTubeUrl);
  const mp4Videos = previousWorksUrls.filter((url) =>
    url.toLowerCase().includes(".mp4")
  );
  const imageUrls = previousWorksUrls.filter(
    (url) => !isYouTubeUrl(url) && !url.toLowerCase().includes(".mp4")
  );

  const buildYouTubeEmbedUrl = (id = "") => {
    if (!id) return "";
    return `https://www.youtube.com/embed/${id}?controls=1&rel=0&modestbranding=1`;
  };



  const getYouTubeEmbedUrl = (url = "") => {
    try {
      if (!url) return "";
      if (url.includes("youtube.com/shorts/")) {
        const id = url.split("youtube.com/shorts/")[1]?.split(/[?&]/)[0];
        return id ? buildYouTubeEmbedUrl(id) : url;
      }
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
        return id ? buildYouTubeEmbedUrl(id) : url;
      }
      if (url.includes("watch?v=")) {
        const id = url.split("watch?v=")[1]?.split("&")[0];
        return id ? buildYouTubeEmbedUrl(id) : url;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const primaryVideoSource =
    youtubeVideos[0] || mp4Videos[0] || imageUrls[0] || null;

  const sliderPreviousWorks = previousWorksUrls.filter(
    (url) => url !== primaryVideoSource
  );

  // Normalize API packages into a unified view model for the UI
  const apiMappedPackages = expertPackages.map((pkg) => {
    const imageSrc =
      pkg.listingPageImage ||
      pkg.detailPageImage ||
      (Array.isArray(pkg.images) && pkg.images.length > 0
        ? pkg.images[0]
        : pkg1);

    return {
      id: pkg._id || pkg.name,
      title: pkg.name,
      mentor: pkg.expert?.name || expert?.name,
      category: pkg.category?.name,
      sessions: pkg.noOfSessions,
      priceLabel:
        typeof pkg.packageTotalPrice === "number"
          ? `Total : ${pkg.packageTotalPrice} QAR / session`
          : "",
      image: imageSrc,
    };
  });

  const finalPackages = apiMappedPackages;

  // how many packages can be shown at once based on screen size
  const visiblePackageSlots = isMobile ? 1 : 4;
  const effectiveTotalPackages =
    totalPackagesCount > 0 ? totalPackagesCount : finalPackages.length;
  const canSlidePackages = effectiveTotalPackages > visiblePackageSlots;

  const handlePackageSlideLeft = () => {
    if (!canSlidePackages) return;
    if (packageSliderRef.current) {
      const scrollAmount = 300;
      packageSliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handlePackageSlideRight = () => {
    if (!canSlidePackages) return;
    if (packageSliderRef.current) {
      const scrollAmount = 300;
      packageSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrevWorksSlideLeft = () => {
    if (prevWorksSliderRef.current) {
      const scrollAmount = 300;
      prevWorksSliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrevWorksSlideRight = () => {
    if (prevWorksSliderRef.current) {
      const scrollAmount = 300;
      prevWorksSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSuggestSlideLeft = () => {
    if (suggestSliderRef.current) {
      const scrollAmount = 300;
      suggestSliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleSuggestSlideRight = () => {
    if (suggestSliderRef.current) {
      const scrollAmount = 300;
      suggestSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleReviewPrev = () => {
    if (totalReviewPages === 0) return;
    setReviewPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleReviewNext = () => {
    if (totalReviewPages === 0) return;
    setReviewPage((prev) => (prev < totalReviewPages ? prev + 1 : prev));
  };

  const handleSaveExpert = () => {
    const next = !isSaved;
    setIsSaved(next);
    if (!next) {
      // if unsaving, just hide any toast and exit
      setShowSavedToast(false);
      return;
    }

    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 2500);
  };

  if (loading) {
    return (
      <main className='ep-main'>
        <div className='ep-container'>
          <div className='ep-loading-message'>Loading expert profile...</div>
        </div>
      </main>
    );
  }

  return (
    <main className='ep-main'>
      <div className='ep-container'>
        {/* TOP HERO ROW */}
        <div className='row g-4 ep-top-row'>
          {/* Left big image */}
          <div className='col-lg-7'>
            <div className='ep-card ep-hero-image-card'>
              <img
                src={expert?.profileImage }
                alt={expert?.name || "Expert"}
                className='ep-hero-img'
              />
            </div>
          </div>

          {/* Right profile info card */}
          <div className='col-lg-5'>
            <div className='ep-card ep-hero-info-card'>
              <div className='ep-hero-header'>
                <div>
                  <h2 className='ep-name'>
                    {expert?.name}{" "}
                    <svg xmlns='http://www.w3.org/2000/svg' width='31' height='31' viewBox='0 0 31 31' fill='none'>
                      <path
                        d='M14.0111 1.56487C14.5907 0.944725 15.5742 0.944724 16.1538 1.56487L18.8362 4.43499C19.1253 4.74429 19.534 4.91356 19.9571 4.89926L23.8833 4.76657C24.7317 4.7379 25.4271 5.43331 25.3984 6.28166L25.2658 10.2079C25.2515 10.6311 25.4207 11.0397 25.73 11.3288L28.6001 14.0113C29.2203 14.5909 29.2203 15.5743 28.6001 16.1539L25.73 18.8364C25.4207 19.1255 25.2515 19.5341 25.2658 19.9572L25.3984 23.8835C25.4271 24.7319 24.7317 25.4273 23.8833 25.3986L19.9571 25.2659C19.534 25.2516 19.1253 25.4209 18.8362 25.7302L16.1538 28.6003C15.5742 29.2204 14.5907 29.2204 14.0111 28.6003L11.3286 25.7302C11.0396 25.4209 10.6309 25.2516 10.2078 25.2659L6.28151 25.3986C5.43316 25.4273 4.73775 24.7319 4.76642 23.8835L4.89911 19.9572C4.91341 19.5341 4.74414 19.1255 4.43483 18.8364L1.56472 16.1539C0.944572 15.5743 0.944572 14.5909 1.56472 14.0113L4.43483 11.3288C4.74414 11.0397 4.91341 10.6311 4.89911 10.2079L4.76642 6.28166C4.73775 5.43331 5.43316 4.7379 6.28151 4.76657L10.2078 4.89926C10.6309 4.91356 11.0396 4.74429 11.3286 4.43499L14.0111 1.56487Z'
                        fill='url(#paint0_linear_140_6593)'
                      />
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M13.2078 0.813946C14.2221 -0.271314 15.9431 -0.271316 16.9574 0.813946L19.6399 3.68406C19.7122 3.76138 19.8143 3.8037 19.9201 3.80013L23.8464 3.66744C25.331 3.61727 26.548 4.83423 26.4978 6.31885L26.3651 10.2451C26.3615 10.3509 26.4039 10.4531 26.4812 10.5253L29.3513 13.2078C30.4366 14.2221 30.4366 15.9431 29.3513 16.9574L26.4812 19.6399C26.4039 19.7122 26.3615 19.8143 26.3651 19.9201L26.4978 23.8464C26.548 25.331 25.331 26.548 23.8464 26.4978L19.9201 26.3651C19.8143 26.3615 19.7122 26.4039 19.6399 26.4812L16.9574 29.3513C15.9431 30.4366 14.2221 30.4366 13.2078 29.3513L10.5253 26.4812C10.4531 26.4039 10.3509 26.3615 10.2451 26.3651L6.31885 26.4978C4.83423 26.548 3.61727 25.331 3.66744 23.8464L3.80013 19.9201C3.8037 19.8143 3.76138 19.7122 3.68406 19.6399L0.813946 16.9574C-0.271314 15.9431 -0.271316 14.2221 0.813946 13.2078L3.68406 10.5253C3.76138 10.4531 3.8037 10.3509 3.80013 10.2451L3.66744 6.31885C3.61727 4.83423 4.83423 3.61727 6.31885 3.66744L10.2451 3.80013C10.3509 3.8037 10.4531 3.76138 10.5253 3.68406L13.2078 0.813946ZM15.3505 2.31588C15.2056 2.16084 14.9597 2.16084 14.8148 2.31588L12.1323 5.18599C11.6264 5.72727 10.9113 6.02349 10.1708 5.99847L6.24455 5.86578C6.03247 5.85861 5.85861 6.03247 5.86578 6.24456L5.99847 10.1708C6.02349 10.9113 5.72727 11.6264 5.18599 12.1323L2.31588 14.8148C2.16084 14.9597 2.16084 15.2056 2.31588 15.3505L5.18599 18.0329C5.72727 18.5388 6.02349 19.254 5.99847 19.9944L5.86578 23.9207C5.85861 24.1328 6.03247 24.3066 6.24456 24.2995L10.1708 24.1668C10.9113 24.1417 11.6264 24.438 12.1323 24.9793L14.8148 27.8494C14.9597 28.0044 15.2056 28.0044 15.3505 27.8494L18.0329 24.9793C18.5388 24.438 19.254 24.1417 19.9944 24.1668L23.9207 24.2995C24.1328 24.3066 24.3066 24.1328 24.2995 23.9207L24.1668 19.9944C24.1417 19.254 24.438 18.5388 24.9793 18.0329L27.8494 15.3505C28.0044 15.2056 28.0044 14.9597 27.8494 14.8148L24.9793 12.1323C24.438 11.6264 24.1417 10.9113 24.1668 10.1708L24.2995 6.24455C24.3066 6.03247 24.1328 5.85861 23.9207 5.86578L19.9944 5.99847C19.254 6.02349 18.5388 5.72727 18.0329 5.18599L15.3505 2.31588Z'
                        fill='url(#paint1_linear_140_6593)'
                      />
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M21.4486 9.43711C21.9346 9.80155 22.033 10.4909 21.6686 10.9768L15.4966 19.2062C15.0139 19.8498 14.0569 19.8743 13.5419 19.2563L9.47173 14.3721C9.08289 13.9055 9.14593 13.212 9.61255 12.8231C10.0792 12.4343 10.7727 12.4973 11.1615 12.964L14.4601 16.9222L19.9089 9.65707C20.2734 9.17115 20.9627 9.07267 21.4486 9.43711Z'
                        fill='white'
                      />
                      <defs>
                        <linearGradient
                          id='paint0_linear_140_6593'
                          x1='1.09961'
                          y1='15.0826'
                          x2='29.0652'
                          y2='15.0826'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#049A0E' />
                          <stop offset='1' stop-color='#02B346' />
                        </linearGradient>
                        <linearGradient
                          id='paint1_linear_140_6593'
                          x1='0'
                          y1='15.0826'
                          x2='30.1652'
                          y2='15.0826'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#049A0E' />
                          <stop offset='1' stop-color='#02B346' />
                        </linearGradient>
                      </defs>
                    </svg>
                  </h2>
                  <p className='ep-title'>
                    {categoryName}
                    {yearsOfExperience && (
                      <>
                        {" "}
                        | <span>{yearsOfExperience} Years experience</span>
                      </>
                    )}
                  </p>
                  <p className='ep-location'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='19' height='23' viewBox='0 0 19 23' fill='none'>
                      <path
                        d='M9.1135 22.2122C13.7056 22.2122 17.4282 21.4117 17.4282 20.4242C17.4282 19.4368 13.7056 18.6363 9.1135 18.6363C4.52143 18.6363 0.798828 19.4368 0.798828 20.4242C0.798828 21.4117 4.52143 22.2122 9.1135 22.2122Z'
                        fill='url(#paint0_linear_140_6599)'
                      />
                      <path
                        d='M17.4291 20.4242C17.4291 19.4368 13.7065 18.6363 9.1144 18.6363C8.35047 18.6363 7.61089 18.6585 6.9082 18.7L8.46458 20.9897C8.508 21.0536 8.5587 21.1083 8.61432 21.1544L9.66805 22.2081C14.0019 22.1468 17.4291 21.3717 17.4291 20.4242Z'
                        fill='url(#paint1_linear_140_6599)'
                      />
                      <path
                        d='M18.2264 9.11318C18.2264 4.08012 14.1463 0 9.11326 0C4.1021 0 0.050729 4.00878 0.000468496 9.01971C-0.0374664 12.8043 2.23197 16.0629 5.48801 17.4761C6.03286 17.7126 6.49893 18.0997 6.83285 18.5909L8.4634 20.9897C8.7752 21.4484 9.45119 21.4484 9.76299 20.9897L11.3935 18.591C11.7264 18.1013 12.19 17.7137 12.7333 17.4783C15.9652 16.0778 18.2264 12.8598 18.2264 9.11318Z'
                        fill='url(#paint2_linear_140_6599)'
                      />
                      <path
                        d='M9.11413 20.8796C9.06135 20.8796 8.92895 20.8655 8.83988 20.7345L7.20937 18.3356C6.82593 17.7715 6.29354 17.3303 5.66977 17.0596C2.4672 15.6695 0.420504 12.5154 0.45552 9.02425C0.478604 6.72132 1.38826 4.56539 3.01689 2.95353C4.64535 1.34184 6.81095 0.454132 9.11413 0.454132H9.11418C13.8888 0.454132 17.7732 4.33861 17.7732 9.11323C17.7732 12.5677 15.7244 15.6877 12.5537 17.0617C11.9335 17.3304 11.4028 17.771 11.0189 18.3357L9.38839 20.7345C9.29932 20.8655 9.16692 20.8796 9.11413 20.8796Z'
                        fill='url(#paint3_linear_140_6599)'
                      />
                      <path
                        d='M9.11324 14.8417C12.277 14.8417 14.8417 12.2769 14.8417 9.11318C14.8417 5.94943 12.277 3.3847 9.11324 3.3847C5.94949 3.3847 3.38477 5.94943 3.38477 9.11318C3.38477 12.2769 5.94949 14.8417 9.11324 14.8417Z'
                        fill='url(#paint4_linear_140_6599)'
                      />
                      <path
                        d='M17.9414 11.3821L12.4989 5.93964C11.6522 5.03678 10.4488 4.4725 9.11335 4.4725C6.55037 4.4725 4.47266 6.55021 4.47266 9.1132C4.47266 10.4486 5.03693 11.6521 5.93979 12.4988L11.6756 18.2346C11.9703 17.9122 12.3298 17.6532 12.7335 17.4783C15.2896 16.3707 17.2382 14.126 17.9414 11.3821Z'
                        fill='url(#paint5_linear_140_6599)'
                      />
                      <path
                        d='M9.11335 13.7539C11.6763 13.7539 13.754 11.6762 13.754 9.1132C13.754 6.55021 11.6763 4.4725 9.11335 4.4725C6.55036 4.4725 4.47266 6.55021 4.47266 9.1132C4.47266 11.6762 6.55036 13.7539 9.11335 13.7539Z'
                        fill='url(#paint6_linear_140_6599)'
                      />
                      <defs>
                        <linearGradient
                          id='paint0_linear_140_6599'
                          x1='8.9304'
                          y1='19.6527'
                          x2='9.96327'
                          y2='24.0055'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#BFA0F5' />
                          <stop offset='1' stop-color='#775DA6' />
                        </linearGradient>
                        <linearGradient
                          id='paint1_linear_140_6599'
                          x1='13.4318'
                          y1='21.2516'
                          x2='10.6818'
                          y2='17.7429'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#BFA0F5' stop-opacity='0' />
                          <stop offset='1' stop-color='#775DA6' />
                        </linearGradient>
                        <linearGradient
                          id='paint2_linear_140_6599'
                          x1='3.613'
                          y1='3.61266'
                          x2='21.7965'
                          y2='21.7961'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#BFA0F5' />
                          <stop offset='1' stop-color='#775DA6' />
                        </linearGradient>
                        <linearGradient
                          id='paint3_linear_140_6599'
                          x1='7.15981'
                          y1='7.16395'
                          x2='0.769932'
                          y2='0.774075'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#BFA0F5' stop-opacity='0' />
                          <stop offset='1' stop-color='#775DA6' />
                        </linearGradient>
                        <linearGradient
                          id='paint4_linear_140_6599'
                          x1='12.5675'
                          y1='12.5674'
                          x2='1.14221'
                          y2='1.14214'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#BFA0F5' />
                          <stop offset='1' stop-color='#775DA6' />
                        </linearGradient>
                        <linearGradient
                          id='paint5_linear_140_6599'
                          x1='15.073'
                          y1='15.0729'
                          x2='10.0092'
                          y2='10.009'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#BFA0F5' stop-opacity='0' />
                          <stop offset='1' stop-color='#775DA6' />
                        </linearGradient>
                        <linearGradient
                          id='paint6_linear_140_6599'
                          x1='7.9773'
                          y1='7.38073'
                          x2='10.7196'
                          y2='11.5627'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#F9F7FC' />
                          <stop offset='1' stop-color='#F0DDFC' />
                        </linearGradient>
                      </defs>
                    </svg>
                    {expert?.nationality || "Qatar"}
                  </p>
                </div>
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
                  <g clip-path='url(#clip0_140_6643)'>
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
                    <clipPath id='clip0_140_6643'>
                      <rect width='32' height='32' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className='ep-badges-row'>
                {/* <span className='ep-badge'>All Ages</span> */}
                <span className='ep-badge ep-badge-green'>{expert?.gender}</span>
                {delivery && (
                  <span className='ep-badge ep-badge-outline'>{delivery}</span>
                )}
              </div>

              {feeRange && (
                <div className='ep-fee-row'>
                  <div>
                    <p className='ep-fee-label'>Fee Range</p>
                    <p className='ep-fee-value'>QAR {feeRange} / session</p>
                  </div>
                </div>
              )}

              <div className='ep-hero-btn-row'>
                <Link to='/expert-booking'><Button to='/expert-book' label='Book Now' bg='#775DA6' /></Link>
                <Button label='Enquire' bg='#02B346' />
                <button
                  type='button'
                  className={"BTNmains" + (isSaved ? " saved" : "")}
                  onClick={handleSaveExpert}
                  aria-label='Save expert'
                >
                  <div className='rectangle-2' />

                  <img className='vector-2' src='https://c.animaapp.com/RRnEyncc/img/vector-1-1.svg' alt='' />
                  <img className='line' src={LineSrc} alt='' />

                  <div className='label'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='21' height='28' viewBox='0 0 21 28' fill='none'>
                      <g filter='url(#filter0_d_140_6653)'>
                        <path
                          d='M16.3212 0H4.66667C2.09154 0 0 2.08733 0 4.63051V21.5331C0 23.6924 1.55959 24.6041 3.46978 23.5604L9.3696 20.3094C9.99827 19.9616 11.0138 19.9616 11.6304 20.3094L17.5302 23.5604C19.4404 24.6161 21 23.7044 21 21.5331V4.63051C20.9879 2.08733 18.8964 0 16.3212 0Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <filter
                          id='filter0_d_140_6653'
                          x='0'
                          y='0'
                          width='21'
                          height='27.49'
                          filterUnits='userSpaceOnUse'
                          color-interpolation-filters='sRGB'
                        >
                          <feFlood flood-opacity='0' result='BackgroundImageFix' />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dy='3.49' />
                          <feComposite in2='hardAlpha' operator='out' />
                          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0' />
                          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_140_6653' />
                          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_140_6653' result='shape' />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {showSavedToast && (
          <div
            className='ep-toast-overlay'
            onClick={() => setShowSavedToast(false)}
          >
            <div
              className='ep-toast ep-toast-success'
              onClick={(event) => event.stopPropagation()}
            >
              <span className='ep-toast-icon'>✓</span>
              <span>Added to your saved experts.</span>
            </div>
          </div>
        )}

        {/* BIO + VIDEO ROW */}
        <div className='row g-4 mt-4'>
          <div className='col-lg-7 ep-wrapper'>
            <div className='ep-card ep-bio-card'>
              <h3 className='ep-section-title'>Bio</h3>
              <p className='ep-bio-text'>
                {expert?.about ||
                  "Lorem ipsum is simply dummy text of the printing and typesetting industry."}
              </p>
            </div>

            <div className='ep-card ep-skills-card'>
              <h3 className='ep-section-title'>Languages</h3>
              <div className='ep-skills-list'>
                {languages.map((lang) => (
                  <span key={lang} className='ep-skill-pill'>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* right: video card */}
          <div className='col-lg-5'>
            <div className='ep-card ep-video-card'>
              <div className='ep-video-thumb-wrap'>
                {primaryVideoSource && isYouTubeUrl(primaryVideoSource) && (
                  <iframe
                    className='ep-video-thumb'
                    src={getYouTubeEmbedUrl(primaryVideoSource)}
                    title='Previous work video'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                )}

                {primaryVideoSource &&
                  !isYouTubeUrl(primaryVideoSource) &&
                  primaryVideoSource.toLowerCase().includes(".mp4") && (
                    <video className='ep-video-thumb' controls>
                      <source src={primaryVideoSource} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  )}

                {primaryVideoSource &&
                  !isYouTubeUrl(primaryVideoSource) &&
                  !primaryVideoSource.toLowerCase().includes(".mp4") && (
                    <img
                      src={primaryVideoSource}
                      alt='Previous work'
                      className='ep-video-thumb'
                    />
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* PACKAGES SECTION */}
        <section className='ep-packages-section mt-5'>
          <div className='d-flex align-items-center justify-content-between mb-3 ep-section-heading-row'>
            <h3 className='ep-section-title'>Packages</h3>
            <div className='ep-slider-controls'>
              <button
                className={`ep-slider-btn ep-slider-btn-prev ${
                  !canSlidePackages ? "ep-slider-btn-disabled" : ""
                }`}
                onClick={handlePackageSlideLeft}
                title='Previous'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='15 18 9 12 15 6' />
                </svg>
              </button>
              <button
                className={`ep-slider-btn ep-slider-btn-next ${
                  !canSlidePackages ? "ep-slider-btn-disabled" : ""
                }`}
                onClick={handlePackageSlideRight}
                title='Next'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              </button>
            </div>
          </div>

          <div className='ep-packages-slider-wrapper'>
            <div className='ep-packages-slider' ref={packageSliderRef}>
              {finalPackages.map((pkg) => (
                <div key={pkg.id} className='ep-package-slide-item'>
                  <div className='ep-package-card-wrapper'>
                    <div className='ep-package-image-container'>
                      <img src={pkg.image} className='ep-package-image' alt={pkg.title} />
                    </div>
                    <div className='ep-package-content'>
                      <h4 className='ep-package-title'>{pkg.title}</h4>
                      <p className='ep-package-mentor'>
                        {pkg.mentor} • <span className='ep-package-category'>{pkg.category}</span>
                      </p>
                      <div className='ep-package-details'>
                        <div className='ep-package-detail-item'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='13' height='14' viewBox='0 0 13 14' fill='none'>
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M2.41974 0H8.18575C8.54482 0 8.88533 0.159489 9.1152 0.43533L11.8183 3.67902C11.9995 3.89645 12.0987 4.17053 12.0987 4.45356V10.8888C12.0987 12.2252 11.0153 13.3086 9.67896 13.3086H2.41974C1.08335 13.3086 0 12.2252 0 10.8888V2.41974C0 1.08335 1.08335 0 2.41974 0ZM10.89 10.8891V4.83972H9.07524C8.40705 4.83972 7.86537 4.29804 7.86537 3.62985V1.21011H2.42095C1.75276 1.21011 1.21109 1.75178 1.21109 2.41998V10.8891C1.21109 11.5573 1.75276 12.0989 2.42095 12.0989H9.68017C10.3484 12.0989 10.89 11.5573 10.89 10.8891ZM10.2054 3.62975L9.07726 2.27593V3.62975H10.2054ZM3.63069 7.86411C3.29659 7.86411 3.02575 7.59327 3.02575 7.25917C3.02575 6.92507 3.29659 6.65424 3.63069 6.65424H8.47017C8.80426 6.65424 9.0751 6.92507 9.0751 7.25917C9.0751 7.59327 8.80426 7.86411 8.47017 7.86411H3.63069ZM3.63069 10.2837C3.29659 10.2837 3.02575 10.0129 3.02575 9.67876C3.02575 9.34467 3.29659 9.07383 3.63069 9.07383H7.2603C7.59439 9.07383 7.86523 9.34467 7.86523 9.67876C7.86523 10.0129 7.59439 10.2837 7.2603 10.2837H3.63069ZM3.63069 5.4445C3.29659 5.4445 3.02575 5.17367 3.02575 4.83957C3.02575 4.50547 3.29659 4.23463 3.63069 4.23463H5.44549C5.77959 4.23463 6.05043 4.50547 6.05043 4.83957C6.05043 5.17367 5.77959 5.4445 5.44549 5.4445H3.63069Z'
                              fill='#775DA6'
                            />
                          </svg>
                          <span className='ep-detail-text'>{pkg.sessions} Session</span>
                        </div>
                        <div className='ep-package-detail-item'>
                          
                          <span className='ep-detail-text'>{pkg.priceLabel}</span>
                        </div>
                      </div>

                      <button className='ep-package-learn-btn' type='button'>
                        <span className='ep-package-btn-left'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='8' height='25' viewBox='0 0 8 25' fill='none'>
                            <g filter='url(#filter0_f_183_5275)'>
                              <path
                                d='M1.84416 2.59381C2.01105 1.33146 4.444 1.46282 5.49959 1.58055C5.67084 1.59965 5.723 1.82292 5.58558 1.92689C5.05143 2.33101 4.1415 3.11601 3.91325 3.92164C2.79266 7.87688 3.0281 14.5671 3.22138 17.7256C3.2918 18.8764 3.10497 20.0299 2.63998 21.085L1.84415 22.8907C1.84415 22.8907 1.09178 8.28454 1.84416 2.59381Z'
                                fill='white'
                                fillOpacity='0.3'
                              />
                              <path
                                d='M1.84416 2.59381C2.01105 1.33146 4.444 1.46282 5.49959 1.58055C5.67084 1.59965 5.723 1.82292 5.58558 1.92689C5.05143 2.33101 4.1415 3.11601 3.91325 3.92164C2.79266 7.87688 3.0281 14.5671 3.22138 17.7256C3.2918 18.8764 3.10497 20.0299 2.63998 21.085L1.84415 22.8907C1.84415 22.8907 1.09178 8.28454 1.84416 2.59381Z'
                                fill='url(#paint0_linear_183_5275)'
                              />
                            </g>
                            <defs>
                              <filter
                                id='filter0_f_183_5275'
                                x='0.000808239'
                                y='-4.62532e-05'
                                width='7.17221'
                                height='24.3998'
                                filterUnits='userSpaceOnUse'
                                colorInterpolationFilters='sRGB'
                              >
                                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                                <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                                <feGaussianBlur stdDeviation='0.754479' result='effect1_foregroundBlur_183_5275' />
                              </filter>
                              <linearGradient
                                id='paint0_linear_183_5275'
                                x1='1.50977'
                                y1='2.07798'
                                x2='3.40493'
                                y2='3.76933'
                                gradientUnits='userSpaceOnUse'
                              >
                                <stop stopColor='white' />
                                <stop offset='1' stopColor='white' stopOpacity='0' />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>

                        <span className='ep-package-btn-line'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='89' height='4' viewBox='0 0 89 4' fill='none'>
                            <g filter='url(#filter0_f_183_5276)'>
                              <path d='M1.60352 1.60327H86.7906' stroke='white' strokeWidth='0.18862' strokeLinecap='round' />
                            </g>
                            <defs>
                              <filter
                                id='filter0_f_183_5276'
                                x='0.000808239'
                                y='-4.62532e-05'
                                width='88.3929'
                                height='3.20664'
                                filterUnits='userSpaceOnUse'
                                colorInterpolationFilters='sRGB'
                              >
                                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                                <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                                <feGaussianBlur stdDeviation='0.754479' result='effect1_foregroundBlur_183_5276' />
                              </filter>
                            </defs>
                          </svg>
                        </span>

                        <span className='ep-package-btn-label'>Learn More</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className='ep-cert-section mt-5'>
          <h3 className='ep-section-title mb-4'>Professional Certifications</h3>
          <div className='ep-certifications-container'>
            {certificates.length > 0 && (
              <div className='ep-cert-column'>
                <ul className='ep-cert-list'>
                  {certificates.map((cert) => (
                    <li
                      key={cert._id || cert.nameOfCertificate}
                      className='ep-cert-list-item'
                    >
                      <strong>{cert.nameOfCertificate}</strong>
                      {cert.expiryDate && (
                        <p className='ep-cert-details'>
                          Expiry: {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* PREVIOUS WORKS */}
        <section className='ep-prev-section mt-5'>
          <div className='ep-section-heading-row'>
            <h3 className='ep-section-title mb-0'>Previous Works</h3>
          </div>

          <div className='ep-prev-works-slider-wrapper'>
            <div className='ep-prev-works-slider' ref={prevWorksSliderRef}>
              {sliderPreviousWorks.map((url, index) => {
                const isYoutube = isYouTubeUrl(url);
                const isMp4 = url.toLowerCase().includes(".mp4");
                const isImage = !isYoutube && !isMp4;
                return (
                  <div
                    key={`${url}-${index}`}
                    className='ep-prev-work-slide-item'
                  >
                    <div className='ep-prev-card'>
                      <div className='ep-prev-thumb-wrap'>
                        {isYoutube && (
                          <iframe
                            className='ep-prev-thumb'
                            src={getYouTubeEmbedUrl(url)}
                            title={`Previous work ${index + 1}`}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                          />
                        )}
                        {isMp4 && (
                          <video className='ep-prev-thumb' controls>
                            <source src={url} type='video/mp4' />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {isImage && (
                          <img
                            src={url}
                            alt={`Previous work ${index + 1}`}
                            className='ep-prev-thumb'
                          />
                        )}

                        {/* PART Badge */}
                        {/* <div className='ep-prev-part-badge'>
                          <span>PART {index + 1}</span>
                        </div> */}
                      </div>
                      <div className='ep-prev-body'>
                        <p className='ep-prev-title'>{`Previous work ${index + 1}`}</p>
                        <span className='ep-prev-cat'>
                          {isYoutube ? "YouTube" : isMp4 ? "Video" : "Image"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        {reviews.length > 0 && (
        <section className='ep-reviews-section mt-5'>
          <div className='row g-4 '>
            {/* left: add review form */}
           

            {/* right: rating summary + list */}
            <div className='col-12'>
              <div className='ep-review-list-card'>
                <div className='row g-4 d-flex flex-column'>
                  {/* Rating Summary */}
                  <div className='col-md-4 w-100'>
                    <div className='ep-rating-summary'>
                      <div className='ep-rating-display'>
                        <div className='ep-rating-value'>
                          {averageRating ? averageRating.toFixed(1) : "0.0"}
                        </div>
                        <div className='ep-rating-stars'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className='star'>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className='ep-rating-label'>
                        {totalRatings} rating{totalRatings === 1 ? "" : "s"}
                      </div>

                      {/* Rating Bars */}
                      <div className='ep-rating-bars'>
                        {ratingBars.map((bar) => (
                          <div key={bar.star} className='ep-rating-bar-row'>
                            <span>{bar.star}</span>
                            <div className='ep-rating-bar-container'>
                              <div className='ep-rating-bar-fill' style={{ width: bar.width }} />
                            </div>
                            <span>
                              {bar.star}.0 {bar.count} reviews
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review List */}
                  <div className='col-md-8 w-100'>
                    <div className='ep-review-list'>
                      {paginatedReviews.map((rev) => (
                        <div key={rev.id} className='ep-review-item'>
                          <div className='ep-review-left'>
                            <div className='ep-review-avatar-icon'>
                              <User size={20} color="#fff" />
                            </div>
                            <div className='ep-review-info'>
                              <div className='ep-review-name'>{rev.name}</div>

                              <div className='ep-review-stars'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`star ${star <= rev.rating ? "filled" : ""}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              {/* <div className='ep-review-meta'>
                                <span>{rev.date} </span>
                                <span>|</span>
                                <span> {rev.time}</span>
                              </div> */}
                            </div>
                          </div>
                          <div className='ep-review-right'>
                            <p className='ep-review-text'>{rev.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className='ep-review-pagination'>
                      <button
                        className='ep-pagination-arrow prev'
                        onClick={handleReviewPrev}
                        disabled={currentReviewPage <= 1}
                      >
                        {/* Left glossy curve */}
                        <svg style={{ position: "absolute", left: "0px", top: "0px", width: "18px", height: "32px", opacity: 0.3, zIndex: 1 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 42" fill="none">
                          <g filter="url(#filter0_f_140_6818)">
                            <path d="M3.53723 4.34872C4.04564 2.21528 11.4902 2.44857 14.6653 2.64727C15.0023 2.66836 15.0716 3.14545 14.7608 3.27744C13.1286 3.97064 10.4855 5.25987 9.81023 6.58215C6.8045 12.468 7.01673 21.9546 7.51138 27.7426C7.78464 30.9399 6.96061 34.1787 4.96456 36.6914L3.53722 38.4882C3.53722 38.4882 1.2562 13.9205 3.53723 4.34872Z" fill="white" fill-opacity="0.3"/>
                            <path d="M3.53723 4.34872C4.04564 2.21528 11.4902 2.44857 14.6653 2.64727C15.0023 2.66836 15.0716 3.14545 14.7608 3.27744C13.1286 3.97064 10.4855 5.25987 9.81023 6.58215C6.8045 12.468 7.01673 21.9546 7.51138 27.7426C7.78464 30.9399 6.96061 34.1787 4.96456 36.6914L3.53722 38.4882C3.53722 38.4882 1.2562 13.9205 3.53723 4.34872Z" fill="url(#paint0_linear_140_6818)"/>
                          </g>
                          <defs>
                            <filter id="filter0_f_140_6818" x="-0.00037241" y="0.000115871" width="17.4832" height="41.012" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                              <feGaussianBlur stdDeviation="1.2619" result="effect1_foregroundBlur_140_6818"/>
                            </filter>
                            <linearGradient id="paint0_linear_140_6818" x1="2.52344" y1="3.48111" x2="5.40052" y2="8.10923" gradientUnits="userSpaceOnUse">
                              <stop stop-color="white"/>
                              <stop offset="1" stop-color="white" stop-opacity="0"/>
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Top horizontal line */}
                        <svg style={{ position: "absolute", left: "0px", top: "0px", width: "32px", height: "6px", opacity: 0.2, zIndex: 1 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 6" fill="none">
                          <g filter="url(#filter0_f_140_6819)">
                            <path d="M2.68164 2.68164H264.399" stroke="white" stroke-width="0.315476" stroke-linecap="round"/>
                          </g>
                          <defs>
                            <filter id="filter0_f_140_6819" x="-0.00037241" y="0.000115871" width="267.081" height="5.36305" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                              <feGaussianBlur stdDeviation="1.2619" result="effect1_foregroundBlur_140_6819"/>
                            </filter>
                          </defs>
                        </svg>
                        <svg
                          style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }}
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M10 2L4 8L10 14'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                      <button className='ep-pagination-dot'>
                        {currentReviewPage}/{totalReviewPages || 1}
                      </button>
                      <button
                        className='ep-pagination-arrow next'
                        onClick={handleReviewNext}
                        disabled={currentReviewPage >= totalReviewPages}
                      >
                        {/* Left glossy curve */}
                        <svg style={{ position: "absolute", left: "0px", top: "0px", width: "18px", height: "32px", opacity: 0.3, zIndex: 1 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 42" fill="none">
                          <g filter="url(#filter0_f_140_6818)">
                            <path d="M3.53723 4.34872C4.04564 2.21528 11.4902 2.44857 14.6653 2.64727C15.0023 2.66836 15.0716 3.14545 14.7608 3.27744C13.1286 3.97064 10.4855 5.25987 9.81023 6.58215C6.8045 12.468 7.01673 21.9546 7.51138 27.7426C7.78464 30.9399 6.96061 34.1787 4.96456 36.6914L3.53722 38.4882C3.53722 38.4882 1.2562 13.9205 3.53723 4.34872Z" fill="white" fill-opacity="0.3"/>
                            <path d="M3.53723 4.34872C4.04564 2.21528 11.4902 2.44857 14.6653 2.64727C15.0023 2.66836 15.0716 3.14545 14.7608 3.27744C13.1286 3.97064 10.4855 5.25987 9.81023 6.58215C6.8045 12.468 7.01673 21.9546 7.51138 27.7426C7.78464 30.9399 6.96061 34.1787 4.96456 36.6914L3.53722 38.4882C3.53722 38.4882 1.2562 13.9205 3.53723 4.34872Z" fill="url(#paint0_linear_140_6818)"/>
                          </g>
                          <defs>
                            <filter id="filter0_f_140_6818" x="-0.00037241" y="0.000115871" width="17.4832" height="41.012" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                              <feGaussianBlur stdDeviation="1.2619" result="effect1_foregroundBlur_140_6818"/>
                            </filter>
                            <linearGradient id="paint0_linear_140_6818" x1="2.52344" y1="3.48111" x2="5.40052" y2="8.10923" gradientUnits="userSpaceOnUse">
                              <stop stop-color="white"/>
                              <stop offset="1" stop-color="white" stop-opacity="0"/>
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Top horizontal line */}
                        <svg style={{ position: "absolute", left: "0px", top: "0px", width: "32px", height: "6px", opacity: 0.2, zIndex: 1 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 6" fill="none">
                          <g filter="url(#filter0_f_140_6819)">
                            <path d="M2.68164 2.68164H264.399" stroke="white" stroke-width="0.315476" stroke-linecap="round"/>
                          </g>
                          <defs>
                            <filter id="filter0_f_140_6819" x="-0.00037241" y="0.000115871" width="267.081" height="5.36305" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                              <feGaussianBlur stdDeviation="1.2619" result="effect1_foregroundBlur_140_6819"/>
                            </filter>
                          </defs>
                        </svg>
                        <svg
                          style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }}
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M6 2L12 8L6 14'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

      </div>
    </main>
  );
};

export default ExpertProfile;
