import { useEffect, useState } from 'react';

import useModals from '../stores/usemodals';
import { Modal } from './modal';
import { ModalRelay } from './modalrelay';

const ModalEntry = () => {
  const { deactivate } = useModals();
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);
  return (
    <ModalRelay modalRoot={modalRoot}>
      <Modal id="test">
        <Modal.Window>
          <Modal.CloseIcon onClose={() => deactivate('test')} />
          <h1>Test</h1>
        </Modal.Window>
        <Modal.Mask onClose={() => deactivate('test')} />
      </Modal>
    </ModalRelay>
  );
};

export default ModalEntry;
