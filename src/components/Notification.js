/* eslint-disable react/prop-types */
import React from 'react';

const Notification = ({ error, info }) => {
  if (error === null && info === null) {
    return null;
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorMessage = () => (
    <div style={errorStyle} className="error">{error}</div>
  );

  const infoMessage = () => (
    <div style={infoStyle} className="infoMessage">{info}</div>
  );


  return (
    <div>
      {error !== null && errorMessage()}
      {info !== null && infoMessage()}
    </div>
  );
};

export default Notification;
