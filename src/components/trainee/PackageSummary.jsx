import { ChevronDown, MoreVertical } from "lucide-react"
import "./PackageSummary.css"

export default function PackageSummary() {
  const sessions = [
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "On Going" },
    { name: "Violin Class", sessions: "2/12", validity: "1st Jan - 1 Feb", fees: "QAR 200.00", status: "Completed" },
  ]

  return (
    <div className="package-summary-card">
      <div className="package-summary-header">
        <h2 className="package-summary-title">Package Summary</h2>
        <div className="package-summary-controls">
          <button className="package-summary-button">
            This Month <ChevronDown className="w-4 h-4" />
          </button>
          <button className="package-summary-icon-btn">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="package-summary-table-container">
        <table className="package-summary-table">
          <thead>
            <tr>
              <th>Session Name</th>
              <th>Usage</th>
              <th>Validity</th>
              <th>Fees</th>
              <th>Status</th>
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
