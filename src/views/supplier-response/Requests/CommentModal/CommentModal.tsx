import React, { useState } from "react";
import useAppTheme from "@src/theme/useAppTheme";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button, TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useStyles } from "../ResponseItem/responseItemStyles";

interface Props {
  comment: string;
  onSaveHandler: (value: string) => void;
  onClose: () => void;
  open: boolean;
}

const CommentModal: React.FC<Props> = ({ comment, onSaveHandler, open, onClose }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();

  const [value, setValue] = useState(comment || "");

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <TextField
            fullWidth
            variant="outlined"
            value={value}
            name="responseComment"
            onChange={(e) => setValue(e.currentTarget.value)}
            type="text"
            label="Comment:"
            multiline
            rows={4}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box className={classes.buttonContainer}>
            <Button variant="contained" className={appTheme.buttonPrimary} onClick={onClose}>
              Close
            </Button>
            <Button variant="contained" className={appTheme.buttonCreate} onClick={() => onSaveHandler(value)}>
              Save
            </Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default CommentModal;
