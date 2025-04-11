import { createUser } from "@/lib/actions/user.action";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
export async function POST(req: Request) {
  const svix_id = headers().get("svix-id") ?? "";
  const svix_timestamp = headers().get("svix-timestamp") ?? "";
  const svix_signature = headers().get("svix-signature") ?? "";
  //   nếu ko có WEBHOOK_SECRET thì bắn ra lỗi
  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET is not set");
  }
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Bad Request", { status: 400 });
  }
  //   Đang là json
  const payload = await req.json();
  //   convert nó thành stringify()
  const body = JSON.stringify(payload);
  //  nếu có WEBHOOK_SECRET thì chạy xuống đây
  const sivx = new Webhook(process.env.WEBHOOK_SECRET);

  let msg: WebhookEvent;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.log(err);
    return new Response("Bad Request", { status: 400 });
  }
  //   Khi gọi lên trang web âcdemy nó sẽ trả về một eventType
  const evenType = msg.type;
  if (evenType === "user.created") {
    // create user to data
    const { id, username, email_addresses, image_url } = msg.data;
    const user = await createUser({
      username: username!,
      name: username!,
      clerkId: id,
      email: email_addresses[0].email_address,
      avatar: image_url,
    });
    return NextResponse.json({
      message: "OK",
      user,
    });
  }
  return new Response("OK", { status: 200 });
}
