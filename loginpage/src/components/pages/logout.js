import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any logout logic here, such as clearing authentication tokens
    // Then redirect to the login page
    navigate('/');
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
