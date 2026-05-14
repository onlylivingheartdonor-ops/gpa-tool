"use client"

import { useState } from "react"

export default function Page() {
  const [courses, setCourses] = useState([{ grade: "A", credits: 3 }])
  const [gpa, setGpa] = useState(null)

  const [currentGpa, setCurrentGpa] = useState("")
  const [completedCredits, setCompletedCredits] = useState("")
  const [targetGpa, setTargetGpa] = useState("")
  const [requiredGpa, setRequiredGpa] = useState(null)

  const gradeMap = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D": 1.0, "F": 0
  }

  const calculateGpa = () => {
    let totalPoints = 0
    let totalCredits = 0

    courses.forEach((c) => {
      totalPoints += gradeMap[c.grade] * c.credits
      totalCredits += Number(c.credits)
    })

    setGpa((totalPoints / totalCredits).toFixed(2))
  }

  const calculateTarget = () => {
    const curr = Number(currentGpa)
    const credits = Number(completedCredits)
    const target = Number(targetGpa)

    if (!curr || !credits || !target) return

    const needed = ((target * (credits + 15)) - (curr * credits)) / 15
    setRequiredGpa(needed.toFixed(2))
  }

  const updateCourse = (index, field, value) => {
    const updated = [...courses]
    updated[index][field] = value
    setCourses(updated)
  }

  const addCourse = () => {
    setCourses([...courses, { grade: "A", credits: 3 }])
  }

  return (
    <main style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "2rem",
      background: "#f4f6fb",
      minHeight: "100vh",
      fontFamily: "system-ui"
    }}>

      {/* TOOL */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h1>GPA Calculator</h1>

        <h3>Current GPA</h3>
<div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
  <div style={{ width: "80px", fontWeight: "bold" }}>Grade</div>
  <div style={{ fontWeight: "bold" }}>Credits</div>
</div>
        {courses.map((c, i) => (
          <div key={i} style={{ marginBottom:"1rem" }}>
            <select value={c.grade} onChange={(e)=>updateCourse(i,"grade",e.target.value)}>
              {Object.keys(gradeMap).map(g => <option key={g}>{g}</option>)}
            </select>

            <input
              type="number"
              value={c.credits}
              onChange={(e)=>updateCourse(i,"credits",e.target.value)}
              style={{ marginLeft:"10px" }}
            />
          </div>
        ))}

        <button onClick={addCourse}>Add Class</button>
        <button onClick={calculateGpa} style={{ marginLeft:"10px" }}>Calculate GPA</button>

        {gpa && <p><strong>Your GPA:</strong> {gpa}</p>}

        <hr style={{ margin:"1.5rem 0" }} />

        <h3>Target GPA Calculator</h3>

        <input placeholder="Current GPA" value={currentGpa} onChange={(e)=>setCurrentGpa(e.target.value)} />
        <input placeholder="Credits Completed" value={completedCredits} onChange={(e)=>setCompletedCredits(e.target.value)} />
        <input placeholder="Desired GPA" value={targetGpa} onChange={(e)=>setTargetGpa(e.target.value)} />

        <br /><br />
        <button onClick={calculateTarget}>Calculate Required GPA</button>

        {requiredGpa && (
          <p><strong>GPA Needed Next Term:</strong> {requiredGpa}</p>
        )}
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>How This Works</h2>
        <p>
          This calculator converts each grade into a numeric value, multiplies it by the number of credits for that course, and averages the results to determine your GPA.
        </p>
      </div>

      {/* NEW: VISUAL EXPLANATION */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>How GPA Is Calculated</h2>

        <p>
          GPA is calculated using a weighted average based on your grades and course credits.
        </p>

        <p>
          The formula is:
        </p>

        <p><strong>Total Grade Points ÷ Total Credits = GPA</strong></p>

        <table style={{ width:"100%", borderCollapse:"collapse", marginTop:"1rem" }}>
          <thead>
            <tr>
              <th style={{ border:"1px solid #ccc", padding:"8px" }}>Course</th>
              <th style={{ border:"1px solid #ccc", padding:"8px" }}>Grade</th>
              <th style={{ border:"1px solid #ccc", padding:"8px" }}>Points</th>
              <th style={{ border:"1px solid #ccc", padding:"8px" }}>Credits</th>
              <th style={{ border:"1px solid #ccc", padding:"8px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>Math</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>A</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>4.0</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>3</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>12.0</td>
            </tr>
            <tr>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>English</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>B+</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>3.3</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>3</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>9.9</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop:"1rem" }}>
          Courses with more credits have a larger impact on your GPA, so performance in those classes matters more.
        </p>
      </div>

      {/* WHY */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>Why This Is Useful</h2>
        <p>
          GPA influences scholarships, academic standing, and future opportunities. This tool helps you not only calculate GPA but plan how to improve it.
        </p>
      </div>

      {/* IMPROVEMENT */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>If You’re Not Getting the Results You Want</h2>
        <ul>
          <li>Focus on high-credit courses</li>
          <li>Retake lower grades if possible</li>
          <li>Adjust course load</li>
        </ul>
      </div>

      {/* OTHER */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>Other Useful GPA Strategies</h2>
        <ul>
          <li>Plan future semesters strategically</li>
          <li>Balance difficult and easier classes</li>
          <li>Track progress regularly</li>
        </ul>
      </div>

      {/* PLAN */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>How to Plan Ahead</h2>
        <ul>
          <li>Set GPA goals early</li>
          <li>Monitor results after each term</li>
          <li>Adjust study effort accordingly</li>
        </ul>
      </div>

      {/* RELATED */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>Related Tools</h2>
        <ul>
          <li onClick={()=>window.location.href="https://creditcarddebtpayoffcalculator.com"}>Credit Card Debt Payoff Calculator</li>
          <li onClick={()=>window.location.href="https://debtreducingcalculator.com"}>Debt Reducing Calculator</li>
          <li onClick={()=>window.location.href="https://emailattachmentsize.com"}>Email Attachment Size Checker</li>
          <li onClick={()=>window.location.href="https://youtubetitlechecker.com"}>YouTube Title Checker</li>
        </ul>
      </div>

      {/* FOOTER */}
      <div>
        <span onClick={()=>window.location.href="/privacy"}>Privacy Policy</span> |{" "}
        <span onClick={()=>window.location.href="/terms"}>Terms</span>
      </div>

    </main>
  )
}

