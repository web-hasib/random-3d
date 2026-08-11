"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Cpu, Shield, Sparkles, Send, Terminal, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import GlassCard from "../components/ui/GlassCard";
import Canvas3D from "../components/3d/Canvas3D";
import DraggableCard from "../components/ui/DraggableCard";

export default function Home() {
  const [messages, setMessages] = useState([
    { id: 1, text: "System Online. Initiating quantum spatial portfolio...", sender: "ai" },
    { id: 2, text: "Hello! Explore my spatial CV. Scroll to transform the 3D core or prompt me below.", sender: "ai" }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setMessages((prev) => [...prev, { id: Date.now(), text: userMsg, sender: "user" }]);
    setInputVal("");

    setTimeout(() => {
      let reply = "Processing command in quantum core...";
      const normalized = userMsg.toLowerCase();
      if (normalized.includes("skill") || normalized.includes("tech")) {
        reply = "Skills detected: Next.js, React, TypeScript, Tailwind, Three.js/R3F, GSAP, and Node.js.";
      } else if (normalized.includes("project") || normalized.includes("work")) {
        reply = "Core Projects: Spatial AI Interface, Quantum Analytics dashboard, and Decentralized Cloud mesh.";
      } else if (normalized.includes("contact") || normalized.includes("hire")) {
        reply = "Initiating handshake... Send an email to contact@nextgen.ai or call node terminal +1-800-SPATIAL.";
      }
      setMessages((prev) => [...prev, { id: Date.now(), text: reply, sender: "ai" }]);
    }, 800);
  };

  return (
    <main className="relative min-h-[300vh] bg-[#050505] text-[#f5f5f7] overflow-hidden select-none">
      
      {/* 3D background canvas container */}
      <div className="fixed inset-0 z-0 pointer-events-none" id="canvas-container">
        {/* Toggle showCrystal to true or false to manage 3D glass crystal object visibility */}
        <Canvas3D showCrystal={false} />
      </div>

      {/* Decorative Orbs */}
      <div className="glow-orb animate-float bg-purple-600 w-[500px] h-[500px] -top-40 -left-40" />
      <div className="glow-orb animate-float bg-cyan-600 w-[450px] h-[450px] top-[60vh] -right-20" style={{ animationDelay: "-2s" }} />
      <div className="glow-orb animate-float bg-emerald-600 w-[600px] h-[600px] top-[160vh] left-1/3" style={{ animationDelay: "-4s" }} />

      {/* Hero Section */}
      <section 
        style={{ padding: "80px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        className="relative z-10 min-h-screen flex flex-col justify-between p-8 md:p-16 gap-8"
      >
        {/* Draggable system diagnostics card */}
        <DraggableCard title="System Diagnostics" initialX={650} initialY={180} className="hidden lg:block">
          <div className="space-y-3 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-neutral-400">CORE_TEMP:</span>
              <span className="text-emerald-400">34.2 °C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">MEM_LOAD:</span>
              <span className="text-purple-400">42.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">FPS:</span>
              <span className="text-cyan-400">60.0</span>
            </div>
            <div className="h-1 bg-neutral-800 rounded overflow-hidden mt-1">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 w-[42.8%]" />
            </div>
          </div>
        </DraggableCard>
        <header className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="font-mono text-sm tracking-widest text-emerald-400 uppercase">SYS_ONLINE</span>
          </div>
          <span className="font-mono text-xs text-neutral-400">LOC: 0x7F_SEC_B</span>
        </header>

        <div className="max-w-4xl my-auto">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="text-purple-400 w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-bold">Interactive Spatial CV v2.0</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
            CREATIVE<br />ARCHITECT
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-xl font-light leading-relaxed">
            Designing digital ecosystems at the intersection of spatial Computing, generative AI architectures, and interactive 3D physics.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="glow" onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" })}>
              Connect Core <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="glass" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
              Diagnostics
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-end w-full">
          <div className="font-mono text-xs text-neutral-500">
            [SCROLL_TO_MORPH]
          </div>
          <div className="font-mono text-xs text-neutral-500">
            01 / 03
          </div>
        </div>
      </section>

      {/* Diagnostics / Experience Section */}
      <section 
        style={{ padding: "80px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        className="relative z-10 min-h-screen flex flex-col justify-between p-8 md:p-16 gap-8"
      >
        {/* Draggable connection node status */}
        <DraggableCard title="Network Nodes" initialX={60} initialY={450} className="hidden lg:block">
          <div className="space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between text-emerald-400">
              <span>NODE_01 (SG)</span>
              <span className="text-[9px] px-1 bg-emerald-500/10 rounded border border-emerald-500/20">CONNECTED</span>
            </div>
            <div className="flex items-center justify-between text-cyan-400">
              <span>NODE_02 (AP)</span>
              <span className="text-[9px] px-1 bg-cyan-500/10 rounded border border-cyan-500/20">STABLE</span>
            </div>
            <div className="flex items-center justify-between text-purple-400 animate-pulse">
              <span>SYNAPSE_MESH</span>
              <span className="text-[9px] px-1 bg-purple-500/10 rounded border border-purple-500/20">SYNCING</span>
            </div>
          </div>
        </DraggableCard>
        <div className="max-w-5xl my-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-cyan-400 w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">Diagnostics & Systems</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Core Competencies</h2>
            <p className="mt-4 text-neutral-400 font-light leading-relaxed">
              Analyzing core systems configuration. The mesh node adapts to your scroll inputs, morphing a central 3D wireframe core.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { label: "WebGL / Core 3D", value: 92 },
                { label: "Creative Physics & Motion", value: 95 },
                { label: "System Design & Architecture", value: 88 }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between font-mono text-xs">
                    <span>{item.label}</span>
                    <span className="text-cyan-400">{item.value}%</span>
                  </div>
                  <div className="h-[2px] bg-neutral-800 w-full overflow-hidden rounded-full">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-1000" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <Terminal className="text-purple-400 w-5 h-5 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm tracking-wide">01 // Principal Interface Engineer</h4>
                  <p className="text-xs text-purple-400 font-mono mt-1">2024 - PRESENT</p>
                  <p className="text-xs text-neutral-400 mt-2 font-light">
                    Building spatial computing web apps and interactive canvases using Three.js and custom shaders.
                  </p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <Terminal className="text-cyan-400 w-5 h-5 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm tracking-wide">02 // Creative Technologist</h4>
                  <p className="text-xs text-cyan-400 font-mono mt-1">2022 - 2024</p>
                  <p className="text-xs text-neutral-400 mt-2 font-light">
                    Engineered physics-based UI micro-interactions, custom interactive graphics, and performance-tuned web assets.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="flex justify-between items-end w-full">
          <div className="font-mono text-xs text-neutral-500">
            [SCROLL_TO_ENGAGE]
          </div>
          <div className="font-mono text-xs text-neutral-500">
            02 / 03
          </div>
        </div>
      </section>

      {/* Interactive AI Chat Overlay & Contact Section */}
      <section 
        style={{ padding: "80px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        className="relative z-10 min-h-screen flex flex-col justify-between p-8 md:p-16 gap-8"
      >
        <div className="max-w-xl my-auto mx-auto w-full">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Sparkles className="text-emerald-400 w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">Interface Handshake</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-8">Quantum Core Terminal</h2>
          
          <GlassCard className="flex flex-col h-[350px]">
            {/* Messages display */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded px-3 py-2 ${
                    msg.sender === "user" 
                      ? "bg-purple-900/40 text-purple-200 border border-purple-800/50" 
                      : "bg-neutral-900/60 text-emerald-400 border border-neutral-800"
                  }`}>
                    <span className="text-neutral-500 mr-1.5">{msg.sender === "user" ? ">" : "#"}</span>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="p-3 border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about skills, work, or say hello..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-xs font-mono text-[#f5f5f7] placeholder-neutral-600 px-2"
              />
              <button type="submit" className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </GlassCard>
        </div>

        <div className="flex justify-between items-end w-full">
          <div className="font-mono text-xs text-neutral-500">
            [END_OF_TRANSMISSION]
          </div>
          <div className="font-mono text-xs text-neutral-500">
            03 / 03
          </div>
        </div>
      </section>

    </main>
  );
}
