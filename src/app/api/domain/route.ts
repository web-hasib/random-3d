import { NextResponse } from "next/server";
import dns from "dns";

// Helper function to resolve DNS A record
function resolveARecord(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolve4(domain, (err, addresses) => {
      if (err) resolve([]);
      else resolve(addresses);
    });
  });
}

// Helper function to resolve DNS CNAME record
function resolveCnameRecord(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolveCname(domain, (err, addresses) => {
      if (err) resolve([]);
      else resolve(addresses);
    });
  });
}

export async function POST(req: Request) {
  try {
    const { domain, config } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain name is required" }, { status: 400 });
    }

    const { coolifyUrl, coolifyToken, coolifyAppUuid } = config || {};

    // 1. Run real DNS verification check
    const aRecords = await resolveARecord(domain);
    const cnameRecords = await resolveCnameRecord(domain);

    const hasDnsRecords = aRecords.length > 0 || cnameRecords.length > 0;

    if (!hasDnsRecords) {
      return NextResponse.json({
        success: false,
        dnsStatus: "failed",
        message: `DNS check failed for ${domain}. Please point an A record to your server or CNAME to your domain first.`
      });
    }

    // 2. If Coolify configuration is set, call Coolify API to update FQDN
    if (coolifyUrl && coolifyToken && coolifyAppUuid) {
      const cleanUrl = coolifyUrl.replace(/\/$/, "");
      const patchUrl = `${cleanUrl}/api/v1/applications/${coolifyAppUuid}`;

      const fqdnValue = `https://${domain}`;

      const coolifyRes = await fetch(patchUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${coolifyToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fqdn: fqdnValue
        })
      });

      if (!coolifyRes.ok) {
        const errText = await coolifyRes.text();
        return NextResponse.json({
          success: false,
          dnsStatus: "success",
          message: `DNS check succeeded, but Coolify FQDN update failed: ${errText}`
        });
      }
    }

    return NextResponse.json({
      success: true,
      dnsStatus: "success",
      message: `Successfully connected ${domain}! SSL and routing have been updated.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to configure domain" }, { status: 500 });
  }
}
