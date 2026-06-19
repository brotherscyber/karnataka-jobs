"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  increment,
} from "firebase/firestore";

export default function JobDetails() {
  const params = useParams();

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      const docRef = doc(db, "jobs", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
  views: increment(1),
});
        const currentJob = {
  id: docSnap.id,
  ...docSnap.data(),
  views: (docSnap.data().views || 0) + 1,
};

        setJob(currentJob);

        const snapshot = await getDocs(collection(db, "jobs"));

        const related = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (item) =>
              item.id !== currentJob.id &&
              item.type === currentJob.type
          );

        setRelatedJobs(related);
      }
    };

    if (params?.id) {
      fetchJob();
    }
  }, [params]);

  if (!job) {
    return (
      <main className="p-8">
        Loading...
      </main>
    );
  }
const jobSchema = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  hiringOrganization: {
    "@type": "Organization",
    name: job.company,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressRegion: job.location,
      addressCountry: "IN",
    },
  },
  employmentType: job.type,
  validThrough: job.lastDate,
};
  return (
    <main className="max-w-4xl mx-auto p-8">
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jobSchema),
  }}
/>
      <h1 className="text-3xl font-bold">
        {job.title}
      </h1>

      <p className="mt-3 text-gray-700">
        Company: {job.company}
      </p>

      <p className="text-gray-700">
        Location: {job.location}
      </p>

      <p className="text-blue-700 mt-2">
        Type: {job.type}
      </p>
      <p className="text-gray-600 mt-2">
  👁 Views: {job.views || 0}
</p>

      <p className="text-red-600 mt-2">
        Last Date: {job.lastDate}
      </p>
      {new Date(job.lastDate) < new Date() && (
  <div className="mt-3 inline-block bg-red-600 text-white px-3 py-1 rounded">
    Expired
  </div>
)}

      <div className="mt-6 whitespace-pre-line">
        {job.description}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4 flex-wrap">

        <a
          href={job.apply}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Apply Now
        </a>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Copy Link
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          Share on WhatsApp
        </a>

      </div>

      {/* Related Jobs */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Related Jobs
        </h2>

        {relatedJobs.length === 0 ? (
          <p>No related jobs found.</p>
        ) : (
          relatedJobs.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 mb-4"
            >
              <a
                href={`/jobs/${item.id}`}
                className="text-blue-700 font-bold hover:underline"
              >
                {item.title}
              </a>

              <p className="text-gray-600">
                {item.company}
              </p>

              <p className="text-gray-500">
                {item.location}
              </p>
            </div>
          ))
        )}
      </div>

    </main>
  );
}