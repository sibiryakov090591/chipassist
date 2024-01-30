import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, CardActions, Avatar, Typography, Button, Theme } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useDropzone } from "react-dropzone";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { removeAvatarThunk, uploadAvatar } from "@src/store/profile/profileActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { AppTheme } from "@src/themes/AppTheme";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
    },
  },
  contactData: {
    marginTop: 12,
    wordBreak: "break-word",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      marginLeft: 12,
      textAlign: "start",
    },
  },
  name: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      marginBottom: 2,
    },
  },
  email: {
    color: theme.palette.app.blue800,
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  avatar: {
    cursor: "pointer",
    height: 100,
    width: 100,
    [theme.breakpoints.down("xs")]: {
      height: 55,
      width: 55,
    },
  },
  removeBotton: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7em",
    },
  },
  cardAction: {
    [theme.breakpoints.down("xs")]: {
      padding: "0 24px 16px",
    },
  },
}));

const ProfileDetails = () => {
  const profile = useAppSelector((state) => state.profile);
  const { profileInfo, isRemovingAvatar } = profile;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { t } = useI18n("profile");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      dispatch(uploadAvatar(acceptedFiles[0]));
    },
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(removeAvatarThunk());
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Avatar className={classes.avatar} src={profileInfo.avatar} />
        </div>
        <div className={classes.contactData}>
          <Typography className={classes.name} gutterBottom variant="h3">
            {profileInfo.firstName} {profileInfo.lastName}
          </Typography>
          <Typography className={classes.email} gutterBottom>
            {profileInfo.email}
          </Typography>
        </div>
      </CardContent>

      {profileInfo && profileInfo.avatar && (
        <CardActions className={classes.cardAction}>
          <Button className={classes.removeBotton} variant="text" disabled={isRemovingAvatar} onClick={handleRemove}>
            {isRemovingAvatar ? t("removing") : t("remove_pic")}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ProfileDetails;
