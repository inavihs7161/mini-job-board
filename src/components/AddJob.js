import React, { useState } from 'react';

const AddJob = () => {
  const [job, setJob] = useState({
    title: '', company: '', type: '', location: '', description: '', jobLink: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    setMessage({ type: null, text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, company, type, location, description } = job;
    if (!title || !company || !type || !location || !description) {
      return setMessage({ type: 'error', text: 'Please fill all required fields.' });
    }

    setLoading(true);
    setMessage({ type: null, text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add job');
      }

      setMessage({ type: 'success', text: 'Job added successfully!' });
      setJob({ title: '', company: '', type: '', location: '', description: '', jobLink: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-24 p-8 bg-stone-800 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6">Post a Job</h2>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-md text-sm font-medium ${
            message.type === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-green-600 text-white'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: 'title', placeholder: 'Job Title' },
          { name: 'company', placeholder: 'Company Name' },
          { name: 'location', placeholder: 'Location' },
          { name: 'jobLink', placeholder: 'Job Link', type: 'url' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || 'text'}
            name={field.name}
            value={job[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-stone-700 border border-stone-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        ))}

        <select
          name="type"
          value={job.type}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-stone-700 border border-stone-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">Select Job Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
        </select>

        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          rows={4}
          placeholder="Job Description"
          className="w-full px-4 py-3 bg-stone-700 border border-stone-600 text-white rounded-lg resize-y focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? 'bg-green-400 text-white cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {loading ? 'Submitting...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
