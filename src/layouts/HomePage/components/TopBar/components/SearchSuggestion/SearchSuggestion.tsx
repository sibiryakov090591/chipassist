import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import useDebounce from "@src/hooks/useDebounce";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { PATHNAME as search_pathname } from "@src/store/search/searchReducer";
import {
  redirectToSearchPage,
  saveSearchQueryAction,
  toggleReloadSearchFlag,
  setQueryValue,
} from "@src/store/search/searchActions";
import { onSuggestionsClearRequested, onSuggestionsFetchRequested } from "@src/store/suggestions/suggestionsActions";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Autosuggest from "react-autosuggest";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { batch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import clsx from "clsx";
import { useStyles } from "./searchSuggestionStyles";

interface Props {
  style?: React.StyleHTMLAttributes<HTMLElement>;
  searchInputClass?: string;
  searchButtonClass?: string;
  searchIconClass?: string;
  searchClearClass?: string;
  isHomePageSuggestions?: boolean;
  isHero?: boolean;
}

const SearchSuggestion: React.FC<Props> = ({
  style,
  searchInputClass,
  searchButtonClass,
  searchIconClass,
  searchClearClass,
  isHomePageSuggestions,
  isHero,
}) => {
  const [searchValue, setSearchValue] = useState("");
  // const [value, setValue] = useState("");

  const value = useAppSelector((state) => state.search.queryValue);
  const { suggestions, search } = useAppSelector((state) => state.suggestions);
  let query = useAppSelector((state) => state.search.query);
  query = useURLSearchParams("query", true, query, false);
  let page = useAppSelector((state) => state.search.page);
  page = useURLSearchParams("page", false, page, false);
  let pageSize = useAppSelector((state) => state.search.pageSize);
  pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || pageSize, false);
  const manufacturerId = useAppSelector((state) => state.search.manufacturer?.id);

  const searchRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchValue, 400);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useI18n("menu");
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (debouncedSearchTerm) {
      batch(() => {
        dispatch(onSuggestionsFetchRequested(debouncedSearchTerm));
        dispatch(saveSearchQueryAction(debouncedSearchTerm));
      });
    }
  }, [debouncedSearchTerm]);

  const onEnterFunction = useCallback(
    (event: KeyboardEvent) => {
      console.log(
        `code:${event.keyCode}, 13 = enter, event fired in search input:${
          searchRef.current && searchRef.current.contains(event.target)
        }`,
      );
      if (event.keyCode === 13 && searchRef.current && searchRef.current.contains(event.target)) {
        console.log("ENTER PRESSED value:", value || "EMPTY");
        console.log(query);
        if (value) {
          dispatch(setQueryValue(query));
          setSearchValue(query);
          if (query !== value) {
            redirectToSearchPage(navigate, value, 1, pageSize, manufacturerId);
          } else {
            redirectToSearchPage(navigate, value, 1, pageSize, manufacturerId);
            dispatch(toggleReloadSearchFlag());
          }
        }
        dispatch(onSuggestionsClearRequested());
      }
      // eslint-disable-next-line
    },
    [navigate, value, dispatch, query, page, pageSize, manufacturerId],
  );

  useEffect(() => {
    if (query) {
      dispatch(setQueryValue(query));
      setSearchValue(query);
      dispatch(saveSearchQueryAction(query));
    }
  }, [query, setSearchValue, dispatch]);

  useEffect(() => {
    document.removeEventListener("keydown", onEnterFunction, false);
    document.addEventListener("keydown", onEnterFunction, false);
    return () => {
      document.removeEventListener("keydown", onEnterFunction, false);
    };
  }, [onEnterFunction, debouncedSearchTerm, navigate, setSearchValue, query, page, pageSize, manufacturerId]);

  function onSuggestionSelected(event: any, { suggestionValue }: { suggestionValue: any }) {
    setSearchValue(suggestionValue);
    redirectToSearchPage(navigate, suggestionValue, 1, pageSize);
  }

  const onSuggestionsFetchRequestedHandler = () => {
    // Эта функция подходит для sideeffect например loader while waiting response
    return true;
  };

  const onSuggestionsClearRequestedHandler = () => {
    dispatch(onSuggestionsClearRequested());
  };

  function getSuggestionValue(suggestion: any) {
    return suggestion.name;
  }

  function renderSuggestion(suggestion: any) {
    return <span>{suggestion.name}</span>;
  }

  function onChange(event: any, { newValue, method }: any) {
    const acValue = newValue;
    if (value !== acValue) {
      dispatch(setQueryValue(acValue));
      if (!["up", "down"].includes(method)) setSearchValue(acValue);
    }
    return true;
  }

  const inputProps = {
    placeholder: t("search_placeholder"),
    value,
    onChange,
  };

  const searchClickHandler = () => {
    if (query !== value || location.pathname !== search_pathname) {
      redirectToSearchPage(navigate, value, 1, pageSize, manufacturerId);
    } else {
      redirectToSearchPage(navigate, value, 1, pageSize, manufacturerId);
      dispatch(toggleReloadSearchFlag());
    }
  };

  const clearSearchHandler = () => {
    dispatch(setQueryValue(""));
    // right useRef dont working with Autosuggest, useRef === null with Autosuggest`s renderInputComponent element
    // eslint-disable-next-line no-unused-expressions
    searchRef?.current?.children[0]?.children[0]?.focus();
  };

  const suggestTheme = React.useMemo(() => {
    return {
      input: {
        "&:hover": {
          cursor: "pointer",
        },
      },
      container:
        isHomePageSuggestions && isHero ? "suggestion_search_ICS_home" : isHomePageSuggestions && "suggestion_search",
      suggestionsContainer: isHomePageSuggestions ? "home_page_suggestion_container" : "suggestion_container",
      suggestion: "suggestion_item",
      suggestionHighlighted: "suggestion_highlighted",
    };
  }, [isHero]);

  return (
    <div
      className={clsx("tutorial-search", classes.search, isHero && classes.searchHero)}
      ref={searchRef}
      style={style}
    >
      <Autosuggest
        onSuggestionSelected={onSuggestionSelected}
        theme={suggestTheme as any}
        suggestions={searchValue === search ? suggestions : []}
        onSuggestionsFetchRequested={onSuggestionsFetchRequestedHandler}
        onSuggestionsClearRequested={onSuggestionsClearRequestedHandler}
        getSuggestionValue={getSuggestionValue}
        focusInputOnSuggestionClick={false}
        renderSuggestion={renderSuggestion}
        inputProps={{ ...inputProps, className: searchInputClass }}
      />
      <div id="search-button" className={searchButtonClass} onClick={searchClickHandler}>
        <SearchIcon className={searchIconClass} />
      </div>
      {value && <ClearIcon className={searchClearClass} onClick={clearSearchHandler} />}
    </div>
  );
};

export default SearchSuggestion;
