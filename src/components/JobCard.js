import React from 'react';

const truncate = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const JobCard = ({ job, onViewDetails }) => {
  return (
    <div className="bg-stone-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between w-full max-w-3xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <span className="text-sm px-3 py-1 bg-stone-600 rounded-full font-medium">
            {job.type}
          </span>
        </div>

        <p className="text-stone-200 text-sm font-medium">{job.company}</p>
        <p className="text-stone-300 text-sm mb-3">{job.location}</p>

        <p className="text-stone-100 text-sm mt-2">
          {truncate(job.description, 120)}
        </p>
      </div>

      <button
        onClick={() => onViewDetails(job)}
        className="mt-6 bg-gray-500 text-stone-900 font-bold py-2 px-6 rounded-xl self-start hover:bg-gray-400 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default JobCard;
