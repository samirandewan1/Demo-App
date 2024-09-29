export async function getCountries(){
    const res = await fetch(`${process.env.APP_BASE_URL}/api/countries`);
    if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        return false;
    }
    const countries = await res.json();
    return countries;
}

export async function getCountry(cca2){
    const res = await fetch(`${process.env.APP_BASE_URL}/api/countries/`+cca2);
    if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        return false;
    }
    const country = await res.json();
    return country;
}