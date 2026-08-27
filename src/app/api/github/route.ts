import { NextResponse } from "next/server";
import { fetchGithubStats } from "@/lib/github";

export const runtime = "nodejs";

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    return NextResponse.json({ configured: false, stats: null });
  }
  const stats = await fetchGithubStats(username);
  return NextResponse.json({ configured: true, stats });
}
