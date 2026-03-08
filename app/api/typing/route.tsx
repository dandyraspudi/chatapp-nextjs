import { pusher } from "@/lib/pusher";

export async function POST(req: Request) {
  const body = await req.json();

  await pusher.trigger("chat", "typing", {
    user: body.user,
  });

  return Response.json({ success: true });
}
