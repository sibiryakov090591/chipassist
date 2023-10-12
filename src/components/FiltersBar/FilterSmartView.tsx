import { FormControlLabel, Checkbox } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { toggleSmartView } from "@src/store/search/searchActions";
import { setUrlWithFilters } from "@src/utils/setUrl";
import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { orderByValues } from "./FilterOrderByBar";
import { useStyles } from "./styles";

interface Props {
  disable: boolean;
}

const SmartView: React.FC<Props> = ({ disable }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { page, pageSize, query } = useAppSelector((state) => state.search);

  let smart_view = useAppSelector((state) => state.search.smart_view);
  smart_view = useURLSearchParams("smart_view", false, smart_view, false) === "true";

  const params = new URLSearchParams(window.location.search);
  const orderBy = params.get("order_by")
    ? params.get("order_by")
    : localStorage.getItem("mainOrderBy") || orderByValues[0].value;

  const onChange = () => {
    localStorage.setItem("smart_view", `${!smart_view}`);
    setUrlWithFilters(window.location.pathname, navigate, query, page, pageSize, orderBy, null, null, {
      smart_view: !smart_view,
    });
    dispatch(toggleSmartView());
    // dispatch(toggleReloadSearchFlag());
  };

  return (
    <FormControlLabel
      className={classes.filterStockBar}
      disabled={disable}
      control={
        <Checkbox
          className={classes.checkbox}
          checked={smart_view}
          onChange={onChange}
          name="smart_view"
          disableRipple={true}
          disabled={disable}
        />
      }
      label="Smart view"
    />
  );
};

export default SmartView;
