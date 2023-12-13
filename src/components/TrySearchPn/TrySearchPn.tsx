import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/material.css";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import checkIsAuthenticated from "@src/utils/auth";
import constants from "@src/constants/constants";
import { Box } from "@material-ui/core";
import { onTryClickAction, saveSearchQueryAction, setQueryValue } from "@src/store/search/searchActions";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface Props {
  textClassName: string;
  pnClassName: string;
  partNumbers: string[];
}

// Generate random value for try search
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const TrySearchPn: React.FC<Props> = ({ textClassName, pnClassName, partNumbers }) => {
  const { t } = useI18n("menu");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const reloadSearchFlag = useAppSelector((state) => state.search.reloadSearchFlag);
  let pageSize = useAppSelector((state) => state.search.pageSize);
  pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || pageSize, false);
  const [partNumbersArray, setPartNumbersArray] = useState([]);
  const [randomPartNumber, setRandomPartNumber] = useState("");

  useEffect(() => {
    setPartNumbersArray(partNumbers || []);
  }, [partNumbers]);

  useEffect(() => {
    const randVal = getRandomInt(partNumbersArray.length);
    const partNumber = partNumbersArray[randVal];
    if (partNumber) setRandomPartNumber(partNumber);
  }, [partNumbersArray]);

  useEffect(() => {
    if (partNumbersArray && partNumbersArray.length < 2) {
      setPartNumbersArray(partNumbers);
    }
  }, [reloadSearchFlag]);

  const onTryHandler = () => {
    const val = randomPartNumber;
    dispatch(saveSearchQueryAction(val));
    dispatch(setQueryValue(val));
    onTryClickAction(navigate, val, 1, pageSize, dispatch);
    if (partNumbers?.length > 2) setPartNumbersArray((prevState) => prevState.filter((el) => el !== randomPartNumber));
  };

  return (
    <Box visibility={!checkIsAuthenticated() && constants.closedRegistration ? "hidden" : "visible"}>
      <p className={textClassName}>
        {isSmDown ? t("try_search_mobile") : t("try_search")}
        <span onClick={onTryHandler} className={pnClassName}>
          {randomPartNumber}
        </span>
      </p>
    </Box>
  );
};

export default TrySearchPn;
