import { FormControlLabel, Checkbox, Tooltip, Box } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { toggleSmartView } from "@src/store/search/searchActions";
// import { setUrlWithFilters } from "@src/utils/setUrl";
import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
// import { useNavigate } from "react-router-dom";
// import { orderByValues } from "./FilterOrderByBar";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import HelpIcon from "@material-ui/icons/Help";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useStyles } from "./styles";

interface Props {
  disable: boolean;
}

const SmartView: React.FC<Props> = ({ disable }) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("distributor");
  // const navigate = useNavigate();

  // const { page, pageSize, query } = useAppSelector((state) => state.search);

  const smart_view = useAppSelector((state) => state.search.smart_view);
  // smart_view = useURLSearchParams("smart_view", false, smart_view, false) === "true";

  // const params = new URLSearchParams(window.location.search);
  // const orderBy = params.get("order_by")
  //   ? params.get("order_by")
  //   : localStorage.getItem("mainOrderBy") || orderByValues[0].value;

  const onChange = () => {
    localStorage.setItem("smart_view", `${!smart_view}`);
    // setUrlWithFilters(window.location.pathname, navigate, query, page, pageSize, orderBy, null, null, {
    //   smart_view: !smart_view,
    // });
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
      label={
        <Box display="flex" alignItems="center">
          {t("smart_view")}
          <Tooltip
            enterTouchDelay={1}
            classes={{ tooltip: commonClasses.tooltip }}
            title={<div>{t("smart_view_info")}</div>}
          >
            <HelpIcon className={classes.helpIcon} />
          </Tooltip>
        </Box>
      }
    />
  );
};

export default SmartView;
