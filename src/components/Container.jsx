import update from 'immutability-helper'
import { useCallback, useEffect, useState } from 'react'

import { Card } from './Card'

const style = {
  width: 400,
}

export const Container = () => {
  {
    const [cards, setCards] = useState({
      cardUnits: [
        {
          id: 0,
          text: 'Write a cool JS library',
          items: [
            {
              id: 0,
              text: 'Make a website 1',
            },
            {
              id: 1,
              text: 'Make a website 2',
            },
            {
              id: 2,
              text: 'Make a website 3',
            }
          ]
        },
        {
          id: 1,
          text: 'Make it generic enough',
        },
        {
          id: 2,
          text: 'Write README',
        },
        {
          id: 3,
          text: 'Create some examples',
        },
        {
          id: 4,
          text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
          id: 5,
          text: '???',
        },
        {
          id: 6,
          text: 'PROFIT',
        },
      ]
    });

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) => {
        return {
          ...prevCards,
          cardUnits: update(prevCards.cardUnits, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards.cardUnits[dragIndex]],
            ],
          })
        };
      });
    }, []);

    const renderCard = useCallback(
      (card, index) => {
        return (
          <Card
            item={card}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            setCards={setCards}
            cards={cards}
            key={card.id}
          />
        )
      },
      [],
    )

    useEffect(() => {
      console.log(cards);
    }, [cards]);

    return (
      <>
        <div style={style}>{cards.cardUnits.map((card, i) => renderCard(card, i))}</div>
        <div style={{marginBottom: "30px"}}></div>
        <button onClick={() => console.log(cards)}>Check cards state</button>
      </>
    )
  }
}
