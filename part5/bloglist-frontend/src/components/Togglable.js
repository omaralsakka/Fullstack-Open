import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };
  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        <br />
        <br />
      </div>
      <div style={show} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Togglable;
