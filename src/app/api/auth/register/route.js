import axios from "axios";
import { NextResponse } from "next/server";
import {apiService} from "@/services/api.service";

export async function POST(req) {
  try {
    const { username, email, firstName, roles, mobileNumber } = await req.json();
    const response = await apiService.registerUser({username, email, firstName, roles, mobileNumber})
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Registration failed" },
      { status: error.response?.status || 500 }
    );
  }
}
