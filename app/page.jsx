import GPACalculator from "./GPACalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
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
  .gpa-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .gpa-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .gpa-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .gpa-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .gpa-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .gpa-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #bfdbfe; line-height: 1; margin-bottom: .4rem; }
  .gpa-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .gpa-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #1d4ed8; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .gpa-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .gpa-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
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

const FAQ = [
  {
    q: "What's the difference between weighted and unweighted GPA?",
    a: "This calculator uses a weighted GPA — credit hours act as weights, so a 4-credit course counts four times as much as a 1-credit course. Unweighted GPAs treat every course equally regardless of credits. Most colleges use weighted GPAs; high schools vary. If your school doesn't use credit hours, enter '1' for every course to get an unweighted average."
  },
  {
    q: "Does my school use plus/minus grading?",
    a: "Not all schools use plus/minus grades. Some use only whole letter grades (A, B, C, D, F). If your school doesn't use plus/minus, simply ignore those options — the point values for A, B, C, D, F remain the same as the base letter. Check with your institution's grading policy to be sure."
  },
  {
    q: "How do I calculate what grades I need to raise my GPA?",
    a: "Use the 'What GPA do I need going forward?' section. Enter your target GPA and the number of future credits you plan to take. The calculator tells you the approximate average grade needed. For example, to raise a 3.0 to a 3.3 over 30 credits, you'd need roughly a B+ average — very achievable. To raise it to a 3.8 over 12 credits, you'd need nearly straight A's."
  },
  {
    q: "Do transfer credits affect my GPA?",
    a: "Many schools do not include transfer credits in the cumulative GPA calculation — only grades earned at that institution. Before including transferred coursework in this calculator, verify your school's policy. If transfer credits are excluded, calculate GPA using only courses taken at your current school."
  },
  {
    q: "What's the difference between semester and quarter credits?",
    a: "This calculator treats all credits as semester hours. If your school uses the quarter system, quarter credits are typically worth 2/3 of a semester credit (e.g., 3 quarter credits = 2 semester credits). Either convert your quarter credits to semester hours before entering them, or use the calculator as-is for relative comparison — the GPA result will be the same but total credits will reflect quarter units."
  },
  {
    q: "What's a good GPA for graduate school?",
    a: "Minimums vary by program, but competitive graduate programs typically expect a 3.0 minimum, with many looking for 3.3–3.5+. STEM and professional programs may have lower minimums; competitive humanities and social science programs often expect 3.5+. Use the target GPA tool to see what grades you'd need in remaining credits to reach your target. Some programs also consider GPA trends upward — improving grades over time can offset a lower overall GPA."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="gpa-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="gpa-header">
          <p className="gpa-eyebrow">Academic Tools</p>
          <h1 className="gpa-title">GPA<br /><em>Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate your cumulative GPA using letter grades and credit hours. Add your courses, see your GPA, academic standing, and plan what grades you need to reach your target.
        </p>

        <GPACalculator />

        {/* GRADE SCALE */}
        <div className="gpa-card">
          <p className="gpa-section-title">Grade scale reference</p>
          <table className="gpa-grade-table">
            <thead>
              <tr><th>Letter grade</th><th>Grade points</th><th>Percentage range</th><th>Description</th></tr>
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
                  <td style={{ color: (() => { const v = parseFloat(pts); if (v >= 3.7) return "#1d4ed8"; if (v >= 3.0) return "#2d6a4f"; if (v >= 2.0) return "#b45309"; return "#b91c1c"; })() }}>{letter}</td>
                  <td>{pts}</td>
                  <td>{pct}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: "11px", color: "#aaa", marginTop: ".75rem" }}>Percentage ranges are common but vary by institution. Always refer to your school's official grading policy.</p>
        </div>

        {/* ACADEMIC STANDING */}
        <div className="gpa-card">
          <p className="gpa-section-title">Academic standing by GPA range</p>
          <div className="gpa-standing-grid">
            {[
              { range: "3.9 – 4.0", label: "Summa Cum Laude", body: "The highest academic distinction, typically requiring a near-perfect GPA. Often noted on transcripts and diplomas." },
              { range: "3.7 – 3.89", label: "Magna Cum Laude", body: "Second highest Latin honor. Awarded at graduation and carries significant weight in graduate school and job applications." },
              { range: "3.5 – 3.69", label: "Cum Laude", body: "Third Latin honor. A strong indicator of consistent academic performance across all coursework." },
              { range: "3.0 – 3.49", label: "Good Standing", body: "Meets most graduate school minimums and reflects solid academic performance throughout a degree program." },
              { range: "2.0 – 2.99", label: "Satisfactory", body: "Meets minimum graduation requirements at most institutions, but may limit graduate school and scholarship eligibility." },
              { range: "Below 2.0", label: "Academic Risk", body: "Below the minimum GPA required to graduate at most schools. May trigger academic probation depending on institution policy." },
            ].map((s, i) => (
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
            <p>GPA stands for Grade Point Average. It is calculated by multiplying each course's grade point value by the number of credit hours, summing those products across all courses, and dividing by the total number of credit hours. This weighted average ensures that a 4-credit course has more influence on your GPA than a 1-credit elective.</p>
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
              <p className="gpa-info-body">Many schools do not include transfer credits in the cumulative GPA calculation. Check your institution's policy before including transferred coursework in this calculator.</p>
            </div>
          </div>
        </div>

        {/* REAL-WORLD EXAMPLE */}
        <div className="gpa-card">
          <p className="gpa-section-title">Real-world example: How one semester changes your GPA</p>
          <div className="gpa-prose">
            <p><strong>Meet Alex.</strong> He's a sophomore with 60 credits and a 3.0 GPA. He wants to know if he can raise it to a 3.3 by graduation.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#fff1f2", padding: "1rem", borderRadius: "4px", border: "1px solid #fcd4d4" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#b91c1c", marginBottom: ".5rem" }}>⚠️ If he gets B's (3.0)</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>Next 60 credits all at 3.0</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>New GPA:</strong> 3.0 (no change)</p>
              <p style={{ fontSize: "13px", color: "#b91c1c", fontWeight: "500", marginTop: ".5rem" }}>He graduates with the same GPA — no progress.</p>
            </div>
            
            <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: "4px", border: "1px solid #b7d9c8" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#166534", marginBottom: ".5rem" }}>✅ If he gets A- (3.7) average</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>Next 60 credits at 3.7 average</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>New GPA:</strong> 3.35</p>
              <p style={{ fontSize: "13px", color: "#166534", fontWeight: "500", marginTop: ".5rem" }}>He reaches his target of 3.3 by graduation.</p>
            </div>
          </div>
          
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
            <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: "500", marginBottom: ".25rem" }}>The bottom line:</p>
            <p style={{ fontSize: "13px", color: "#444" }}>Knowing your target and what grades you need makes the goal concrete. Alex now knows he needs roughly an A- average moving forward — not perfection, but a clear, achievable target he can track each semester.</p>
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

        {/* FAQ */}
        <div className="gpa-card">
          <p className="gpa-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="gpa-faq-item" key={i}>
              <p className="gpa-faq-q">{item.q}</p>
              <p className="gpa-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="gpa-card">
          <p className="gpa-section-title">Related tools</p>
          <p className="gpa-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="gpa-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="gpa-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="gpa-disclaimer">
            This tool provides estimates for informational purposes only. Grade scales vary by institution. Always refer to your school's official grading policy. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="gpa-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}