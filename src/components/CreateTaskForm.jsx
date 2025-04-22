//frontend/src/components/CreateTaskForm.jsx

import { useState } from 'react';
import axios from '../api/axios';

export default function CreateTaskForm({ onTaskCreated }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/tasks/ai-create', { description });
      setDescription('');
      onTaskCreated?.(); // odświeżenie listy tasków
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl bg-white shadow-md">
      <h2 className="text-xl font-semibold">Create Task with AI</h2>

      <textarea
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Describe the task you want to create..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !description.trim()}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create with AI'}
      </button>
    </form>
  );
}
