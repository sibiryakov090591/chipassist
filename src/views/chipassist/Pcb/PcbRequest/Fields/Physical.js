import React from "react";
import { TextField, MenuItem, InputAdornment, FormControlLabel, Checkbox } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { units } from "@src/store/pcb/pcbTypes";
import { NumberInput } from "@src/components/Inputs";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "../PcbRequestStyles";

const Physical = ({ item, pcbConstants, handleChange, errorProps }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const { t } = useI18n("pcb");

  const isLayersZero = !item.count_flex && !item.count_rigid;

  return (
    <div className={`${classes.formField} ${classes.formFieldBorder}`}>
      <div className={classes.formLabel}>Physical</div>
      <div className={classes.formRow}>
        <TextField
          type="text"
          name="part_number"
          label={t("column.part_number")}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.part_number}
          onChange={handleChange}
          {...errorProps("part_number")}
        />
        <TextField
          type="text"
          name="pcbtype"
          label={t("column.type")}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          className={"pcb-modal-pcbtype"}
          value={item.pcbtype}
          onChange={handleChange}
          {...errorProps("pcbtype")}
          select
        >
          {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.pcbtype} />}
          {pcbConstants &&
            pcbConstants.PCBTYPE.map((val, index) => (
              <MenuItem className={appTheme.selectMenuItem} key={index} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
        </TextField>
        <NumberInput
          name="quantity"
          label={t("column.qty")}
          variant="outlined"
          size="small"
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={item.quantity}
          onChange={handleChange}
          decimalScale={0}
          {...errorProps("quantity")}
        />
      </div>
      <div className={classes.formRow}>
        <NumberInput
          name="x"
          label={t("column.x")}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: units.x && <InputAdornment position="end">{t(units.x)}</InputAdornment>,
          }}
          value={item.x}
          onChange={handleChange}
          decimalScale={2}
          isAllowedZero={true}
          disabled={item.pcbtype !== "PANEL"}
          {...errorProps("x")}
        />
        <NumberInput
          name="y"
          label={t("column.y")}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: units.y && <InputAdornment position="end">{t(units.y)}</InputAdornment>,
          }}
          value={item.y}
          onChange={handleChange}
          decimalScale={2}
          isAllowedZero={true}
          disabled={item.pcbtype !== "PANEL"}
          {...errorProps("y")}
        />
        <NumberInput
          name="thickness"
          label={t("column.thickness")}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: units.thickness && <InputAdornment position="end">{t(units.thickness)}</InputAdornment>,
          }}
          value={item.thickness || ""}
          onChange={handleChange}
          decimalScale={2}
          {...errorProps("thickness")}
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          type="text"
          name="profiling"
          label={t("column.profiling")}
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.profiling}
          onChange={handleChange}
          {...errorProps("profiling")}
          select
        >
          {!pcbConstants && <MenuItem className={appTheme.selectMenuItem} value={item.profiling} />}
          {pcbConstants &&
            pcbConstants.PROFILING.map((val, index) => (
              <MenuItem className={appTheme.selectMenuItem} key={index} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
        </TextField>
        <div className={`${classes.formRow}`}>
          <FormControlLabel
            control={
              <Checkbox
                className={appTheme.checkbox}
                name="xout"
                checked={!!item.xout}
                onChange={handleChange}
                color="primary"
              />
            }
            label={t("column.xout")}
            style={{ margin: "13px" }}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <div className={classes.formRow}>
            <NumberInput
              name="unit_x"
              label={t("column.unit_x")}
              variant="outlined"
              size="small"
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: units.unit_x && <InputAdornment position="end">{t(units.unit_x)}</InputAdornment>,
              }}
              value={item.unit_x}
              onChange={handleChange}
              decimalScale={2}
              {...errorProps("unit_x")}
            />
            <NumberInput
              name="unit_y"
              label={t("column.unit_y")}
              variant="outlined"
              size="small"
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: units.unit_y && <InputAdornment position="end">{t(units.unit_y)}</InputAdornment>,
              }}
              value={item.unit_y}
              onChange={handleChange}
              decimalScale={2}
              {...errorProps("unit_y")}
            />
          </div>
          <div className={classes.formRow}>
            <NumberInput
              name="count_rigid"
              label={t("column.count_rigid")}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: !item.count_flex ? 1 : 0 } }}
              value={item.count_rigid}
              onChange={handleChange}
              isAllowedZero={true}
              {...(isLayersZero ? { error: true, helperText: t("column.count_rigid_error") } : {})}
              {...errorProps("count_rigid")}
            />
            <NumberInput
              name="count_flex"
              label={t("column.count_flex")}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: !item.count_rigid ? 1 : 0 } }}
              value={item.count_flex}
              onChange={handleChange}
              isAllowedZero={true}
              {...(isLayersZero ? { error: true, helperText: t("column.count_rigid_error") } : {})}
              {...errorProps("count_flex")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Physical;
