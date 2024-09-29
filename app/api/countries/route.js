import { NextResponse } from "next/server";

const Country_Api = "https://restcountries.com/v3.1/all";

export async function GET() {
  try {
  
    const response = await fetch(Country_Api);

    if (!response.ok) {
      return NextResponse.json({ message: "Unable to fetch countries" }, { status: 500 });
    }
    const countries = await response.json();
    return NextResponse.json(countries, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}