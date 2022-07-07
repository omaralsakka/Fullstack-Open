import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        <br />
        <br />
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Togglable;
