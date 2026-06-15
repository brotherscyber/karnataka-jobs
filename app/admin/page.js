"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);

useEffect(() => {
  const loggedIn = localStorage.getItem("adminLoggedIn");

  if (loggedIn === "true") {
  setAuthorized(true);
  fetchJobs();
} else {
    window.location.href = "/login";
  }
}, []);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const [type, setType] = useState("");
  const [apply, setApply] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

const [jobs, setJobs] = useState([]);
const fetchJobs = async () => {
  const querySnapshot = await getDocs(collection(db, "jobs"));

  const jobList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setJobs(jobList);
};

const deleteJob = async (id) => {
  await deleteDoc(doc(db, "jobs", id));
  fetchJobs();
};
  const addJob = async () => {
  try {

    if (editingId) {

      await updateDoc(doc(db, "jobs", editingId), {
        title,
        company,
        location,
        type,
        apply,
        lastDate,
        description,
      });

      alert("Job updated successfully!");
      setEditingId(null);

    } else {

      await addDoc(collection(db, "jobs"), {
        title,
        company,
        location,
        type,
        apply,
        lastDate,
        description,
        createdAt: new Date(),
      });

      alert("Job added successfully!");
    }

    fetchJobs();

    setTitle("");
    setCompany("");
    setLocation("");
    setType("");
    setApply("");
    setLastDate("");
    setDescription("");

  } catch (error) {
    console.error(error);
    alert("Error saving job");
  }
};

if (!authorized) {
  return null;
}
  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Karnataka Jobs Admin
  </h1>

  <button
    onClick={() => {
      localStorage.removeItem("adminLoggedIn");
      window.location.href = "/login";
    }}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
</div>

      <div className="space-y-4 max-w-xl">
        <input
          className="border p-3 w-full"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
<input
  className="border p-3 w-full"
  placeholder="Job Type (Government / Private)"
  value={type}
  onChange={(e) => setType(e.target.value)}
/>

<input
  className="border p-3 w-full"
  placeholder="Apply Link"
  value={apply}
  onChange={(e) => setApply(e.target.value)}
/>

<input
  className="border p-3 w-full"
  type="date"
  value={lastDate}
  onChange={(e) => setLastDate(e.target.value)}
/>

<textarea
  className="border p-3 w-full"
  rows="5"
  placeholder="Job Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
></textarea>

        <button
          onClick={addJob}
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          {editingId ? "Update Job" : "Add Job"}
        </button>
      </div>
      <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    All Jobs
  </h2>

  {jobs.map((job) => (
    <div
      key={job.id}
      className="border p-4 rounded mb-4 flex justify-between items-center"
    >
      <div>
  <h3 className="font-bold">{job.title}</h3>
  <p>{job.company}</p>
  <p className="text-gray-500">{job.description}</p>
</div>

      <div className="flex gap-2">

  <button
    onClick={() => {
      setEditingId(job.id);
      setTitle(job.title || "");
      setCompany(job.company || "");
      setLocation(job.location || "");
      setType(job.type || "");
      setApply(job.apply || "");
      setLastDate(job.lastDate || "");
      setDescription(job.description || "");
    }}
    className="bg-yellow-500 text-white px-4 py-2 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => deleteJob(job.id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>

</div>
    </div>
  ))}
</div>
    </main>
  );
}