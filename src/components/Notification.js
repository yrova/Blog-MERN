/* eslint-disable react/prop-types */
import React from 'react';
import './Notification.css';

const Notification = ({ error, info }) => {
  if (error === null && info === null) {
    return null;
  }

  const errorMessage = () => (
    <div className="error">{error}</div>
  );

  const infoMessage = () => (
    <div className="infoMessage">{info}</div>
  );

  return (
    <div>
      {error !== null && errorMessage()}
      {info !== null && infoMessage()}
    </div>
  );
};

export default Notification;
