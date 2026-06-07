// app/api/push/route.ts
import { createServerSupabase } from "@/lib/supabase-server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:admin@lirasyp.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  const { title, body, category } = await req.json();
  const supabase = createServerSupabase();

  const { data: subs } = await supabase
    .from("push_subscriptions")
    .select("*")
    .eq("is_active", true)
    .contains("subscribed_categories", [category]);

  if (!subs) return Response.json({ sent: 0 });

  const results = await Promise.allSettled(
    subs.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        JSON.stringify({ title, body, url: "https://lirasyp.com" })
      )
    )
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  return Response.json({ sent, total: subs.length });
}
