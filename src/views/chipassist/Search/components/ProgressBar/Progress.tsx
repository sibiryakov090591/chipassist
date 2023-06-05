import React, { useState, useRef } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useStyles } from "./styles";

const Progress = () => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);
  const [buffer, setBuffer] = useState(10);

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

    return () => {
      clearInterval(timer);
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
    </div>
  );
};

export default Progress;
