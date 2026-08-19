import { NextResponse } from "next/server";

export function checkAdminAuth(request: Request): boolean {
  // Check authorization header or admin secret
  const authHeader = request.headers.get("x-admin-secret");
  const secretKey = process.env.ADMIN_SECRET_KEY || "khf_admin_super_secret_2026";
  if (authHeader === secretKey) {
    return true;
  }

  // Check referer and origin to ensure request comes from authorized web app
  const referer = request.headers.get("referer") || "";
  const origin = request.headers.get("origin") || "";
  const host = request.headers.get("host") || "";

  if (referer.includes("/admin") || (origin && host && origin.includes(host))) {
    return true;
  }

  return false;
}
