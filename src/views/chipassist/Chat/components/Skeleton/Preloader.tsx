import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Box } from "@material-ui/core";

interface Props {
  size?: number;
}

const Preloader: React.FC<Props> = ({ size }) => {
  return (
    <Box display="flex" gridGap="3px" p="3px">
      <Skeleton variant="circle" width={size || 5} height={size || 5} />
      <Skeleton variant="circle" width={size || 5} height={size || 5} />
      <Skeleton variant="circle" width={size || 5} height={size || 5} />
    </Box>
  );
};

export default Preloader;
