import React, { useState, useRef, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import microchip_animated_icon from "@src/images/microchip_animated_icon.svg";
import toInteger from "lodash/toInteger";
import { useStyles } from "./styles";

const Progress: React.FC<{ isExtendSearchPage?: boolean }> = ({ isExtendSearchPage }) => {
  const phrasesForExtendedSearch: string[] = [
    "Запрашиваем склады . . .",
    "Получаем информацию . . .",
    "Ищем лучшие варианты . . .",
    "Подготавливаем результаты . . .",
  ];
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const progress = useRef<() => void>();
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);
    const phraseTimer = setInterval(() => {
      setIsHidden(true);
      setTimeout(
        () =>
          setCurrentPhraseIndex((prevState) => (prevState !== phrasesForExtendedSearch.length - 1 ? prevState + 1 : 0)),
        300,
      );
    }, 4000);
    return () => {
      clearInterval(timer);
      clearInterval(phraseTimer);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsHidden(false), 300);
  }, [currentPhraseIndex]);

  return (
    <div className={classes.root}>
      {!isExtendSearchPage && (
        <LinearProgress
          className={classes.progress}
          variant="buffer"
          value={completed}
          valueBuffer={buffer}
          color="secondary"
        />
      )}
      {isExtendSearchPage && (
        <div>
          <object type={"image/svg+xml"} data={microchip_animated_icon} style={{ width: 150 }} />
          <p
            className={classes.loadingTextAnimation}
            style={{ fontSize: "1.5em", transition: "opacity 300ms ease", opacity: toInteger(!isHidden) }}
          >
            {phrasesForExtendedSearch[currentPhraseIndex]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Progress;
