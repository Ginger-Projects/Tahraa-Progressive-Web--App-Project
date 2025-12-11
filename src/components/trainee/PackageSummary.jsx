import { useEffect, useState } from "react"
import { ChevronDown, MoreVertical } from "lucide-react"
import { getTraineePackageSummary } from "../../services/trainee/trainee"
import "./PackageSummary.css"

export default function PackageSummary() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRange, setSelectedRange] = useState("thisMonth")

  useEffect(() => {
    const now = new Date()

    const formatDateForApi = (date) => date.toISOString().split(".")[0] + "Z"

    const currentMonthStart = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0))
    const nextMonthStart = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0))

    let rangeStart
    let rangeEnd

    if (selectedRange === "thisMonth") {
      rangeStart = currentMonthStart
      rangeEnd = nextMonthStart
    } else {
      const prevMonth = now.getMonth() - 1
      const prevMonthYear = prevMonth < 0 ? now.getFullYear() - 1 : now.getFullYear()
      const prevMonthIndex = prevMonth < 0 ? 11 : prevMonth

      const prevMonthStart = new Date(
        Date.UTC(prevMonthYear, prevMonthIndex, 1, 0, 0, 0, 0),
      )

      rangeStart = prevMonthStart
      rangeEnd = currentMonthStart
    }

    const startDate = formatDateForApi(rangeStart)
    const endDate = formatDateForApi(rangeEnd)

    const fetchPackages = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getTraineePackageSummary({ startDate, endDate })
        console.log("data",data)
        const items = data?.data?.packageSummary || []
        setPackages(items)
      } catch (err) {
        console.error(err)
        setError("Unable to load package summary")
        setPackages([])
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [selectedRange])

  return (
    <div className="package-summary-card">
      <div className="package-summary-header">
        <h2 className="package-summary-title">Package Summary</h2>
        <div className="package-summary-controls">
          <select
            className="package-summary-select"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
          
        </div>
      </div>

      <div className="package-summary-table-container">
        {loading ? (
          <div className="package-summary-empty">Loading...</div>
        ) : !packages || packages.length === 0 ? (
          <div className="package-summary-empty">No package summary</div>
        ) : (
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
            {packages.map((pkg) => {
              const totalSessions = pkg?.usage?.totalSessions ?? 0
              const completedSessions = pkg?.usage?.completedSessions ?? 0
              const sessionsDisplay = `${completedSessions}/${totalSessions}`
              const status = totalSessions > 0 && completedSessions === totalSessions ? "Completed" : "On Going"
              const startDate = pkg?.validity?.startDate ? new Date(pkg.validity.startDate) : null
              const endDate = pkg?.validity?.endDate ? new Date(pkg.validity.endDate) : null
              const validityDisplay =
                startDate && endDate
                  ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                  : ""
              const sessionsPaidAmount = pkg?.fees?.sessionsPaidAmount

              return (
                <tr key={pkg.bookingId}>
                  <td>
                    <p>{pkg.packageName}</p>
                    <p className="text-muted">Number of sessions - {totalSessions}</p>
                  </td>
                  <td>
                    <p>{sessionsDisplay}</p>
                    <p className="text-muted">
                      {completedSessions}/{totalSessions} (completed / total)
                    </p>
                  </td>
                  <td>
                    <p>{validityDisplay}</p>
                    <p className="text-muted">
                      {startDate && endDate
                        ? `Start date - ${startDate.toLocaleDateString()} | End date - ${endDate.toLocaleDateString()}`
                        : "Start date - End date"}
                    </p>
                  </td>
                  <td>{sessionsPaidAmount}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        status === "Completed" ? "status-completed" : "status-ongoing"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        )}
      </div>
    </div>
  )
}
