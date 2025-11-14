import React, { useEffect, useState } from 'react';

const AdminForm = ({ onSubmit, editCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editCourse) {
      setTitle(editCourse.title);
      setDescription(editCourse.description);
      setYoutubeLink(editCourse.youtubeLink);
      setImage(null); // Don't auto-populate image
    } else {
      resetForm();
    }
  }, [editCourse]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setYoutubeLink('');
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('youtubeLink', youtubeLink);
    if (image) {
      formData.append('image', image);
    }
    onSubmit(formData);
    resetForm();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 md:p-10 rounded-lg shadow-xl text-white max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 space-y-6 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-gray-100">Course Management</h2>

        <div className="relative">
          <label className="block text-sm font-medium mb-2">Course Title</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4} // Make the textarea responsive by adding a specific row count
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-2">YouTube Link</label>
          <input
            type="url"
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-2">Course Image</label>
          <input
            type="file"
            className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 mt-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          {editCourse ? 'Update Course' : 'Add Course'}
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://cdn.prod.website-files.com/656d6ffbf552eddb5afd7d98/65f40990cf2a577987a88da9_Chaturji%20Avatar%20new3.png"
          alt="Course Banner"
          className="rounded-lg shadow-md object-cover h-48 w-full"
        />
      </div>
    </div>
  );
};

export default AdminForm;
