import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
// import {
//   createUserByClerk,
//   deleteUserByClerkId,
//   updateUserByClerk,
// } from "@/database/actions.db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  console.log(process.env.WEBHOOK_SECRET);
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  console.log("getting header");
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  console.log("checking for svix_id");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  console.log("verifying svix");
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  // const { id } = evt.data;
  const eventType = evt.type;
  console.log(eventType);
  console.log("web hook activated");
  if (eventType == "user.created") {
    const { username, email_addresses, first_name, last_name, image_url, id } =
      evt.data;

    const newUser = {
      clerkId: id,
      name: `${first_name + " " + last_name}`,
      username: username as string,
      email: email_addresses[0].email_address,
      picture: image_url,
    };

    console.log("user created");
    console.log(newUser);
    // const mongoUser = await createUserByClerk(newUser);
    // if (mongoUser) return NextResponse.json({ status: "ok", user: mongoUser });
    return NextResponse.json({ status: "error" });
  }
  // if (eventType == "user.updated") {
  //   const { username, email_addresses, first_name, last_name, image_url, id } =
  //     evt.data;

  //   const toUpdate = {
  //     name: `${first_name + " " + last_name}`,
  //     username: username as string,
  //     email: email_addresses[0].email_address,
  //     picture: image_url,
  //   };

  //   const mongoUser = await updateUserByClerk(id, toUpdate);
  //   if (mongoUser) return NextResponse.json({ status: "ok", user: mongoUser });
  //   return NextResponse.json({ status: "error" });
  // }

  // if (eventType == "user.deleted") {
  //   const { id } = evt.data;
  //   const user = deleteUserByClerkId(id!);
  //   if (user) return NextResponse.json({ status: "deleted", user: user });
  //   return NextResponse.json({ status: "error" });
  // }

  return new Response("", { status: 200 });
}
