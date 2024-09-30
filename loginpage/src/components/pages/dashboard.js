import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css'; // Import the CSS file for styling
import img from '../assets/533ffe74439bc17d00bde0fcf9b371be.jpg'; // Import your image
import { PDFDocument } from 'pdf-lib';

const Dashboard = () => {
  const [pageCount, setPageCount] = useState(null);
  const [price, setPrice] = useState(null);
  const [filename, setFilename] = useState('');
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBytes = new Uint8Array(e.target.result);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const numPages = pdfDoc.getPageCount();
        setPageCount(numPages);
        setPrice(numPages * 5); // Assuming price per page is 5
        setFilename(file.name);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading PDF:', error);
    }
  };

  const gotoPayment = () => {
    navigate(`/paymentpage?filename=${encodeURIComponent(filename)}&price=${encodeURIComponent(price)}`);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            SSSM
          </Link>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/Transcript" className="navbar-links">
                Transcript
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/Clearnessform" className="navbar-links">
                clearanceForms
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/Comment" className="navbar-links">
                Contact
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/Logout" className="navbar-links">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="image-container">
        <img src={img} alt="Image" className="dashboard-image" />
        <h2 className="image-heading">Download File below portals</h2>
        <div className="buttons">
          <button className="dashboard-button">
            <a href="https://moellim.riphah.edu.pk/login/index.php" target="_blank" rel="noreferrer">
              Moellim
            </a>
          </button>
          <button className="dashboard-button">
            <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
              Whatsapp
            </a>
          </button>
          <button className="dashboard-button">
            <a href="https://fiori.riphah.edu.pk:8011/sap/bc/ui2/flp?_sap-hash=I1NoZWxsLWhvbWU" target="_blank" rel="noreferrer">
              Fiori
            </a>
          </button>
          <button className="dashboard-button">
            <a href="https://mail.google.com/mail" target="_blank" rel="noreferrer">
              Gmail
            </a>
          </button>
          <button className="dashboard-button">
            <a href="https://onedrive.live.com/login" target="_blank" rel="noreferrer">
              OneDrive
            </a>
          </button>
          <button className="dashboard-button">
            <a href="#" target="_blank" rel="noreferrer">
              USB-port
            </a>
          </button>
        </div>
        <div className="upload-container">
          <input type="file" id="fileInput" onChange={handleFileChange} />
          <label htmlFor="fileInput" className="upload-label">Upload File</label>
          {pageCount !== null && <p>Total number of pages: {pageCount}</p>}
          {price !== null && <p> Price: ${price}</p>}
          {filename && (
            <button className="proceed-button" onClick={gotoPayment}>Pay Now</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
