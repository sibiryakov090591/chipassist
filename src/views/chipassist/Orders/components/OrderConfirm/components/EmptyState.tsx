import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const EmptyState: React.FC = () => {
  const { t } = useI18n("order");

  return (
    <Box padding={4}>
      <Typography variant="h5" component="h5">
        {t("order_not_found")}
      </Typography>
    </Box>
  );
};

export default EmptyState;
