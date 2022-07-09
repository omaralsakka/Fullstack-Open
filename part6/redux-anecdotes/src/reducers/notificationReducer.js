const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "vote notification":
      return `you voted '${action.data}'`;
    case "create notification":
      return `you created '${action.data}'`;
    default:
      return state;
  }
};

export const newNotification = (value, content) => {
  return {
    type: value,
    data: content,
  };
};

export default notificationReducer;
