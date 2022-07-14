const Notification = ({erroMessage}) => {

  if (erroMessage === null) {
    return null
  }

  return (
    <div className="error">
      {erroMessage}
    </div>
  );
};

export default Notification;