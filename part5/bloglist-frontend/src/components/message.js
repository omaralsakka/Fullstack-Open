const Message = (props) => {
  const { message, setMessage } = props;

  let C = message.type > 1 ? "red" : "green";
  const messageStyle = {
    color: C,
    fontStyle: "italic",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  setTimeout(() => {
    setMessage("");
  }, 5000);
  return <div style={messageStyle}>{message.txt}</div>;
  //   }
};

export default Message;
