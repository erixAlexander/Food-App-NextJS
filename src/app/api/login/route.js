import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/models/users";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    await connectMongoDB();
    const user = await Users.findOne({
      username: body.username,
    }).lean();

    const correctPwd = await bcrypt.compare(body.pwd, user.pwd);

    if (user && correctPwd) {
      const { username, pwd, refreshToken, ...userInfo } = user;
      return NextResponse.json({ name: username, userInfo });
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log(error);
  }
}
