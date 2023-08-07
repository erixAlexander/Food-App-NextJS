import connectMongoDB from "@/app/lib/mongodb";
import Orders from "@/models/orders";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const orders = await Orders.find({ userId: params.id });
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
  }
}
