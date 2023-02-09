import { useCallback } from 'react';
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper';
import { ItemTypes } from '../utils/Constants'
import { SubCard } from './SubCard';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
}

export const Card = ({ item, id, text, index, moveCard, setCards, cards }) => {
  const dragRef = useRef(null);
  const previewRef = useRef(null);

  // const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!previewRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = previewRef.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);
  drop(preview(previewRef));

  const opacity = isDragging ? 0 : 1;
  // drag(drop(ref));

  const hasItems = item.hasOwnProperty('items');

  const moveSubCard = useCallback((dragIndex, hoverIndex) => {
    if (hasItems) {
      setCards((prevCards) => {
        return {
          ...prevCards,
          cardUnits: prevCards.cardUnits.map((obj) => {
            if (obj.id === item.id) {
              return {
                ...obj,
                items: update(obj.items, {
                  $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, obj.items[dragIndex]]
                  ],
                })
              };
            } else {
              return obj;
            }
          })
        };
      });
    }
  }, []);

  const renderSubItems = useCallback((subItem, index) => {
    return (
      <SubCard 
        index={index}
        id={subItem.id}
        text={subItem.text}
        moveSubCard={moveSubCard}
        key={subItem.id}
      />
    );
  }, []);

  return (
    <div 
      // ref={ref} 
      ref={previewRef}
      data-handler-id={handlerId}
      style={{ ...style, opacity }} 
    >
      <div ref={dragRef}>__Handle__</div>
      {text}
      {hasItems && <div style={{ marginBottom: '20px' }}></div>}
      {hasItems && item.items.map((subItem, index) => renderSubItems(subItem, index))}
    </div>
  );
};
