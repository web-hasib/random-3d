"use client";

// HostingTab.tsx
import { Server, Cpu, HardDrive, Activity, Play, Terminal, Power } from "lucide-react";
import { useBuilder } from "./BuilderContext";

const REGIONS = [
  { id: "us-east", label: "US East (N. Virginia)", ping: "12ms" },
  { id: "eu-west", label: "EU West (Frankfurt)", ping: "28ms" },
  { id: "ap-south", label: "Asia Pacific (Singapore)", ping: "65ms" },
];

function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden flex-1">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

export default function HostingTab() {
  const {
    selectedRegion, setSelectedRegion, isDeploying, deployLogs,
    isServerActive, setIsServerActive, serverStats, handleDeploy, terminalEndRef,
    deployMode, setDeployMode, coolifyUrl, setCoolifyUrl,
    coolifyToken, setCoolifyToken, coolifyAppUuid, setCoolifyAppUuid,
    githubToken, setGithubToken, githubRepo, setGithubRepo
  } = useBuilder();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Deploy controls */}
      <div className="bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><Server className="w-5 h-5 text-green-400" /></div>
          <div><h2 className="font-semibold text-white text-sm">Deployment Controls</h2><p className="text-xs text-neutral-400">Push to edge infrastructure</p></div>
        </div>

        {/* Deploy Mode Selector */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 flex gap-2">
          <button
            onClick={() => setDeployMode("local")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              deployMode === "local" ? "bg-purple-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
            }`}
          >
            Local Export
          </button>
          <button
            onClick={() => setDeployMode("coolify")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              deployMode === "coolify" ? "bg-purple-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
            }`}
          >
            Coolify VPS
          </button>
        </div>

        {/* Coolify & GitHub Configuration Fields */}
        {deployMode === "coolify" && (
          <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] animate-fadeIn">
            <h3 className="text-xs font-semibold text-purple-400">Coolify & GitHub Settings</h3>
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">GitHub Personal Access Token</label>
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">GitHub Repository (username/repo)</label>
              <input
                type="text"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                placeholder="myusername/my-site-repo"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">Coolify Instance URL</label>
              <input
                type="text"
                value={coolifyUrl}
                onChange={(e) => setCoolifyUrl(e.target.value)}
                placeholder="https://coolify.my-vps.com"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">Coolify API Token</label>
              <input
                type="password"
                value={coolifyToken}
                onChange={(e) => setCoolifyToken(e.target.value)}
                placeholder="1|xxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">Coolify Application UUID</label>
              <input
                type="text"
                value={coolifyAppUuid}
                onChange={(e) => setCoolifyAppUuid(e.target.value)}
                placeholder="d8g392k..."
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>
        )}

        {/* Region picker */}
        <div>
          <label className="text-xs font-semibold text-neutral-400 mb-2 block">Deployment Region</label>
          <div className="space-y-2">
            {REGIONS.map((r) => (
              <button key={r.id} onClick={() => setSelectedRegion(r.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all cursor-pointer ${selectedRegion === r.id ? "bg-purple-500/10 border-purple-500/30 text-white" : "bg-white/[0.03] border-white/[0.05] text-neutral-400 hover:text-white"}`}>
                <span>{r.label}</span>
                <span className="text-xs font-mono text-green-400">{r.ping}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold text-sm hover:from-green-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all shadow-lg shadow-green-500/20">
          {isDeploying ? <><Activity className="w-4 h-4 animate-pulse" /> Deploying...</> : <><Play className="w-4 h-4 fill-current" /> Deploy to {REGIONS.find((r) => r.id === selectedRegion)?.label.split(" (")[0]}</>}
        </button>

        {/* Deploy terminal */}
        {deployLogs.length > 0 && (
          <div className="bg-black/60 rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.04]">
              <Terminal className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs font-mono text-neutral-400">Deploy Log</span>
            </div>
            <div className="p-4 max-h-40 overflow-y-auto space-y-1">
              {deployLogs.map((log, i) => (
                <p key={i} className="text-[11px] font-mono text-green-300">{log}</p>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Server stats */}
      <div className="bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Activity className="w-5 h-5 text-blue-400" /></div>
            <div><h2 className="font-semibold text-white text-sm">Live Server Metrics</h2><p className="text-xs text-neutral-400">Real-time node performance</p></div>
          </div>
          <button onClick={() => setIsServerActive(!isServerActive)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${isServerActive ? "bg-red-900/20 border-red-500/20 text-red-400 hover:bg-red-900/30" : "bg-green-900/20 border-green-500/20 text-green-400 hover:bg-green-900/30"}`}>
            <Power className="w-3 h-3" /> {isServerActive ? "Stop" : "Start"}
          </button>
        </div>

        {/* Status */}
        <div className={`px-4 py-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${isServerActive ? "bg-green-500/5 border-green-500/15 text-green-400" : "bg-red-500/5 border-red-500/15 text-red-400"}`}>
          <div className={`w-2 h-2 rounded-full ${isServerActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
          Node Status: {isServerActive ? "HEALTHY — Serving Traffic" : "OFFLINE — No Traffic"}
        </div>

        {/* Stats */}
        {[
          { label: "CPU Usage", icon: <Cpu className="w-4 h-4 text-purple-400" />, value: `${serverStats.cpu}%`, bar: { value: serverStats.cpu, max: 100, color: serverStats.cpu > 80 ? "bg-red-500" : "bg-purple-500" } },
          { label: "RAM Usage", icon: <HardDrive className="w-4 h-4 text-blue-400" />, value: `${serverStats.ram} MB`, bar: { value: serverStats.ram, max: 512, color: "bg-blue-500" } },
          { label: "Bandwidth", icon: <Activity className="w-4 h-4 text-green-400" />, value: `${serverStats.bandwidth} GB/s`, bar: { value: serverStats.bandwidth, max: 5, color: "bg-green-500" } },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">{stat.icon}<span className="text-xs text-neutral-300">{stat.label}</span></div>
              <span className="text-xs font-mono text-white">{stat.value}</span>
            </div>
            <StatBar {...stat.bar} />
          </div>
        ))}
      </div>
    </div>
  );
}
