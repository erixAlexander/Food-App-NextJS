import bcrypt from "bcrypt";
import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/models/users";

export async function POST(request) {
  try {
    const body = await request.json();
    const pwd = await bcrypt.hash(body.pwd, 10);
    await connectMongoDB();
    const user = await Users.create({
      username: body.username,
      pwd,
      refreshToken: "",
      address: "",
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
