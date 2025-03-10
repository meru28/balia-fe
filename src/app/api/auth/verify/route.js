import axios from "axios";
import { NextResponse } from "next/server";
import {apiService} from "@/services/api.service";

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await apiService.verifyUser(data)
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Verify failed" },
      { status: error.response?.status || 500 }
    );
  }
}
