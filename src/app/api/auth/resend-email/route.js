// app/api/resend-email/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { message: "Email tidak boleh kosong" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify/resend`,
      { email },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return NextResponse.json(response.data, {
      status: 200
    });

  } catch (error) {
    // Tangani error yang mungkin terjadi
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Gagal mengirim ulang email"
      },
      {
        status: error.response?.status || 500
      }
    );
  }
}