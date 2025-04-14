'use server';

import { API_ROUTES } from '@/constants/api-routes';
import {getServerSession} from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getNewsPromo() {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.user?.accessToken;

    const headers = {
      'Content-Type': 'application/json',
    };

    // Tambahkan header Authorization jika token tersedia
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('https://api.balia.ae/backend/v1/api' + API_ROUTES.PROMO.GET_NEWS_PROMO + '?size=5&sort=id,asc&page=0', {
      cache: 'force-cache',
      next: {revalidate: 3600}, // Revalidasi setiap 1 jam
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news promo');
    }
    const data = await response.json();
    return data || { data: [] };
  } catch (error) {
    console.error("Error fetching news promo:", error);
    return { data: [] };
  }
}