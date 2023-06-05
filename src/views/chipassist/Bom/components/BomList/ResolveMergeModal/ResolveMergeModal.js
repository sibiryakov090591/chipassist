import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { resolveMergeLinesConflict } from "@src/store/bom/bomActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./resolveMergeModalStyles";

function ResolveMergeModal({ onClose }) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mergeData = useAppSelector((state) => state.bom.mergeData);
  const { t } = useI18n("bom");

  const onCloseModal = () => {
    onClose();
  };

  const originalIndex = mergeData.conflict.original;
  const duplicateIndex = mergeData.conflict.duplicate;

  const onBtnClick = (method, forAll) => () => {
    dispatch(resolveMergeLinesConflict(method, forAll));
  };

  return (
    <React.Fragment>
      {originalIndex !== null && duplicateIndex !== null && (
        <Dialog aria-labelledby="product-select" onClose={onCloseModal} open={true}>
          <div className={classes.resolveMergeModal}>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseModal}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              {t("resolve.title")}
            </Typography>
            <Alert severity="info">{t("resolve.alert")}</Alert>
            <Box mt={2}>
              <Paper square>
                <Table size="small" className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("columnt.qty")}</TableCell>
                      <TableCell>{t("columnt.part_number")}</TableCell>
                      <TableCell>{t("columnt.product_id")}</TableCell>
                      <TableCell>{t("columnt.description")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="4">{t("resolve.original_line")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{mergeData.processedLines[originalIndex].quantity}</TableCell>
                      <TableCell>{mergeData.processedLines[originalIndex].part_number}</TableCell>
                      <TableCell>{mergeData.processedLines[originalIndex].product}</TableCell>
                      <TableCell>{mergeData.processedLines[originalIndex].description}</TableCell>
                    </TableRow>
                    <TableRow className={classes.duplicate}>
                      <TableCell colSpan="4">{t("resolve.duplicate_line")}</TableCell>
                    </TableRow>
                    <TableRow className={classes.duplicate}>
                      <TableCell>{mergeData.rawLines[duplicateIndex].quantity}</TableCell>
                      <TableCell>{mergeData.rawLines[duplicateIndex].part_number}</TableCell>
                      <TableCell>{mergeData.rawLines[duplicateIndex].product}</TableCell>
                      <TableCell>{mergeData.rawLines[duplicateIndex].description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Box>
            <Box mt={2} className={classes.btns}>
              <Button
                variant="contained"
                size="small"
                className={classes.skipBtn}
                onClick={onBtnClick("skip", false)}
                title={t("resolve.skip_conflict")}
              >
                {t("resolve.skip")}
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.skipBtn}
                onClick={onBtnClick("skip", true)}
                title={t("resolve.skip_all_conflict")}
              >
                {t("resolve.skip_all")}
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.replaceBtn}
                onClick={onBtnClick("replace", false)}
                title={t("resolve.replace_with")}
              >
                {t("resolve.replace")}
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.replaceBtn}
                onClick={onBtnClick("replace", true)}
                title={t("resolve.replace_with_all")}
              >
                {t("resolve.replace_all")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onBtnClick("join", false)}
                title={t("resolve.join_rows")}
              >
                {t("resolve.join")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onBtnClick("join", true)}
                title={t("resolve.join_rows_all")}
              >
                {t("resolve.join_all")}
              </Button>
            </Box>
          </div>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default ResolveMergeModal;
