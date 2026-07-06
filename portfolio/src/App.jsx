import React, { useState } from "react";
import { 
  FileText, 
  Database, 
  Terminal, 
  Download, 
  Search, 
  Filter, 
  ShieldCheck, 
  User, 
  Cpu, 
  Layers, 
  ExternalLink, 
  FileSpreadsheet, 
  Code, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Mail, 
  Github, 
  Linkedin,
  Settings,
  Play,
  Braces,
  Cloud,
  Server,
  GitFork
} from "lucide-react";

export default function App() {
  // 1️⃣ STATE FOR DATA PIPELINE / EXCEL WEB DASHBOARD
  const seedData = [
    { id: 1, user: "ishita", email: "is***04@gmail.com", title: "hiii", content: "hiii my name is ishita, setting up this notes workspace.", tag: "General Tasks", time: "2026-07-06 15:04" },
    { id: 2, user: "ishita", email: "is***04@gmail.com", title: "bye", content: "goodbye world, ending today's journal tasks.", tag: "General Tasks", time: "2026-07-06 15:04" },
    { id: 3, user: "JOHN", email: "jo***25@gmail.com", title: "React state bugs", content: "fix the react useEffect loop bugs and test endpoints.", tag: "Development", time: "2026-07-06 15:01" },
    { id: 4, user: "ALICE", email: "al***88@university.edu", title: "Study Assignment 3", content: "complete the databases and backend exam study guide.", tag: "Academic", time: "2026-07-06 14:45" },
    { id: 5, user: "JOHN", email: "jo***25@gmail.com", title: "API endpoints docs", content: "design notes endpoints: GET /api/notes, POST /api/notes/add.", tag: "Development", time: "2026-07-06 14:15" },
  ];

  const [data, setData] = useState(seedData);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  
  // Terminal Logs State
  const [logs, setLogs] = useState([]);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  // Stats
  const totalNotes = data.length;
  const activeUsers = new Set(data.map(d => d.user)).size;

  // Filtered Data
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = tagFilter === "All" || item.tag === tagFilter;
    
    return matchesSearch && matchesTag;
  });

  // 2️⃣ SIMULATE PYTHON DATA PIPELINE RUN
  const runPipeline = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);
    setShowLogs(true);
    setLogs([]);

    const logSteps = [
      { text: "🐍 [System] Initializing Python virtual environment...", delay: 200 },
      { text: "📦 [System] Loading dependencies: pandas, pymongo, openpyxl, certifi...", delay: 600 },
      { text: "🔗 [MongoDB] Connecting to cloud cluster0.xxxx.mongodb.net...", delay: 1100 },
      { text: "🔒 [MongoDB] SSL Context secured using local certifi authority bundle.", delay: 1400 },
      { text: "✅ [MongoDB] Connection established. Database selected: 'test'", delay: 1800 },
      { text: "📊 [Pipeline] Querying 'notes' and 'users' collections...", delay: 2300 },
      { text: "📂 [Pipeline] Found 5 notes documents and 3 user accounts.", delay: 2700 },
      { text: "🔐 [PII Module] Anonymizing user emails with 3-tier masking logic...", delay: 3200 },
      { text: "🏷️ [NLP Module] Running keyword assignment engine...", delay: 3800 },
      { text: "🏷️ [NLP Module] Classification metrics: Development (2), Academic (1), General (2)", delay: 4200 },
      { text: "📊 [Export] Writing structured records to pandas.DataFrame...", delay: 4600 },
      { text: "🎨 [OpenPyXL] Opening spreadsheet formatting writer streams...", delay: 5100 },
      { text: "📏 [OpenPyXL] Resizing and autowrapping column widths for visual clarity...", delay: 5600 },
      { text: "💾 [Export] File saved: 'Cloud_Database_Report.xlsx'", delay: 6100 },
      { text: "✨ [Pipeline] Sync complete! Pipeline executed successfully in 6.2s.", delay: 6300 },
    ];

    logSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step.text]);
        if (index === logSteps.length - 1) {
          setIsPipelineRunning(false);
        }
      }, step.delay);
    });
  };

  // 3️⃣ EXPORT CSV SIMULATOR
  const triggerExcelDownload = () => {
    const headers = "User Name,User Email (Masked),Note Title,Raw Content,Automated Tag,Cloud Sync Time\n";
    const rows = data.map(item => 
      `"${item.user}","${item.email}","${item.title}","${item.content.replace(/"/g, '""')}","${item.tag}","${item.time}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "Cloud_Database_Report.csv");
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0b0f0c] text-slate-100 flex flex-col font-sans selection:bg-forest-500 selection:text-white">
      
      {/* 🟢 NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0b0f0c]/90 backdrop-blur-md border-b border-forest-100/10 transition">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-forest-600 flex items-center justify-center font-bold text-white glow-green">
              IC
            </div>
            <span className="font-semibold text-lg tracking-tight font-sans">Ishita Chaurasia</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-forest-400 transition">About</a>
            <a href="#skills" className="hover:text-forest-400 transition">Skills</a>
            <a href="#featured-work" className="hover:text-forest-400 transition">Featured Work</a>
            <a href="#architecture" className="hover:text-forest-400 transition">My Architecture</a>
            <a href="#contact" className="hover:text-forest-400 transition">Contact</a>
          </nav>

          <a 
            href="mailto:ishita.chaurasia@example.com?subject=Freelancing%20Inquiry" 
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-600 hover:bg-forest-500 text-white transition glow-green shadow-lg"
          >
            Hire Me
          </a>
        </div>
      </header>

      {/* 🔵 HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 border-b border-forest-100/5">
        {/* Floating gradient design background */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-forest-800/10 rounded-full blur-[120px] pointer-events-none animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-forest-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-950/60 border border-forest-500/20 text-xs font-medium text-forest-400">
            <Sparkles size={12} className="animate-spin-slow" />
            <span>Premium Full-Stack &amp; Data Pipeline Services</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-sans leading-[1.15]">
            Saving businesses hours of manual work with custom Python pipelines.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Hi, I'm Ishita. I engineer automated backend pipelines, secure cloud database migrations, and intuitive full-stack interfaces to streamline your operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#dashboard" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-medium transition glow-green"
            >
              <span>View My Portfolio</span>
              <ArrowRight size={16} />
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-forest-950/60 hover:bg-forest-900 border border-forest-100/10 text-slate-300 font-medium transition"
            >
              <span>Discuss Your Project</span>
            </a>
          </div>
        </div>
      </section>

      {/* 🟢 ABOUT ME SECTION */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              About My Engineering Philosophy
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              I believe in simple architectures, clean interfaces, and bulletproof automation. This portfolio showcases my double-duty capability: designing high-fidelity, secure React frontend applications and backing them with highly efficient Python reporting engines, secured by Docker containers.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-slate-300">
                <CheckCircle2 className="text-forest-400 shrink-0 mt-0.5" size={18} />
                <span><strong>Developer Productivity Focus:</strong> Saving hours of administrative database querying via python aggregation utilities.</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-slate-300">
                <CheckCircle2 className="text-forest-400 shrink-0 mt-0.5" size={18} />
                <span><strong>Aesthetic Precision:</strong> Minimalist UX design tailored for focus, inspired by modern writing pads.</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-slate-300">
                <CheckCircle2 className="text-forest-400 shrink-0 mt-0.5" size={18} />
                <span><strong>Isolated DevOps Containers:</strong> Isolated environments allowing staging and production consistency.</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 glass-card p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white">Full-Stack Operational Scope</h3>
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-forest-950/40 border border-forest-100/5">
                <span className="font-semibold text-white text-xs block mb-1">MERN Application Design</span>
                <p className="text-slate-400 leading-relaxed">Responsive React views, debounced state actions, modular backend routes, secure password hashing, and custom JWT tokens.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-forest-950/40 border border-forest-100/5">
                <span className="font-semibold text-white text-xs block mb-1">Office Workflow Automation</span>
                <p className="text-slate-400 leading-relaxed">Aggregating database logs, parsing raw data matrices, email PII masking, and writing to openpyxl spreadsheets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 FEATURED WORK SECTION */}
      <section id="featured-work" className="py-20 px-6 bg-forest-950/20 border-y border-forest-100/5">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Featured Work &amp; Open Source
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              A showcase of full-stack engineering, DevOps environments, and high-performance backend pipelines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* Project A: MERN Notepad */}
            <div className="flex flex-col justify-between glass-card p-8 rounded-3xl space-y-6 hover:border-forest-500/20 transition duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-forest-400 tracking-wider uppercase">Full-Stack &amp; DevOps</span>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-forest-950/80 border border-forest-500/10">MERN</span>
                    <span className="px-2 py-0.5 rounded bg-forest-950/80 border border-forest-500/10">Docker</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Dockerized Notepad App &amp; Excel Pipeline</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    A secure note-taking workspace using JWT authentication, debounced autosave logic, and a Python reporting pipeline. It aggregates database records, scrubs user PII emails, maps categories, and auto-formats columns into spreadsheet reports.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] pt-2">
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">Autosave Debounce</span>
                    <span className="text-slate-300 mt-0.5 block">1000ms delay cycles</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">Data Scrubbing</span>
                    <span className="text-slate-300 mt-0.5 block">PII Masking Regex</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">NLP Tagging</span>
                    <span className="text-slate-300 mt-0.5 block">Keyword-based tagging</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">DevOps Packaging</span>
                    <span className="text-slate-300 mt-0.5 block">Isolated Compose file</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-forest-100/5 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://notepad-app-pearl.vercel.app/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-xs text-forest-400 hover:text-forest-300 transition font-semibold"
                  >
                    <span>Live App</span>
                    <ExternalLink size={12} />
                  </a>
                  <a 
                    href="#dashboard" 
                    className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition font-semibold"
                  >
                    <span>Pipeline Demo</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
                <a 
                  href="https://github.com/ishcares" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition font-medium"
                >
                  <Github size={12} />
                  <span>MERN Repo</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Project B: Distributed Task Orchestrator */}
            <div className="flex flex-col justify-between glass-card p-8 rounded-3xl space-y-6 hover:border-forest-500/20 transition duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-forest-400 tracking-wider uppercase">Systems &amp; Architecture</span>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-forest-950/80 border border-forest-500/10">Python</span>
                    <span className="px-2 py-0.5 rounded bg-forest-950/80 border border-forest-500/10">Distributed</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Distributed Task Orchestrator</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    A high-performance backend task manager designed to coordinate concurrent execution of heavy computing tasks across distributed worker nodes. Implements custom job queues, fault-tolerant retry policies, worker heartbeat checks, and automatic recovery systems.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] pt-2">
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">Task Queues</span>
                    <span className="text-slate-300 mt-0.5 block">Priority sorting queue</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">Worker Monitoring</span>
                    <span className="text-slate-300 mt-0.5 block">Heartbeat checking</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">Fault Recovery</span>
                    <span className="text-slate-300 mt-0.5 block">Auto retries &amp; fallback</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-forest-950/30 border border-forest-100/5">
                    <span className="text-slate-500 block font-medium">Broker Protocols</span>
                    <span className="text-slate-300 mt-0.5 block">Redis / JSON-RPC</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-forest-100/5 flex items-center justify-between">
                <a 
                  href="https://github.com/ishcares/distributed-task-orchestrator"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-forest-400 hover:text-forest-300 transition font-semibold"
                >
                  <span>Explore Repository</span>
                  <ArrowRight size={12} />
                </a>
                <a 
                  href="https://github.com/ishcares/distributed-task-orchestrator" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition font-medium"
                >
                  <Github size={12} />
                  <span>Source Code</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🛡️ MY ARCHITECTURE SECTION */}
      <section id="architecture" className="py-20 px-6 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            My System Architecture
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A modular multi-container orchestration built to guarantee developer consistency, database security, and isolated pipeline automation.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-forest-500 select-none">
            compose.yaml
          </div>
          <div className="overflow-x-auto">
            <pre className="font-mono text-xs text-emerald-400/90 leading-relaxed bg-[#060a07] p-6 rounded-2xl border border-forest-100/5 select-all">
{`                  ┌────────────────────────────────────────────────────────┐
                  │                 React.js Client (Vite)                 │
                  │              (Port 3000 • Served with Nginx)           │
                  └───────────────────────────┬────────────────────────────┘
                                              │
                                              │ HTTP CORS Requests
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │                Express API (Node.js)                   │
                  │             (Port 8000 • Process & Auth JWT)           │
                  └───────────────────────────┬────────────────────────────┘
                                              │
                                              │ MongoDB URI Driver
                                              ▼
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │                           MongoDB Database Container (Docker)                          │
  │                     (Port 27017 • Named Volume Mapping for Persistency)                │
  └───────────────────────────────────────────▲────────────────────────────────────────────┘
                                              │
                                              │ PyMongo Aggregation
                                              │
                  ┌───────────────────────────┴────────────────────────────┐
                  │               Python 3 Analytics Pipeline              │
                  │            (Scrub PII -> NLP Categorization -> Excel)  │
                  └────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
          <p className="text-slate-500 text-xs mt-4 leading-relaxed text-center">
            This structure secures internal communications within isolated Docker networks, leaving only the client and specific API ports exposed.
          </p>
        </div>
      </section>

      {/* 📊 THE DASHBOARD component */}
      <section id="dashboard" className="py-20 px-6 max-w-7xl mx-auto w-full space-y-10 border-t border-forest-100/5 scroll-mt-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-forest-400 tracking-wider uppercase">
              <FileSpreadsheet size={14} />
              <span>Interactive Data Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Data Pipeline &amp; Excel Report Dashboard
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              This dashboard visualizes the database contents pulled by the Python pipeline script. Run the simulated pipeline to view execution terminal logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runPipeline}
              disabled={isPipelineRunning}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium text-xs border transition ${
                isPipelineRunning 
                  ? "bg-forest-950/40 text-forest-500 border-forest-500/10 cursor-not-allowed"
                  : "bg-forest-600 hover:bg-forest-500 text-white border-forest-500/20 glow-green"
              }`}
            >
              <Play size={12} className={isPipelineRunning ? "animate-spin" : ""} />
              <span>{isPipelineRunning ? "Running Pipeline..." : "Run Python Pipeline"}</span>
            </button>

            <button
              onClick={triggerExcelDownload}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl font-medium text-xs bg-forest-950/60 hover:bg-forest-900 border border-forest-100/10 text-slate-300 transition"
            >
              <Download size={12} />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* Analytics Summary Stats Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="glass-card p-5 rounded-2xl">
            <span className="text-xs text-slate-500 font-medium">Notes Synchronized</span>
            <div className="text-2xl font-bold text-white mt-1">{totalNotes}</div>
            <div className="text-[10px] text-forest-400 mt-0.5">100% cloud connected</div>
          </div>
          <div className="glass-card p-5 rounded-2xl">
            <span className="text-xs text-slate-500 font-medium">Active Masked Users</span>
            <div className="text-2xl font-bold text-white mt-1">{activeUsers}</div>
            <div className="text-[10px] text-forest-400 mt-0.5">PII Shield active</div>
          </div>
          <div className="glass-card p-5 rounded-2xl">
            <span className="text-xs text-slate-500 font-medium">NLP Classification Tags</span>
            <div className="text-2xl font-bold text-white mt-1">3</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Dev / Acad / General</div>
          </div>
          <div className="glass-card p-5 rounded-2xl">
            <span className="text-xs text-slate-500 font-medium">Spreadsheet Auto-Fitting</span>
            <div className="text-2xl font-bold text-forest-400 mt-1">Active</div>
            <div className="text-[10px] text-slate-400 mt-0.5">OpenPyXL sizing module</div>
          </div>
        </div>

        {/* Split Section: Table and Terminal Logs */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Excel Report Table Card */}
          <div className="lg:col-span-8 glass-card rounded-2xl overflow-hidden flex flex-col">
            
            {/* Table Filter Actions Bar */}
            <div className="p-4 bg-forest-950/40 border-b border-forest-100/5 flex flex-col sm:flex-row items-center gap-3 justify-between">
              
              {/* Table Search Input */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search report records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs bg-forest-950/80 border border-forest-100/10 rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-forest-500/40 text-slate-200 transition"
                />
              </div>

              {/* Tag Selection Dropdown */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter size={12} className="text-slate-500" />
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="text-xs bg-forest-950/80 border border-forest-100/10 rounded-lg px-3 py-2.5 outline-none focus:border-forest-500/40 text-slate-300 w-full sm:w-auto cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Development">Development</option>
                  <option value="Academic">Academic</option>
                  <option value="General Tasks">General Tasks</option>
                </select>
              </div>

            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto min-h-[300px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-forest-950/20 text-slate-400 font-semibold border-b border-forest-100/5 select-none">
                    <th className="p-4 font-semibold">User Name</th>
                    <th className="p-4 font-semibold">User Email (Masked)</th>
                    <th className="p-4 font-semibold">Note Title</th>
                    <th className="p-4 font-semibold">Raw Content</th>
                    <th className="p-4 font-semibold">Automated Tag</th>
                    <th className="p-4 font-semibold">Cloud Sync Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest-100/5">
                  {filteredData.length > 0 ? (
                    filteredData.map(item => (
                      <tr key={item.id} className="hover:bg-forest-100/[0.02] transition text-slate-300">
                        <td className="p-4 font-medium text-white">{item.user}</td>
                        <td className="p-4 font-mono text-[10px] text-slate-400">{item.email}</td>
                        <td className="p-4 text-white">{item.title}</td>
                        <td className="p-4 max-w-[180px] truncate text-slate-400" title={item.content}>
                          {item.content}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                            item.tag === "Development" 
                              ? "bg-blue-950/40 border-blue-500/20 text-blue-400" 
                              : item.tag === "Academic" 
                                ? "bg-amber-950/40 border-amber-500/20 text-amber-400" 
                                : "bg-forest-950/40 border-forest-500/20 text-forest-400"
                          }`}>
                            {item.tag}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 font-mono text-[10px]">{item.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-12 text-slate-500 font-medium">
                        No report records matching criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Stats */}
            <div className="p-3 bg-forest-950/10 border-t border-forest-100/5 text-[10px] text-slate-500 flex justify-between">
              <span>Showing {filteredData.length} of {totalNotes} notes found</span>
              <span>Cloud DB: Stable connection</span>
            </div>

          </div>

          {/* Python Execution Log Console */}
          <div className="lg:col-span-4 flex flex-col glass-card rounded-2xl overflow-hidden self-stretch min-h-[350px]">
            
            {/* Terminal Header */}
            <div className="p-4 bg-forest-950/80 border-b border-forest-100/5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Terminal size={14} className="text-forest-400" />
                <span className="font-mono text-[10px] text-slate-400">db_exporter.py - Output</span>
              </div>
              
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 bg-forest-950/90 p-5 font-mono text-[10px] space-y-2.5 overflow-y-auto max-h-[350px]">
              {showLogs ? (
                logs.map((log, idx) => (
                  <div key={idx} className={`${
                    log.includes("Success") || log.includes("established")
                      ? "text-emerald-400" 
                      : log.includes("Warning") || log.includes("SSL")
                        ? "text-amber-300"
                        : "text-slate-300"
                  } leading-relaxed`}>
                    {log}
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 py-10 space-y-3 font-sans">
                  <Terminal size={28} className="opacity-30" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Terminal is Idle</p>
                    <p className="text-[10px] text-slate-500 mt-1 max-w-[200px] leading-relaxed mx-auto">
                      Run the Python script pipeline using the button above to start tracing real-time outputs.
                    </p>
                  </div>
                </div>
              )}
              {isPipelineRunning && (
                <div className="flex items-center space-x-1.5 text-forest-400 animate-pulse text-[10px]">
                  <span>█</span>
                  <span>Executing pipeline stream...</span>
                </div>
              )}
            </div>

            {/* Terminal Status bar */}
            <div className="p-2.5 bg-forest-950/40 border-t border-forest-100/5 text-[9px] font-mono text-slate-500 text-right">
              <span>Python 3.10.4 • openpyxl 3.0.9</span>
            </div>

          </div>

        </div>

      </section>

      {/* 🟢 SKILLS GRID SECTION */}
      <section id="skills" className="py-20 px-6 max-w-7xl mx-auto w-full space-y-10 border-t border-forest-100/5 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Technical Capabilities Grid
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A comprehensive matrix of my operational abilities, showcasing programming languages, tools, and paradigms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Python Scripting */}
          <div className="glass-card p-6 rounded-2xl border border-forest-500/10 flex flex-col justify-between space-y-4 hover:border-forest-500/30 transition duration-300">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-950/60 flex items-center justify-center border border-forest-500/20 text-forest-400">
                <Terminal size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Python Scripting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aggregating secure data, writing modular script pipelines, handling process streams, and utilizing TLS certificate bundles.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-forest-100/5">
              PyMongo • certifi • OS Stream
            </div>
          </div>

          {/* Card 2: MongoDB Atlas Cloud */}
          <div className="glass-card p-6 rounded-2xl border border-forest-500/10 flex flex-col justify-between space-y-4 hover:border-forest-500/30 transition duration-300">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-950/60 flex items-center justify-center border border-forest-500/20 text-forest-400">
                <Cloud size={20} />
              </div>
              <h3 className="font-bold text-white text-base">MongoDB Atlas Cloud</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structuring Atlas schemas, optimizing cluster connectivity, indexing, and maintaining relational records.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-forest-100/5">
              Atlas DB • Clusters • Mongoose
            </div>
          </div>

          {/* Card 3: Pandas Data Pipelines */}
          <div className="glass-card p-6 rounded-2xl border border-forest-500/10 flex flex-col justify-between space-y-4 hover:border-forest-500/30 transition duration-300">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-950/60 flex items-center justify-center border border-forest-500/20 text-forest-400">
                <FileSpreadsheet size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Pandas Data Pipelines</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Loading database rows into DataFrames, masking sensitive fields, keyword-based categorization, and openpyxl formatting.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-forest-100/5">
              DataFrame • openpyxl • Auto-width
            </div>
          </div>

          {/* Card 4: JSON Parsing */}
          <div className="glass-card p-6 rounded-2xl border border-forest-500/10 flex flex-col justify-between space-y-4 hover:border-forest-500/30 transition duration-300">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-950/60 flex items-center justify-center border border-forest-500/20 text-forest-400">
                <Braces size={20} />
              </div>
              <h3 className="font-bold text-white text-base">JSON Parsing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Validating JSON payloads inside body parser middleware, resolving routing syntax crashes, and mapping object parameters.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-forest-100/5">
              Express JSON • Object Mapping
            </div>
          </div>

          {/* Card 5: Backend Systems */}
          <div className="glass-card p-6 rounded-2xl border border-forest-500/10 flex flex-col justify-between space-y-4 hover:border-forest-500/30 transition duration-300">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-950/60 flex items-center justify-center border border-forest-500/20 text-forest-400">
                <Server size={20} />
              </div>
              <h3 className="font-bold text-white text-base">Backend Systems</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Custom Node/Express routes, CORS safeguards, JWT verification middleware, secure password reset checks, and health endpoints.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-forest-100/5">
              Node.js • JWT Auth • CORS Security
            </div>
          </div>

          {/* Card 6: MERN Architecture */}
          <div className="glass-card p-6 rounded-2xl border border-forest-500/10 flex flex-col justify-between space-y-4 hover:border-forest-500/30 transition duration-300">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-950/60 flex items-center justify-center border border-forest-500/20 text-forest-400">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-white text-base">MERN Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-cycle integration of React Vite frontend, Express APIs, Node server layer, and containerized Docker-compose environments.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-forest-100/5">
              React Vite • MongoDB • Docker
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 CONTACT FORM SECTION */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto w-full text-center space-y-8 scroll-mt-20">
        
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Start a Freelance Collaboration
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Need custom dashboards, secure full-stack applications, or automated data integrations? Let's discuss your project requirements!
          </p>
        </div>

        {/* Contact Form */}
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            alert("Thank you! Your message has been sent successfully. I will get in touch with you shortly!");
          }} 
          className="space-y-4 text-left glass-card p-8 rounded-3xl"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="form-name" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Name</label>
              <input 
                id="form-name"
                type="text" 
                required
                placeholder="John Doe" 
                className="w-full text-xs bg-[#060a07] border border-forest-100/10 rounded-xl p-3.5 outline-none focus:border-forest-500/40 text-slate-200 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="form-email" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email</label>
              <input 
                id="form-email"
                type="email" 
                required
                placeholder="john@example.com" 
                className="w-full text-xs bg-[#060a07] border border-forest-100/10 rounded-xl p-3.5 outline-none focus:border-forest-500/40 text-slate-200 transition"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="form-message" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Message</label>
            <textarea 
              id="form-message"
              rows={5}
              required
              placeholder="Hi Ishita, I'd like to collaborate on building a full-stack data pipeline..." 
              className="w-full text-xs bg-[#060a07] border border-forest-100/10 rounded-xl p-3.5 outline-none resize-none focus:border-forest-500/40 text-slate-200 leading-relaxed transition"
            />
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-semibold tracking-wide transition glow-green shadow-lg cursor-pointer"
          >
            <Mail size={14} />
            <span>Send Message</span>
          </button>
        </form>

        {/* Social Badges */}
        <div className="flex items-center justify-center space-x-6 pt-4 text-slate-400 text-sm">
          <a 
            href="https://github.com/ishcares" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition flex items-center space-x-1.5"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <div className="w-[1px] h-3 bg-forest-100/15"></div>
          <a 
            href="https://www.linkedin.com/in/ishitachaurasia/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition flex items-center space-x-1.5"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
          <div className="w-[1px] h-3 bg-forest-100/15"></div>
          <a 
            href="mailto:ishita.chaurasia@example.com" 
            className="hover:text-white transition flex items-center space-x-1.5"
          >
            <Mail size={16} />
            <span>Email Me</span>
          </a>
        </div>

      </section>

      {/* 🟢 FOOTER */}
      <footer className="mt-auto border-t border-forest-100/5 bg-[#070b08] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 Ishita Chaurasia. All rights reserved.</span>
          <span className="flex items-center space-x-1">
            <span>Powered by React, Vite, and TailwindCSS</span>
          </span>
        </div>
      </footer>

    </div>
  );
}
