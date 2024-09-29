import { NextResponse } from "next/server";
const Country_Api = "https://restcountries.com/v3.1/all";

export async function GET(req, {params}) {

  const region = params.region.toLowerCase(); 
  
  try {
    const response = await fetch(Country_Api);
    const countries = await response.json();

    const country = countries.find((country) => country.region.toLowerCase() === region);
    
    if (!country) {
      return NextResponse.json({ message: `Country with region ${region} not found` }, { status: 404 });
    }
    return NextResponse.json(country, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }

}