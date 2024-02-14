import React, { useEffect } from "react";
import {
  Paper,
  Tooltip,
  TextField,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
  useMediaQuery,
  Box,
} from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
// import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppTheme from "@src/theme/useAppTheme";
import different from "@src/images/pcb_calculator/different.png";
import unit_size from "@src/images/pcb_calculator/pcb_size.png";
import panel_size from "@src/images/pcb_calculator/panel_size.png";
// eslint-disable-next-line import/no-unresolved
import fr4 from "@src/images/pcb_calculator/fr4_metarial.png";
import aluminum from "@src/images/pcb_calculator/aluminum_material.png";
import rogers from "@src/images/pcb_calculator/rogers_material.png";
import hdi from "@src/images/pcb_calculator/hdi_material.png";
import copper from "@src/images/pcb_calculator/copper_material.png";
import thickness from "@src/images/pcb_calculator/thickness.png";
import track from "@src/images/pcb_calculator/track.png";
import hole from "@src/images/pcb_calculator/hole.png";
import finished_copper from "@src/images/pcb_calculator/finished_copper.png";
import metal_core from "@src/images/pcb_calculator/metal_core.png";
import metal_base from "@src/images/pcb_calculator/metal_base.png";
import chamfering from "@src/images/pcb_calculator/chamfering.png";
import HelpIcon from "@material-ui/icons/Help";
import clsx from "clsx";
import { NumberInput } from "@src/components/Inputs";
import Preloader from "@src/components/Preloader/Preloader";
import { useStyles } from "./styles";

export interface FormState {
  board_type: any;
  panel_requirements_comment?: string;
  break_away_rail?: string;
  route_process?: string;
  x_out?: string;
  different_design?: string;
  different_design_input?: string;
  unit_x: string;
  unit_y: string;
  quantity: string;
  layers?: string;
  layers_input?: string;
  copper_layer?: string;
  solder_mask?: string;
  silkscreen_legend?: string;
  material?: string;
  thermal_conductivity?: string;
  rogers?: string;
  fr4_tg?: string;
  structure_of_mcpcb?: string;
  thickness?: string;
  thickness_input?: string;
  thickness_for_rogers?: string;
  min_spacing?: string;
  min_hole_size?: string;
  solder_mask_color?: string;
  silkscreen?: string;
  edge_connector?: string;
  bevelling?: string;
  surface_finish?: string;
  thickness_of_immersion_gold?: string;
  au_thickness_of_hard_gold?: string;
  ni_thickness_of_hard_gold?: string;
  thickness_of_enepig?: string;
  via_process?: string;
  finished_copper?: string;
  comment: string;
}

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLElement>) => void;
  setFormState: React.Dispatch<React.SetStateAction<any>>;
  constants: { [key: string]: Array<{ label: string; value: string }> };
  formState: any;
  errorProps: (name: string) => { error: boolean; helperText: string };
  isExample?: boolean;
}

const PcbCalculator: React.FC<Props> = ({
  handleChange,
  setFormState,
  constants,
  formState,
  errorProps,
  isExample,
}) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useI18n("pcb.calculator");
  // const dispatch = useAppDispatch();
  const showAllFields = localStorage.getItem("show_all_PCB_fields") === "true" || isExample;

  useEffect(() => () => localStorage.removeItem("show_all_PCB_fields"));
  return (
    <Paper className={classes.paper}>
      {!constants && <Preloader title={false} />}
      {constants && (
        <div className={classes.container}>
          <h3 className={classes.title}>{t("title")}</h3>
          <div className={clsx(classes.row, classes.mainRow)}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("board_type_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("board_type")}
            </div>
            <div>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="board_type"
                value={formState.board_type}
                onChange={handleChange}
              >
                {constants.board_type?.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.board_type === item.value,
                          })}
                        >
                          {["PANEL", "BOARD"].includes(item.value)
                            ? t(`pcb_create.${item.value.toLowerCase()}`)
                            : item.value}
                        </div>
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          {(formState.board_type === "PANEL" || showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>
                <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("x_out_hint")}</div>}>
                  <HelpIcon className={classes.helpIcon} />
                </Tooltip>
                {t("x_out")}
              </div>
              <div className={classes.rowContent}>
                <RadioGroup style={{ marginLeft: 4 }} row name="x_out" value={formState.x_out} onChange={handleChange}>
                  {constants.x_out?.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio className={appTheme.radio} color="primary" />}
                        label={item.label}
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          )}
          {(formState.board_type === "PANEL" || showAllFields) && (
            <>
              <div style={{ padding: "0 2rem" }} className={classes.row}>
                {!isSmDown && <div className={classes.rowTitle}>{t("pcb_create.panel_req")}:</div>}
                <div className={classes.rowContent}>
                  <div className={classes.row}>
                    <div style={{ width: "auto" }} className={classes.rowTitle}>
                      <Tooltip
                        enterTouchDelay={1}
                        title={<div className={classes.tooltip}>{t("break_away_hint")}</div>}
                      >
                        <HelpIcon className={classes.helpIcon} />
                      </Tooltip>
                      {t("break_away")}
                    </div>
                    <RadioGroup
                      style={{ marginLeft: 12 }}
                      row
                      name="break_away_rail"
                      value={formState.break_away_rail}
                      onChange={handleChange}
                    >
                      {constants.break_away_rail?.map((item, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            value={item.value}
                            className={classes.formControlLabel}
                            control={<Radio className={appTheme.radio} color="primary" />}
                            label={item.label}
                          />
                        );
                      })}
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className={classes.row}>
                <div className={classes.rowTitle}></div>
                <div className={classes.rowContent}>
                  <TextField
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="panel_requirements_comment"
                    value={formState.panel_requirements_comment}
                    variant="outlined"
                    multiline
                    label={t("pcb_create.comment")}
                    rows={3}
                    helperText={`(${t("pcb_create.helper_text_comment")})`}
                  />
                </div>
              </div>
              <div className={classes.row}>
                <div className={classes.rowTitle}>
                  <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("route_process_hint")}</div>}>
                    <HelpIcon className={classes.helpIcon} />
                  </Tooltip>
                  {t("route_process")}
                </div>
                <div className={classes.rowContent}>
                  <TextField
                    className={classes.select}
                    type="text"
                    name="route_process"
                    variant="outlined"
                    size="small"
                    value={formState.route_process}
                    onChange={handleChange}
                    select
                  >
                    {constants.route_process?.map((item, index) => {
                      console.log(item);
                      return (
                        <MenuItem key={index} value={item.value}>
                          {t(`pcb_create.${item.value}`)}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </div>
            </>
          )}
          <div className={clsx(classes.row, classes.mainRow)}>
            {isSmDown && (
              <img
                style={{ width: 130, alignSelf: "center", marginBottom: 16 }}
                src={different}
                alt="Different design"
              />
            )}
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("different_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("different")}
            </div>
            <div>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="different_design"
                value={formState.different_design}
                onChange={handleChange}
              >
                {constants.different_design?.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.different_design === item.value,
                          })}
                        >
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
                <Box display="flex">
                  <input
                    className={clsx(classes.input, {
                      [classes.checked]: !!formState.different_design_input,
                      [classes.errorInput]: !!errorProps("different_design_input"),
                    })}
                    value={formState.different_design_input}
                    type="text"
                    name="different_design_input"
                    onChange={handleChange}
                    onFocus={() => setFormState((prev: any) => ({ ...prev, different_design: null }))}
                  />
                  {!isSmDown && (
                    <Tooltip
                      enterTouchDelay={1}
                      classes={{ tooltip: classes.customTooltip }}
                      title={<img style={{ width: 150 }} src={different} alt="Different design"></img>}
                    >
                      <span className={classes.eg}>{t("eg")}</span>
                    </Tooltip>
                  )}
                </Box>
              </RadioGroup>
              {!!errorProps("different_design_input") && (
                <p className={classes.errorMessage}>{errorProps("different_design_input").helperText}</p>
              )}
            </div>
          </div>
          <div className={clsx(classes.row, classes.mainRow)}>
            {isSmDown && (
              <div className={classes.sizePanel}>
                <img style={{ marginLeft: 0 }} src={unit_size} alt="unit_size" />
                <img src={panel_size} alt="panel_size" />
              </div>
            )}
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("size_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              <div>
                {formState.board_type === "PANEL" ? t("size_sets") : t("size_single")} <span>*</span>
              </div>
            </div>
            <div className={classes.rowContent}>
              <NumberInput
                className={clsx(classes.customInput, classes.requiredField)}
                name="unit_x"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={formState.unit_x}
                decimalScale={2}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                }}
                label={t("pcb_create.x_width")}
                {...errorProps("unit_x")}
              />
              <NumberInput
                className={clsx(classes.customInput, classes.requiredField)}
                name="unit_y"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={formState.unit_y}
                decimalScale={2}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                }}
                label={t("pcb_create.y_height")}
                {...errorProps("unit_y")}
              />
              {!isSmDown && (
                <div className={classes.sizePanel}>
                  <img src={unit_size} alt="unit_size" />
                  <img src={panel_size} alt="panel_size" />
                </div>
              )}
            </div>
          </div>
          <div className={clsx(classes.row, classes.mainRow)}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("qty_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              <div>
                {formState.board_type === "PANEL" ? t("qty_sets") : t("qty_single")} <span>*</span>
              </div>
            </div>
            <div className={classes.rowContent}>
              <NumberInput
                className={clsx(classes.customInput, classes.requiredField)}
                name="quantity"
                variant="outlined"
                size="small"
                required
                onChange={handleChange}
                value={formState.quantity}
                decimalScale={0}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{t("pcb_create.pcs")}</InputAdornment>,
                }}
                {...errorProps("quantity")}
              />
            </div>
          </div>
          <div className={clsx(classes.row, classes.mainRow)}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("layers_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("layers")}
            </div>
            <div>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="layers"
                value={formState.layers}
                onChange={handleChange}
              >
                {constants.layers?.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.layers === item.value,
                          })}
                        >
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
                <input
                  className={clsx(classes.input, {
                    [classes.checked]: !!formState.layers_input,
                    [classes.errorInput]: !!errorProps("layers_input"),
                  })}
                  value={formState.layers_input}
                  type="text"
                  name="layers_input"
                  onChange={handleChange}
                  onFocus={() => setFormState((prev: any) => ({ ...prev, layers: null }))}
                />
              </RadioGroup>
              {!!errorProps("layers_input") && (
                <p className={classes.errorMessage}>{errorProps("layers_input").helperText}</p>
              )}
            </div>
          </div>
          {(formState.layers === "1" || showAllFields) && (
            <>
              <div className={clsx(classes.row, classes.mainRow)}>
                <div className={classes.rowTitle}>
                  <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("copper_layer_hint")}</div>}>
                    <HelpIcon className={classes.helpIcon} />
                  </Tooltip>
                  {t("copper_layer")}
                </div>
                <div className={classes.rowContent}>
                  <TextField
                    className={classes.select}
                    type="text"
                    name="copper_layer"
                    variant="outlined"
                    size="small"
                    value={formState.copper_layer}
                    onChange={handleChange}
                    select
                  >
                    {constants.copper_layer?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  {!isSmDown && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className={classes.soldermaskTitle}>
                        <Tooltip
                          enterTouchDelay={1}
                          title={<div className={classes.tooltip}>{t("soldermask_hint")}</div>}
                        >
                          <HelpIcon className={classes.helpIcon} />
                        </Tooltip>
                        {t("soldermask")}
                      </div>
                      <TextField
                        className={classes.select}
                        type="text"
                        name="solder_mask"
                        variant="outlined"
                        size="small"
                        value={formState.solder_mask}
                        onChange={handleChange}
                        select
                      >
                        {constants.solder_mask?.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.value}>
                              {item.label}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </div>
                  )}
                </div>
              </div>
              {isSmDown && (
                <div className={clsx(classes.row, classes.mainRow)}>
                  <div className={classes.rowTitle}>
                    <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("soldermask_hint")}</div>}>
                      <HelpIcon className={classes.helpIcon} />
                    </Tooltip>
                    {t("soldermask")}
                  </div>
                  <div className={classes.rowContent}>
                    <TextField
                      className={classes.select}
                      type="text"
                      name="solder_mask"
                      variant="outlined"
                      size="small"
                      value={formState.solder_mask}
                      onChange={handleChange}
                      select
                    >
                      {constants.solder_mask?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>
                </div>
              )}
              <div className={clsx(classes.row, classes.mainRow)}>
                <div className={classes.rowTitle}>
                  <Tooltip
                    enterTouchDelay={1}
                    title={<div className={classes.tooltip}>{t("silkscreen_legend_hint")}</div>}
                  >
                    <HelpIcon className={classes.helpIcon} />
                  </Tooltip>
                  {t("silkscreen_legend")}
                </div>
                <div className={classes.rowContent}>
                  <TextField
                    className={classes.select}
                    type="text"
                    name="silkscreen_legend"
                    variant="outlined"
                    size="small"
                    value={formState.silkscreen_legend}
                    onChange={handleChange}
                    select
                  >
                    {constants.silkscreen_legend?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </div>
            </>
          )}
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("material_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("material")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="material"
                value={formState.material}
                onChange={handleChange}
              >
                {constants.material?.map((item, index) => {
                  let [disabled, src] = [false, fr4];
                  if (item.label === t("pcb_create.aluminum")) {
                    src = aluminum;
                    if (+formState.layers > 2) disabled = true;
                  }
                  if (item.label === t("pcb_create.rogers")) src = rogers;
                  if (item.label === t("pcb_create.hdi")) {
                    src = hdi;
                    if (+formState.layers < 4) disabled = true;
                  }
                  if (item.label === t("pcb_create.copper_base")) {
                    src = copper;
                    if (+formState.layers > 2) disabled = true;
                  }
                  return (
                    <FormControlLabel
                      key={index}
                      disabled={disabled}
                      checked={formState.material === item.value}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.material === item.value,
                          })}
                        >
                          <img src={src} alt={item.label} />
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          {([t("pcb_create.fr_4"), t("pcb_create.hdi")].includes(formState.material) || showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>
                <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("fr4_tg_hint")}</div>}>
                  <HelpIcon className={classes.helpIcon} />
                </Tooltip>
                FR4-TG:
              </div>
              <div className={classes.rowContent}>
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  name="fr4_tg"
                  value={formState.fr4_tg}
                  onChange={handleChange}
                >
                  {constants.fr4_tg?.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                        label={
                          <div
                            className={clsx(classes.checkButton, "pcb_button", {
                              [classes.checked]: formState.fr4_tg === item.value,
                            })}
                          >
                            {item.label}
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
                {(formState.fr4_tg === "TG 130-140" || showAllFields) && (
                  <span style={{ left: 12, bottom: "-40%" }} className={classes.helperText}>
                    {t("pcb_create.tg_130")}
                  </span>
                )}
              </div>
            </div>
          )}
          {([t("pcb_create.aluminum"), t("pcb_create.copper_base")].includes(formState.material) || showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>
                <Tooltip
                  enterTouchDelay={1}
                  title={<div className={classes.tooltip}>{t("thermal_conductivity_hint")}</div>}
                >
                  <HelpIcon className={classes.helpIcon} />
                </Tooltip>
                {t("thermal_conductivity")}
              </div>
              <div className={classes.rowContent}>
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  name="thermal_conductivity"
                  value={formState.thermal_conductivity}
                  onChange={handleChange}
                >
                  {constants.thermal_conductivity?.map((item, index) => {
                    let disabled = false;
                    if (item.label === "1.0W/(m⋅K)" && formState.material === t("pcb_create.copper_base"))
                      disabled = true;
                    if (
                      item.label === "3.0W/(m⋅K)" &&
                      formState.material === t("pcb_create.aluminum") &&
                      formState.layers === "1"
                    )
                      disabled = true;
                    return (
                      <FormControlLabel
                        key={index}
                        disabled={disabled}
                        checked={formState.thermal_conductivity === item.value}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                        label={
                          <div
                            className={clsx(classes.checkButton, "pcb_button", {
                              [classes.checked]: formState.thermal_conductivity === item.value,
                            })}
                          >
                            {item.label}
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          )}
          {(formState.material === t("pcb_create.rogers") || showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>
                <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("rogers_hint")}</div>}>
                  <HelpIcon className={classes.helpIcon} />
                </Tooltip>
                Rogers:
              </div>
              <div className={classes.rowContent}>
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  name="rogers"
                  value={formState.rogers}
                  onChange={handleChange}
                >
                  {constants.rogers?.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                        label={
                          <div
                            className={clsx(classes.checkButton, "pcb_button", {
                              [classes.checked]: formState.rogers === item.value,
                            })}
                          >
                            {item.label}
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          )}
          {(([t("pcb_create.aluminum"), t("pcb_create.copper_base")].includes(formState.material) &&
            formState.layers === "2") ||
            showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>
                <Tooltip
                  enterTouchDelay={1}
                  title={<div className={classes.tooltip}>{t("structure_of_MCPCB_hint")}</div>}
                >
                  <HelpIcon className={classes.helpIcon} />
                </Tooltip>
                {t("structure_of_MCPCB")}
              </div>
              <div className={classes.rowContent}>
                <RadioGroup
                  className={classes.radioGroup}
                  style={{ maxWidth: "410px" }}
                  row
                  name="structure_of_mcpcb"
                  value={formState.structure_of_mcpcb}
                  onChange={handleChange}
                >
                  {constants.structure_of_mcpcb?.map((item, index) => {
                    let src = metal_core;
                    if (item.label === t("pcb_create.core_bottom")) src = metal_base;
                    return (
                      <React.Fragment key={index}>
                        {!isSmDown && <img style={{ maxHeight: 30 }} src={src} alt={item.label} />}
                        <FormControlLabel
                          style={{ marginRight: 12 }}
                          value={item.value}
                          className={classes.formControlLabel}
                          control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                          label={
                            <div
                              className={clsx(classes.checkButton, "pcb_button", {
                                [classes.checked]: formState.structure_of_mcpcb === item.value,
                              })}
                            >
                              {item.label}
                            </div>
                          }
                        />
                      </React.Fragment>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          )}
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("thickness_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("thickness")}
            </div>
            <div className={classes.rowContent}>
              {formState.material === t("pcb_create.rogers") && +formState.layers < 4 ? (
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  name="thickness_for_rogers"
                  value={formState.thickness_for_rogers}
                  onChange={handleChange}
                >
                  {constants.thickness_for_rogers?.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                        label={
                          <div
                            className={clsx(classes.checkButton, "pcb_button", {
                              [classes.checked]: formState.thickness_for_rogers === item.value,
                            })}
                          >
                            {item.label}
                          </div>
                        }
                      />
                    );
                  })}
                  <div className={classes.helperSection}>
                    {t("unit_hint")}
                    <img src={thickness} alt="thickness" />
                  </div>
                </RadioGroup>
              ) : (
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  name="thickness"
                  value={formState.thickness}
                  onChange={handleChange}
                >
                  {constants.thickness?.map((item, index) => {
                    let disabled = false;
                    if (
                      item.label === "0.2" &&
                      (+formState.layers > 2 ||
                        [t("pcb_create.aluminum"), t("pcb_create.copper_base")].includes(formState.material))
                    )
                      disabled = true;
                    if (
                      item.label === "0.4" &&
                      (+formState.layers > 4 || formState.material === t("pcb_create.copper_base"))
                    )
                      disabled = true;
                    if (item.label === "0.6" && +formState.layers > 4) disabled = true;
                    if (item.label === "0.8" && +formState.layers > 6) disabled = true;
                    if (item.label === "1.0" && +formState.layers > 8) disabled = true;
                    if (item.label === "1.2" && +formState.layers > 10) disabled = true;
                    if (item.label === "1.6" && +formState.layers > 12) disabled = true;
                    if (
                      ["2.4", "2.6", "2.8", "3.0", "3.2"].includes(item.label) &&
                      formState.material === t("pcb_create.copper_base")
                    )
                      disabled = true;

                    return (
                      <FormControlLabel
                        key={index}
                        disabled={disabled}
                        checked={formState.thickness === item.value}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                        label={
                          <div
                            className={clsx(classes.checkButton, "pcb_button", {
                              [classes.checked]: formState.thickness === item.value,
                            })}
                          >
                            {item.label}
                          </div>
                        }
                      />
                    );
                  })}
                  <input
                    disabled={formState.material === "pcb_create.copper_base"}
                    style={{ width: 70, marginRight: 5 }}
                    className={clsx(classes.input, {
                      [classes.checked]: !!formState.thickness_input,
                      [classes.disabledInput]: formState.material === t("pcb_create.copper_base"),
                      [classes.errorInput]: !!errorProps("thickness_input"),
                    })}
                    value={formState.thickness_input}
                    type="text"
                    name="thickness_input"
                    onChange={handleChange}
                    placeholder="1.7-6.0"
                    onFocus={() => setFormState((prev: any) => ({ ...prev, thickness: null }))}
                  />
                  <div className={classes.helperSection}>
                    {t("unit_hint")}
                    <img src={thickness} alt="thickness" />
                  </div>
                </RadioGroup>
              )}
              {!!errorProps("thickness_input") && (
                <p className={classes.errorMessage}>{errorProps("thickness_input").helperText}</p>
              )}
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("min_spacing_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("min_spacing")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="min_spacing"
                value={formState.min_spacing}
                onChange={handleChange}
              >
                {constants.min_spacing?.map((item, index) => {
                  let disabled = false;
                  if (item.label === "3/3mil" && formState.material === t("pcb_create.aluminum")) disabled = true;
                  return (
                    <FormControlLabel
                      key={index}
                      disabled={disabled}
                      checked={formState.min_spacing === item.value}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.min_spacing === item.value,
                          })}
                        >
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
                <div className={classes.helperSection}>
                  <img style={{ height: 24 }} src={track} alt="track" />
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("min_hole_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("min_hole")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="min_hole_size"
                value={formState.min_hole_size}
                onChange={handleChange}
              >
                {constants.min_hole_size?.map((item, index) => {
                  let disabled = false;
                  if (
                    ["0.15mm", "0.2mm", "0.25mm", "≥ 0.3mm"].includes(item.label) &&
                    formState.material === t("pcb_create.aluminum")
                  )
                    disabled = true;
                  if (["≥ 0.8mm", "≥ 1.0mm"].includes(item.label) && formState.material !== t("pcb_create.aluminum"))
                    disabled = true;
                  return (
                    <FormControlLabel
                      key={index}
                      disabled={disabled}
                      checked={formState.min_hole_size === item.value}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.min_hole_size === item.value,
                          })}
                        >
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
                <div className={classes.helperSection}>
                  <img style={{ height: 28 }} src={hole} alt="hole" />
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("solder_mask_color_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("solder_mask_color")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="solder_mask_color"
                value={formState.solder_mask_color}
                onChange={handleChange}
              >
                {constants.solder_mask_color?.map((item, index) => {
                  let background: any = {};
                  if (item.label === t("pcb_create.green")) background = { backgroundColor: "#017b07" };
                  if (item.label === t("pcb_create.red")) background = { backgroundColor: "#bb1407" };
                  if (item.label === t("pcb_create.yellow")) background = { backgroundColor: "#ffd200" };
                  if (item.label === t("pcb_create.blue")) background = { backgroundColor: "#0c4ad9" };
                  if (item.label === t("pcb_create.white"))
                    background = { backgroundColor: "#ffffff", border: "1px solid #cbcbcb" };
                  if (item.label === t("pcb_create.black")) background = { backgroundColor: "#000000" };
                  if (item.label === t("pcb_create.purple"))
                    background = { backgroundColor: "linear-gradient(#cb5fc2, #a20495)" };
                  if (item.label === t("pcb_create.matte_black"))
                    background = { backgroundColor: "linear-gradient(#666666, #000000)" };
                  if (item.label === t("pcb_create.matte_green"))
                    background = { backgroundColor: "linear-gradient(#58de5f, #218626)" };
                  if (item.label === t("pcb_create.none"))
                    background = {
                      border: "1px solid #cbcbcb",
                      backgroundColor: "#efefef",
                      backgroundImage: "linear-gradient(135deg, transparent 40%, black 50%, transparent 60%)",
                      backgroundRepeat: "no-repeat",
                    };
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.solder_mask_color === item.value,
                          })}
                        >
                          <div style={background} className={classes.colorIcon} />
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("silkscreen_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("silkscreen")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="silkscreen"
                value={formState.silkscreen}
                onChange={handleChange}
              >
                {constants.silkscreen?.map((item, index) => {
                  let background: any = {};
                  let disabled = false;
                  if (item.label === t("pcb_create.white")) {
                    background = { backgroundColor: "#ffffff", border: "1px solid #cbcbcb" };
                    if (formState.solder_mask_color === "WHITE") disabled = true;
                  }
                  if (item.label === t("pcb_create.black")) {
                    background = { backgroundColor: "#000000" };
                    if (
                      ["RED", "BLUE", "BLACK", "PURPLE", "MATTE BLACK", "MATTE GREEN"].includes(
                        formState.solder_mask_color,
                      )
                    )
                      disabled = true;
                  }
                  if (item.label === t("pcb_create.none")) {
                    background = {
                      border: "1px solid #cbcbcb",
                      backgroundColor: "#efefef",
                      backgroundImage: "linear-gradient(135deg, transparent 40%, black 50%, transparent 60%)",
                      backgroundRepeat: "no-repeat",
                    };
                  }
                  if (item.label === t("pcb_create.green")) background = { backgroundColor: "#017b07" };
                  if (item.label === t("pcb_create.red")) background = { backgroundColor: "#bb1407" };
                  if (item.label === t("pcb_create.yellow")) background = { backgroundColor: "#ffd200" };
                  if (item.label === t("pcb_create.blue")) background = { backgroundColor: "#0c4ad9" };
                  return (
                    <FormControlLabel
                      key={index}
                      disabled={disabled}
                      checked={formState.silkscreen === item.value}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.silkscreen === item.value,
                          })}
                        >
                          <div style={background} className={classes.colorIcon} />
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("edge_connector_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("edge_connector")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="edge_connector"
                value={formState.edge_connector}
                onChange={handleChange}
              >
                {constants.edge_connector?.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.edge_connector === item.value,
                          })}
                        >
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
              </RadioGroup>
              {!isSmDown && (formState.edge_connector === "Yes" || showAllFields) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className={classes.soldermaskTitle}>
                    <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("bevelling_hint")}</div>}>
                      <HelpIcon className={classes.helpIcon} />
                    </Tooltip>
                    {t("bevelling")}
                  </div>
                  <TextField
                    className={classes.select}
                    type="text"
                    name="bevelling"
                    variant="outlined"
                    size="small"
                    value={formState.bevelling}
                    onChange={handleChange}
                    select
                  >
                    {constants.bevelling?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <img style={{ marginLeft: 16 }} src={chamfering} alt="chamfering" />
                </div>
              )}
            </div>
          </div>
          {isSmDown && (formState.edge_connector === "Yes" || showAllFields) && (
            <div className={classes.row}>
              <img style={{ marginBottom: 16, alignSelf: "center" }} src={chamfering} alt="chamfering" />
              <div className={classes.rowTitle}>
                <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("bevelling_hint")}</div>}>
                  <HelpIcon className={classes.helpIcon} />
                </Tooltip>
                {t("bevelling")}
              </div>
              <div className={classes.rowContent}>
                <TextField
                  className={classes.select}
                  type="text"
                  name="bevelling"
                  variant="outlined"
                  size="small"
                  value={formState.bevelling}
                  onChange={handleChange}
                  select
                >
                  {constants.bevelling?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </div>
            </div>
          )}
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("surface_finish_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("surface_finish")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="surface_finish"
                value={formState.surface_finish}
                onChange={handleChange}
              >
                {constants.surface_finish?.map((item, index) => {
                  let disabled = false;
                  if (
                    item.label === t("pcb_create.hasl_with_lead") &&
                    ([t("pcb_create.rogers"), t("pcb_create.hdi"), t("pcb_create.copper_base")].includes(
                      formState.material,
                    ) ||
                      +formState.thickness < 0.6)
                  )
                    disabled = true;
                  if (
                    item.label === t("pcb_create.hasl_lead_free") &&
                    ([t("pcb_create.rogers"), t("pcb_create.hdi"), t("pcb_create.copper_base")].includes(
                      formState.material,
                    ) ||
                      +formState.thickness < 0.6)
                  )
                    disabled = true;
                  return (
                    <FormControlLabel
                      key={index}
                      disabled={disabled}
                      checked={formState.surface_finish === item.value}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.surface_finish === item.value,
                          })}
                        >
                          {item.label !== "-------"
                            ? t(`pcb_create.${item.label.split(" ").join("_").toLowerCase()}`)
                            : item.label}
                        </div>
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          {(formState.surface_finish === t("pcb_create.immersion_gold") || showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>{t("thickness_gold")}</div>
              <div className={classes.rowContent}>
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  name="thickness_of_immersion_gold"
                  value={formState.thickness_of_immersion_gold}
                  onChange={handleChange}
                >
                  {constants.thickness_of_immersion_gold?.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                        label={
                          <div
                            className={clsx(classes.checkButton, "pcb_button", {
                              [classes.checked]: formState.thickness_of_immersion_gold === item.value,
                            })}
                          >
                            {item.value}
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          )}
          {(formState.surface_finish === t("pcb_create.enepig") || showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>{t("thickness_ENEPIG")}</div>
              <div className={classes.rowContent}>
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  name="thickness_of_enepig"
                  value={formState.thickness_of_enepig}
                  onChange={handleChange}
                >
                  {constants.thickness_of_enepig?.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        className={classes.formControlLabel}
                        control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                        label={
                          <div
                            className={clsx(classes.checkButton, "pcb_button", {
                              [classes.checked]: formState.thickness_of_enepig === item.value,
                            })}
                          >
                            {item.label}
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          )}
          {(formState.surface_finish === t("pcb_create.hard_gold") || showAllFields) && (
            <div className={classes.row}>
              <div className={classes.rowTitle}>{t("thickness_au_ni")}</div>
              <div className={classes.rowContent}>
                <NumberInput
                  className={classes.customInput}
                  name="au_thickness_of_hard_gold"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  value={formState.au_thickness_of_hard_gold}
                  decimalScale={0}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Au:</InputAdornment>,
                    endAdornment: <InputAdornment position="end">U&quot;</InputAdornment>,
                  }}
                />
                <NumberInput
                  className={classes.customInput}
                  name="ni_thickness_of_hard_gold"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  value={formState.ni_thickness_of_hard_gold}
                  decimalScale={0}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Ni:</InputAdornment>,
                    endAdornment: <InputAdornment position="end">U&quot;</InputAdornment>,
                  }}
                />
              </div>
            </div>
          )}
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("via_process_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("via_process")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="via_process"
                value={formState.via_process}
                onChange={handleChange}
              >
                {constants.via_process?.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.via_process === item.value,
                          })}
                        >
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
              </RadioGroup>
              <span style={{ left: 12, bottom: "-40%" }} className={classes.helperText}>
                {t("pcb_create.gerber_files")}
              </span>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowTitle}>
              <Tooltip enterTouchDelay={1} title={<div className={classes.tooltip}>{t("finished_copper_hint")}</div>}>
                <HelpIcon className={classes.helpIcon} />
              </Tooltip>
              {t("finished_copper")}
            </div>
            <div className={classes.rowContent}>
              <RadioGroup
                className={classes.radioGroup}
                row
                name="finished_copper"
                value={formState.finished_copper}
                onChange={handleChange}
              >
                {constants.finished_copper?.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      className={classes.formControlLabel}
                      control={<Radio style={{ display: "none" }} className={appTheme.radio} color="primary" />}
                      label={
                        <div
                          className={clsx(classes.checkButton, "pcb_button", {
                            [classes.checked]: formState.finished_copper === item.value,
                          })}
                        >
                          {item.label}
                        </div>
                      }
                    />
                  );
                })}
                <div style={{ marginTop: 3 }} className={classes.helperSection}>
                  {t("pcb_create.unit")}
                  <img src={finished_copper} alt="finished_copper" />
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PcbCalculator;
