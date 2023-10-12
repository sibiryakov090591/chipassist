import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAppDispatch from "@src/hooks/useAppDispatch";
import constants from "@src/constants/constants";
import Box from "@material-ui/core/Box";
import ProductCard from "@src/components/ProductCard/ProductCard";
import { loadSearchResultsActionThunk } from "@src/store/search/searchActions";
import Paginate from "@src/components/Paginate";
import { setUrlWithFilters } from "@src/utils/setUrl";
import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import ProductNavBar from "@src/components/ProductNavBar/ProductNavBar";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ELFARO } from "@src/constants/server_constants";
import Skeletons from "../../../Search/components/Skeleton/Skeleton";

export const ProductsSegment = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  transition: all 0.3s;
`;

const Products = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoriesId = parseInt(props.categoriesId);

  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);
  const isLoadingProductResultsInProgress = useAppSelector((state) => state.search.isLoadingProductResultsInProgress);
  const isExtendedSearchStarted = useAppSelector((state) => state.search.isExtendedSearchStarted);
  const reloadSearchFlag = useAppSelector((state) => state.search.reloadSearchFlag);
  const products = useAppSelector((state) => state.products.products);
  const count = useAppSelector((state) => state.search.count);
  const totalPages = useAppSelector((state) => state.search.totalPages);
  const currentPage = useAppSelector((state) => state.search.currentPage);

  const page = useURLSearchParams("page", false, 1, false);
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem("mainShowBy") || _pageSize, false);
  const orderBy = useURLSearchParams(
    "order_by",
    false,
    localStorage.getItem("mainOrderBy") || orderByValues[0].value,
    false,
  );
  const filtersValues = useURLSearchParams("filters_values", true, {}, true);
  const baseFilters = useURLSearchParams("base_filters", true, null, true);
  filtersValues.base_num_in_stock = localStorage.getItem("productStock") === "false" ? "" : 1;

  const onPageChangeHandle = (data) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setUrlWithFilters(
      window.location.pathname,
      navigate,
      "",
      data.selected + 1,
      pageSize,
      orderBy,
      filtersValues,
      baseFilters,
    );
  };

  const onChangePageSize = (value) => {
    setUrlWithFilters(window.location.pathname, navigate, "", 1, value, orderBy, filtersValues, baseFilters);
  };

  const onOrderChange = (value) => {
    localStorage.setItem("mainOrderBy", value);

    setUrlWithFilters(window.location.pathname, navigate, "", page, pageSize, value, filtersValues, baseFilters);
  };

  useEffect(() => {
    const base = { ...baseFilters };

    if (categoriesId) {
      base.base_category_ids = [categoriesId];
    } else if (base.base_category_ids) base.base_category_ids = [];
    dispatch(
      loadSearchResultsActionThunk(
        "",
        page,
        pageSize,
        orderBy,
        filtersValues,
        Object.keys(base).length ? base : null,
        null,
        "products",
      ),
    );
  }, [location.search, reloadSearchFlag, categoriesId]);

  return (
    <div>
      <ProductNavBar
        page={page}
        orderBy={orderBy}
        onOrderChange={onOrderChange}
        onChangePageSize={onChangePageSize}
        isDisable={isLoadingProductResultsInProgress || isExtendedSearchStarted}
      />
      <ProductsSegment dataAttr={3}>
        {isLoadingProductResultsInProgress ? (
          <Skeletons />
        ) : (
          <React.Fragment>
            {products.map((product) => {
              return (
                <ProductCard
                  key={constants.id !== ID_ELFARO ? product.id : product.stockrecords[0]?.id}
                  product={product}
                />
              );
            })}
          </React.Fragment>
        )}
      </ProductsSegment>
      {!isLoadingProductResultsInProgress && count > 0 && (
        <Box mt="2em" display="flex" justifyContent="center">
          <Paginate pageCount={totalPages} activePage={currentPage} onPageChange={onPageChangeHandle} />
        </Box>
      )}
    </div>
  );
};

export default Products;
