import React, { useState } from "react";
import { Button, Dialog } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import clsx from "clsx";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import html2canvas from "html2canvas";
import Preloader from "@src/components/Preloader/Preloader";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./ScreenshotStyles";

interface CaptureProps {
  openModal: () => void;
  addScreenshot: (image: any) => void;
  maxSizeError: boolean;
}

const Screenshot: React.FC<CaptureProps> = (props) => {
  const { t } = useI18n("feedback");
  const classes = useStyles();
  const appTheme = useAppTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement>(null);

  const handleScreenshot = () => {
    // hide feedback modal for screenshot
    const feedbackModal = document.getElementById("feedback-modal");
    feedbackModal.style.display = "none";
    setIsLoading(true);
    setOpenPreview(true);

    // create screen
    html2canvas(document.body, {
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      scrollY: -window.pageYOffset,
      scrollX: -window.pageXOffset,
    }).then((canvas) => {
      setCanvasElement(canvas);
      canvas.toBlob((blob) => {
        const newImg = document.createElement("img");
        const url = URL.createObjectURL(blob);
        newImg.classList.add(classes.img);
        newImg.onload = () => {
          // remove blob
          URL.revokeObjectURL(url);
        };
        newImg.src = url;
        document.querySelector("#screenshot-image").appendChild(newImg);
      }, "image/jpeg");
      setIsLoading(false);
      feedbackModal.style.display = "block";
    });
  };

  const handleAdd = async () => {
    const imageBlob = await new Promise((resolve) => canvasElement.toBlob(resolve, "image/jpeg", 1));
    props.addScreenshot(imageBlob);
    setOpenPreview(false);
  };

  const handleBack = () => {
    setOpenPreview(false);
  };

  return (
    <>
      <Dialog open={openPreview} onClose={handleBack}>
        <div className={classes.imgContainer} id="screenshot-image">
          {isLoading && <Preloader title={t("form.screen_loading")} />}
        </div>
        <div className={classes.btnContainer}>
          <Button
            disabled={isLoading}
            className={clsx(appTheme.buttonPrimary, classes.button)}
            onClick={handleAdd}
            size="large"
            type="button"
            variant="contained"
          >
            {t("form.add_screenshot")}
          </Button>
          <Button
            className={clsx(appTheme.buttonCancel, classes.button)}
            onClick={() => setOpenPreview(false)}
            size="large"
            type="button"
            variant="contained"
          >
            {t("form.pass_screenshot")}
          </Button>
        </div>
      </Dialog>
      <Button
        disabled={props.maxSizeError}
        className={clsx(classes.screenshotButton, appTheme.buttonPrimary)}
        onClick={handleScreenshot}
        size="large"
        type="button"
        variant="contained"
      >
        <CameraAltIcon fontSize="large" />
      </Button>
    </>
  );
};

export default Screenshot;
