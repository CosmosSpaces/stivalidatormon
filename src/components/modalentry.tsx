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
      <Modal id="test" aria-labelledby="validators-title">
        <Modal.Window
          className="flex text-white justify-center items-center"
          style={{
            height: '500px',
            width: '80%',
            maxWidth: '800px',
            display: 'flex',
          }}
        >
          <h1 id="validators-title">Ability to add validators coming soon!</h1>
        </Modal.Window>
        <Modal.Mask onClose={() => deactivate('test')} />
      </Modal>
    </ModalRelay>
  );
};

export default ModalEntry;
