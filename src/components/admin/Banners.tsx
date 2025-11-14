import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';


const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState(null);
  const [banners, setBanners] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch banners when component mounts
  useEffect(() => {
    fetch('https://job-search-b2.onrender.com/api/v1/banner/banners')
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('link', link);
    formData.append('subtitle', subtitle);
    formData.append('image', image);

    fetch('https://job-search-b2.onrender.com/api/v1/banner/banner', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage('Banner uploaded successfully!');
        setBanners((prevBanners) => [...prevBanners, data]);
        setTitle('');
        setLink('');
        setSubtitle('');
        setImage(null);
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => {
        setError('Error uploading banner.');
        console.error(err);
        setTimeout(() => setError(''), 3000);
      });
  };

  // Handle banner deletion
  const handleDelete = (id) => {
    fetch(`https://job-search-b2.onrender.com/api/v1/banner/banner/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setMessage('Banner deleted successfully!');
        setBanners((prevBanners) => prevBanners.filter((banner) => banner._id !== id));
        setTimeout(() => setMessage(''), 2000);
      })
      .catch((err) => {
        setError('Error deleting banner.');
        console.error(err);
        setTimeout(() => setError(''), 2000);
      });
  };

  return (
    <div>
    <div className="p-10 bg-gray-50 min-h-screen py-20">
      <Navbar/>
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Admin Dashboard: Upload Banner</h2>

      {message && (
        <div className="bg-green-100 text-green-800 border border-green-400 p-4 mb-6 rounded shadow-md">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-400 p-4 mb-6 rounded shadow-md">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section: Image with animation */}
        <div className="md:w-1/2 relative">
          <img
            src="https://d8it4huxumps7.cloudfront.net/uploads/images/66a383e6a26f6_mentor.png?d=996x803"
            alt="Banner Illustration"
            className="object-cover w-full h-full transform duration-1000 ease-in-out animate-slide-left bg-gray-100"
          />
        </div>

        {/* Right Section: Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 p-8 flex flex-col justify-center"
        >
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Link</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Subtitle</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Image</label>
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upload Banner
          </button>
        </form>
      </div>

      <h3 className="text-3xl font-bold mt-12 mb-6 text-center text-gray-800 dark:text-gray-200">Uploaded Banners</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {banners.map((banner) => (
          <div key={banner._id} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="text-xl font-bold mt-4 text-gray-800 dark:text-gray-200">{banner.title}</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{banner.subtitle}</p>
            <button
              onClick={() => handleDelete(banner._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
       
    </div>
    <Footer />
    </div>
  );
};

export default AdminDashboard;
