import { withStyles } from "@material-ui/core/styles";
import { Badge, Typography } from "@material-ui/core";

export const selectStyles = {
  control: (provided) => ({ ...provided, margin: 8 }),
  menu: () => ({
    boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)",
    color: "black",
    "& .option-wrapper": {
      display: "grid",
      alignItems: "center",
      overflow: "hidden",
      whiteSpace: "nowrap",
      "& > div": {
        height: "100%",
        display: "grid",
        alignItems: "center",
        "& > span": {
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  }),
  option: (provided) => ({ ...provided, cursor: "pointer" }),
  clearIndicator: (provided) => ({ ...provided, cursor: "pointer" }),
};

export const StyledBadge = withStyles(() => ({
  badge: {
    transform: "scale(1) translate(-25%)",
    left: 0,
    right: "initial",
    borderRadius: 4,
  },
}))(Badge);

export const StyledTypography = withStyles(() => ({
  body1: {
    marginLeft: 20,
  },
}))(Typography);

export default "styles";
