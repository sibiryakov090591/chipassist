import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import Preloader from "@src/components/Preloader/Preloader";
import { v4 as uuidv4 } from "uuid";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getCatalogCategoriesThunk, getCatalogProducts } from "@src/store/categories/categoriesActions";
import { Paginate } from "@src/components";
import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import setUrl from "@src/utils/setUrl";
import useAppSelector from "@src/hooks/useAppSelector";
import { findCategory } from "@src/utils/catalog";
import { useStyles } from "./styles";

const CatalogResults: React.FC = () => {
  const { t } = useI18n("catalog");
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const page = useURLSearchParams("page", false, null, false) || 1;
  const matchResult = window.location.pathname?.match(/parts\/(.*)/);
  const catalogUrl = matchResult && matchResult[1];
  const titleRef = useRef(null);

  const normalizeData = useAppSelector((state) => state.categories.catalog.normalizeData);

  const [products, setProducts] = useState(null);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (normalizeData.length) {
      const cat = findCategory(catalogUrl, normalizeData);
      setCategory(cat || false);
      setIsCategoryLoading(false);
    } else {
      dispatch(getCatalogCategoriesThunk());
    }
  }, [catalogUrl, normalizeData]);

  useEffect(() => {
    if (category) {
      setIsProductsLoading(true);
      dispatch(getCatalogProducts(category.id, page))
        .then((res: any) => {
          setProducts(res);
          setIsProductsLoading(false);
        })
        .catch(() => {
          setProducts(false);
          setIsProductsLoading(false);
        });
    }
  }, [category]);

  const onPageChangeHandle = (data: any) => {
    if (!isProductsLoading) {
      if (titleRef.current) {
        titleRef.current.scrollIntoView({ block: "start" });
      }
      setIsProductsLoading(true);
      setUrl(navigate, `/parts/${category.url}`, data.selected + 1);
      dispatch(getCatalogProducts(category.id, data.selected + 1))
        .then((res: any) => {
          setProducts(res);
          setIsProductsLoading(false);
        })
        .catch(() => {
          setProducts(false);
          setIsProductsLoading(false);
        });
    }
  };

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Container maxWidth="xl">
        {isCategoryLoading && (
          <div className={classes.preloader}>
            <Preloader title={t("results_loading")} />
          </div>
        )}
        {!isCategoryLoading && !category && (
          <div className={classes.categoryNotFound}>
            <h2 className={classes.notFound}>{t("not_found")}</h2>
          </div>
        )}
        {!isCategoryLoading && category && (
          <div className={classes.wrapper}>
            <div>
              <span>
                <NavLink className={classes.link} to="/parts">
                  {t("common.catalog")}
                </NavLink>
                {" > "}
              </span>
              {category && (
                <>
                  {category.breadcrumbs.map((crumb: any) => {
                    return (
                      <span key={uuidv4()}>
                        <NavLink className={classes.link} to={`/parts/${crumb?.url}`}>
                          {crumb?.name}
                        </NavLink>
                        {" > "}
                      </span>
                    );
                  })}
                  <span className={classes.disabledLink}>{category.name}</span>

                  {category.children && !!category.children.length && (
                    <div>
                      <div className={classes.categoryWrapper}>
                        <div className={classes.categoryTitle}>{category.name}</div>

                        <div className={classes.depth2Wrapper}>
                          {category.children.map((depth_2: any) => {
                            return (
                              <div key={uuidv4()}>
                                <NavLink className={classes.categoryLink} to={`/parts/${depth_2.url}`}>
                                  {depth_2.name}
                                </NavLink>
                                {depth_2.children && !!depth_2.children.length && (
                                  <div className={classes.depth3Wrapper}>
                                    {depth_2.children.map((depth_3: any) => {
                                      return (
                                        <div key={uuidv4()}>
                                          <NavLink className={classes.categoryLink} to={`/parts/${depth_3.url}`}>
                                            {depth_3.name}
                                          </NavLink>
                                          {depth_3.children && !!depth_3.children.length && (
                                            <div className={classes.depth3Wrapper}>
                                              {depth_3.children.map((depth_4: any) => {
                                                return (
                                                  <div key={uuidv4()}>
                                                    <NavLink
                                                      className={classes.categoryLink}
                                                      to={`/parts/${depth_4.url}`}
                                                    >
                                                      {depth_4.name}
                                                    </NavLink>
                                                    {depth_4.children && !!depth_4.children.length && (
                                                      <div className={classes.depth3Wrapper}>
                                                        {depth_4.children.map((depth_5: any) => {
                                                          return (
                                                            <div key={uuidv4()}>
                                                              <NavLink
                                                                className={classes.categoryLink}
                                                                to={`/parts/${depth_5.url}`}
                                                              >
                                                                {depth_5.name}
                                                              </NavLink>
                                                            </div>
                                                          );
                                                        })}
                                                      </div>
                                                    )}
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {isProductsLoading && (
              <div className={classes.preloader}>
                <Preloader title={t("results_loading")} />
              </div>
            )}
            {!isProductsLoading && products && (
              <div className={classes.resultsWrapper}>
                {!!products.results.length && (
                  <>
                    <h1 ref={titleRef}>{category?.name}</h1>
                    <Table>
                      <TableBody className={classes.upcWrapper}>
                        {products.results.map((item: any) => {
                          return (
                            <TableRow key={uuidv4()} className={classes.upc}>
                              <TableCell>
                                <NavLink to={`/search?query=${encodeURIComponent(item.upc)}`}>{item.upc}</NavLink>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </>
                )}
                {products && products.total_pages > 1 && (
                  <Box p={4} display="flex" justifyContent="center">
                    <Paginate pageCount={products.total_pages} activePage={+page} onPageChange={onPageChangeHandle} />
                  </Box>
                )}
              </div>
            )}
          </div>
        )}
      </Container>
    </Page>
  );
};

export default CatalogResults;
