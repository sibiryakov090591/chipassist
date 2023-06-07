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

  let pageSize = useAppSelector((state) => state.search.pageSize);
  pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || pageSize, false);

  const [randomPartNumber, setRandomPartNumber] = useState("MAX32");

  useEffect(() => {
    const randVal = getRandomInt(partNumbers.length);
    const partNumber = partNumbers[randVal];
    setRandomPartNumber(partNumber);
  }, []);

  const onTryHandler = () => {
    const val = randomPartNumber;
    dispatch(saveSearchQueryAction(val));
    dispatch(setQueryValue(val));
    onTryClickAction(navigate, val, 1, pageSize, dispatch);
  };

  return (
    <Box visibility={!checkIsAuthenticated() && constants.closedRegistration ? "hidden" : "visible"}>
      <p className={textClassName}>
        {t("try_search")}
        <span onClick={onTryHandler} className={pnClassName}>
          {randomPartNumber}
        </span>
      </p>
    </Box>
  );
};

export default TrySearchPn;