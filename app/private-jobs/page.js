"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function PrivateJobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));

      const allJobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const privateJobs = allJobs.filter(
        (job) => job.type === "Private"
      );

      setJobs(privateJobs);
    };

    fetchJobs();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Private Jobs in Karnataka
      </h1>

      {jobs.length === 0 ? (
        <p>No Private jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 mb-4"
          >
            <a
              href={`/jobs/${job.id}`}
              className="text-blue-700 font-bold hover:underline"
            >
              {job.title}
            </a>

            <p>{job.company}</p>

            <p className="text-gray-500">
              {job.location}
            </p>
          </div>
        ))
      )}
    </main>
  );
}