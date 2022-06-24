import { useEffect, useState } from 'react';

import { ModalRelay } from './modalrelay';
import AddValidator, { ID as ADD_VALIDATOR } from './modals/addvalidator';
import SelectValidator, {
  ID as SELECT_VALIDATOR,
} from './modals/selectvalidator';

const ModalEntry = () => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);
  return (
    <ModalRelay modalRoot={modalRoot}>
      <AddValidator id={ADD_VALIDATOR} />
      <SelectValidator id={SELECT_VALIDATOR} />
    </ModalRelay>
  );
};

export default ModalEntry;
