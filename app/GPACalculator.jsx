"use client"

import { useState } from "react"

const GRADES = [
  { letter: "A+", points: 4.0 },
  { letter: "A",  points: 4.0 },
  { letter: "A-", points: 3.7 },
  { letter: "B+", points: 3.3 },
  { letter: "B",  points: 3.0 },
  { letter: "B-", points: 2.7 },
  { letter: "C+", points: 2.3 },
  { letter: "C",  points: 2.0 },
  { letter: "C-", points: 1.7 },
  { letter: "D+", points: 1.3 },
  { letter: "D",  points: 1.0 },
  { letter: "D-", points: 0.7 },
  { letter: "F",  points: 0.0 },
]

const GRADE_MAP = Object.fromEntries(GRADES.map(g => [g.letter, g.points]))

function getStanding(gpa) {
  if (gpa >= 3.9)  return { label: "Summa Cum Laude", color: "#1d4ed8", cls: "honor" }
  if (gpa >= 3.7)  return { label: "Magna Cum Laude", color: "#1d4ed8", cls: "honor" }
  if (gpa >= 3.5)  return { label: "Cum Laude",        color: "#1d4ed8", cls: "honor" }
  if (gpa >= 3.0)  return { label: "Good Standing",    color: "#1a1a1a", cls: "" }
  if (gpa >= 2.0)  return { label: "Satisfactory",     color: "#b45309", cls: "warning" }
  return                  { label: "Academic Risk",    color: "#b91c1c", cls: "danger" }
}

function gradeColor(pts) {
  if (pts >= 3.7) return "#1d4ed8"
  if (pts >= 3.0) return "#2d6a4f"
  if (pts >= 2.0) return "#b45309"
  return "#b91c1c"
}

let _nextId = 2

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: "", grade: "", credits: "" },
  ])
  const [targetGPA, setTargetGPA]         = useState("")
  const [targetCredits, setTargetCredits] = useState("")

  const addCourse = () => {
    setCourses(prev => [...prev, { id: _nextId++, name: "", grade: "", credits: "" }])
  }

  const removeCourse = (id) => {
    if (courses.length === 1) return
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  const update = (id, field, value) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const valid = courses.filter(c => c.grade && GRADE_MAP[c.grade] !== undefined && parseFloat(c.credits) > 0)
  const totalCredits = valid.reduce((s, c) => s + parseFloat(c.credits), 0)
  const totalPoints  = valid.reduce((s, c) => s + GRADE_MAP[c.grade] * parseFloat(c.credits), 0)
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : null
  const standing = gpa !== null ? getStanding(gpa) : null

  let targetMsg = ""
  if (gpa !== null && targetGPA && targetCredits) {
    const tg = parseFloat(targetGPA), tc = parseFloat(targetCredits)
    if (tg >= 0 && tg <= 4 && tc > 0) {
      const needed = ((tg * (totalCredits + tc)) - totalPoints) / tc
      if (needed > 4.0) {
        targetMsg = "You would need above a 4.0 in those " + tc + " credits — not achievable with standard grading."
      } else if (needed < 0) {
        targetMsg = "Your current GPA already exceeds " + tg.toFixed(2) + " — you're on track."
      } else {
        const close = GRADES.reduce((prev, g) => Math.abs(g.points - needed) < Math.abs(prev.points - needed) ? g : prev)
        targetMsg = "You need approximately a " + needed.toFixed(2) + " GPA (roughly " + close.letter + " average) in your next " + tc + " credits to reach a " + tg.toFixed(2) + " cumulative GPA."
      }
    }
  }

  const maxPts = valid.length > 0 ? Math.max(...valid.map(c => GRADE_MAP[c.grade])) : 4

  return (
    <div className="gpa-card">
      <div className="gpa-course-header">
        <span className="gpa-col-label">Course name</span>
        <span className="gpa-col-label">Grade</span>
        <span className="gpa-col-label">Credits</span>
        <span className="gpa-col-label">Points</span>
        <span />
      </div>

      {courses.map((c) => {
        const pts = c.grade && GRADE_MAP[c.grade] !== undefined ? GRADE_MAP[c.grade] : null
        const cr  = parseFloat(c.credits) || 0
        return (
          <div className="gpa-course-row" key={c.id}>
            <input
              className="gpa-course-input"
              placeholder="e.g. Calculus II"
              value={c.name}
              onChange={e => update(c.id, "name", e.target.value)}
            />
            <select
              className="gpa-grade-select"
              value={c.grade}
              onChange={e => update(c.id, "grade", e.target.value)}
            >
              <option value="">—</option>
              {GRADES.map(g => <option key={g.letter} value={g.letter}>{g.letter}</option>)}
            </select>
            <input
              className="gpa-course-input"
              type="number" min="0" step="0.5" placeholder="3"
              value={c.credits}
              onChange={e => update(c.id, "credits", e.target.value)}
            />
            <span style={{ fontSize: "13px", color: pts !== null ? gradeColor(pts) : "#ccc", alignSelf: "end", paddingBottom: ".4rem" }}>
              {pts !== null && cr > 0 ? (pts * cr).toFixed(1) : "—"}
            </span>
            <button className="gpa-remove-btn" onClick={() => removeCourse(c.id)}>✕</button>
          </div>
        )
      })}

      <button className="gpa-add-btn" onClick={addCourse}>+ Add course</button>

      {gpa !== null && (
        <>
          <div className="gpa-result-hero">
            <p className="gpa-result-label">Cumulative GPA</p>
            <p className={"gpa-result-gpa " + standing.cls}>{gpa.toFixed(2)}</p>
            <p className="gpa-result-standing">Academic standing: <span>{standing.label}</span></p>
          </div>

          <div className="gpa-result-row">
            <div className="gpa-result-cell">
              <p className="gpa-result-cell-label">Total credits</p>
              <p className="gpa-result-cell-val">{totalCredits}</p>
            </div>
            <div className="gpa-result-cell">
              <p className="gpa-result-cell-label">Quality points</p>
              <p className="gpa-result-cell-val">{totalPoints.toFixed(1)}</p>
            </div>
            <div className="gpa-result-cell">
              <p className="gpa-result-cell-label">Courses counted</p>
              <p className="gpa-result-cell-val">{valid.length}</p>
            </div>
          </div>

          {valid.length > 0 && (
            <div className="gpa-course-breakdown">
              <p className="gpa-breakdown-label">Course breakdown</p>
              <div className="gpa-breakdown-list">
                {valid.map((c, i) => {
                  const pts = GRADE_MAP[c.grade]
                  const barPct = Math.round(pts / 4.0 * 100)
                  return (
                    <div className="gpa-breakdown-row" key={c.id}>
                      <span className="gpa-breakdown-name">{c.name || "Course " + (i + 1)}</span>
                      <span className="gpa-breakdown-grade" style={{ color: gradeColor(pts) }}>{c.grade}</span>
                      <div className="gpa-breakdown-bar-wrap">
                        <div className="gpa-breakdown-bar" style={{ width: barPct + "%", background: gradeColor(pts) }} />
                      </div>
                      <span className="gpa-breakdown-pts">{pts.toFixed(1)} × {c.credits} cr = {(pts * parseFloat(c.credits)).toFixed(1)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="gpa-target-section">
            <p className="gpa-target-title">What GPA do I need going forward?</p>
            <div className="gpa-target-row">
              <span className="gpa-target-label">Target GPA</span>
              <input className="gpa-target-input" type="number" min="0" max="4" step="0.01" placeholder="3.50"
                value={targetGPA} onChange={e => setTargetGPA(e.target.value)} />
              <span className="gpa-target-label" style={{ marginLeft: ".5rem" }}>in</span>
              <input className="gpa-target-input" type="number" min="0" step="0.5" placeholder="15"
                value={targetCredits} onChange={e => setTargetCredits(e.target.value)} />
              <span className="gpa-target-label" style={{ marginLeft: ".5rem" }}>credits</span>
            </div>
            {targetMsg && <p className="gpa-target-result">{targetMsg}</p>}
          </div>
        </>
      )}
    </div>
  )
}