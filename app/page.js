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
          This calculator averages your grades using credit weighting to determine your GPA. It also allows you to project future outcomes by calculating what GPA you need in upcoming courses to reach a target.
        </p>
        <p>
          By combining current performance with future goals, you can better plan how to improve or maintain your academic standing.
        </p>
      </div>

      {/* WHY */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>Why This Is Useful</h2>
        <p>
          GPA impacts scholarships, academic standing, and career opportunities. This tool helps you move beyond simply calculating GPA and instead focus on improving it.
        </p>
        <p>
          Knowing what grades you need can help you prioritize effort and make smarter academic decisions.
        </p>
      </div>

      {/* IF WEAK */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>If You’re Not Getting the Results You Want</h2>
        <ul>
          <li>Increase focus on high-credit courses</li>
          <li>Retake low-grade classes if possible</li>
          <li>Adjust course load for better performance</li>
          <li>Seek tutoring or additional support</li>
        </ul>
      </div>

      {/* OTHER METHODS */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>Other Successful Approaches</h2>
        <ul>
          <li>Focus on GPA-heavy semesters</li>
          <li>Strategic course selection</li>
          <li>Balancing workload difficulty</li>
        </ul>
      </div>

      {/* PLANNING */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>How to Plan Ahead</h2>
        <ul>
          <li>Track GPA regularly</li>
          <li>Set clear academic goals</li>
          <li>Balance course difficulty</li>
        </ul>
      </div>

      {/* RELATED */}
      <div style={{ background:"#fff", padding:"1.5rem", borderRadius:"10px", marginBottom:"1.5rem" }}>
        <h2>Related Tools</h2>
        <ul>
          <li onClick={()=>window.location.href="https://creditcarddebtpayoffcalculator.com"}>Credit Card Debt Payoff Calculator</li>
          <li onClick={()=>window.location.href="https://debtreducingcalculator.com"}>Debt Reducing Calculator</li>
          <li onClick={()=>window.location.href="https://sidehustletaxestimator.com"}>Side Hustle Tax Estimator</li>
          <li onClick={()=>window.location.href="https://highyieldsavingscalculator.com"}>High Yield Savings Calculator</li>
          <li onClick={()=>window.location.href="https://emailattachmentsize.com"}>Email Attachment Size Checker</li>
          <li onClick={()=>window.location.href="https://youtubetitlechecker.com"}>YouTube Title Checker</li>
          <li onClick={()=>window.location.href="https://strongpasswordbuilder.com"}>Strong Password Builder</li>
          <li onClick={()=>window.location.href="https://coolusernamegenerator.com"}>Cool Username Generator</li>
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
