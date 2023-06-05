import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";

const EmptyState = () => {
  const { t } = useI18n("pcb");

  return (
    <Paper square>
      <Box padding={4}>
        <Typography variant="h5" component="h5">
          {t("pcb_not_found")}
        </Typography>
      </Box>
    </Paper>
  );
};

export default EmptyState;
