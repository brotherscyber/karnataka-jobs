"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Home() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const saveJob = (jobId) => {
  let updated = [...savedJobs];

  if (updated.includes(jobId)) {
    updated = updated.filter((id) => id !== jobId);
  } else {
    updated.push(jobId);
  }

  setSavedJobs(updated);
  localStorage.setItem("savedJobs", JSON.stringify(updated));
};
  const [filter, setFilter] = useState("All");

useEffect(() => {
  const fetchJobs = async () => {
    const q = query(
  collection(db, "jobs"),
  orderBy("createdAt", "desc")
);

const querySnapshot = await getDocs(q);

    const jobList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setJobs(jobList);
  };

  fetchJobs();
  const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
setSavedJobs(saved);
}, []);

  return (
  <main
    className={
      darkMode
        ? "min-h-screen bg-gray-900 text-white"
        : "min-h-screen bg-gray-50"
    }
  >
      {/* Header */}
      <header className="bg-blue-700 text-white">
       <div className="max-w-6xl mx-auto px-6 py-10 flex justify-between items-center flex-wrap">

  <div>
    <h1 className="text-4xl font-bold">
      Karnataka Jobs
    </h1>

    <p className="mt-2 text-blue-100">
      Daily Government & Private Job Notifications in Karnataka
    </p>
  </div>

  <div className="flex gap-3 flex-wrap mt-4 md:mt-0">

    <a
      href="/government-jobs"
      className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold"
    >
      🏛 Government Jobs
    </a>

    <a
      href="/private-jobs"
      className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold"
    >
      🏢 Private Jobs
    </a>

    <a
      href="/saved-jobs"
      className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold"
    >
      ❤️ Saved Jobs
    </a>

    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-black text-white px-4 py-2 rounded-lg"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>

  </div>

</div>
      </header>

      {/* Subscription Section */}
      <section
  className={`max-w-6xl mx-auto px-6 -mt-6 ${
    darkMode ? "text-white" : ""
  }`}
>
        <div
  className={`rounded-2xl shadow-lg p-6 ${
    darkMode ? "bg-gray-800" : "bg-white"
  }`}
>
          <h2 className="text-2xl font-semibold">Get Daily Job Alerts</h2>
          <p className="text-gray-600 mt-2">
            Subscribe by email or join WhatsApp to receive the latest job
            notifications.
          </p>

          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border rounded-lg px-4 py-3"
            />
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
              Subscribe
            </button>
            <a
              href="https://wa.me/917019402771"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Join WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Search */}
<section className="max-w-6xl mx-auto px-6 mt-8">
  <input
    type="text"
    placeholder="Search jobs by title, company, or location"
    className="w-full border rounded-xl px-4 py-3"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <div className="flex gap-3 mt-4">
    <button
      onClick={() => setFilter("All")}
      className="bg-gray-700 text-white px-4 py-2 rounded"
    >
      All Jobs
    </button>

    <button
      onClick={() => setFilter("Government")}
      className="bg-blue-700 text-white px-4 py-2 rounded"
    >
      Government Jobs
    </button>

    <button
      onClick={() => setFilter("Private")}
      className="bg-green-700 text-white px-4 py-2 rounded"
    >
      Private Jobs
    </button>
  </div>
</section>

      {/* Job Listings */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Job Notifications</h2>
        <div
  className={`mb-8 border rounded-2xl p-6 ${
    darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-yellow-50 border-yellow-300"
  }`}
>
  <h2 className="text-2xl font-bold text-yellow-700 mb-4">
    Featured Jobs
  </h2>

  {jobs.slice(0, 3).map((job) => (
    <div
      key={job.id}
      className="mb-4 pb-4 border-b last:border-b-0"
    >
      <a
        href={`/jobs/${job.id}`}
        className="text-blue-700 font-bold hover:underline"
      >
        {job.title}
      </a>

      <p className="text-gray-600">
        {job.company}
      </p>
    </div>
  ))}
</div>

        <div className="grid gap-6">
          {jobs
  .filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      job.type?.toLowerCase().includes(filter.toLowerCase());

    return matchesSearch && matchesFilter;
  })
  .map((job) => (
            <div
              key={job.id}
              className={`rounded-2xl shadow-md p-6 border ${
  darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white"
}`}
            >
              <a href={`/jobs/${job.id}`}>
  <h3 className="text-xl font-semibold text-blue-700 hover:underline">
    {job.title}
  </h3>
</a>
              <p className="text-gray-700 mt-1">{job.company}</p>
              <p className="text-gray-500 mt-1">{job.location}</p>
              <p className="text-gray-500 mt-1">
  Type: {job.type}
</p>

<p className="text-red-600 mt-1">
  Last Date: {job.lastDate}
</p>
{new Date(job.lastDate) < new Date() && (
  <div className="mt-2 inline-block bg-red-600 text-white px-3 py-1 rounded">
    Expired
  </div>
)}
<p className="text-gray-700 mt-3 whitespace-pre-line">
  {job.description}
</p>

              <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {job.type}
              </span>

              <div className="mt-4 flex gap-3 flex-wrap">

  <a
    href={job.apply}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg"
  >
    Apply Now
  </a>

  <button
    onClick={() => saveJob(job.id)}
    className="bg-gray-200 px-5 py-2 rounded-lg"
  >
    {savedJobs.includes(job.id)
      ? "❤️ Saved"
      : "🤍 Save Job"}
  </button>

</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space Placeholder */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center text-gray-600">
          Google AdSense Space (Your ads will appear here)
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-10">
       <div className="max-w-6xl mx-auto px-6 py-8 text-center">

  <p>© 2026 Karnataka Jobs. All rights reserved.</p>

  <p className="mt-2 text-sm">
    Daily job updates for Karnataka job seekers.
  </p>

  <div className="mt-4 flex justify-center gap-6 flex-wrap">

    <a href="/about" className="hover:text-white">
      About Us
    </a>

    <a href="/contact" className="hover:text-white">
      Contact Us
    </a>

    <a href="/privacy-policy" className="hover:text-white">
      Privacy Policy
    </a>

    <a href="/disclaimer" className="hover:text-white">
      Disclaimer
    </a>

  </div>

</div>
      </footer>
      <button
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  className="fixed bottom-6 right-6 bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg"
>
  ⬆ Top
</button>
    </main>
  );
}