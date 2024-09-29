import styles from "./page.module.css";
import Dashboard from "@/components/dashboard/dashboard";

export default async function Home({ searchParams }) {
  const {q,r} = searchParams ;
  const squery = q || "";
  const rquery = r || "";
   return (
    <div className={styles.main}>
      <Dashboard squery={squery} rquery={rquery}/>
    </div>
  );
}
