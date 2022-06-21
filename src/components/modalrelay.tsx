import React from 'react';

import ReactDOM from 'react-dom';

import useModals, { ModalStore } from '../stores/usemodals';

interface ModalRelayProps {
  children: JSX.Element | JSX.Element[];
  modalRoot: HTMLElement | null;
}

const selector = (state: ModalStore) => state.modals;

// This can be placed anywhere in app because it uses a portal.
export const ModalRelay = ({ children, modalRoot }: ModalRelayProps) => {
  const modals = useModals(selector);
  const filteredModals = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }
    const isActiveAndFirst =
      modals.findIndex((element) => element === child.props?.id) === 0;
    if (isActiveAndFirst) {
      return true;
    }
    return false;
  });

  // Destructure the first modal so we only ever show one at a time.
  const [firstModal = null] = filteredModals;

  return modalRoot
    ? ReactDOM.createPortal(
        <React.Fragment>{firstModal}</React.Fragment>,
        modalRoot
      )
    : null;
};
