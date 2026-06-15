import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function sitemap() {
  const snapshot = await getDocs(collection(db, "jobs"));

  const jobs = snapshot.docs.map((doc) => ({
    url: `https://karnataka-jobs.vercel.app/jobs/${doc.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://karnataka-jobs.vercel.app",
      lastModified: new Date(),
    },

    ...jobs,
  ];
}