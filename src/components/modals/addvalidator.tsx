import useModals from '../../stores/usemodals';
import { Modal } from '../modal';

export const ID = 'add-validator';

const AddValidator = (props: { id: string }) => {
  const { deactivate } = useModals();
  const close = () => deactivate(props.id);
  const titleId = `${props.id}-title`;
  return (
    <Modal id={props.id} aria-labelledby={titleId}>
      <Modal.Window className="w-4/5 lg:w-8/12">
        <div className="relative h-max">
          <div className="absolute top-0 bottom-0 right-4 z-50">
            <Modal.CloseIcon
              className="sticky top-1 right-1"
              onClose={() => deactivate(props.id)}
            />
          </div>
          <Modal.Header title="Add Validator" titleId={titleId} />
          <form
            className="flex flex-col item-center justify-center"
            method="GET"
            action=""
          >
            <select id="chain">
              <option>Cosmos Hub</option>
              <option>Osmosis</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
      </Modal.Window>
      <Modal.Mask onClose={close} />
    </Modal>
  );
};

export default AddValidator;
