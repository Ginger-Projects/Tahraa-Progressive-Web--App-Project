import React, { useState, useRef } from "react"
import "./PackageSummaryMain.css"

export default function PackageSummaryMain() {
  const sessions = [
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
  ]

  const [dateLabel, setDateLabel] = useState("1 - 31 October 2025")
  const dateInputRef = useRef(null)

  return (
    <div className="package-summary-card">
      <div className="package-summary-header">
        <div
          className="package-summary-date-box"
          onClick={() => {
            if (dateInputRef.current) {
              dateInputRef.current.showPicker?.()
              dateInputRef.current.focus()
            }
          }}
        >
          <span className="ps-date-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1.75C0 1.26675 0.391751 0.875 0.875 0.875H9.625C10.1082 0.875 10.5 1.26675 10.5 1.75V10.5C10.5 10.9832 10.1082 11.375 9.625 11.375H0.875C0.391751 11.375 0 10.9832 0 10.5V1.75ZM9.625 1.75H0.875V10.5H9.625V1.75Z"
                fill="#898989"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.875 0C8.11662 0 8.3125 0.195875 8.3125 0.4375V2.1875C8.3125 2.42912 8.11662 2.625 7.875 2.625C7.63338 2.625 7.4375 2.42912 7.4375 2.1875V0.4375C7.4375 0.195875 7.63338 0 7.875 0Z"
                fill="#898989"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.625 0C2.86662 0 3.0625 0.195875 3.0625 0.4375V2.1875C3.0625 2.42912 2.86662 2.625 2.625 2.625C2.38338 2.625 2.1875 2.42912 2.1875 2.1875V0.4375C2.1875 0.195875 2.38338 0 2.625 0Z"
                fill="#898989"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 3.9375C0 3.69588 0.195875 3.5 0.4375 3.5H10.0625C10.3041 3.5 10.5 3.69588 10.5 3.9375C10.5 4.17912 10.3041 4.375 10.0625 4.375H0.4375C0.195875 4.375 0 4.17912 0 3.9375Z"
                fill="#898989"
              />
            </svg>
          </span>
          <span className="ps-date-label">{dateLabel}</span>
          <span className="ps-date-chevron">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#898989"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            ref={dateInputRef}
            type="date"
            className="ps-date-input"
            onChange={(e) => {
              const value = e.target.value
              if (!value) return
              const d = new Date(value)
              if (Number.isNaN(d.getTime())) return
              const formatted = d.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              setDateLabel(formatted)
            }}
          />
        </div>
        <div className="package-summary-controls">
          <div className="package-summary-search-wrapper">
            <input
              type="text"
              className="package-summary-search"
              placeholder="Search transaction"
            />
            <span className="package-summary-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle
                  cx="6.25"
                  cy="6.25"
                  r="4.5"
                  stroke="#B3B3B3"
                  strokeWidth="1.2"
                />
                <line
                  x1="9.1"
                  y1="9.6"
                  x2="12.2"
                  y2="12.7"
                  stroke="#B3B3B3"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <button className="package-summary-download" type="button">
            <span className="ps-download-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="25"
                viewBox="0 0 5 25"
                fill="none"
              >
                <g filter="url(#filter0_f_121_1658)">
                  <path
                    d="M1.65601 2.62557C1.72142 1.35844 2.66456 1.4741 3.09055 1.5924C3.2018 1.6233 3.24441 1.75063 3.18984 1.85239C2.99079 2.22355 2.57454 3.08647 2.47636 3.97405C1.97336 8.52167 2.15949 16.6295 2.23028 19.0618C2.244 19.5334 2.21231 20.0049 2.13231 20.4698L1.65601 23.2381C1.65601 23.2381 1.35772 8.40478 1.65601 2.62557Z"
                    fill="white"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M1.65601 2.62557C1.72142 1.35844 2.66456 1.4741 3.09055 1.5924C3.2018 1.6233 3.24441 1.75063 3.18984 1.85239C2.99079 2.22355 2.57454 3.08647 2.47636 3.97405C1.97336 8.52167 2.15949 16.6295 2.23028 19.0618C2.244 19.5334 2.21231 20.0049 2.13231 20.4698L1.65601 23.2381C1.65601 23.2381 1.35772 8.40478 1.65601 2.62557Z"
                    fill="url(#paint0_linear_121_1658)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_121_1658"
                    x="-0.000372052"
                    y="-5.84126e-06"
                    width="4.73707"
                    height="24.7619"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="0.761905"
                      result="effect1_foregroundBlur_121_1658"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_121_1658"
                    x1="1.52344"
                    y1="2.10173"
                    x2="2.72716"
                    y2="2.52112"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="ps-download-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="4"
                viewBox="0 0 90 4"
                fill="none"
              >
                <g filter="url(#filter0_f_121_1659)">
                  <path
                    d="M1.61914 1.61905H88.2208"
                    stroke="white"
                    strokeWidth="0.190476"
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_121_1659"
                    x="-0.000372052"
                    y="-5.84126e-06"
                    width="89.8406"
                    height="3.23811"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="0.761905"
                      result="effect1_foregroundBlur_121_1659"
                    />
                  </filter>
                </defs>
              </svg>
            </span>
            <span className="ps-download-label">Download</span>
          </button>
        </div>
      </div>

      <div className="package-summary-table-container">
        <table className="package-summary-table">
          <thead>
            <tr>
              <th>
                Session Name
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ flexShrink: 0, marginLeft: 4 }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 6.85983C4.00628 6.71339 4.24372 6.71339 4.39017 6.85983L6 8.46967L7.60984 6.85983C7.75628 6.71339 7.99372 6.71339 8.14016 6.85983C8.28661 7.00628 8.28661 7.24372 8.14016 7.39017L6.26516 9.26516C6.11872 9.41161 5.88128 9.41161 5.73484 9.26516L3.85983 7.39017C3.71339 7.24372 3.71339 7.00628 3.85983 6.85983Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 5.14017C4.00628 5.28661 4.24372 5.28661 4.39017 5.14017L6 3.53033L7.60984 5.14017C7.75628 5.28661 7.99372 5.28661 8.14016 5.14017C8.28661 4.99372 8.28661 4.75628 8.14016 4.60983L6.26516 2.73484C6.11872 2.58839 5.88128 2.58839 5.73484 2.73484L3.85983 4.60983C3.71339 4.75628 3.71339 4.99372 3.85983 5.14017Z"
                    fill="white"
                  />
                </svg>
              </th>
              <th>
                Usage
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ flexShrink: 0, marginLeft: 4 }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 6.85983C4.00628 6.71339 4.24372 6.71339 4.39017 6.85983L6 8.46967L7.60984 6.85983C7.75628 6.71339 7.99372 6.71339 8.14016 6.85983C8.28661 7.00628 8.28661 7.24372 8.14016 7.39017L6.26516 9.26516C6.11872 9.41161 5.88128 9.41161 5.73484 9.26516L3.85983 7.39017C3.71339 7.24372 3.71339 7.00628 3.85983 6.85983Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 5.14017C4.00628 5.28661 4.24372 5.28661 4.39017 5.14017L6 3.53033L7.60984 5.14017C7.75628 5.28661 7.99372 5.28661 8.14016 5.14017C8.28661 4.99372 8.28661 4.75628 8.14016 4.60983L6.26516 2.73484C6.11872 2.58839 5.88128 2.58839 5.73484 2.73484L3.85983 4.60983C3.71339 4.75628 3.71339 4.99372 3.85983 5.14017Z"
                    fill="white"
                  />
                </svg>
              </th>
              <th>
                Validity
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ flexShrink: 0, marginLeft: 4 }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 6.85983C4.00628 6.71339 4.24372 6.71339 4.39017 6.85983L6 8.46967L7.60984 6.85983C7.75628 6.71339 7.99372 6.71339 8.14016 6.85983C8.28661 7.00628 8.28661 7.24372 8.14016 7.39017L6.26516 9.26516C6.11872 9.41161 5.88128 9.41161 5.73484 9.26516L3.85983 7.39017C3.71339 7.24372 3.71339 7.00628 3.85983 6.85983Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 5.14017C4.00628 5.28661 4.24372 5.28661 4.39017 5.14017L6 3.53033L7.60984 5.14017C7.75628 5.28661 7.99372 5.28661 8.14016 5.14017C8.28661 4.99372 8.28661 4.75628 8.14016 4.60983L6.26516 2.73484C6.11872 2.58839 5.88128 2.58839 5.73484 2.73484L3.85983 4.60983C3.71339 4.75628 3.71339 4.99372 3.85983 5.14017Z"
                    fill="white"
                  />
                </svg>
              </th>
              <th>
                Fees
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ flexShrink: 0, marginLeft: 4 }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 6.85983C4.00628 6.71339 4.24372 6.71339 4.39017 6.85983L6 8.46967L7.60984 6.85983C7.75628 6.71339 7.99372 6.71339 8.14016 6.85983C8.28661 7.00628 8.28661 7.24372 8.14016 7.39017L6.26516 9.26516C6.11872 9.41161 5.88128 9.41161 5.73484 9.26516L3.85983 7.39017C3.71339 7.24372 3.71339 7.00628 3.85983 6.85983Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 5.14017C4.00628 5.28661 4.24372 5.28661 4.39017 5.14017L6 3.53033L7.60984 5.14017C7.75628 5.28661 7.99372 5.28661 8.14016 5.14017C8.28661 4.99372 8.28661 4.75628 8.14016 4.60983L6.26516 2.73484C6.11872 2.58839 5.88128 2.58839 5.73484 2.73484L3.85983 4.60983C3.71339 4.75628 3.71339 4.99372 3.85983 5.14017Z"
                    fill="white"
                  />
                </svg>
              </th>
              <th>
                Status
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ flexShrink: 0, marginLeft: 4 }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 6.85983C4.00628 6.71339 4.24372 6.71339 4.39017 6.85983L6 8.46967L7.60984 6.85983C7.75628 6.71339 7.99372 6.71339 8.14016 6.85983C8.28661 7.00628 8.28661 7.24372 8.14016 7.39017L6.26516 9.26516C6.11872 9.41161 5.88128 9.41161 5.73484 9.26516L3.85983 7.39017C3.71339 7.24372 3.71339 7.00628 3.85983 6.85983Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.85983 5.14017C4.00628 5.28661 4.24372 5.28661 4.39017 5.14017L6 3.53033L7.60984 5.14017C7.75628 5.28661 7.99372 5.28661 8.14016 5.14017C8.28661 4.99372 8.28661 4.75628 8.14016 4.60983L6.26516 2.73484C6.11872 2.58839 5.88128 2.58839 5.73484 2.73484L3.85983 4.60983C3.71339 4.75628 3.71339 4.99372 3.85983 5.14017Z"
                    fill="white"
                  />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, idx) => (
              <tr key={idx}>
                <td>
                  <p>{session.name}</p>
                  <p className="text-muted">Number of sessions - 12</p>
                </td>
                <td>
                  <p>{session.sessions}</p>
                  <p className="text-muted">2/10 (2 out of 2 sessions)</p>
                </td>
                <td>
                  <p>{session.validity}</p>
                  <p className="text-muted">Start date - End date</p>
                </td>
                <td>{session.fees}</td>
                <td>
                  <span className={`status-pill ${session.status === "Completed" ? "status-completed" : "status-ongoing"}`}>
                    {session.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="package-summary-pagination">
        <button type="button" className="ps-page-btn ps-page-btn-prev ps-page-btn--inactive">
          <span className="ps-page-glow-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="24"
              viewBox="0 0 7 24"
              fill="none"
            >
              <g filter="url(#filter0_f_134_1769)">
                <path
                  d="M1.74815 2.46143C1.90823 1.25841 4.24391 1.38489 5.25381 1.49706C5.41629 1.51511 5.46548 1.72713 5.33478 1.82533C4.82315 2.20974 3.94973 2.95785 3.7308 3.72563C2.65711 7.49105 2.8826 13.86 3.06779 16.8674C3.13528 17.9633 2.95634 19.0618 2.51114 20.0655L1.74815 21.7857C1.74815 21.7857 1.02721 7.87944 1.74815 2.46143Z"
                  fill="white"
                  fillOpacity="0.3"
                />
                <path
                  d="M1.74815 2.46143C1.90823 1.25841 4.24391 1.38489 5.25381 1.49706C5.41629 1.51511 5.46548 1.72713 5.33478 1.82533C4.82315 2.20974 3.94973 2.95785 3.7308 3.72563C2.65711 7.49105 2.8826 13.86 3.06779 16.8674C3.13528 17.9633 2.95634 19.0618 2.51114 20.0655L1.74815 21.7857C1.74815 21.7857 1.02721 7.87944 1.74815 2.46143Z"
                  fill="url(#paint0_linear_134_1769)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_134_1769"
                  x="-0.000810742"
                  y="-1.72853e-05"
                  width="6.83951"
                  height="23.2142"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="0.714273"
                    result="effect1_foregroundBlur_134_1769"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_134_1769"
                  x1="1.42773"
                  y1="1.97033"
                  x2="3.23336"
                  y2="3.59215"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="ps-page-top-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="4"
              viewBox="0 0 21 4"
              fill="none"
            >
              <g filter="url(#filter0_f_134_1784)">
                <path
                  d="M18.6602 1.51782L1.5173 1.51782"
                  stroke="white"
                  strokeWidth="0.178568"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_134_1784"
                  x="-0.000810742"
                  y="-1.72853e-05"
                  width="20.1794"
                  height="3.03568"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="0.714273"
                    result="effect1_foregroundBlur_134_1784"
                  />
                </filter>
              </defs>
            </svg>
          </span>
          <span className="ps-page-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g filter="url(#filter0_d_134_1775)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2329 4.18414C10.4626 4.423 10.4551 4.80282 10.2163 5.0325L7.06605 8L10.2163 10.9675C10.4551 11.1972 10.4626 11.577 10.2329 11.8159C10.0032 12.0547 9.62339 12.0622 9.38452 11.8325L5.78452 8.4325C5.66688 8.31938 5.60039 8.16321 5.60039 8C5.60039 7.83679 5.66688 7.68062 5.78452 7.5675L9.38452 4.1675C9.62339 3.93782 10.0032 3.94527 10.2329 4.18414Z"
                  fill="#EAEAEA"
                />
              </g>
            </svg>
          </span>
        </button>
        <span className="ps-page-indicator">1/20</span>
        <button type="button" className="ps-page-btn ps-page-btn-next ps-page-btn--active">
          <span className="ps-page-glow-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="24"
              viewBox="0 0 7 24"
              fill="none"
            >
              <g filter="url(#filter0_f_134_1783)">
                <path
                  d="M5.08974 2.46143C4.92966 1.25841 2.59398 1.38489 1.58408 1.49706C1.4216 1.51511 1.37241 1.72713 1.50311 1.82533C2.01474 2.20974 2.88816 2.95785 3.10709 3.72563C4.18078 7.49105 3.95529 13.86 3.7701 16.8674C3.70261 17.9633 3.88155 19.0618 4.32675 20.0655L5.08974 21.7857C5.08974 21.7857 5.81068 7.87944 5.08974 2.46143Z"
                  fill="white"
                  fillOpacity="0.3"
                />
                <path
                  d="M5.08974 2.46143C4.92966 1.25841 2.59398 1.38489 1.58408 1.49706C1.4216 1.51511 1.37241 1.72713 1.50311 1.82533C2.01474 2.20974 2.88816 2.95785 3.10709 3.72563C4.18078 7.49105 3.95529 13.86 3.7701 16.8674C3.70261 17.9633 3.88155 19.0618 4.32675 20.0655L5.08974 21.7857C5.08974 21.7857 5.81068 7.87944 5.08974 2.46143Z"
                  fill="url(#paint0_linear_134_1783)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_134_1783"
                  x="-0.000810742"
                  y="-1.72853e-05"
                  width="6.83951"
                  height="23.2142"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="0.714273"
                    result="effect1_foregroundBlur_134_1783"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_134_1783"
                  x1="5.41016"
                  y1="1.97033"
                  x2="3.60453"
                  y2="3.59215"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="ps-page-top-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="4"
              viewBox="0 0 21 4"
              fill="none"
            >
              <g filter="url(#filter0_f_134_1784)">
                <path
                  d="M18.6602 1.51782L1.5173 1.51782"
                  stroke="white"
                  strokeWidth="0.178568"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_134_1784"
                  x="-0.000810742"
                  y="-1.72853e-05"
                  width="20.1794"
                  height="3.03568"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="0.714273"
                    result="effect1_foregroundBlur_134_1784"
                  />
                </filter>
              </defs>
            </svg>
          </span>
          <span className="ps-page-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="10"
              viewBox="0 0 5 10"
              fill="none"
            >
              <g filter="url(#filter0_d_3138_292)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.167501 0.184136C-0.0621751 0.422999 -0.0547276 0.802824 0.184136 1.0325L3.33434 4L0.184136 6.9675C-0.0547272 7.19718 -0.0621748 7.577 0.167501 7.81587C0.397177 8.05473 0.777003 8.06218 1.01587 7.8325L4.61587 4.4325C4.73351 4.31938 4.8 4.16321 4.8 4C4.8 3.83679 4.73351 3.68062 4.61587 3.5675L1.01587 0.167501C0.777003 -0.0621752 0.397177 -0.0547276 0.167501 0.184136Z"
                  fill="#EAEAEA"
                />
              </g>
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}
