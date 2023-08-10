import React, { useEffect, useMemo, useState } from "react";
import { batch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Fade,
  FormControlLabel,
  FormHelperText,
  Modal,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { getPcbSellers, clearPcbModalItem, savePcbModalItem } from "@src/store/pcb/pcbActions";
// import { initialState as pcbInitialState } from "@src/store/pcb/pcbReducer";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import Dropzone from "@src/views/chipassist/PcbNew/Dropzone/Dropzone";
import image from "@src/images/elfaro/banner_pcb.png";
import clsx from "clsx";
import { NumberInput } from "@src/components/Inputs";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import Backdrop from "@material-ui/core/Backdrop";
import {
  changeMisc,
  progressModalOpen,
  progressModalSetPartNumber,
  progressModalSuccess,
  saveRequestToLocalStorage,
} from "@src/store/progressModal/progressModalActions";
import MenuItem from "@material-ui/core/MenuItem";
import validate from "validate.js";
import { authSignup, defaultRegisterData } from "@src/store/authentication/authActions";
import PcbCalculator from "@src/views/chipassist/Pcb/components/Calculator/PcbCalculator";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { defaultCountry } from "@src/constants/countries";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import { useLocation, Link } from "react-router-dom";
import useDebounce from "@src/hooks/useDebounce";
import formSchema from "@src/utils/formSchema";
import { useStyles } from "./PcbRequestStyles";
// import { Physical, Technical } from "./Fields";
import PcbModalConfirm from "../components/PcbModalConfirm/PcbModalConfirm";

// function returnSelectedItems(items, ids) {
//   if (!ids) return [];
//   return items.reduce((res, val) => {
//     if (ids.includes(val.id)) res.push(val);
//     return res;
//   }, []);
// }

const initialState = {
  board_type: "BOARD",
  x_out: "Not Accept",
  break_away_rail: "Yes",
  panel_requirements_comment: "",
  route_process: "VSCORING",
  different_design: "1",
  different_design_input: "",
  unit_x: "",
  unit_y: "",
  quantity: "",
  layers: "2",
  layers_input: "",
  copper_layer: "None",
  solder_mask: "null",
  silkscreen_legend: "null",
  material: "FR-4",
  fr4_tg: "",
  thermal_conductivity: "",
  rogers: "",
  structure_of_mcpcb: "",
  thickness: "2.0",
  thickness_input: "",
  thickness_for_rogers: "0.203",
  min_spacing: "6/6mil",
  min_hole_size: "≥0.3mm",
  solder_mask_color: "GREEN",
  silkscreen: "NONE",
  edge_connector: "No",
  bevelling: "None",
  surface_finish: "null",
  thickness_of_immersion_gold: "",
  thickness_of_enepig: "",
  au_thickness_of_hard_gold: "",
  ni_thickness_of_hard_gold: "",
  via_process: "Tenting vias",
  finished_copper: "5",
  comment: "",
  file: [],
};

const defaultRegisterState = () => ({
  isValid: true,
  values: {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    policy_confirm: false,
    receiveUpdatesConfirm: false,
  },
  touched: {},
  errors: {},
});

function PcbRequest() {
  // const [colorInfo, setColorInfo] = useState({});
  const [savedFormData, setSavedFormData] = useState({});
  const [status, setStatus] = useState();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const registerClasses = useRegisterStyles();
  const appTheme = useAppTheme();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down(480));
  const dispatch = useAppDispatch();
  const { t } = useI18n("pcb");
  const location = useLocation();
  // const [item, setItem] = useState(pcbInitialState.pcbModalItem);
  const [registerItem, setRegisterItem] = useState(defaultRegisterState());
  const debouncedState = useDebounce(registerItem, 300);
  const [savedTime, setSavedTime] = useState(null);
  const [maxSizeError, setMaxSizeError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [detailsWillBeSent, setDetailsWillBeSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [calcVariables, setCalcVariables] = useState(null);

  const pcbConstants = useAppSelector((state) => state.pcb.pcbConstants);
  // const pcbModalItem = useAppSelector((state) => state.pcb.pcbModalItem);
  const pcbModalUpdateId = useAppSelector((state) => state.pcb.pcbModalUpdateId);
  const pcbSaving = useAppSelector((state) => state.pcb.pcbSaving);
  const pcbErrors = useAppSelector((state) => state.pcb.pcbErrors);
  // const all_sellers = useAppSelector((state) => state.pcb.pcbSellers || []);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const countries = useAppSelector((state) => state.checkout.countries);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  // const selectedSellers = returnSelectedItems(all_sellers, item.seller);

  useEffect(() => {
    let data = localStorage.getItem("pcb_calculator_data");
    if (data) {
      data = JSON.parse(data);
      setFormState((prev) => ({ ...prev, ...data }));
      localStorage.removeItem("pcb_calculator_data");
    }
  }, []);

  useEffect(() => {
    if (pcbConstants) {
      setCalcVariables({
        board_type: pcbConstants.PCBTYPE
          ? [...pcbConstants.PCBTYPE]
          : [
              { label: "Single PCB", value: "Single PCB" },
              { label: 'Panel by Customer"', value: "Panel by Customer" },
              { label: "Panel by PCBWay", value: "Panel by PCBWay" },
            ],
        x_out: pcbConstants.X_OUT
          ? [...pcbConstants.X_OUT]
          : [
              { label: "Accept", value: "Accept" },
              { label: "Not Accept", value: "Not Accept" },
            ],
        break_away_rail: pcbConstants.BREAK_AWAY_RAIL
          ? [...pcbConstants.BREAK_AWAY_RAIL]
          : [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
        route_process: pcbConstants.PROFILING
          ? [...pcbConstants.PROFILING]
          : [
              { label: "Panel as PCBWay prefer", value: "Panel as PCBWay prefer" },
              { label: "Panel as V-Scoring", value: "Panel as V-Scoring" },
              { label: "Panel as Tab Route", value: "Panel as Tab Route" },
              { label: "Both V-Scoring&Tab-routing", value: "Both V-Scoring&Tab-routing" },
            ],
        different_design: pcbConstants.DIFFERENT_DESIGN
          ? [...pcbConstants.DIFFERENT_DESIGN]
          : [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
            ],
        layers: pcbConstants.LAYERS
          ? [...pcbConstants.LAYERS]
          : [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "4", value: "4" },
              { label: "6", value: "6" },
              { label: "8", value: "8" },
              { label: "10", value: "10" },
              { label: "12", value: "12" },
              { label: "14", value: "14" },
            ],
        copper_layer: pcbConstants.COPPER_LAYER
          ? [...pcbConstants.COPPER_LAYER]
          : [
              { label: "None", value: "None" },
              { label: "Top layer", value: "Top layer" },
              { label: "Bottom layer", value: "Bottom layer" },
            ],
        solder_mask: pcbConstants.SOLDERMASK
          ? [...pcbConstants.SOLDERMASK]
          : [
              { label: "None", value: "None" },
              { label: "Top side", value: "Top side" },
              { label: "Bottom side", value: "Bottom side" },
              { label: "Both sides", value: "Both sides" },
            ],
        silkscreen_legend: pcbConstants.LEGEND
          ? [...pcbConstants.LEGEND]
          : [
              { label: "None", value: "None" },
              { label: "Top side", value: "Top side" },
              { label: "Bottom side", value: "Bottom side" },
              { label: "Both sides", value: "Both sides" },
            ],
        material: pcbConstants.MATERIAL
          ? [...pcbConstants.MATERIAL]
          : [
              { label: "FR-4", value: "FR-4" },
              { label: "Aluminum", value: "Aluminum" },
              { label: "Rogers", value: "Rogers" },
              { label: "HDI(Buried/blind vias)", value: "HDI(Buried/blind vias)" },
              { label: "Copper Base", value: "Copper Base" },
            ],
        fr4_tg: pcbConstants.BASE
          ? [...pcbConstants.BASE]
          : [
              { label: "TG 130-140", value: "TG 130-140" },
              { label: "TG 150-160", value: "TG 150-160" },
              { label: "TG 170-180", value: "TG 170-180" },
              { label: "S1000H TG150", value: "S1000H TG150" },
            ],
        thermal_conductivity: pcbConstants.THERMAL_CONDUCTIVITY
          ? [...pcbConstants.THERMAL_CONDUCTIVITY]
          : [
              { label: "1.0W/(m⋅K)", value: "1.0W/(m⋅K)" },
              { label: "2.0W/(m⋅K)", value: "2.0W/(m⋅K)" },
              { label: "3.0W/(m⋅K)", value: "3.0W/(m⋅K)" },
            ],
        rogers: pcbConstants.ROGERS
          ? [...pcbConstants.ROGERS]
          : [
              { label: "Rogers 4003C", value: "Rogers 4003C" },
              { label: "Rogers 4350B", value: "Rogers 4350B" },
            ],
        structure_of_mcpcb: pcbConstants.STRUCTURE_OF_MCPCB
          ? [...pcbConstants.STRUCTURE_OF_MCPCB]
          : [
              { label: "Metal core in the middle", value: "Metal core in the middle" },
              { label: "Metal base on the bottom side", value: "Metal base on the bottom side" },
            ],
        thickness: pcbConstants.THICKNESS
          ? [...pcbConstants.THICKNESS]
          : [
              { label: "0.2", value: "0.2" },
              { label: "0.4", value: "0.4" },
              { label: "0.6", value: "0.6" },
              { label: "0.8", value: "0.8" },
              { label: "1.0", value: "1.0" },
              { label: "1.2", value: "1.2" },
              { label: "1.6", value: "1.6" },
              { label: "2.0", value: "2.0" },
              { label: "2.4", value: "2.4" },
              { label: "2.6", value: "2.6" },
              { label: "2.8", value: "2.8" },
              { label: "3.0", value: "3.0" },
              { label: "3.2", value: "3.2" },
            ],
        thickness_for_rogers: pcbConstants.THICKNESS_FOR_ROGERS
          ? [...pcbConstants.THICKNESS_FOR_ROGERS]
          : [
              { label: "0.203", value: "0.203" },
              { label: "0.305", value: "0.305" },
              { label: "0.406", value: "0.406" },
              { label: "0.508", value: "0.508" },
              { label: "0.813", value: "0.813" },
              { label: "1.524", value: "1.524" },
            ],
        min_spacing: pcbConstants.MIN_SPACING
          ? [...pcbConstants.MIN_SPACING]
          : [
              { label: "3/3mil", value: "3/3mil" },
              { label: "4/4mil", value: "4/4mil" },
              { label: "5/5mil", value: "5/5mil" },
              { label: "6/6mil", value: "6/6mil" },
              { label: "≥ 8/8mil", value: ">=8/8mil" },
            ],
        min_hole_size: pcbConstants.MIN_HOLE_SIZE
          ? [...pcbConstants.MIN_HOLE_SIZE]
          : [
              { label: "0.15mm", value: "0.15" },
              { label: "0.2mm", value: "0.2" },
              { label: "0.25mm", value: "0.25" },
              { label: "≥ 0.3mm", value: ">=0.3" },
              { label: "≥ 0.8mm", value: ">=0.8" },
              { label: "≥ 1.0mm", value: ">=1.0" },
              { label: "No Drill", value: "No Drill" },
            ],
        solder_mask_color: pcbConstants.SOLDERMASK_COLOR
          ? [...pcbConstants.SOLDERMASK_COLOR]
          : [
              { label: "Green", value: "Green" },
              { label: "Red", value: "Red" },
              { label: "Yellow", value: "Yellow" },
              { label: "Blue", value: "Blue" },
              { label: "White", value: "White" },
              { label: "Black", value: "Black" },
              { label: "Purple", value: "Purple" },
              { label: "Matte black", value: "Matte black" },
              { label: "Matte green", value: "Matte green" },
              { label: "None", value: "None" },
            ],
        surface_finish: pcbConstants.FINISH
          ? [...pcbConstants.FINISH]
          : [
              { label: "HASL with lead", value: "HASL with lead" },
              { label: "HASL lead free", value: "HASL lead free" },
              { label: "Immersion gold(ENIG)", value: "Immersion gold(ENIG)" },
              { label: "OSP", value: "OSP" },
              { label: "Hard gold", value: "Hard gold" },
              { label: "Immersion silver(Ag)", value: "Immersion silver(Ag)" },
              { label: "ENEPIG", value: "ENEPIG" },
              { label: "None(Plain copper)", value: "None(Plain copper)" },
            ],
        silkscreen: pcbConstants.LEGEND_COLOR
          ? [...pcbConstants.LEGEND_COLOR]
          : [
              { label: "White", value: "White" },
              { label: "Black", value: "Black" },
              { label: "None", value: "None" },
            ],
        edge_connector: pcbConstants.EDGE_CONNECTOR
          ? [...pcbConstants.EDGE_CONNECTOR]
          : [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
        bevelling: pcbConstants.BEVELLING
          ? [...pcbConstants.BEVELLING]
          : [
              { label: "None", value: "None" },
              { label: "Yes (20°)", value: "20" },
              { label: "Yes (30°)", value: "30" },
              { label: "Yes (45°)", value: "45" },
            ],
        thickness_of_immersion_gold: pcbConstants.THICKNESS_OF_IMMERSION_GOLD
          ? [...pcbConstants.THICKNESS_OF_IMMERSION_GOLD]
          : [
              { label: '1U"', value: "1" },
              { label: '2U"', value: "2" },
              { label: '3U"', value: "3" },
            ],
        thickness_of_enepig: pcbConstants.THICKNESS_OF_ENEPIG
          ? [...pcbConstants.THICKNESS_OF_ENEPIG]
          : [
              { label: 'Ni:200U" Pd:1U" Au:1U"', value: "1" },
              { label: 'Ni:200U" Pd:2U" Au:2U"', value: "2" },
              { label: 'Ni:200U" Pd:3U" Au:3U"', value: "3" },
              { label: 'Ni:200U" Pd:4U" Au:4U"', value: "4" },
            ],
        via_process: pcbConstants.VIA_PROCESS
          ? [...pcbConstants.VIA_PROCESS]
          : [
              { label: "Tenting vias", value: "Tenting vias" },
              { label: "Plugged vias", value: "Plugged vias" },
              { label: "Vias not covered", value: "Vias not covered" },
            ],
        finished_copper: pcbConstants.COPPER
          ? [...pcbConstants.COPPER]
          : [
              { label: "Bare board(0 oz Cu)", value: "0" },
              { label: "1 oz Cu", value: "1" },
              { label: "2 oz Cu", value: "2" },
              { label: "3 oz Cu", value: "3" },
              { label: "4 oz Cu", value: "4" },
              { label: "5 oz Cu", value: "5" },
              { label: "6 oz Cu", value: "6" },
              { label: "7 oz Cu", value: "7" },
              { label: "8 oz Cu", value: "8" },
              { label: "9 oz Cu", value: "9" },
              { label: "10 oz Cu", value: "10" },
              { label: "11 oz Cu", value: "11" },
              { label: "12 oz Cu", value: "12" },
              { label: "13 oz Cu", value: "13" },
            ],
      });
    }
  }, [pcbConstants]);

  const calculatorSchema = useMemo(() => {
    let res = {
      unit_x: {
        presence: { allowEmpty: false, message: `^${t("column.unit_x")} ${t("errors.required")}` },
        numericality: {
          greaterThan: 0,
          lessThanOrEqualTo: 2147000000,
          notGreaterThan: `^${t("column.unit_x")} ${t("errors.not_greater_than", { count: 0 })}`,
          notLessThan: `^${t("column.unit_x")} ${t("errors.not_less_than", { count: 2147000000 })}`,
        },
      },
      unit_y: {
        presence: { allowEmpty: false, message: `^${t("column.unit_y")} ${t("errors.required")}` },
        numericality: {
          greaterThan: 0,
          lessThanOrEqualTo: 2147000000,
          notGreaterThan: `^${t("column.unit_y")} ${t("errors.not_greater_than", { count: 0 })}`,
          notLessThan: `^${t("column.unit_y")} ${t("errors.not_less_than", { count: 2147000000 })}`,
        },
      },
      quantity: {
        presence: { allowEmpty: false, message: `^${t("column.qty")} ${t("errors.required")}` },
        numericality: {
          greaterThan: 0,
          lessThanOrEqualTo: 2147000000,
          notGreaterThan: `^${t("column.qty")} ${t("errors.not_greater_than", { count: 0 })}`,
          notLessThan: `^${t("column.qty")} ${t("errors.not_less_than", { count: 2147000000 })}`,
        },
      },
    };
    if (formState?.different_design_input) {
      res = {
        ...res,
        different_design_input: {
          numericality: {
            greaterThan: 0,
            lessThanOrEqualTo: 100,
            notGreaterThan: `^${t("calculator.different")} ${t("errors.not_greater_than", { count: 0 })}`,
            notLessThan: `^${t("calculator.different")} ${t("errors.not_less_than", { count: 100 })}`,
          },
        },
      };
    }
    if (formState?.layers_input) {
      res = {
        ...res,
        layers_input: {
          numericality: {
            greaterThan: 0,
            lessThanOrEqualTo: 2147000000,
            notGreaterThan: `^${t("column.layers")} ${t("errors.not_greater_than", { count: 0 })}`,
            notLessThan: `^${t("column.layers")} ${t("errors.not_less_than", { count: 2147000000 })}`,
          },
        },
      };
    }
    if (formState?.thickness_input) {
      res = {
        ...res,
        thickness_input: {
          numericality: {
            greaterThan: 0,
            lessThanOrEqualTo: 2147000000,
            notGreaterThan: `^${t("column.thickness")} ${t("errors.not_greater_than", { count: 0 })}`,
            notLessThan: `^${t("column.thickness")} ${t("errors.not_less_than", { count: 2147000000 })}`,
          },
        },
      };
    }
    return res;
  }, [formState?.layers_input, formState?.thickness_input, formState?.different_design_input]);

  const registerSchema = useMemo(() => {
    return {
      email: formSchema.email,
      firstName: formSchema.firstName,
      lastName: formSchema.lastName,
      company: formSchema.companyName,
      policy_confirm: formSchema.policyConfirm,
    };
  }, []);

  const filesSize = React.useMemo(() => {
    return formState.file.reduce((acc, f) => {
      return acc + f.size;
    }, 0);
  }, [formState.file]);

  useEffect(() => {
    if (filesSize > 52428800) {
      // Files max size limit = 50mb
      setMaxSizeError(true);
    } else {
      setMaxSizeError(false);
    }
  }, [filesSize]);

  useEffect(() => {
    const country =
      (constants?.id !== ID_ICSEARCH && countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)) ||
      defaultCountry;
    if (country) {
      setRegisterItem((prevState) => {
        return {
          ...prevState,
          values: {
            ...prevState.values,
            country: country.url || "",
          },
        };
      });
    }
  }, [geolocation, countries]);

  useEffect(() => {
    if (dispatch) {
      dispatch(getPcbSellers());
    }
  }, [dispatch, shouldUpdateBackend]);

  useEffect(() => {
    const formErrors = validate(registerItem.values, registerSchema);
    setRegisterItem((prevState) => ({
      ...prevState,
      isValid: !formErrors,
      errors: formErrors || {},
    }));
  }, [debouncedState.values]);

  const errorProps = (name) => {
    if (pcbErrors[name] && !!pcbErrors[name].length) {
      return { error: true, helperText: pcbErrors[name][0] };
    }
    if (errors && errors[name]) {
      return { error: true, helperText: errors[name][0] };
    }
    return false;
  };

  const errorRegister = (name) => {
    if (registerItem.touched[name] && registerItem.errors[name]) {
      return { error: true, helperText: registerItem.errors[name][0] };
    }
    return false;
  };

  const handleFilesDrop = (files) => {
    if (maxSizeError) return;
    setFormState((prevState) => ({ ...prevState, file: [...files] }));
  };

  const handleRemoveFile = (id) => {
    setFormState((prevState) => ({ ...prevState, file: prevState.file.filter((val) => val.id !== id) }));
  };

  const handleChangeRegData = (e) => {
    e.persist();
    const { name, type, value, checked } = e.target;

    const registerErrors = { ...registerItem.errors };
    if (registerErrors[name]) delete registerErrors[name];

    setRegisterItem((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: type === "checkbox" ? checked : name === "email" ? value?.replace(/ /g, "") : value,
      },
      touched: {
        ...prev.touched,
        [name]: type === "checkbox",
      },
      errors: registerErrors,
    }));
  };

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    if (errors[name]) {
      const newState = { ...errors };
      delete newState[name];
      setErrors(newState);
    }
    if (name === "different_design") {
      if (errors?.different_design_input) {
        const newState = { ...errors };
        delete newState.different_design_input;
        setErrors(newState);
      }
    }
    if (name === "different_design_input") value = value?.replace(/\D/gi, "") || "";

    if (name === "thickness") {
      if (errors?.thickness_input) {
        const newState = { ...errors };
        delete newState.thickness_input;
        setErrors(newState);
      }
      let surfaceFinish = "";
      if (["HASL with lead", "HASL lead free"].includes(formState.surface_finish)) {
        if (+value < 0.6) surfaceFinish = "Immersion gold(ENIG)";
      }
      return setFormState((prev) => ({
        ...prev,
        thickness_input: "",
        surface_finish: surfaceFinish || prev.surface_finish,
        [name]: value,
      }));
    }
    if (name === "thickness_input") {
      value = value
        .replace(/^[\D]/g, "")
        .replace(/[^0-9.]/g, "")
        .replace(/[.][.]?/g, ".");
      if (!value.match(/\d+[.]\d+[.]/)) {
        return setFormState((prevState) => ({ ...prevState, thickness: null, [name]: value }));
      }
      return false;
    }
    if (name === "layers_input") {
      value = value?.replace(/\D/gi, "") || "";
      return setFormState((prevState) => ({ ...prevState, layers: null, [name]: value }));
    }
    if (name === "layers") {
      if (errors?.layers_input) {
        const newState = { ...errors };
        delete newState.layers_input;
        setErrors(newState);
      }
      let material = "";
      if ((formState.material === "Aluminum" || formState.material === "Copper Base") && +value > 2) material = "FR-4";
      if (formState.material === "HDI(Buried/blind vias)" && +value < 4) material = "FR-4";
      return setFormState((prev) => ({
        ...prev,
        material: material || prev.material,
        thickness: "2.0",
        thickness_input: "",
        thermal_conductivity: "2.0W/(m⋅K)",
        layers_input: "",
        [name]: value,
      }));
    }
    if (name === "different_design") {
      return setFormState((prev) => ({
        ...prev,
        different_design_input: "",
        [name]: value,
      }));
    }
    if (name === "material") {
      if (errors?.thickness_input) {
        const newState = { ...errors };
        delete newState.thickness_input;
        setErrors(newState);
      }
      let surfaceFinish = "";
      if (["HASL with lead", "HASL lead free"].includes(formState.surface_finish)) {
        if (["Rogers", "HDI(Buried/blind vias)", "Copper Base"].includes(value)) surfaceFinish = "Immersion gold(ENIG)";
      }
      return setFormState((prev) => ({
        ...prev,
        thermal_conductivity: "2.0W/(m⋅K)",
        thickness: "2.0",
        thickness_input: "",
        min_spacing: value === "Aluminum" && prev.min_spacing === "3/3mil" ? "4/4mil" : prev.min_spacing,
        min_hole_size: value === "Aluminum" ? "≥0.8mm" : "0.15mm",
        surface_finish: surfaceFinish || prev.surface_finish,
        [name]: value,
      }));
    }
    if (name === "solder_mask_color") {
      return setFormState((prev) => ({
        ...prev,
        silkscreen: "NONE",
        [name]: value,
      }));
    }
    if (name === "extra_pcb_product_number") {
      return setFormState((prev) => ({
        ...prev,
        [name]: event.currentTarget.checked,
      }));
    }

    return setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUnAuth = () => {
    if (!registerItem.isValid) return false;
    const formErrors = validate(registerItem.values, registerSchema);
    if (formErrors) {
      return setRegisterItem((prevState) => ({
        ...prevState,
        isValid: !formErrors,
        touched: Object.keys(formErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        errors: formErrors || {},
      }));
    }

    handleSubmit();
    return setShowRegisterForm(false);
  };

  const onBlurHandler = (name) => () => {
    return setRegisterItem((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  const handleSubmit = (e = null) => {
    if (e) e.preventDefault();

    const formErrors = validate(formState, calculatorSchema);
    if (formErrors) return setErrors(formErrors);

    if (!isAuthenticated && !showRegisterForm) {
      return setShowRegisterForm(true);
    }

    let data = Object.keys(formState).reduce((acc, curr) => {
      if (formState[curr] !== "null") return { ...acc, [curr]: formState[curr] };
      return acc;
    }, {});
    data = { ...data, status };

    const formData = new FormData();
    formData.append("part_number", "part_number");
    if (detailsWillBeSent) {
      Object.keys(data).map((name) => {
        if (typeof data[name] !== "boolean" && !data[name]) return false;
        if (name === "x_out") {
          formData.append("xout", data[name] === "Accept" ? 1 : 0);
          return true;
        }
        // if (name === "seller") {
        //   data[name].map((val) => formData.append("seller", val));
        //   return true;
        // }
        if (name === "file") {
          data[name].forEach((val) => formData.append(`file[]`, val));
          return true;
        }
        formData.append(name, data[name]);
        return true;
      });
    } else {
      formData.append("unit_x", formState.unit_x);
      formData.append("unit_y", formState.unit_y);
      formData.append("quantity", formState.quantity);
      if (formState.comment) formData.append("comment", formState.comment);
      if (formState.file.length) data.file.forEach((val) => formData.append(`file[]`, val));
    }

    setSavedFormData(formData);
    dispatch(progressModalSetPartNumber("Title", "pcb"));
    dispatch(changeMisc("pcb", data, registerItem.values.email));

    if (isAuthenticated) {
      dispatch(progressModalOpen());
      dispatch(savePcbModalItem(formData, pcbModalUpdateId)).then(() => {
        batch(() => {
          dispatch(progressModalSuccess());
          dispatch(clearPcbModalItem());
          setFormState(initialState);
        });
      });
    } else {
      saveRequestToLocalStorage(data, "Title", "pcb");
      dispatch(
        changeMisc(
          "not_activated_request",
          { ...data, requestType: "pcb", part_number: "PCB" },
          registerItem.values.email,
        ),
      );

      setIsLoading(true);
      let registerData = { ...defaultRegisterData };
      registerData.email = registerItem.values.email;
      registerData.first_name = registerItem.values.firstName;
      registerData.last_name = registerItem.values.lastName;
      registerData.company_name = registerItem.values.company;
      registerData.policy_confirm = registerItem.values.policy_confirm;
      registerData.receive_updates_confirm = registerItem.values.receive_updates_confirm;
      registerData.country =
        countries?.find((c) => c.url === registerItem.values.country)?.iso_3166_1_a3 ||
        (constants?.id !== ID_ICSEARCH &&
          countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.iso_3166_1_a3) ||
        defaultCountry.iso_3166_1_a3;
      registerData = Object.fromEntries(
        Object.entries(registerData)
          .map((i) => {
            if (typeof i[1] === "boolean" || i[1]) return i;
            return false;
          })
          .filter((i) => !!i),
      );
      dispatch(authSignup(registerData, { subj: "pcb" }))
        .then(() => {
          batch(() => {
            localStorage.setItem("registered_email", registerItem.values.email);
            dispatch(clearPcbModalItem());
            setFormState(initialState);
            setRegisterItem(defaultRegisterState());
            dispatch(progressModalOpen());
          });
        })
        .finally(() => setIsLoading(false));
    }
    return false;
  };

  const onFileErrorConfirm = () => {
    savedFormData.delete("file[]");

    dispatch(savePcbModalItem(savedFormData, pcbModalUpdateId)).then(() => {
      batch(() => {
        dispatch(clearPcbModalItem());
        setFormState(initialState);
      });
    });
  };

  const showDetailsHandler = () => setShowDetails((prev) => !prev);

  const onApplyDetails = () => {
    const formErrors = validate(formState, calculatorSchema);
    if (formErrors) {
      setErrors(formErrors);
    } else {
      batch(() => {
        setSavedTime(new Date().toTimeString().slice(0, 8));
        setDetailsWillBeSent(true);
        setShowDetails(false);
        dispatch(
          showBottomLeftMessageAlertAction({
            text: `Details saved successfully!`,
            severity: "success",
          }),
        );
      });
    }
  };

  const onCloseDetails = () => setShowDetails(false);
  const onCloseRegister = () => {
    setShowRegisterForm(false);
  };

  const onMoveToLogin = () => {
    const data = Object.keys(formState).reduce((acc, curr) => {
      if (formState[curr] !== "null") return { ...acc, [curr]: formState[curr] };
      return acc;
    }, {});
    localStorage.setItem("pcb_calculator_data", JSON.stringify(data));
  };

  return (
    <div className={`${classes.root} pcb-modal-form`}>
      <form id="pcb_form" autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.formContent}>
          <div className={clsx(classes.formContentItem, classes.formContainer)}>
            <div style={isXsDown ? { display: "block" } : {}} className={classes.formRow}>
              <NumberInput
                className={classes.textField}
                style={{ margin: "13px 0" }}
                name="unit_x"
                label={`${t("column.unit_x")} (mm)`}
                variant="outlined"
                size="small"
                required
                placeholder={t("column.x")}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formState.unit_x}
                onChange={handleChange}
                decimalScale={2}
                {...errorProps("unit_x")}
              />
              <NumberInput
                style={{ margin: isXsDown ? "13px 0" : "13px" }}
                className={classes.textField}
                name="unit_y"
                label={`${t("column.unit_y")} (mm)`}
                variant="outlined"
                size="small"
                required
                placeholder={t("column.y")}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formState.unit_y}
                onChange={handleChange}
                decimalScale={2}
                {...errorProps("unit_y")}
              />
              <NumberInput
                style={{ margin: "13px 0" }}
                className={clsx(classes.input, classes.textField)}
                name="quantity"
                required
                label={t("column.qty")}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formState.quantity}
                onChange={handleChange}
                decimalScale={0}
                {...errorProps("quantity")}
              />
            </div>
            <div className={classes.formRow}>
              <TextField
                style={{ margin: "13px 13px 13px 0" }}
                className={classes.textField}
                name="thickness_input"
                label={`${t("column.thickness")} (mm)`}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formState.thickness_input || formState.thickness || ""}
                onChange={handleChange}
                {...errorProps("thickness_input")}
              />
              <TextField
                className={classes.textField}
                style={{ margin: "13px 0" }}
                name="layers_input"
                label={`${t("column.layers")}`}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formState.layers_input || formState.layers || ""}
                onChange={handleChange}
                {...errorProps("layers_input")}
              />
            </div>
            <div>
              <TextField
                className={classes.textField}
                name="comment"
                label={t("column.comment")}
                multiline
                rows={4}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formState.comment}
                onChange={handleChange}
                {...errorProps("comment")}
                style={{ width: "100%", margin: "13px 0" }}
                helperText={t("column.comment_helper")}
              />
            </div>
            <Dropzone
              formState={isAuthenticated ? null : formState}
              maxSizeError={maxSizeError}
              files={formState.file}
              setFiles={handleFilesDrop}
              onDeleteFile={handleRemoveFile}
            />
            {maxSizeError && <FormHelperText error>{t("pcb.file.max_size", { size: 50 })}</FormHelperText>}
          </div>
          <div className={clsx(classes.detailsInfo, classes.formContentItem)}>
            <div className={classes.details}>
              <div className={classes.detailsTitle}>{t("pcb_new.details_title")}</div>
              <img className={classes.detailsImg} src={image} alt="PCB details image" />
            </div>

            <Button
              variant="contained"
              className={clsx(appTheme.buttonCreate, classes.detailsBtn)}
              onClick={showDetailsHandler}
              size="large"
            >
              {t("pcb_new.details_btn")}
            </Button>
            {savedTime && (
              <div className={classes.savedTime}>
                <div>Data successfully saved</div>
                <div>{savedTime}</div>
              </div>
            )}
          </div>
        </div>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            className={appTheme.buttonCreate}
            type="submit"
            value="READY"
            disabled={pcbSaving || isLoading}
            onClick={() => setStatus("READY")}
            size="large"
          >
            {(pcbSaving || isLoading) && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
            {t("request_send")}
          </Button>
        </div>
        {typeof pcbErrors === "object" && !!Object.keys(pcbErrors).length && (
          <Alert style={{ marginTop: 16 }} className={classes.alert} severity="error">
            {Object.keys(pcbErrors).map((val) => (
              <div key={val + pcbErrors[val][0]}>
                {val}: {pcbErrors[val][0]}
              </div>
            ))}
          </Alert>
        )}
      </form>
      {Array.isArray(pcbErrors) && pcbErrors.includes("Save files error") && (
        <PcbModalConfirm onConfirm={onFileErrorConfirm} />
      )}
      <Modal
        onClose={onCloseDetails}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        open={showDetails}
        className={clsx(commonClasses.modal, "fullScreen")}
      >
        <Fade in={showDetails} style={{ textAlign: "start" }} className={clsx(commonClasses.paper, "fullScreen")}>
          <div>
            <PcbCalculator
              handleChange={handleChange}
              constants={calcVariables}
              formState={formState}
              setFormState={setFormState}
              errorProps={errorProps}
            />
            <div className={classes.applyButton}>
              <Button variant="contained" className={appTheme.buttonPrimary} onClick={onCloseDetails} size="large">
                {t("common.close")}
              </Button>
              <Button
                style={{ minWidth: 160 }}
                variant="contained"
                className={appTheme.buttonCreate}
                onClick={onApplyDetails}
                size="large"
              >
                {t("pcb_new.apply_btn")}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        onClose={onCloseRegister}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        open={showRegisterForm}
        className={clsx(commonClasses.modal, "fullScreen")}
      >
        <Fade
          in={showRegisterForm}
          style={{ textAlign: "start" }}
          className={clsx(commonClasses.paper, "fullScreen", classes.registerForm)}
        >
          <div>
            <div className={classes.signIn}>
              {t("restricted.description_1")}
              <Link
                onClick={onMoveToLogin}
                to={"/auth/login"}
                className={`${appTheme.hyperlink} ${registerClasses.link}`}
                state={{ background: location.state?.background || location }}
              >
                {t("restricted.sign_in")}
              </Link>
              {". "}
            </div>
            <div className={classes.formRow}>
              <TextField
                style={{ width: "100%", margin: "8px 8px 8px 0" }}
                disabled={isAuthenticated}
                name="firstName"
                label={`${t("form_labels.first_name")}*`}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={registerItem.values.firstName}
                onChange={handleChangeRegData}
                onBlur={onBlurHandler("firstName")}
                {...errorRegister("firstName")}
              />
              <TextField
                style={{ width: "100%", margin: "8px 0 8px 8px" }}
                disabled={isAuthenticated}
                name="lastName"
                label={`${t("form_labels.last_name")}*`}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={registerItem.values.lastName}
                onChange={handleChangeRegData}
                onBlur={onBlurHandler("lastName")}
                {...errorRegister("lastName")}
              />
            </div>
            <div className={classes.formRow}>
              <TextField
                style={{ width: "100%", margin: "8px 8px 8px 0" }}
                disabled={isAuthenticated}
                name="email"
                label={`${t("form_labels.email")}*`}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={registerItem.values.email}
                onChange={handleChangeRegData}
                onBlur={onBlurHandler("email")}
                {...errorRegister("email")}
              />
              <TextField
                style={{ width: "100%", margin: "8px 0 8px 8px" }}
                disabled={isAuthenticated}
                name="company"
                label={`${t("form_labels.company_name")}`}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={registerItem.values.company}
                onChange={handleChangeRegData}
                onBlur={onBlurHandler("company")}
                {...errorRegister("company")}
              />
            </div>
            <div className={classes.formRow}>
              <TextField
                disabled={isAuthenticated}
                variant="outlined"
                name="country"
                size="small"
                label={t("form_labels.delivery_to")}
                value={registerItem.values.country}
                onChange={handleChangeRegData}
                onBlur={onBlurHandler("country")}
                select
                style={{ textAlign: "start", width: "100%", margin: "8px 0" }}
              >
                {countries.map((i) => (
                  <MenuItem className={appTheme.selectMenuItem} key={i.url} value={i.url}>
                    {i.printable_name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Box display="flex" flexDirection="column" ml={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="receive_updates_confirm"
                    className={appTheme.checkbox}
                    checked={registerItem.values.receive_updates_confirm || false}
                    onChange={handleChangeRegData}
                  />
                }
                label={<>{t("feedback.form.receive_updates_confirm")}</>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="policy_confirm"
                    className={appTheme.checkbox}
                    checked={registerItem.values.policy_confirm}
                    onChange={handleChangeRegData}
                  />
                }
                label={
                  <>
                    {t("feedback.form.policy_agree")}
                    <Link className={appTheme.hyperlink} href={"/terms_of_services"} target="_blank">
                      {t("feedback.form.terms_of_services")}
                    </Link>
                    {t("feedback.form.and")}
                    <Link className={appTheme.hyperlink} href={"/privacy_policy"} target="_blank">
                      {t("feedback.form.privacy_policy")}
                    </Link>{" "}
                    *
                  </>
                }
              />
              {registerItem.touched.policy_confirm &&
                !!registerItem.errors.policy_confirm &&
                registerItem.errors.policy_confirm[0] && (
                  <FormHelperText error>{registerItem.errors.policy_confirm[0]}</FormHelperText>
                )}
            </Box>

            <div className={classes.registerButtons}>
              <Button variant="contained" className={appTheme.buttonPrimary} onClick={onCloseRegister}>
                {t("common.close")}
              </Button>
              <Button
                variant="contained"
                className={appTheme.buttonCreate}
                onClick={handleSubmitUnAuth}
                disabled={!registerItem.isValid}
              >
                {t("common.rfq_submit")}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default PcbRequest;
