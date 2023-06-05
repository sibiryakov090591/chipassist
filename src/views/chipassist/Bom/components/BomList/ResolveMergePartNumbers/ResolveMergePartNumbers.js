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
import { resolveMergeBomGroups, saveMergeData } from "@src/store/bom/bomActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./resolveMergePartNumbersStyles";

function ResolveMergePartNumbers({ onClose }) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mergeData = useAppSelector((state) => state.bom.mergeData);
  const { t } = useI18n("bom");

  const onCloseModal = () => {
    onClose();
  };

  const onSubmit = () => {
    dispatch(resolveMergeBomGroups());
  };

  const onPartNumberClick = (groupIndex, partNumber) => () => {
    const newMergeData = JSON.parse(JSON.stringify(mergeData));
    newMergeData.groups[groupIndex].partNumber = partNumber;
    dispatch(saveMergeData(newMergeData));
  };

  return (
    <>
      {!!mergeData.groups.length && (
        <Dialog aria-labelledby="product-select" onClose={onCloseModal} open={true}>
          <div className={classes.resolveMergeModal}>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseModal}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              {t("resolve.part_number_group")}
            </Typography>
            <Alert severity="info">{t("resolve.part_number_alert")}</Alert>
            {mergeData.groups.map((group, groupIndex) => (
              <Box mt={3} key={groupIndex} className={classes.group}>
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
                      {group.items.map((itemIndex) => {
                        const item = mergeData.processedLines[itemIndex];

                        return (
                          <TableRow key={itemIndex}>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.part_number}</TableCell>
                            <TableCell>{item.product}</TableCell>
                            <TableCell>{item.description}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
                <Box mt={1} className={classes.btns}>
                  {group.partNumbers.map((partNumber) => (
                    <Button
                      key={partNumber}
                      variant="contained"
                      color={partNumber === group.partNumber ? "secondary" : "default"}
                      size="small"
                      onClick={onPartNumberClick(groupIndex, partNumber)}
                    >
                      {partNumber}
                    </Button>
                  ))}
                </Box>
              </Box>
            ))}

            <Box mt={4} className={classes.btns}>
              <Button variant="contained" color="primary" onClick={onSubmit}>
                {t("common.submit")}
              </Button>
              <Button variant="contained" onClick={onSubmit}>
                {t("resolve.skip")}
              </Button>
            </Box>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default ResolveMergePartNumbers;
