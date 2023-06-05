import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { batch } from "react-redux";
import useAppTheme from "@src/theme/useAppTheme";
import { DropdownIndicator } from "@src/components/FiltersSelect/components";
import { loadOrdersThunk, saveFilterStatus } from "@src/store/orders/ordersActions";
// import { statuses } from "@src/store/orders/orders";
import clsx from "clsx";
import Dropdown from "@src/components/FiltersSelect/dropdown";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { selectStyles, useStyles } from "./styles";

function OrderStatus(props) {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isOrdersLoading = useAppSelector((state) => state.orders.ordersLoading);
  const { pageSize, statuses, selectedStatus } = props;

  const escHandler = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, [escHandler]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSelectChange = (value) => {
    toggleOpen();
    if (!isOrdersLoading) {
      batch(() => {
        dispatch(saveFilterStatus(value.value));
        dispatch(loadOrdersThunk(1, pageSize, value.value));
      });
    }
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      setIsOpen={setIsOpen}
      target={
        <Button className={clsx(classes.button, appTheme.dropdownMenu)} onClick={toggleOpen}>
          <span className={classes.buttonText}>{selectedStatus.label}</span>
          <i className={classes.buttonArrow}></i>
        </Button>
      }
    >
      <Select
        autoFocus
        backspaceRemovesValue={false}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen
        onChange={onSelectChange}
        options={statuses}
        placeholder="Search..."
        styles={selectStyles}
        tabSelectsValue={false}
      />
    </Dropdown>
  );
}

export default OrderStatus;
