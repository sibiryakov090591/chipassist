import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Alert from "@material-ui/lab/Alert";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { getCurrentTime } from "@src/utils/date";
import { createMergeBomThunk } from "@src/store/bom/bomActions";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./mergeBomModalStyles";

interface Props {
  onClose: () => void;
  onView: (bomId: number) => string;
  submitHandle: (SubmitWasClicked: boolean) => void;
}

const MergeBomModal: React.FC<Props> = ({ onClose, onView, submitHandle }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("bom");

  const mergeData = useAppSelector((state) => state.bom.mergeData);
  const mergeSave = useAppSelector((state) => state.bom.mergeSave);

  const [name, setName] = useState(`Untitled-merge_${getCurrentTime()}`);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target;
    if (disabledBtn && value.trim()) setDisabledBtn(false);
    if (!disabledBtn && !value.trim()) setDisabledBtn(true);

    setName(value);
  };

  const onCloseModal = () => {
    onClose();
  };

  const onSubmitClick = () => {
    const validName = name.trim().replace(/\s{2,}/gi, " ");
    dispatch(createMergeBomThunk(validName));
    submitHandle(true);
  };

  const onViewClick = () => {
    onCloseModal();
  };

  return (
    <React.Fragment>
      {mergeData.conflict.original === null && mergeData.conflict.duplicate === null && mergeData.canSave && (
        <Dialog aria-labelledby="product-select" onClose={onCloseModal} open={true}>
          <div className={classes.productSelectModal}>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseModal}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              {t("merge.save bom")}
            </Typography>
            <div style={{ fontSize: 12 }}>{t("merge.conflict_hint")}</div>
            <Box mt={3} style={{ position: "relative" }}>
              <div className={mergeSave.saving ? classes.mainHidden : ""}>
                {mergeSave.bomId === null ? (
                  <TextField
                    id="bom-name"
                    label={t("merge.bom_name")}
                    variant="outlined"
                    className={classes.name}
                    value={name}
                    onChange={onChangeName}
                    error={disabledBtn}
                    helperText={disabledBtn && t("merge.helper_text")}
                  />
                ) : (
                  <Alert>{t("merge.bom_saved", { name })}</Alert>
                )}

                {mergeSave.error && (
                  <Alert severity="error" style={{ marginTop: 10 }}>
                    {t("merge.error")}
                  </Alert>
                )}
                <Box mt={2} display="flex" alignItems="center" justifyContent="flex-end">
                  <Button
                    className={`${appTheme.buttonPrimary} merge-modal-cancel-button`}
                    variant="contained"
                    onClick={onCloseModal}
                  >
                    {t("common.cancel")}
                  </Button>
                  {mergeSave.bomId === null ? (
                    <Button
                      variant="contained"
                      color="primary"
                      className={`${classes.mainAction} ${appTheme.buttonCreate} merge-modal-submit-button`}
                      onClick={onSubmitClick}
                      disabled={disabledBtn}
                    >
                      {t("common.continue")}
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={onView(mergeSave.bomId)}
                      variant="contained"
                      color="primary"
                      className={`${classes.mainAction} ${appTheme.buttonCreate}`}
                      onClick={onViewClick}
                    >
                      {t("common.view")}
                    </Button>
                  )}
                </Box>
              </div>
              {mergeSave.saving && (
                <div className={classes.copying}>
                  <span>{t("common.saving")}</span>
                </div>
              )}
            </Box>
          </div>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default MergeBomModal;
