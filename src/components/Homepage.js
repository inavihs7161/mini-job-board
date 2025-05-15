import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobDetailsOverlay from "./JobDetailsOverlay";

const Homepage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const categories = [...new Set(jobs.map((job) => job.type))];

  useEffect(() => {
    let filtered = jobs;
    if (selectedCategory) {
      filtered = filtered.filter((job) => job.type === selectedCategory);
    }
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, jobs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white font-sans py-24 px-6 sm:px-12 md:px-20">
      {/* Heading */}
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl font-extrabold mb-3 leading-tight">
          Discover Your Next Career Move
        </h1>
        <p className="text-stone-300 text-lg max-w-xl mx-auto">
          Explore thousands of job opportunities worldwide. Connect, apply,
          and grow your professional journey.
        </p>
      </header>

      {/* Search bar with category selector */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex max-w-5xl mx-auto bg-stone-800 rounded-lg overflow-hidden shadow-lg border border-stone-700"
      >
        <select
          className="w-1/4 px-4 py-3 bg-stone-900 border-r border-stone-700 text-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Select job category"
        >
          <option value="">All Job Types</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-5 py-3 bg-stone-900 placeholder-stone-400 text-white focus:outline-none"
          aria-label="Job search input"
        />
        <button
          type="submit"
          className="bg-stone-600 hover:bg-stone-700 px-6 font-semibold transition"
          aria-label="Search jobs"
        >
          Search
        </button>
      </form>

      {/* Categories pills */}
      <section className="max-w-5xl mx-auto mt-14 mb-16 flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => {
          const count = jobs.filter((job) => job.type === cat).length;
          return (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? "" : cat)
              }
              className={`px-5 py-2 rounded-full border ${
                selectedCategory === cat
                  ? "bg-stone-600 border-stone-600"
                  : "border-stone-400 hover:bg-stone-700"
              } transition text-white font-medium`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </section>

      {/* Jobs Grid */}
      <section className="max-w-7xl mx-auto">
        {filteredJobs.length === 0 ? (
          <p className="text-center text-stone-300 text-xl mt-20">
            No jobs found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onViewDetails={setJob}
                className="bg-stone-800 border border-stone-700 rounded-lg shadow-md"
              />
            ))}
          </div>
        )}
      </section>

      {/* Job details overlay */}
      {job && <JobDetailsOverlay job={job} onClose={() => setJob(null)} />}
    </div>
  );
};

export default Homepage;
