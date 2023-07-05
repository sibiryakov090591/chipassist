import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { clearChat, getChatList, getFilters, onChangeFiltersValues } from "@src/store/chat/chatActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import CloseIcon from "@material-ui/icons/Close";
import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { useStyles } from "./styles";

interface Values {
  upc: string;
  partner: number;
}

const Filters: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;
  const partnerLabel = isSupplierResponse ? "User" : "Seller";

  const filters = useAppSelector((state) => state.chat.filters);
  const isLoading = useAppSelector((state) => state.chat.chatList.isLoading);

  const [values, setValues] = useState<Values>({
    upc: null,
    partner: null,
  });

  useEffect(() => {
    dispatch(getFilters());
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<{ name?: string; value: any }>) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const newFilters: any = { ...prev, [name]: value };
      onSubmitHandler(newFilters);
      return newFilters;
    });
  };

  const onClearHandler = (name: string) => () => {
    setValues((prev) => {
      const newFilters: any = { ...prev, [name]: null };
      onSubmitHandler(newFilters);
      return newFilters;
    });
  };

  const onSubmitHandler = (newFilters: any) => {
    const isChanged = Object.entries(newFilters).some(([key, val]) => val !== values[key as keyof Values]);
    if (!isLoading && isChanged) {
      dispatch(clearChat());
      dispatch(getChatList(1, newFilters)).then(() => {
        // was values for submit button
        dispatch(onChangeFiltersValues(newFilters)); // was values for submit button
        // if (res.results?.length) dispatch(selectChat(res.results[0]));
      });
    }
  };

  return (
    <>
      {filters && (
        <Box display="flex" gridGap="8px">
          <FormControl classes={{ root: classes.root }} variant="outlined" size="small" className={classes.select}>
            <InputLabel id="chat-filters-upc-label">Part number</InputLabel>
            <Select
              labelId="chat-filters-upc-label"
              label="Part number"
              IconComponent={ExpandMoreRoundedIcon}
              name="upc"
              value={values.upc || ""}
              onChange={onChangeHandler}
            >
              {filters.upc_list?.map((upc) => {
                return (
                  <MenuItem key={upc} value={upc}>
                    {upc}
                  </MenuItem>
                );
              })}
            </Select>
            {values.upc && (
              <span className={classes.clearBtn} onClick={onClearHandler("upc")}>
                <CloseIcon />
              </span>
            )}
          </FormControl>
          <FormControl classes={{ root: classes.root }} variant="outlined" size="small" className={classes.select}>
            <InputLabel id="chat-filters-partner-label">{partnerLabel}</InputLabel>
            <Select
              labelId="chat-filters-partner-label"
              label={partnerLabel}
              IconComponent={ExpandMoreRoundedIcon}
              name="partner"
              value={values.partner || ""}
              onChange={onChangeHandler}
            >
              {filters.partners_list?.map((partner) => {
                return (
                  <MenuItem key={partner.id} value={partner.id}>
                    {isSupplierResponse
                      ? `${partner.first_name}${partner.last_name ? ` ${partner.last_name}` : ""}${
                          partner.company ? ` (${partner.company})` : ""
                        }`
                      : partner.first_name}
                  </MenuItem>
                );
              })}
            </Select>
            {values.partner && (
              <span className={classes.clearBtn} onClick={onClearHandler("partner")}>
                <CloseIcon />
              </span>
            )}
          </FormControl>
          {/* <Button className={classes.button} variant="outlined" size="small" onClick={onSubmitHandler}> */}
          {/*  <SearchIcon /> */}
          {/* </Button> */}
        </Box>
      )}
    </>
  );
};

export default Filters;
