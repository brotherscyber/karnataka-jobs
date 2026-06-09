export default function Home() {
  const jobs = [
    {
      title: "Karnataka Police Constable",
      company: "Karnataka State Police",
      location: "Karnataka",
      type: "Government Job",
      apply: "#",
    },
    {
      title: "Data Entry Operator",
      company: "Private Company",
      location: "Bengaluru",
      type: "Private Job",
      apply: "#",
    },
    {
      title: "Customer Support Executive",
      company: "Infosys",
      location: "Mysuru",
      type: "Private Job",
      apply: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold">Karnataka Jobs</h1>
          <p className="mt-2 text-blue-100">
            Daily Government & Private Job Notifications in Karnataka
          </p>
        </div>
      </header>

      {/* Subscription Section */}
      <section className="max-w-6xl mx-auto px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
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
        />
      </section>

      {/* Job Listings */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Job Notifications</h2>

        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-700 mt-1">{job.company}</p>
              <p className="text-gray-500 mt-1">{job.location}</p>

              <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {job.type}
              </span>

              <div className="mt-4">
                <a
                  href={job.apply}
                  className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Apply Now
                </a>
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
        </div>
      </footer>
    </main>
  );
}