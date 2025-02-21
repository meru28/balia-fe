import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, email, firstName, roles, mobileNumber } = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      { username, email, firstName, roles, mobileNumber },
      { headers: { "Content-Type": "application/json" } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Registration failed" },
      { status: error.response?.status || 500 }
    );
  }
}
