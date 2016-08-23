import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const Chat = ({ open, handleClose, handleSubmit }) => {
  const actions = [
    <FlatButton
      label="No"
      primary
      keyboardFocused
      onTouchTap={handleClose}
    />,
    <FlatButton
      label="Yes"
      primary
      onTouchTap={handleSubmit}
    />,
  ];

  return (
    <Dialog
      title="Do you realy want to leave this room?"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleClose}
    />
  );
};

Chat.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Chat;
