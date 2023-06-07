import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getChatList, getFilters, selectChat, onChangeFiltersValues } from "@src/store/chat/chatActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import { useStyles } from "./styles";

interface Values {
  upc: string;
  partner: number;
}

const Filters: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

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
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onClearHandler = (name: string) => () => {
    setValues((prev) => ({ ...prev, [name]: null }));
  };

  const onSubmitHandler = () => {
    const isChanged = Object.entries(filters.values).some(([key, val]) => val !== values[key as keyof Values]);
    if (!isLoading && isChanged) {
      dispatch(getChatList(1, values)).then((res: any) => {
        dispatch(onChangeFiltersValues(values));
        if (res.results?.length) dispatch(selectChat(res.results[0]));
      });
    }
  };

  return (
    <>
      {filters && (
        <Box display="flex" gridGap="8px" mt="8px">
          <FormControl variant="outlined" size="small" className={classes.select}>
            <InputLabel id="chat-filters-upc-label">Part number</InputLabel>
            <Select
              labelId="chat-filters-upc-label"
              label="Part number"
              IconComponent={values.upc ? BackspaceOutlinedIcon : ExpandMoreRoundedIcon}
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
            {values.upc && <span className={classes.clearBtn} onClick={onClearHandler("upc")} />}
          </FormControl>
          <FormControl variant="outlined" size="small" className={classes.select}>
            <InputLabel id="chat-filters-partner-label">Seller</InputLabel>
            <Select
              labelId="chat-filters-partner-label"
              label="Seller"
              IconComponent={values.partner ? BackspaceOutlinedIcon : ExpandMoreRoundedIcon}
              name="partner"
              value={values.partner || ""}
              onChange={onChangeHandler}
            >
              <MenuItem value="All">All</MenuItem>
              {filters.partners_list?.map((partner) => {
                return (
                  <MenuItem key={partner.id} value={partner.id}>
                    {partner.name}
                  </MenuItem>
                );
              })}
            </Select>
            {values.partner && <span className={classes.clearBtn} onClick={onClearHandler("partner")} />}
          </FormControl>
          <Button className={classes.button} variant="outlined" size="small" onClick={onSubmitHandler}>
            <SearchIcon />
          </Button>
        </Box>
      )}
    </>
  );
};

export default Filters;