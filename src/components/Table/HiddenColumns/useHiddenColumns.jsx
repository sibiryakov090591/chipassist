import React, { useState } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./useHiddenColumnsStyle";

function useHiddenColumns(storageKey, hiddenDefault, translateSection) {
  let localState = {};
  try {
    localState = JSON.parse(localStorage.getItem(storageKey));
  } catch (e) {
    localState = {};
  }

  const defaultState = localStorage.getItem(storageKey) ? localState : hiddenDefault;

  const [hiddenColumns, setHiddenColumns] = useState(defaultState || {});
  const appTheme = useAppTheme();
  const classes = useStyles();
  const { t } = useI18n(translateSection);

  const onShowColumn = (key) => {
    setHiddenColumns((prevState) => {
      const newState = { ...prevState };
      delete newState[key];
      return newState;
    });
    const save = hiddenColumns;
    delete save[key];
    localStorage.setItem(storageKey, JSON.stringify(save));
  };

  const onHideColumn = (key, event) => {
    event.stopPropagation();

    setHiddenColumns((prevState) => ({ ...prevState, [key]: true }));
    const save = hiddenColumns;
    save[key] = true;
    localStorage.setItem(storageKey, JSON.stringify(save));
  };

  const RenderAddColumnBar = () => {
    const columns = hiddenColumns && !!Object.keys(hiddenColumns).length && (
      <div className={classes.hiddenColumnsList}>
        <span>{t("component.hidden_column.add_column")}:</span>
        <TextField
          type="text"
          name="pcbtype"
          variant="outlined"
          label={t("component.hidden_column.choose_column")}
          size="small"
          value=""
          select
          onClick={(val) => onShowColumn(val.target.value)}
          style={{ width: "21ch" }}
        >
          {Object.keys(hiddenColumns)
            .sort()
            .map((key) => {
              return (
                <MenuItem className={appTheme.selectMenuItem} key={key} value={key}>
                  {t(key)}
                </MenuItem>
              );
            })}
        </TextField>
      </div>
    );

    return <React.Fragment>{columns}</React.Fragment>;
  };

  const RenderHideLabel = {
    Container: function HideContainer({ children }) {
      return <span className={classes.hideColumnWrap}>{children}</span>;
    },
    Button: function HideButton({ label }) {
      return (
        <button
          className={classes.hideColumn}
          title={t("component.hidden_column.hide_column")}
          onClick={(e) => onHideColumn(label, e)}
        />
      );
    },
  };

  return { hiddenColumns, onShowColumn, onHideColumn, RenderAddColumnBar, RenderHideLabel };
}

export default useHiddenColumns;
