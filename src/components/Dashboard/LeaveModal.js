import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const Chat = ({ open, handleClose, handleSubmit }) => {
  const actions = [
    <FlatButton
      label="No"
      primary={true}
      keyboardFocused={true}
      onTouchTap={handleClose}
    />,
    <FlatButton
      label="Yes"
      primary={true}
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
}

export default Chat;
