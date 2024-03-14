import React, { useState, useRef } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useStyles } from "./styles";

const Progress: React.FC<{ isExtendSearchPage?: boolean }> = ({ isExtendSearchPage }) => {
  const phrasesForExtendedSearch: string[] = [
    "Запрашиваем склады",
    "Получаем информацию",
    "Ищем лучшие варианты",
    "Подготавливаем результаты",
  ];
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

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
      setCurrentPhraseIndex((prevState) => (prevState !== phrasesForExtendedSearch.length - 1 ? prevState + 1 : 0));
    }, 4000);
    return () => {
      clearInterval(timer);
      clearInterval(phraseTimer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress
        className={classes.progress}
        variant="buffer"
        value={completed}
        valueBuffer={buffer}
        color="secondary"
      />
      {isExtendSearchPage && <p>{phrasesForExtendedSearch[currentPhraseIndex]}</p>}
    </div>
  );
};

export default Progress;
