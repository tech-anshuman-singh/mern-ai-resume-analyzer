import { useState } from "react";
import axios from "axios";
import { FileText, UploadCloud, Sparkles, CheckCircle2, AlertCircle, Target, Lightbulb, RotateCcw } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ListBlock({ title, items, icon: Icon, tone }) {
  return <section className={`result-card ${tone}`}>
    <h3><Icon size={18}/>{title}</h3>
    {items?.length ? <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul> : <p className="muted">No items returned.</p>}
  </section>;
}

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setResult(null);
    if (!file) return setError("Please choose your resume PDF.");
    if (!jobDescription.trim()) return setError("Please paste the job description.");
    const form = new FormData();
    form.append("resume", file);
    form.append("jobDescription", jobDescription);
    try {
      setLoading(true);
      const response = await axios.post(`${API}/api/analyze`, form);
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.message || "Could not connect to backend. Check that the backend is running.");
    } finally { setLoading(false); }
  }

  function reset() { setResult(null); setError(""); setFile(null); setJobDescription(""); }

  return <main className="shell">
    <nav className="nav"><div className="brand"><span className="brand-icon"><Sparkles size={19}/></span> Resume<span>AI</span></div><span className="nav-tag">MERN + Gemini</span></nav>
    <header className="hero">
      <div className="eyebrow"><Sparkles size={14}/> SMART CAREER TOOL</div>
      <h1>Make your resume<br/><em>work smarter.</em></h1>
      <p>Compare your resume with a job description and get practical, AI-powered feedback to improve your chances.</p>
    </header>

    <form className="analyzer" onSubmit={handleSubmit}>
      <div className="section-heading"><span>01</span><div><h2>Upload your resume</h2><p>Choose a text-based PDF file (max 5 MB).</p></div></div>
      <label className="upload" htmlFor="resume">
        <input id="resume" type="file" accept="application/pdf,.pdf" onChange={e => setFile(e.target.files?.[0] || null)}/>
        <span className="upload-icon"><UploadCloud size={25}/></span>
        <strong>{file ? file.name : "Click to upload your resume"}</strong>
        <small>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF format only"}</small>
      </label>
      <div className="section-heading second"><span>02</span><div><h2>Add the job description</h2><p>Paste the role requirements you want to target.</p></div></div>
      <textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste the complete job description here..." rows={7}/>
      {error && <div className="error"><AlertCircle size={17}/>{error}</div>}
      <button className="analyze-btn" disabled={loading}>{loading ? <><span className="spinner"/> Analyzing resume...</> : <><Sparkles size={18}/> Analyze my resume</>}</button>
      <p className="privacy">Your resume is processed for this analysis. Avoid uploading documents containing information you do not want sent to the AI provider.</p>
    </form>

    {result && <div className="results">
      <div className="results-top"><div><div className="eyebrow">YOUR ANALYSIS</div><h2>Resume insights</h2></div><button className="reset" onClick={reset}><RotateCcw size={15}/> New analysis</button></div>
      <div className="score-card">
        <div className="score"><strong>{Number(result.matchScore) || 0}</strong><span>/ 100</span></div>
        <div><div className="score-label"><Target size={17}/> JOB MATCH SCORE</div><h3>{result.verdict || "Your analysis is ready"}</h3><p>{result.candidateSummary}</p></div>
      </div>
      <div className="result-grid">
        <ListBlock title="Your strengths" items={result.strengths} icon={CheckCircle2} tone="good"/>
        <ListBlock title="Skills to improve" items={result.missingSkills} icon={AlertCircle} tone="warn"/>
        <ListBlock title="Recommended changes" items={result.improvements} icon={Lightbulb} tone="blue"/>
        <ListBlock title="Useful keywords" items={result.keywordSuggestions} icon={FileText} tone="purple"/>
      </div>
    </div>}
    <footer>Built with React, Node.js, Express, MongoDB and Google Gemini</footer>
  </main>;
}
