export default {
  pricesFields: {
    margin: "10px 0",
    "& > *": {
      flex: "1 1 auto",
      "&:not(:last-child)": {
        marginRight: 10,
      },
    },
  },
  slider: {
    marginTop: 35,
    "&.Mui-disabled": {
      "& .MuiSlider-valueLabel": {
        left: "calc(-50% - 8px)",
        display: "none",
      },
      "& .MuiSlider-markLabel": {
        display: "none",
      },
      // HACK for full width slider line if filter is disabled
      // reproduce search "max32" -> search "Ohmite L25J4R0E"
      "& .MuiSlider-thumb + .MuiSlider-thumb": {
        left: "100% !important",
      },
    },
  },
};
