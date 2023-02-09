// Let's make <Card text='Write the docs' /> draggable!

import React from 'react';
import { useDrag, DragPreviewImage, DragSource } from 'react-dnd';
import { ItemTypes } from '../utils/Constants';
import horse from "../assets/horse.jpg";

/**
 * Your Component
 */

const styles = {
  padding: "15px",
  backgroundColor: "yellow",
  width: "200px "
};

export default function Card({ isDragging, text }) {
  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  return (
    <div ref={drag} style={{ ...styles, opacity }}>
      <DragPreviewImage 
        connect={preview} 
        src={horse} 
      />
      <div>Hello</div>
    </div>
  )
}