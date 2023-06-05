import palette from "../palette";

export default {
  root: {
    backgroundColor: palette.white,
    borderColor: palette.app.grey300,
    "& .MuiSvgIcon-root": {
      color: palette.primary.main,
    },
    "&.MuiOutlinedInput-notchedOutline": {
      borderColor: palette.app.grey300,
    },
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${palette.secondary.dark} !important`,
        transition: "border-color 250ms ease",
      },
    },
    "&:active": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${palette.secondary.dark} !important`,
      },
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${palette.secondary.dark}!important`,
      },
    },
    "&.Mui-disabled": {
      backgroundColor: `${palette.app.grey200} !important`,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${palette.app.grey300} !important`,
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: `${palette.app.grey300} !important`,
        },
      },
    },
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      color: palette.text.secondary,
    },
  },
};
