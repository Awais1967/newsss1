import React, { useState } from 'react';
import { FaTh, FaUserAlt, FaSignOutAlt, FaCommentAlt, FaBars, FaSearch, FaUpload } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import './mainscreen.css';

const Mainscreen = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(null);
  const [price, setPrice] = useState(null);

  const menuItem = [
    { path: "/Transcript", name: "Transcript", icon: <FaUserAlt /> },
    { path: "/transcript_track", name: "Confirmation", icon: <FaSearch /> },
    { path: "/comment", name: "Feedback", icon: <FaCommentAlt /> },
    { path: "/logout", name: "Logout", icon: <FaSignOutAlt /> },
  ];

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const fileNamesArray = Array.from(files).map(file => file.name);
    setFileNames(fileNamesArray);
    if (files.length > 0) {
      const file = files[0];
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileNamesArray = Array.from(files).map(file => file.name);
    setFileNames(fileNamesArray);
    if (files.length > 0) {
      const file = files[0];
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handlePayClick = () => {
    if (fileUrl) {
      navigate('/pdfpagecounter', { state: { pdfUrl: fileUrl } });
    } else {
      alert('Please upload a file first.');
    }
  };
  

  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className='top_section'>
          <h1 style={{ display: isOpen ? "block" : "none" }} className='logo'>Logo</h1>
          <div style={{ marginLeft: isOpen ? "300px" : "50px" }} className='bars'>
            <FaBars onClick={toggle} />
          </div>
          <button onClick={toggle} className="toggle-btn">{isOpen ? "SSSM" : "SSSM"}</button>
        </div>

        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link" activeClassName="active">
            <div className='icon'>{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className='link_text'>{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>
        <h1>WELCOME TO SSSM</h1>
        <div className="btn-container">
          <button className="btn"><a href="https://moellim.riphah.edu.pk/login/index.php" target="_blank" rel="noreferrer">Moellim</a></button>
          <button className="btn"><a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">Whatsapp</a></button>
          <button className="btn"><a href="https://fiori.riphah.edu.pk:8011/sap/bc/ui2/flp?_sap-hash=I1NoZWxsLWhvbWU" target="_blank" rel="noreferrer">Fiori</a></button>
        </div>
        <div className="btn-container">
          <button className="btn"><a href="https://mail.google.com/mail" target="_blank" rel="noreferrer">Gmail</a></button>
          <button className="btn"><a href="https://onedrive.live.com/login" target="_blank" rel="noreferrer">OneDrive</a></button>
          <button className="btn"><a href="#" target="_blank" rel="noreferrer">USB-port</a></button>
        </div>

        <div className="file-upload"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="file-upload-input" className="file-upload-label">
            <FaUpload />
            Upload Files
          </label>
          <input
            id="file-upload-input"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
        <div className="file-names">
          {fileNames.length > 0 && <h3>Uploaded Files:</h3>}
          <ul>
            {fileNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          <button onClick={handlePayClick}>Pay</button>
        </div>
      </main>
    </div>
  );
};

export default Mainscreen;
