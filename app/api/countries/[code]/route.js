import { NextResponse } from "next/server";
const Country_Api = "https://restcountries.com/v3.1/all";

export async function GET(req, {params}) {

  const code = params.code.toLowerCase(); 
  
  try {
    const response = await fetch(Country_Api);
    const countries = await response.json();

    const country = countries.find((country) => country.cca2.toLowerCase() === code);
    
    if (!country) {
      return NextResponse.json({ message: `Country with cca2 ${code} not found` }, { status: 404 });
    }
    return NextResponse.json(country, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }

}