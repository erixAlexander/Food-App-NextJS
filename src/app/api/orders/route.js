import connectMongoDB from "@/app/lib/mongodb";
import Orders from "@/models/orders";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const total = body.order
      .map((item) => item.total)
      .reduce((acc, curr) => acc + curr, 0);
    const order = {
      userId: body.id,
      items: body.order,
      total: total,
      option: body.option,
      address: "address",
    };

    await connectMongoDB();
    await Orders.create(order);
    return NextResponse.json({ message: "created" });
  } catch (error) {
    console.log(error);
  }
}
