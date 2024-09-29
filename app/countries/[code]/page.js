import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { getCountry } from "@/lib/dbmodule";

const CountryPage = async ({ params }) => {
  let languages = [];
  let languageString = "";
  let currencyKey = '';
  let currencyName = '';
  const country = await getCountry(params.code);
  if (country) {
    languages = country.languages ? Object.values(country.languages) : [];
    languageString = languages.length > 0 ? `${languages.join(", ")}`: "No languages available";
    const currencyKey = Object.keys(country.currencies)[0]; 
    const currencyName = country.currencies[currencyKey].name; 

  }
  return (
    <>
      {country && (
        <>
        <div className={styles.main}>
        <header className={styles.header}><Link href="/"><span className={styles["arrow"]}>&larr;  </span></Link>{country.name.common}</header>
          <div className={styles.container}>
              
              <ul className={styles.countrylist}>
                <li>
                  <strong>Population:</strong> {country.population}
                </li>
                <li>
                  <strong>Currency:</strong> {currencyName}
                </li>
                <li>
                  <strong>Languages:</strong> {languageString}
                </li>
                <li>
                  <strong>Flag:</strong> {country.flag}
                </li>
                <li>
                  <strong>Region:</strong> {country.region}
                </li>
              </ul>
            </div>
        </div>
        </>
      )}
      {!country && (
        <>
          <h1>No data</h1>
        </>
      )}
    </>
  );
};

export default CountryPage;
