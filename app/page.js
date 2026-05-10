"use client"

import { useState } from "react"

export default function Page() {
  const [courses, setCourses] = useState([{ grade: "", credits: 0 }])

  const addCourse = () => {
    setCourses([...courses, { grade: "", credits: 0 }])
  }

  const updateCourse = (index, field, value) => {
    const updated = [...courses]
    updated[index][field] = value
    setCourses(updated)
  }

  const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 }

  let totalPoints = 0
  let totalCredits = 0

  courses.forEach((c) => {
    const g = c.grade.toUpperCase()
    if (gradePoints[g] !== undefined && c.credits > 0) {
      totalPoints += gradePoints[g] * c.credits
      totalCredits += c.credits
    }
  })

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "—"

  return (
    <main style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "system-ui, sans-serif",
      background: "#f4f6fb",
      minHeight: "100vh"
    }}>

      <div style={{
        borderBottom: "1px solid #e2e8f0",
        background: "#ffffff",
        padding: "0.8rem 1.5rem",
        fontWeight: 600
      }}>
        GPA Calculator
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h1>GPA Calculator</h1>
        <p>Enter your letter grades and credit hours to calculate your GPA.</p>

        <div style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginTop: "1.5rem"
        }}>
          {courses.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                placeholder="Grade (A–F)"
                value={c.grade}
                onChange={(e) => updateCourse(i, "grade", e.target.value)}
                style={{ padding: "10px", width: "120px" }}
              />
              <input
                type="number"
                placeholder="Credits"
                value={c.credits}
                onChange={(e) => updateCourse(i, "credits", Number(e.target.value))}
                style={{ padding: "10px", width: "120px" }}
              />
            </div>
          ))}

          <button onClick={addCourse} style={{ marginBottom: "1rem" }}>
            + Add Course
          </button>

          <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
            <strong>Your GPA:</strong> {gpa}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: "2rem",
        background: "#ffffff",
        padding: "1.5rem",
        borderRadius: "10px"
      }}>
        <h2>How GPA Is Calculated</h2>
        <p>
          GPA is calculated by multiplying each course’s credit hours by the numeric
          value of the grade earned, then dividing by total credits.
        </p>

        <h2 style={{ marginTop: "1rem" }}>Standard Grade Scale</h2>
        <ul>
          <li>A = 4.0</li>
          <li>B = 3.0</li>
          <li>C = 2.0</li>
          <li>D = 1.0</li>
          <li>F = 0.0</li>
        </ul>

        <h2 style={{ marginTop: "1rem" }}>About This Tool</h2>
        <p>
          This GPA calculator provides a quick way for students to estimate academic
          performance using commonly accepted grading standards.
        </p>
      </div>

      <div style={{
        marginTop: "2rem",
        background: "#ffffff",
        padding: "1.5rem",
        borderRadius: "10px"
      }}>
       <div
  style={{
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "10px",
    marginBottom: "1.5rem"
  }}
>
  <h2>Related Tools</h2>
  <ul>
    <li onClick={() => window.location.href = "https://creditcarddebtpayoffcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Credit Card Debt Payoff Calculator
    </li>
    <li onClick={() => window.location.href = "https://debtreducingcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Debt Reducing Calculator
    </li>
    <li onClick={() => window.location.href = "https://sidehustletaxestimator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Side Hustle Tax Estimator
    </li>
    <li onClick={() => window.location.href = "https://highyieldsavingscalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      High Yield Savings Calculator
    </li>
    <li onClick={() => window.location.href = "https://retirementsavingsgap.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Retirement Savings Gap
    </li>
    <li onClick={() => window.location.href = "https://lifeinsurancecoveragecalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Life Insurance Coverage Calculator
    </li>
    <li onClick={() => window.location.href = "https://onlinecourseroi.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Online Course ROI Calculator
    </li>
    <li onClick={() => window.location.href = "https://mysubscriptioncost.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Subscription Cost Calculator
    </li>
    <li onClick={() => window.location.href = "https://emailattachmentsize.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Email Attachment Size Checker
    </li>
    <li onClick={() => window.location.href = "https://gpacalculator.site"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      GPA Calculator
    </li>
    <li onClick={() => window.location.href = "https://youtubetitlechecker.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      YouTube Title Checker
    </li>
    <li onClick={() => window.location.href = "https://strongpasswordbuilder.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Strong Password Builder
    </li>
    <li onClick={() => window.location.href = "https://coolusernamegenerator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Cool Username Generator
    </li>
  </ul>
</div>
      </div>

      <div style={{ marginTop: "1rem", fontSize: "13px", color: "#666" }}>
        This tool provides estimates for informational purposes only.
      </div>

      <div style={{ marginTop: "1.5rem", fontSize: "13px", color: "#555" }}>
        This site may use cookies and analytics. By using this site,
        you agree to our Privacy Policy and Terms of Service.
      </div>

      <div style={{
        marginTop: "1rem",
        paddingTop: "1rem",
        borderTop: "1px solid #e2e8f0",
        fontSize: "14px"
      }}>
        <span onClick={() => window.location.href = "/privacy"} style={{ cursor: "pointer", textDecoration: "underline" }}>
          Privacy Policy
        </span>
        {" | "}
        <span onClick={() => window.location.href = "/terms"} style={{ cursor: "pointer", textDecoration: "underline" }}>
          Terms of Service
        </span>
      </div>

    </main>
  )
}
