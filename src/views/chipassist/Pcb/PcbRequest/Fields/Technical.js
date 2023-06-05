import React from "react";
import { TextField, MenuItem, InputAdornment } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { DATE_FORMAT } from "@src/config";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { units } from "@src/store/pcb/pcbTypes";
import { NumberInput } from "@src/components/Inputs";
import BaseFilterDropdown from "@src/views/chipassist/Search/components/BaseFilterDropdown/BaseFilterDropdown";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles as useRfqStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import { useStyles } from "../PcbRequestStyles";

function createSelectOptions(items) {
  if (!items) {
    return [];
  }
  return items.reduce((res, item) => {
    res.push({ value: item.id, label: item.name });
    return res;
  }, []);
}

const Technical = ({
  item,
  pcbConstants,
  handleChange,
  handleHiddenInputChange,
  handleSelectChange,
  errorProps,
  colorInfoProps,
  getUniqueColors,
  all_sellers,
  selectedSellers,
}) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const rfqClasses = useRfqStyles();
  const { t } = useI18n("pcb");
  const { currency } = useCurrency();

  return (
    <div className={`${classes.formField} ${classes.formFieldBorder}`}>
      <div className={classes.formLabel}>Technical & Order</div>
      <div className="formFieldPad">
        <div className={`${classes.formRow}`}>
          <TextField
            type="text"
            name="base"
            label={t("column.base")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.base}
            onChange={handleChange}
            {...errorProps("base")}
            select
          >
            {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.base} />}
            {pcbConstants &&
              pcbConstants.BASE.map((val, index) => (
                <MenuItem className={appTheme.selectMenuItem} key={index} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            type="text"
            name="finish"
            label={t("column.finish")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.finish}
            onChange={handleChange}
            {...errorProps("finish")}
            select
          >
            {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.finish} />}
            {pcbConstants &&
              pcbConstants.FINISH.map((val, index) => (
                <MenuItem className={appTheme.selectMenuItem} key={index} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            type="number"
            name="copper"
            label={t("column.copper")}
            variant="outlined"
            size="small"
            className={`${classes.selectWithUnit}`}
            InputLabelProps={{
              shrink: true,
            }}
            value={item.copper}
            onChange={handleChange}
            {...errorProps("copper")}
            select
          >
            {!pcbConstants && <MenuItem value={item.copper} />}
            {pcbConstants &&
              pcbConstants.COPPER.map((val, index) => (
                <MenuItem className={appTheme.selectMenuItem} key={index} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className={`${classes.formRow}`}>
          <NumberInput
            name="track"
            label={t("column.track")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: units.track && <InputAdornment position="end">{t(units.track)}</InputAdornment>,
            }}
            value={item.track}
            onChange={handleChange}
            decimalScale={2}
            {...errorProps("track")}
          />
          <NumberInput
            name="spacing"
            label={t("column.spacing")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: units.spacing && <InputAdornment position="end">{t(units.spacing)}</InputAdornment>,
            }}
            value={item.spacing}
            onChange={handleChange}
            decimalScale={2}
            isAllowedZero={true}
            {...errorProps("spacing")}
          />
          <div className={`${classes.dropdown} MuiTextField-root rfq-modal-seller`}>
            <input
              className={classes.hiddenInput}
              value={selectedSellers.length ? "yes" : ""}
              onChange={handleHiddenInputChange}
            />
            <BaseFilterDropdown
              defaultLabel={t("distributor.distributors")}
              selectedItems={createSelectOptions(selectedSellers)}
              options={createSelectOptions(all_sellers)}
              changeHandler={handleSelectChange}
            />
          </div>
        </div>
        <div className={`${classes.formRow}`}>
          <NumberInput
            name="hole"
            label={t("column.hole")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: units.hole && <InputAdornment position="end">{t(units.hole)}</InputAdornment>,
            }}
            value={item.hole}
            onChange={handleChange}
            decimalScale={2}
            isAllowedZero={true}
            {...errorProps("hole")}
          />
          <NumberInput
            name="hole_count"
            label={t("column.hole_count")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.hole_count}
            onChange={handleChange}
            decimalScale={0}
            isAllowedZero={true}
            {...errorProps("hole_count")}
          />
          <DatePicker
            className={`${rfqClasses.rfqDatePicker}`}
            name="valid_date"
            disableToolbar
            autoOk={true}
            format={DATE_FORMAT}
            margin="normal"
            label={t("column.valid_date")}
            value={item.valid_date}
            onChange={(moment_date) => handleChange({ target: { name: "valid_date", value: moment_date } })}
          />
        </div>
        <div className={`${classes.formRow}`} style={{ marginTop: 39 }}>
          <TextField
            type="text"
            name="soldermask"
            label={t("column.soldermask")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.soldermask}
            onChange={handleChange}
            {...errorProps("soldermask")}
            select
          >
            {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.soldermask} />}
            {pcbConstants &&
              pcbConstants.SOLDERMASK.map((val, index) => (
                <MenuItem className={appTheme.selectMenuItem} key={index} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            type="text"
            name="soldermask_color"
            label={t("column.soldermask_color")}
            variant="outlined"
            size="small"
            className={`
                ${(!item.soldermask || item.soldermask === "null") && `${classes.selectDisabled} pcb-select-disabled`} 
              `}
            InputLabelProps={{
              shrink: true,
            }}
            // required={!!item.soldermask && item.soldermask !== "null"}
            value={item.soldermask_color}
            onChange={handleChange}
            {...colorInfoProps("soldermask_color")}
            {...errorProps("soldermask_color")}
            select
          >
            {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.soldermask_color} />}
            {pcbConstants &&
              getUniqueColors(item.legend_color, pcbConstants.SOLDERMASK_COLOR).map((val, index) => (
                <MenuItem
                  key={index}
                  className={clsx(
                    (!item.soldermask || item.soldermask === "null") && classes.selectOptionDisabled,
                    appTheme.selectMenuItem,
                  )}
                  value={val.value}
                >
                  {val.label}
                </MenuItem>
              ))}
          </TextField>
          <NumberInput
            name="period"
            label={t("column.period")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: units.period && <InputAdornment position="end">{t(units.period)}</InputAdornment>,
            }}
            value={item.period}
            onChange={handleChange}
            decimalScale={0}
            {...errorProps("period")}
          />
        </div>
        <div className={`${classes.formRow}`}>
          <TextField
            type="text"
            name="legend"
            label={t("column.legend")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.legend}
            onChange={handleChange}
            {...errorProps("legend")}
            select
          >
            {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.legend} />}
            {pcbConstants &&
              pcbConstants.LEGEND.map((val, index) => (
                <MenuItem className={appTheme.selectMenuItem} key={index} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            type="text"
            name="legend_color"
            label={t("column.legend_color")}
            variant="outlined"
            size="small"
            className={`
                ${(!item.legend || item.legend === "null") && `${classes.selectDisabled} pcb-select-disabled`}
              `}
            // required={!!item.legend && item.legend !== "null"}
            InputLabelProps={{
              shrink: true,
            }}
            value={item.legend_color}
            onChange={handleChange}
            {...colorInfoProps("legend_color")}
            {...errorProps("legend_color")}
            select
          >
            {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.legend_color} />}
            {pcbConstants &&
              getUniqueColors(item.soldermask_color, pcbConstants.LEGEND_COLOR).map((val, index) => (
                <MenuItem
                  key={index}
                  className={clsx(
                    (!item.legend || item.legend === "null") && classes.selectOptionDisabled,
                    appTheme.selectMenuItem,
                  )}
                  value={val.value}
                >
                  {val.label}
                </MenuItem>
              ))}
          </TextField>
          <NumberInput
            type="text"
            name="price"
            label={t("column.price")}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{currency.symbol}</InputAdornment>,
            }}
            value={item.price} // TODO::price
            onChange={handleChange}
            decimalScale={2}
            {...errorProps("price")}
          />
        </div>
      </div>
    </div>
  );
};

export default Technical;
