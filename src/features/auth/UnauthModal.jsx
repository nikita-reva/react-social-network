import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';

import { openModal } from '../../app/common/modals/modalReducer';

export default function UnauthModal({ history, setModalOpen }) {
  const { prevLocation } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  function handleClose() {
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return;
    }
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push('/events');
    }

    setOpen(false);
  }

  function handleLoginModal(modalType) {
    dispatch(openModal({ modalType }));
    setOpen(false);
    setModalOpen(false);
  }

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content="You need to be signed in to do that" />
      <Modal.Content>
        <p>Please either sign in or register to see this content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content="Login"
            onClick={() => {
              handleLoginModal('LoginForm');
            }}
          />
          <Button.Or />
          <Button
            fluid
            color="green"
            content="Register"
            onClick={() => {
              handleLoginModal('RegisterForm');
            }}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p>Or click cancel to continue as guest</p>
          <Button color="red" content="Cancel" onClick={handleClose} />
        </div>
      </Modal.Content>
    </Modal>
  );
}
