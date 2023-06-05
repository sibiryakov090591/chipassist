import React from "react";
import { Box } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import Preloader from "@src/components/Preloader/Preloader";

const PreloaderState = () => {
  const { t } = useI18n("pcb");

  return (
    <Box padding={4}>
      <Preloader title={t("opening_page")} />
    </Box>
  );
};

export default PreloaderState;
