/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Togglable';
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
