import * as C from "./App.styles";
import RestartIcon from "./svgs/restart.svg";
import logoImage from "./assets/devmemory_logo.png";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { useEffect, useState } from "react";
import { GridItemTypes } from "./Types/GridItemTypes";
import { items } from "./data/items";
import { GridItem } from "./components/GridItem";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemTypes[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.show === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].show) {
              tmpGrid[i].permanentShow = true;
              tmpGrid[i].show = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            tmpGrid[i].show = false;
          }
          setGridItems(tmpGrid);
          setShowCount(0);
          }, 500);
        }
        // setMoveCount(moveCount + 1);
        setMoveCount(moveCount => moveCount + 1) 
      }
    }
  }, [showCount, gridItems]);

  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShow === true)){
      setPlaying(false)
    }
  },[moveCount, gridItems])

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    let tmpGrid: GridItemTypes[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        show: false,
        permanentShow: false,
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    setGridItems(tmpGrid);

    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanentShow === false &&
        tmpGrid[index].show === false
      ) {
        tmpGrid[index].show = true;
        setShowCount(showCount + 1);
      }

      setGridItems(tmpGrid);
    }
  };

  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} alt="" width={200} />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
            <InfoItem label="Movimentos" value={moveCount.toString()} />
          </C.InfoArea>

          <Button
            label="Reiniciar"
            icon={RestartIcon}
            onClick={resetAndCreateGrid}
          />
        </C.Info>

        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  );
};

export default App;
