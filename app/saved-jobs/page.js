"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const savedIds =
        JSON.parse(localStorage.getItem("savedJobs")) || [];

      const snapshot = await getDocs(collection(db, "jobs"));

      const jobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = jobs.filter((job) =>
        savedIds.includes(job.id)
      );

      setSavedJobs(filtered);
    };

    fetchSavedJobs();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Saved Jobs
      </h1>

      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        savedJobs.map((job) => (
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