import React from 'react';

const JobDetailsOverlay = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end items-start overflow-auto">
      <div className="bg-stone-800 w-full lg:w-[70%] h-full shadow-xl p-6 relative overflow-y-auto animate-slide-in-right text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>

        {/* Job Info */}
        <h2 className="text-3xl font-bold text-white mb-2">{job.title}</h2>
        <p className="text-lg font-medium text-gray-200">{job.company}</p>
        <p className="text-gray-400">{job.location}</p>
        <span className="inline-block my-3 px-4 py-1 text-sm bg-stone-900 text-white font-semibold rounded-full">
          {job.type}
        </span>

        <div className="text-gray-300 leading-relaxed mt-4 space-y-4">
          {job.description.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {job.jobLink && (
          <a
            href={job.jobLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-stone-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
};

export default JobDetailsOverlay;
