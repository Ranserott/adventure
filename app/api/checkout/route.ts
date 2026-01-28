import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, address, city, region, postalCode, items, total } = body;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        customerName: name,
        customerEmail: email,
        total: total,
        status: "PENDING",
        items: items,
      },
    });

    // In a real application, you would:
    // 1. Integrate with a payment gateway (Stripe, Transbank, etc.)
    // 2. Send confirmation email
    // 3. Update inventory

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
