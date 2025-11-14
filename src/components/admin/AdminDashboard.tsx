import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminForm from './AdminForm'; // Form component for adding/updating courses
import { COURSE_API_END_POINT } from '@/utils/constant';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

// AdminDashboard component
const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null); // State for editing a course
  const [alert, setAlert] = useState({ message: '', type: '', visible: false }); // Alert state

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch all courses from the backend
  const fetchCourses = () => {
    axios
      .get(COURSE_API_END_POINT)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  };

  // Show alert function
  const showAlert = (message, type) => {
    setAlert({ message, type, visible: true });
    console.log('Alert:', message, type); // Debugging log to check alert status
    setTimeout(() => {
      setAlert({ message: '', type: '', visible: false });
    }, 3000); // Auto-hide after 3 seconds
  };

  // Handle form submission for adding or updating a course
  const handleSubmit = (formData) => {
    if (editCourse) {
      // Update an existing course
      axios
        .put(`${COURSE_API_END_POINT}/update/${editCourse._id}`, formData)
        .then(() => {
          showAlert('Course Updated Successfully', 'success');
          fetchCourses();
          setEditCourse(null); // Clear the editing state after update
        })
        .catch((err) => {
          showAlert('Error updating course', 'error');
          console.error(err);
        });
    } else {
      // Add a new course
      axios
        .post(`${COURSE_API_END_POINT}/add`, formData)
        .then(() => {
          showAlert('Course Added Successfully', 'success');
          fetchCourses();
        })
        .catch((err) => {
          showAlert('Error adding course', 'error');
          console.error(err);
        });
    }
  };

  // Delete a course by ID
  const handleDelete = (courseId) => {
    axios
      .delete(`${COURSE_API_END_POINT}/delete/${courseId}`)
      .then(() => {
        showAlert('Course Deleted Successfully', 'success');
        fetchCourses();
      })
      .catch((err) => {
        showAlert('Error deleting course', 'error');
        console.error(err);
      });
  };

  // Set the course to be edited in the form
  const handleEdit = (course) => {
    setEditCourse(course);
  };

  return (
    <div>
      <Navbar />
      <div className="p-1 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen px-6 h-100 py-4">
        {/* Background Video */}
        
      

        <h2 className="text-5xl font-extrabold text-center text-gray-800 dark:text-gray-200 mb-10">
          Admin Dashboard
        </h2>
        <AdminForm onSubmit={handleSubmit} editCourse={editCourse} />

        <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-800 dark:text-gray-200 px-10">Course List</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
          {courses.map((course) => (
            <li
              key={course._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{course.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{course.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleEdit(course)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Alert Popup */}
        {alert.visible && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
              alert.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {alert.message}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminCourse;
