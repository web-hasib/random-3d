import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper to compile Sections to HTML
function compileSectionsToHtml(sections: any[]): string {
  let bodyContent = "";

  for (const s of sections) {
    let sectionHtml = "";
    const bgStyle = s.bgImageUrl ? `background-image: url('${s.bgImageUrl}'); background-size: cover; background-position: center;` : "";
    const bgOverlay = s.bgImageUrl ? `<div class="absolute inset-0 bg-black/50 pointer-events-none"></div>` : "";

    switch (s.type) {
      case "hero":
        sectionHtml = `
          <div class="relative py-28 px-8 flex flex-col items-center text-center overflow-hidden min-h-[480px] justify-center" style="${bgStyle}">
            ${bgOverlay}
            <div class="absolute inset-0 pointer-events-none">
              <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full"></div>
              <div class="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 blur-3xl rounded-full"></div>
            </div>
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6 relative">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Live Builder Platform
            </div>
            <h1 class="${s.titleSize || "text-5xl"} font-extrabold ${s.textColor || "text-white"} leading-[1.1] tracking-tight mb-6 max-w-3xl relative">
              ${s.title}
            </h1>
            <p class="${s.subtitleSize || "text-lg"} ${s.textColor || "text-white"} opacity-60 max-w-xl mb-10 relative leading-relaxed">
              ${s.subtitle}
            </p>
            <div class="flex gap-3 relative">
              <button class="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 active:scale-[0.98] cursor-pointer">
                ${s.buttonText || "Get Started"}
              </button>
              <button class="px-7 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        `;
        break;

      case "features":
        sectionHtml = `
          <div class="relative py-20 px-8 max-w-7xl mx-auto" style="${bgStyle}">
            ${bgOverlay}
            <div class="text-center mb-12">
              <h2 class="${s.titleSize || "text-3xl"} font-bold ${s.textColor || "text-white"} mb-3">${s.title}</h2>
              <p class="${s.subtitleSize || "text-sm"} opacity-60 max-w-md mx-auto">${s.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${(s.customElements || []).map((el: any) => `
                <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div class="text-xl mb-2">${el.content.split("\n")[0] || ""}</div>
                  <p class="text-xs text-neutral-400">${el.content.split("\n").slice(1).join("\n") || ""}</p>
                </div>
              `).join("")}
            </div>
          </div>
        `;
        break;

      case "cta":
        sectionHtml = `
          <div class="relative py-24 px-8 text-center" style="${bgStyle}">
            ${bgOverlay}
            <div class="max-w-2xl mx-auto">
              <h2 class="${s.titleSize || "text-4xl"} font-bold ${s.textColor || "text-white"} mb-4">${s.title}</h2>
              <p class="${s.subtitleSize || "text-base"} opacity-80 mb-8 max-w-lg mx-auto">${s.subtitle}</p>
              <button class="px-8 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-100 transition-all cursor-pointer">
                ${s.buttonText || "Get Started Free"}
              </button>
            </div>
          </div>
        `;
        break;

      case "contact":
        sectionHtml = `
          <div class="relative py-20 px-8" style="${bgStyle}">
            ${bgOverlay}
            <div class="max-w-xl mx-auto space-y-6">
              <div class="text-center">
                <h2 class="text-3xl font-bold ${s.textColor || "text-white"} mb-2">${s.title}</h2>
                <p class="text-sm opacity-60">${s.subtitle}</p>
              </div>
              <form class="space-y-4" onsubmit="event.preventDefault(); alert('Message sent!');">
                ${(s.formFields || []).map((f: any) => `
                  <div>
                    <label class="block text-xs font-semibold text-neutral-400 mb-1.5">${f.label}</label>
                    <input type="${f.type}" placeholder="${f.placeholder}" class="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/50 text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-all" />
                  </div>
                `).join("")}
                <button type="submit" class="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all cursor-pointer">
                  ${s.buttonText || "Send Message"}
                </button>
              </form>
            </div>
          </div>
        `;
        break;

      case "footer":
        sectionHtml = `
          <div class="relative py-12 px-8 text-center border-t border-white/[0.05]" style="${bgStyle}">
            ${bgOverlay}
            <p class="text-sm text-neutral-400">${s.title}</p>
            <p class="text-xs text-neutral-500 mt-2">${s.subtitle}</p>
          </div>
        `;
        break;

      case "image-block":
        sectionHtml = `
          <div class="relative py-20 px-8 text-center" style="${bgStyle}">
            ${bgOverlay}
            <h2 class="text-2xl font-bold ${s.textColor || "text-white"} mb-2">${s.title}</h2>
            <p class="text-sm opacity-60 mb-6">${s.subtitle}</p>
            ${s.imageUrl ? `<img src="${s.imageUrl}" class="mx-auto rounded-2xl max-h-96 object-cover shadow-2xl" />` : ""}
          </div>
        `;
        break;

      case "custom-block":
        sectionHtml = `
          <div class="relative py-20 px-8" style="${bgStyle}">
            ${bgOverlay}
            <div class="grid grid-cols-1 md:grid-cols-${s.customGridCols || 2} gap-6 max-w-7xl mx-auto">
              ${(s.customElements || []).map((el: any) => {
                const alignClass = el.align || "text-left";
                const widthClass = el.width || "col-span-1";
                if (el.type === "heading") {
                  return `<h3 class="${widthClass} ${alignClass} ${el.fontSize || "text-2xl"} font-bold ${el.fontWeight || "font-bold"}" style="color: ${el.textColor || "#ffffff"}">${el.content}</h3>`;
                }
                if (el.type === "text") {
                  return `<p class="${widthClass} ${alignClass} ${el.fontSize || "text-sm"} opacity-75" style="color: ${el.textColor || "#e4e4e7"}">${el.content}</p>`;
                }
                if (el.type === "button") {
                  return `<div class="${widthClass} ${alignClass}"><button class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all" style="background-color: ${el.buttonColor || "#7c3aed"}; color: ${el.buttonTextColor || "#ffffff"}">${el.content}</button></div>`;
                }
                if (el.type === "image") {
                  return `<img src="${el.content}" class="${widthClass} rounded-xl object-cover" style="height: 200px; width: 100%;" />`;
                }
                if (el.type === "divider") {
                  return `<div class="${widthClass} h-px bg-white/10 my-4"></div>`;
                }
                if (el.type === "spacer") {
                  return `<div class="${widthClass} h-12"></div>`;
                }
                return "";
              }).join("")}
            </div>
          </div>
        `;
        break;

      default:
        break;
    }

    bodyContent += `
      <section class="relative ${s.bgColor || "bg-[#0a0a0f]"} overflow-hidden">
        ${sectionHtml}
      </section>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Published Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: #050508;
      color: #f3f4f6;
      font-family: ui-sans-serif, system-ui, sans-serif;
    }
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>
  `.trim();
}

export async function POST(req: Request) {
  try {
    const { sections, config } = await req.json();

    if (!sections || !Array.isArray(sections)) {
      return NextResponse.json({ error: "Missing sections data" }, { status: 400 });
    }

    const htmlContent = compileSectionsToHtml(sections);

    const mode = config?.mode || "local";

    if (mode === "local") {
      const publicDir = path.join(process.cwd(), "public", "deployed-site");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, "index.html"), htmlContent);
      return NextResponse.json({
        success: true,
        message: "Successfully deployed locally!",
        url: "/deployed-site/index.html"
      });
    }

    // Coolify / GitHub Deployment
    const { githubToken, githubRepo, coolifyUrl, coolifyToken, coolifyAppUuid } = config;

    if (!githubToken || !githubRepo) {
      return NextResponse.json({ error: "GitHub token & repository are required for Coolify mode." }, { status: 400 });
    }

    // 1. Commit HTML to GitHub Repo
    const repoUrl = `https://api.github.com/repos/${githubRepo}/contents/index.html`;

    let sha = "";
    const getRes = await fetch(repoUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json"
      }
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    const commitRes = await fetch(repoUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Deploy from Web Builder",
        content: Buffer.from(htmlContent).toString("base64"),
        sha: sha || undefined
      })
    });

    if (!commitRes.ok) {
      const errData = await commitRes.json();
      return NextResponse.json({ error: `GitHub commit failed: ${errData.message || "Unknown error"}` }, { status: 500 });
    }

    // 2. Trigger Coolify Deployment if URL, Token, and App UUID are provided
    if (coolifyUrl && coolifyToken && coolifyAppUuid) {
      const cleanUrl = coolifyUrl.replace(/\/$/, "");
      const triggerUrl = `${cleanUrl}/api/v1/applications/${coolifyAppUuid}/deploy`;

      const coolifyRes = await fetch(triggerUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${coolifyToken}`
        }
      });

      if (!coolifyRes.ok) {
        const errText = await coolifyRes.text();
        return NextResponse.json({
          success: true,
          githubCommitted: true,
          message: `GitHub code committed, but Coolify deploy trigger failed: ${errText}`
        });
      }
    }

    return NextResponse.json({
      success: true,
      githubCommitted: true,
      message: "Successfully pushed to GitHub and triggered Coolify deployment!"
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process deploy" }, { status: 500 });
  }
}
