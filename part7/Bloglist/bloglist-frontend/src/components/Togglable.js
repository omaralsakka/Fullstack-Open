import { useState } from "react";
import { Button } from "react-bootstrap";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibilty = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hide}>
        <Button onClick={toggleVisibilty}>{props.buttonLable}</Button>
      </div>
      <div style={show}>
        {props.children}
        <Button onClick={toggleVisibilty}>{props.cancelButtonLabel}</Button>
      </div>
    </div>
  );
};

export default Togglable;
