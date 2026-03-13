import React, { useState, useEffect } from "react";
import { width, candyColors, CandyColor } from './types'

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<CandyColor[]>([])
  const [squareBeingDragged, setSquareBeingDragged] = useState<HTMLImageElement | null>(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<HTMLImageElement | null>(null)

  const createBoard = () => {
    const randomColorArrangement: CandyColor[] = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard();
  }, [])

  // --- SKANER PIONOWY ---
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === '';

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '');
        return true;
      }
    }
    return false;
  }

  // --- SKANER POZIOMY ---
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
      const isBlank = currentColorArrangement[i] === '';

      if (notValid.includes(i)) continue;

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = '');
        return true;
      }
    }
    return false;
  }
  // --- GRAWITACJA I SPADANIE ---
  const moveIntoSquareBelow = () => {
    // Skanujemy planszę od zera, ale tylko do 55 pola (ostatni rząd nie ma już pod sobą miejsca na spadanie!)
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      // 1. Jeśli jesteśmy w najwyższym rzędzie i pole jest puste, losujemy nowy cukierek z nieba!
      if (isFirstRow && currentColorArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      // 2. Jeśli pole DOKŁADNIE POD NAMI (i + width) jest puste, to spadamy w dół!
      if (currentColorArrangement[i + width] === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = ''; // Zostawiamy po sobie puste miejsce
      }
    }
  }

  // 3. SILNIK GRY (Pulsowanie co 100ms)
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree();
      checkForRowOfThree();
      // DODAJEMY GRAWITACJĘ TUTAJ:
      moveIntoSquareBelow();
      setCurrentColorArrangement((currentColorArrangement) => [...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkForColumnOfThree, checkForRowOfThree, currentColorArrangement]);

  const dragStart = (e: React.DragEvent<HTMLImageElement>) => {
    setSquareBeingDragged(e.target as HTMLImageElement)
  }

  const dragDrop = (e: React.DragEvent<HTMLImageElement>) => {
    setSquareBeingReplaced(e.target as HTMLImageElement);
  }

  const dragEnd = () => {
    if (!squareBeingDragged || !squareBeingReplaced) return

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id') || '0');
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id') || '0')

    const validMoves = [
      squareBeingDraggedId - 1,     // Lewo
      squareBeingDraggedId - width, // Góra
      squareBeingDraggedId + 1,     // Prawo
      squareBeingDraggedId + width  // Dół
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    if (validMove) {
      const currentColorArrangementCopy = [...currentColorArrangement];
      currentColorArrangementCopy[squareBeingReplacedId] = squareBeingDragged.getAttribute('src') as CandyColor
      currentColorArrangementCopy[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src') as CandyColor

      setCurrentColorArrangement(currentColorArrangementCopy);
    } else {
      console.log("Oszukujesz! Możesz przesunąć cukierek tylko o 1 pole.")
    }

    setSquareBeingDragged(null)
    setSquareBeingReplaced(null)
  }

  return (
    <div className='app'>
      <div className='game'>
        <h1>🍬 Candy Crush TS 🍬</h1>
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor ? 'candy' : 'empty'}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  )
}

export default App;