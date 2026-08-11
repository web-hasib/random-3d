"use client";

// DomainTab.tsx
import { Globe, Check, Loader2, Trash2, ShieldCheck, Link2 } from "lucide-react";
import { useBuilder } from "./BuilderContext";

export default function DomainTab() {
  const { domainInput, setDomainInput, connectedDomains, dnsCheckStep, dnsCheckingName, handleConnectDomain, removeDomain, openSandboxPreview } = useBuilder();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Connect form */}
      <div className="bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Globe className="w-5 h-5 text-blue-400" /></div>
          <div><h2 className="font-semibold text-white text-sm">Connect Custom Domain</h2><p className="text-xs text-neutral-400">Automatic SSL via Caddy ACME</p></div>
        </div>
        <form onSubmit={handleConnectDomain} className="space-y-3">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-neutral-300">Required DNS Records</p>
            <div className="font-mono text-xs text-neutral-400 space-y-1">
              <div className="flex gap-4"><span className="text-blue-400 w-12">A</span><span>@</span><span className="text-green-400">IP address of your server</span></div>
              <div className="flex gap-4"><span className="text-blue-400 w-12">CNAME</span><span>www</span><span className="text-green-400">yourdomain.com</span></div>
            </div>
          </div>
          <input type="text" value={domainInput} onChange={(e) => setDomainInput(e.target.value)} placeholder="yoursite.com" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-blue-500/40 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-all" />
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-indigo-700 transition-all cursor-pointer">
            <Link2 className="w-4 h-4" /> Connect Domain
          </button>
        </form>

        {/* DNS check progress */}
        {dnsCheckStep > 0 && (
          <div className="space-y-2 pt-2">
            {[
              { label: `Resolving ${dnsCheckingName}...`, step: 1 },
              { label: "Verifying DNS propagation...", step: 2 },
              { label: "Issuing SSL certificate...", step: 3 },
            ].map(({ label, step }) => (
              <div key={step} className="flex items-center gap-3">
                {dnsCheckStep > step ? (
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : dnsCheckStep === step ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/10 flex-shrink-0" />
                )}
                <span className={`text-xs ${dnsCheckStep >= step ? "text-neutral-200" : "text-neutral-500"}`}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connected domains */}
      <div className="bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-400" /> Connected Domains</h2>
        {connectedDomains.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-neutral-600 text-xs">No domains connected yet.</div>
        ) : (
          <div className="space-y-3">
            {connectedDomains.map((d) => (
              <div key={d.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                  <div>
                    <div className="text-sm text-white font-medium">{d.name}</div>
                    <div className="text-[10px] text-green-400">SSL Active · Live</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openSandboxPreview(`https://${d.name}`)} className="text-xs px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 cursor-pointer transition-all">Preview</button>
                  <button onClick={() => removeDomain(d.name)} className="p-1.5 rounded-lg hover:bg-red-900/50 text-neutral-500 hover:text-red-400 cursor-pointer transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
