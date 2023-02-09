import { useCallback, useState } from "react";
import update from 'immutability-helper'
import { SubContainer } from "./SubContainer";

const style = {
  width: 600,
}

export const MainContainer = () => {

  const [containers, setContainers] = useState([
    {
      id: 1,
      text: 'Group 1',
    },
    {
      id: 2,
      text: 'Group 2',
    },
    {
      id: 3,
      text: 'Group 3',
    },
    {
      id: 4,
      text: 'Group 4',
    }
  ])

  const moveContainer = useCallback((dragIndex, hoverIndex) => {
    setContainers((prevContainers) =>
      update(prevContainers, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevContainers[dragIndex]],
        ],
      }),
    )
  }, [])

  const renderContainer = useCallback(
    (container, index) => {
      console.log(container);
      return (
        <SubContainer
          key={container.id}
          index={index}
          id={container.id}
          text={container.text}
          moveContainer={moveContainer}
        />
      )
    },
    [],
  )

  return (
    <>
      <div>Main Container</div>
      <div style={style}>
        {containers.map((container, i) => renderContainer(container, i))}
      </div>
    </>
  );
};