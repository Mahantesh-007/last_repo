import React from 'react';

const Logout = () => {
    
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");

  };

  return (
    <div>
      <form>
        <button type="submit" onClick={handleSubmit}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
