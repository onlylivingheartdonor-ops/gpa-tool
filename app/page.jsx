"use client"

import { useState } from "react"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .gpa-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .gpa-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .gpa-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .gpa-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .gpa-title em { font-style: italic; color: #1d4ed8; }
  .gpa-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .gpa-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .gpa-course-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 32px; gap: .6rem; margin-bottom: .4rem; }
  .gpa-col-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #aaa; }
  .gpa-course-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 32px; gap: .6rem; margin-bottom: .5rem; align-items: end; }
  .gpa-course-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .95rem; color: #1a1a1a; padding: .35rem 0; outline: none; transition: border-color .2s; }
  .gpa-course-input:focus { border-color: #1d4ed8; }
  .gpa-course-input::placeholder { color: #ccc; }
  .gpa-grade-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .95rem; color: #1a1a1a; padding: .35rem 0; outline: none; cursor: pointer; appearance: none; transition: border-color .2s; }
  .gpa-grade-select:focus { border-color: #1d4ed8; }
  .gpa-remove-btn { background: none; border: none; cursor: pointer; color: #ddd; font-size: .9rem; padding: .2rem; transition: color .15s; line-height: 1; align-self: end; padding-bottom: .4rem; }
  .gpa-remove-btn:hover { color: #b91c1c; }

  .gpa-add-btn { display: flex; align-items: center; gap: .5rem; background: none; border: 1px dashed #e0dbd3; border-radius: 3px; width: 100%; padding: .65rem 1rem; font-family: 'DM Mono', monospace; font-size: 12px; color: #aaa; cursor: pointer; transition: all .15s; margin-bottom: 1.25rem; margin-top: .5rem; }
  .gpa-add-btn:hover { border-color: #1d4ed8; color: #1d4ed8; }

  .gpa-result-hero { text-align: center; padding: 1.5rem 1rem; border: 1px solid #e0dbd3; border-radius: 3px; margin-bottom: 1.25rem; background: #f9f8ff; }
  .gpa-result-label { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #888; margin-bottom: .4rem; }
  .gpa-result-gpa { font-family: 'DM Serif Display', serif; font-size: 4rem; line-height: 1; color: #1a1a1a; }
  .gpa-result-gpa.honor { color: #1d4ed8; }
  .gpa-result-gpa.warning { color: #b45309; }
  .gpa-result-gpa.danger { color: #b91c1c; }
  .gpa-result-standing { font-size: 13px; color: #888; margin-top: .4rem; }
  .gpa-result-standing span { color: #1a1a1a; font-weight: 500; }

  .gpa-result-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.25rem; }
  .gpa-result-cell { background: #fff; padding: .85rem 1rem; }
  .gpa-result-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .25rem; }
  .gpa-result-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #1a1a1a; }

  .gpa-course-breakdown { margin-bottom: 1rem; }
  .gpa-breakdown-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .6rem; }
  .gpa-breakdown-list { display: flex; flex-direction: column; gap: .35rem; }
  .gpa-breakdown-row { display: flex; align-items: center; gap: .75rem; padding: .5rem .75rem; background: #faf8f4; border-radius: 2px; font-size: 12px; }
  .gpa-breakdown-name { flex: 1; color: #555; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .gpa-breakdown-grade { min-width: 2rem; text-align: center; }
  .gpa-breakdown-pts { color: #888; min-width: 5rem; text-align: right; }
  .gpa-breakdown-bar-wrap { flex: 1; height: 3px; background: #e0dbd3; border-radius: 2px; overflow: hidden; }
  .gpa-breakdown-bar { height: 100%; border-radius: 2px; }

  .gpa-target-section { border: 1.5px dashed #bfdbfe; border-radius: 4px; padding: 1.25rem; }
  .gpa-target-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #1d4ed8; margin-bottom: .75rem; }
  .gpa-target-row { display: flex; align-items: center; gap: 1rem; margin-bottom: .75rem; }
  .gpa-target-label { font-size: 12px; color: #555; white-space: nowrap; }
  .gpa-target-input { flex: 1; border: none; border-bottom: 1.5px solid #bfdbfe; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .3rem 0; outline: none; transition: border-color .2s; }
  .gpa-target-input:focus { border-color: #1d4ed8; }
  .gpa-target-result { font-size: 12px; color: #1d4ed8; line-height: 1.6; min-height: 1.4em; }

  .gpa-grade-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .gpa-grade-table tr { border-bottom: 1px solid #e0dbd3; }
  .gpa-grade-table th { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #aaa; text-align: left; padding: .5rem .5rem; }
  .gpa-grade-table td { padding: .5rem .5rem; color: #444; }
  .gpa-grade-table td:first-child { color: #1a1a1a; font-weight: 500; }
  .gpa-grade-table td:last-child { color: #888; }

  .gpa-standing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .gpa-standing-item { padding: .75rem; border-left: 2px solid #bfdbfe; }
  .gpa-standing-range { font-size: 11px; letter-spacing: .04em; color: #1d4ed8; margin-bottom: .2rem; }
  .gpa-standing-label { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .2rem; }
  .gpa-standing-body { font-size: 12px; color: #888; line-height: 1.5; }

  .gpa-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .gpa-info-item { padding: .75rem; border-left: 2px solid #bfdbfe; }
  .gpa-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .gpa-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .gpa-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .gpa-prose p:last-child { margin-bottom: 0; }
  .gpa-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .gpa-prose ul li { margin-bottom: .3rem; }

  .gpa-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .gpa-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #bfdbfe; line-height: 1; margin-bottom: .4rem; }
  .gpa-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .gpa-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .gpa-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .gpa-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .gpa-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .gpa-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .gpa-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .gpa-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .gpa-course-header, .gpa-course-row { grid-template-columns: 2fr 1fr 1fr 28px; }
    .gpa-course-header .gpa-col-label:nth-child(4),
    .gpa-course-row > *:nth-child(4) { display: none; }
    .gpa-result-row, .gpa-standing-grid, .gpa-info-grid, .gpa-tip-grid { grid-template-columns: 1fr; }
  }
`

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

const STANDINGS = [
  { range: "3.9 – 4.0", label: "Summa Cum Laude",  body: "The highest academic distinction, typically requiring a near-perfect GPA. Often noted on transcripts and diplomas." },
  { range: "3.7 – 3.89", label: "Magna Cum Laude", body: "Second highest Latin honor. Awarded at graduation and carries significant weight in graduate school and job applications." },
  { range: "3.5 – 3.69", label: "Cum Laude",        body: "Third Latin honor. A strong indicator of consistent academic performance across all coursework." },
  { range: "3.0 – 3.49", label: "Good Standing",    body: "Meets most graduate school minimums and reflects solid academic performance throughout a degree program." },
  { range: "2.0 – 2.99", label: "Satisfactory",     body: "Meets minimum graduation requirements at most institutions, but may limit graduate school and scholarship eligibility." },
  { range: "Below 2.0",  label: "Academic Risk",    body: "Below the minimum GPA required to graduate at most schools. May trigger academic probation depending on institution policy." },
]

const RELATED = [
  { label: "Credit Card Debt Payoff Calculator",  href: "https://creditcarddebtpayoffcalculator.com" },
  { label: "Debt Reducing Calculator",            href: "https://debtreducingcalculator.com" },
  { label: "Side Hustle Tax Estimator",           href: "https://sidehustletaxestimator.com" },
  { label: "High Yield Savings Calculator",       href: "https://highyieldsavingscalculator.com" },
  { label: "Retirement Savings Gap",              href: "https://retirementsavingsgap.com" },
  { label: "Life Insurance Coverage Calculator",  href: "https://lifeinsurancecoveragecalculator.com" },
  { label: "Online Course ROI Calculator",        href: "https://onlinecourseroi.com" },
  { label: "Subscription Cost Calculator",        href: "https://mysubscriptioncost.com" },
  { label: "Email Attachment Size Checker",       href: "https://emailattachmentsize.com" },
  { label: "GPA Calculator",                      href: "https://gpacalculator.site" },
  { label: "YouTube Title Checker",               href: "https://youtubetitlechecker.com" },
  { label: "Strong Password Builder",             href: "https://strongpasswordbuilder.com" },
  { label: "Cool Username Generator",             href: "https://coolusernamegenerator.com" },
]

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
export default function Page() {
  const [courses, setCourses] = useState([
    { id: 1, name: "", grade: "", credits: "" },
  ])
  const [targetGPA, setTargetGPA]       = useState("")
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

  // Live calculation — no button needed
  const valid = courses.filter(c => c.grade && GRADE_MAP[c.grade] !== undefined && parseFloat(c.credits) > 0)
  const totalCredits = valid.reduce((s, c) => s + parseFloat(c.credits), 0)
  const totalPoints  = valid.reduce((s, c) => s + GRADE_MAP[c.grade] * parseFloat(c.credits), 0)
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : null
  const standing = gpa !== null ? getStanding(gpa) : null

  // Target GPA: what GPA do I need in remaining credits?
  let targetMsg = ""
  if (gpa !== null && targetGPA && targetCredits) {
    const tg = parseFloat(targetGPA), tc = parseFloat(targetCredits)
    if (tg >= 0 && tg <= 4 && tc > 0) {
      const needed = ((tg * (totalCredits + tc)) - totalPoints) / tc
      if (needed > 4.0) targetMsg = `You would need above a 4.0 in those ${tc} credits — not achievable with standard grading.`
      else if (needed < 0) targetMsg = `Your current GPA already exceeds ${tg.toFixed(2)} — you're on track.`
      else {
        const close = GRADES.reduce((prev, g) => Math.abs(g.points - needed) < Math.abs(prev.points - needed) ? g : prev)
        targetMsg = `You need approximately a ${needed.toFixed(2)} GPA (roughly ${close.letter} average) in your next ${tc} credits to reach a ${tg.toFixed(2)} cumulative GPA.`
      }
    }
  }

  const maxPts = valid.length > 0 ? Math.max(...valid.map(c => GRADE_MAP[c.grade])) : 4

  return (
    <>
      <style>{css}</style>
      <main className="gpa-wrap">

        <div className="gpa-header">
          <p className="gpa-eyebrow">Academic Tools</p>
          <h1 className="gpa-title">GPA<br /><em>Calculator</em></h1>
        </div>

        {/* TOOL */}
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
                <p className={`gpa-result-gpa ${standing.cls}`}>{gpa.toFixed(2)}</p>
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
                          <span className="gpa-breakdown-name">{c.name || `Course ${i + 1}`}</span>
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

        {/* GRADE SCALE */}
        <div className="gpa-card">
          <p className="gpa-section-title">Grade scale reference</p>
          <table className="gpa-grade-table">
            <thead>
              <tr>
                <th>Letter grade</th>
                <th>Grade points</th>
                <th>Percentage range</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["A+", "4.0", "97–100%", "Exceptional"],
                ["A",  "4.0", "93–96%",  "Excellent"],
                ["A-", "3.7", "90–92%",  "Near excellent"],
                ["B+", "3.3", "87–89%",  "Above average"],
                ["B",  "3.0", "83–86%",  "Good"],
                ["B-", "2.7", "80–82%",  "Above satisfactory"],
                ["C+", "2.3", "77–79%",  "Slightly above average"],
                ["C",  "2.0", "73–76%",  "Average"],
                ["C-", "1.7", "70–72%",  "Below average"],
                ["D+", "1.3", "67–69%",  "Marginal pass"],
                ["D",  "1.0", "63–66%",  "Passing"],
                ["D-", "0.7", "60–62%",  "Minimum passing"],
                ["F",  "0.0", "Below 60%","Failing"],
              ].map(([letter, pts, pct, desc]) => (
                <tr key={letter}>
                  <td style={{ color: gradeColor(parseFloat(pts)) }}>{letter}</td>
                  <td>{pts}</td>
                  <td>{pct}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: "11px", color: "#aaa", marginTop: ".75rem" }}>Percentage ranges are common but vary by institution. Always refer to your school&apos;s official grading policy.</p>
        </div>

        {/* ACADEMIC STANDING */}
        <div className="gpa-card">
          <p className="gpa-section-title">Academic standing by GPA range</p>
          <div className="gpa-standing-grid">
            {STANDINGS.map((s, i) => (
              <div className="gpa-standing-item" key={i}>
                <p className="gpa-standing-range">{s.range}</p>
                <p className="gpa-standing-label">{s.label}</p>
                <p className="gpa-standing-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW GPA WORKS */}
        <div className="gpa-card">
          <p className="gpa-section-title">How GPA is calculated</p>
          <div className="gpa-prose">
            <p>GPA stands for Grade Point Average. It is calculated by multiplying each course&apos;s grade point value by the number of credit hours, summing those products across all courses, and dividing by the total number of credit hours. This weighted average ensures that a 4-credit course has more influence on your GPA than a 1-credit elective.</p>
            <p>The formula is: GPA = (Sum of grade points × credit hours) ÷ total credit hours. This calculator uses the plus/minus scale (A+ through D−) used by most US colleges and universities, though some institutions use a simplified 4-point scale without plus/minus grades.</p>
          </div>
          <div className="gpa-info-grid">
            <div className="gpa-info-item">
              <p className="gpa-info-title">Weighted vs unweighted</p>
              <p className="gpa-info-body">This calculator uses a weighted GPA — credit hours act as weights, so higher-credit courses matter more. Some high schools report unweighted GPAs where every course counts equally regardless of credits.</p>
            </div>
            <div className="gpa-info-item">
              <p className="gpa-info-title">Plus/minus grading</p>
              <p className="gpa-info-body">Not all schools use plus/minus grades. If your school uses only whole letter grades (A, B, C, D, F), select those options and ignore the ± variants — they map to the same point values.</p>
            </div>
            <div className="gpa-info-item">
              <p className="gpa-info-title">Quality points</p>
              <p className="gpa-info-body">Quality points are the product of grade points and credit hours for a single course. Your GPA is simply total quality points divided by total credit hours — the number this calculator computes automatically.</p>
            </div>
            <div className="gpa-info-item">
              <p className="gpa-info-title">Transfer credits</p>
              <p className="gpa-info-body">Many schools do not include transfer credits in the cumulative GPA calculation. Check your institution&apos;s policy before including transferred coursework in this calculator.</p>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="gpa-card">
          <p className="gpa-section-title">How to protect and improve your GPA</p>
          <div className="gpa-tip-grid">
            <div>
              <p className="gpa-tip-num">01</p>
              <p className="gpa-tip-title">Prioritize high-credit courses</p>
              <p className="gpa-tip-body">A strong grade in a 4-credit course contributes more to your GPA than the same grade in a 1-credit course. When managing a heavy workload, allocate study time proportionally to credit weight.</p>
            </div>
            <div>
              <p className="gpa-tip-num">02</p>
              <p className="gpa-tip-title">Understand grade replacement policies</p>
              <p className="gpa-tip-body">Some schools allow you to retake a course and replace the original grade in the GPA calculation. If you have a damaging grade in a high-credit course, this can be one of the most effective tools available.</p>
            </div>
            <div>
              <p className="gpa-tip-num">03</p>
              <p className="gpa-tip-title">Use the target GPA tool early</p>
              <p className="gpa-tip-body">The target GPA calculator is most useful at the start of a semester, not the end. Knowing what average you need in upcoming courses gives you a concrete goal rather than a vague one.</p>
            </div>
            <div>
              <p className="gpa-tip-num">04</p>
              <p className="gpa-tip-title">Watch for academic standing thresholds</p>
              <p className="gpa-tip-body">Many programs, scholarships, and graduate school applications have hard GPA cutoffs — often 3.0 or 3.5. Knowing exactly where you stand relative to those thresholds helps you make informed decisions about course load and difficulty.</p>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="gpa-card">
          <p className="gpa-section-title">Related tools</p>
          <div className="gpa-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="gpa-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="gpa-disclaimer">
            This tool provides estimates based on standard 4.0 grading scales. GPA calculations vary by institution. Always verify with your registrar for official academic records. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="gpa-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
