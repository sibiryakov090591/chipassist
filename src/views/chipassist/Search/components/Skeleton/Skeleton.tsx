import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useStyles } from "./styles";

const Skeletons = () => {
  const classes = useStyles();
  const sMap = [1, 2];
  return (
    <div style={{ width: "100%" }}>
      {sMap.map((value) => {
        return (
          <div key={value}>
            <div>
              <div className={classes.table}>
                <Skeleton variant="rect" className={classes.image} width={150} height={90} />
                <div className={classes.titleBlock}>
                  <Skeleton className={classes.title} width={"99%"} />
                  <Skeleton className={classes.title} width={"99%"} />
                  <Skeleton className={classes.title} width={"99%"} />
                  <Skeleton className={classes.title} width={"99%"} />
                  <Skeleton className={classes.title} width={"99%"} />
                </div>
              </div>
              <div className={classes.tableBody}>
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
                <Skeleton className={classes.tableBodyS} width={"100%"} />
              </div>
              <div className={classes.bottomRow}>
                <div className={classes.leftColumn}></div>
                <div className={classes.rightColumn}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Skeletons;
