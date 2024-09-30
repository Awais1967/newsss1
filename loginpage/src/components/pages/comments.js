import React, { useState } from 'react';
import './comments.css';
import { database } from '../../firebase'; // Import the Realtime Database
import { ref, push } from "firebase/database"; // Import the necessary functions

const Comments = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentsRef = ref(database, 'comments');
      await push(commentsRef, formData);
      console.log('Form Data Submitted:', formData);
      // Optionally reset the form or provide feedback to the user
      setFormData({
        name: '',
        email: '',
        issue: ''
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="comments-container">
      <h2>Submit Your Issue</h2>
      <form onSubmit={handleSubmit} className="comments-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="issue">Issue:</label>
          <textarea
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Comments;
