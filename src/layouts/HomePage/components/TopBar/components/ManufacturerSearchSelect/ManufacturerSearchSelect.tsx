import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import { selectStyles } from "@src/views/chipassist/Orders/components/OrderStatus/styles";
import Dropdown from "@src/components/FiltersSelect/dropdown";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { changeManufacturer } from "@src/store/search/searchActions";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./styles";
import CustomOption from "./CustomOption";

const ManufacturerSearchSelect: React.FC<{ setSelectIsOpen: any }> = ({ setSelectIsOpen }) => {
  const { t } = useI18n("search.manufacturer_select");
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { items, loaded } = useAppSelector((state) => state.manufacturers);
  const { manufacturer } = useAppSelector((state) => state.search);

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    if (loaded) {
      setOptions(items.map((i) => ({ label: i.name, value: i.id })));
    }
  }, [loaded]);

  React.useEffect(() => {
    setSelectIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const escHandler = (event: any) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSelectChange = (item: any) => {
    toggleOpen();
    dispatch(changeManufacturer({ id: item.value, name: item.label }));
  };

  const removeManufacturer = () => {
    setIsOpen(false);
    dispatch(changeManufacturer(null));
  };

  if (!loaded || !items?.length) return null;

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      setIsOpen={setIsOpen}
      style={{ right: 0, width: 280 }}
      target={
        <Box display="flex" alignItems="center" mr="30px">
          <div className={classes.value} onClick={toggleOpen}>
            <span>{manufacturer ? t("selected", { name: manufacturer?.name }) : t("non_selected")}</span>
          </div>
          {!!manufacturer && (
            <div className={classes.removeButton} onClick={removeManufacturer}>
              <CloseIcon />
            </div>
          )}
        </Box>
      }
    >
      <Select
        autoFocus
        backspaceRemovesValue={false}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        components={{ DropdownIndicator: null, IndicatorSeparator: null, Option: CustomOption }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        filterOption={createFilter({ ignoreAccents: false })}
        menuIsOpen
        onChange={onSelectChange}
        options={options}
        placeholder=""
        styles={selectStyles}
        tabSelectsValue={false}
      />
    </Dropdown>
  );
};

export default React.memo(ManufacturerSearchSelect, () => true);
