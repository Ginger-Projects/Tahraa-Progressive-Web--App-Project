import "./PackageSummaryMain.css"

export default function PackageSummaryMain() {
  const sessions = [
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
  ]

  const today = new Date()
  const formattedDate = today
    .toLocaleDateString("en-GB") // dd/mm/yyyy
    .split("/")
    .map((part, index) => (index === 2 ? part.slice(2) : part))
    .join("-") // dd-mm-yy

  return (
    <div className="package-summary-card">
      <div className="package-summary-header">
        <div className="package-summary-date-box">{formattedDate}</div>
        <div className="package-summary-controls">
          <input
            type="text"
            className="package-summary-search"
            placeholder="Search transaction"
          />
          <button className="package-summary-download">
            Download
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
    </div>
  )
}
