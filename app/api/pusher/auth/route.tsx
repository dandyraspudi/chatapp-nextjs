import { pusher } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const socketId = formData.get("socket_id") as string;
    const channelName = formData.get("channel_name") as string;
    const username = formData.get("user") as string;
    const avatar = formData.get("avatar") as string;
    const randomId = function (length: number) {
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    };

    const authResponse = pusher.authorizeChannel(socketId, channelName, {
      user_id: username + randomId(5),
      user_info: {
        name: username,
        avatar: avatar
      },
    });

    return Response.json(authResponse);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Auth failed" }, { status: 500 });
  }
}
