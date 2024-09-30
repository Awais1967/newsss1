// src/components/pages/About.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, database } from '../../firebase'; // Adjust the path as needed
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { push, ref as dbRef } from 'firebase/database';
import './about.css';

const About = () => {
  const [user, setUser] = useState({
    sapNo: '', sapCmsNo: '', studentName: '', fatherName: '', gender: '', session: '', transcriptNo: '',
    registrationNo: '', batch: '', studentImage: null, transcriptImage: null, cnicNo: '', cnicImage: null, admissionDate: '',
    completionDate: '', degreeProgram: '', campusName: '', region: '', phoneNumber: '', email: '', feeLedger: null,
    degreeStatus: ''
  });

  const navigate = useNavigate();

  const data = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: files[0] });
  };

  const uploadFile = async (file, filePath) => {
    const fileRef = storageRef(storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const getdata = async (e) => {
    e.preventDefault();

    const {
      sapNo, sapCmsNo, studentName, fatherName, gender, session, transcriptNo, registrationNo, batch, studentImage,
      transcriptImage, cnicNo, cnicImage, admissionDate, completionDate, degreeProgram, campusName, region, phoneNumber,
      email, feeLedger, degreeStatus
    } = user;

    try {
      const studentImageUrl = studentImage ? await uploadFile(studentImage, `images/${studentImage.name}`) : '';
      const transcriptImageUrl = transcriptImage ? await uploadFile(transcriptImage, `images/${transcriptImage.name}`) : '';
      const cnicImageUrl = cnicImage ? await uploadFile(cnicImage, `images/${cnicImage.name}`) : '';
      const feeLedgerUrl = feeLedger ? await uploadFile(feeLedger, `images/${feeLedger.name}`) : '';

      const newUser = {
        sapNo, sapCmsNo, studentName, fatherName, gender, session, transcriptNo, registrationNo, batch, studentImage: studentImageUrl,
        transcriptImage: transcriptImageUrl, cnicNo, cnicImage: cnicImageUrl, admissionDate, completionDate, degreeProgram, campusName,
        region, phoneNumber, email, feeLedger: feeLedgerUrl, degreeStatus
      };

      const userRef = dbRef(database, 'Userdata');
      await push(userRef, newUser);

      navigate("/paymentpage");
    } catch (error) {
      console.error('Error occurred:', error);
      alert("Error occurred");
    }
  };

  return (
    <div className="about-container">
      <h1>Transcript Form</h1>
      <form method='POST' onSubmit={getdata}>
        <div className="form-row">
          <div>
            <label htmlFor="sapCmsNo">SAP / CMS No</label>
            <input id="sapCmsNo" required type="text" name='sapCmsNo' value={user.sapCmsNo} onChange={data} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="studentName">Student's Name (According to Transcript)</label>
            <input id="studentName" required type="text" name='studentName' value={user.studentName} onChange={data} />
          </div>
          <div>
            <label htmlFor="fatherName">Father's Name (According to Transcript)</label>
            <input id="fatherName" required type="text" name='fatherName' value={user.fatherName} onChange={data} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="gender">Gender</label>
            <select id="gender" required name='gender' value={user.gender} onChange={data}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="session">Session (According to Transcript)</label>
            <input id="session" required type="text" name='session' value={user.session} onChange={data} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="transcriptNo">Transcript No</label>
            <input id="transcriptNo" required type="text" name='transcriptNo' value={user.transcriptNo} onChange={data} />
          </div>
          <div>
            <label htmlFor="registrationNo">Registration No</label>
            <input id="registrationNo" required type="text" name='registrationNo' value={user.registrationNo} onChange={data} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="batch">Batch</label>
            <input id="batch" required name='batch' value={user.batch} onChange={data} placeholder='fall 2020'/>
          </div>
          <div>
            <label htmlFor="studentImage">Student Image (Only .jpg, .jpeg, .png, .pdf files are accepted)</label>
            <input id="studentImage" required type="file" name='studentImage' onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="cnicNo">CNIC No (Enter a valid CNIC in the format XXXXXXXXXXXXXXX)</label>
            <input id="cnicNo" required type="text" name='cnicNo' value={user.cnicNo} onChange={data} />
          </div>
          <div>
            <label htmlFor="transcriptImage">Transcript Image (Only .jpg, .jpeg, .png, .pdf files are accepted)</label>
            <input id="transcriptImage" required type="file" name='transcriptImage' onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="cnicImage">CNIC Image (Only .jpg, .jpeg, .png, .pdf files are accepted)</label>
            <input id="cnicImage" required type="file" name='cnicImage' onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="admissionDate">Admission Date</label>
            <input id="admissionDate" required type="date" name='admissionDate' value={user.admissionDate} onChange={data} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="completionDate">Completion Date</label>
            <input id="completionDate" required type="date" name='completionDate' value={user.completionDate} onChange={data} />
          </div>
          <div>
            <label htmlFor="degreeProgram">Degree Program Name (According to Transcript)</label>
            <input id="degreeProgram" required type="text" name='degreeProgram' value={user.degreeProgram} onChange={data} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="campusName">Campus Name</label>
            <input id="campusName" required type="text" name='campusName' value={user.campusName} onChange={data} />
          </div>
          <div>
            <label htmlFor="region">Region</label>
            <select id="region" required name='region' value={user.region} onChange={data}>
              <option value="1">Islamabad</option>
              <option value="2">Lahore</option>
              <option value="3">Faisalabad</option>
              <option value="4">Peshawar</option>
              <option value="5">Malakand</option>
              <option value="6">Sahiwal</option>
              <option value="7">Swat</option>
              <option value="8">Abbottabad</option>
              <option value="9">Mansehra</option>
              <option value="10">Dargai</option>
              <option value="11">Mirpur Khas</option>
              <option value="12">Mardan</option>
              <option value="13">Rawalpindi</option>
              <option value="14">Chackdara</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input id="phoneNumber" required type="text" name='phoneNumber' value={user.phoneNumber} onChange={data} />
          </div>
          <div>
            <label htmlFor="email">Email (Please make sure to provide a valid email address for future communication)</label>
            <input id="email" required type="email" name='email' value={user.email} onChange={data} />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="feeLedger">Fee Ledger (Only .jpg, .jpeg, .png, .pdf files are accepted)</label>
            <input id="feeLedger" required type="file" name='feeLedger' onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="degreeStatus">Degree Status</label>
            <select id="degreeStatus" required name='degreeStatus' value={user.degreeStatus} onChange={data}>
              <option value="">Select Degree Status</option>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent(N/A)</option>
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default About;
