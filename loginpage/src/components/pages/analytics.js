import React, { useState, useEffect } from 'react';
import './analytics.css';
import { database } from '../../firebase';
import { ref, set, get, update } from 'firebase/database';

const Analytics = () => {
  const [formData, setFormData] = useState({
    sapId: '',
    studentName: '',
    registrationNo: '',
    fatherName: '',
    program: '',
    semester: '',
    degreeCompleted: false,
    discontinuing: false,
  });

  const [submissionMessage, setSubmissionMessage] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const timerRef = ref(database, 'timer');
        const snapshot = await get(timerRef);
        if (snapshot.exists()) {
          const timerData = snapshot.val();
          setTimerActive(timerData.active);
          setTimeRemaining(timerData.remaining);
        }
      } catch (error) {
        console.error('Error fetching timer: ', error);
      }
    };
  
    fetchTimer();
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && (name === 'degreeCompleted' || name === 'discontinuing')) {
      setFormData((prevData) => ({
        ...prevData,
        degreeCompleted: name === 'degreeCompleted' ? checked : false,
        discontinuing: name === 'discontinuing' ? checked : false,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await set(ref(database, 'clearanceForms/' + formData.sapId), formData);
      setSubmissionMessage('Your form has been submitted successfully');
      setTimerActive(true);
      setTimeRemaining(2 * 24 * 60 * 60); // 2 days in seconds
  
      // Save timer data to Firebase
      await set(ref(database, 'timer'), { active: true, remaining: timeRemaining });
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };
  
  

  useEffect(() => {
    let timer;
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
        update(ref(database, 'timer'), { remaining: timeRemaining - 1 });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="analytics-container">
      <h1>Clearance Form</h1>
      {!submissionMessage && (
        <form onSubmit={handleSubmit} className="analytics-form">
            <div className="form-group">
          <label>SAP ID:</label>
          <input
            type="text"
            name="sapId"
            value={formData.sapId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Registration No:</label>
          <input
            type="text"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Father Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Program:</label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Semester:</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="degreeCompleted"
              checked={formData.degreeCompleted}
              onChange={handleChange}
            />
            Degree Completed
          </label>
          <label>
            <input
              type="checkbox"
              name="discontinuing"
              checked={formData.discontinuing}
              onChange={handleChange}
            />
            Discontinuing
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
      {submissionMessage && (
        <div className="submission-message">
          <p>{submissionMessage}</p>
          <p>Time remaining: {formatTime(timeRemaining)}</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
