import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/Constants'

const styles = {
  backgroundColor: 'lightgray',
  padding: '15px',
  width: '400px',
  height: '300px'
}

export const DropBox = () => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: () => console.log("drop done"),
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    }),
    []
  )

  return (
    <div ref={drop} style={{ ...styles }}>
      DropBox
    </div>
  );
};