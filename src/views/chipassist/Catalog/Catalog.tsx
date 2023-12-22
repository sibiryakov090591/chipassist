import React, { useEffect } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import Preloader from "@src/components/Preloader/Preloader";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getCatalog } from "@src/store/catalog/catalogActions";
import { useStyles } from "./styles";

const Catalog: React.FC = () => {
  const { t } = useI18n("catalog");
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const catalog = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!catalog.loaded && !catalog.loading) dispatch(getCatalog());
  }, []);

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Container maxWidth="xl">
        <div className={classes.titleWrapper}>
          <h1 className={classes.title}>{t("title")}</h1>
          <h2 className={classes.subTitle}>{t("sub_title")}</h2>
        </div>
        <h3 className={classes.catalogTitle}>{t("common.catalog")}:</h3>
        {!catalog.loaded && (
          <div className={classes.preloader}>
            <Preloader title={t("categories_loading")} />
          </div>
        )}
        {catalog.loaded && !!catalog.normalizeData.length && (
          <div className={classes.categoriesWrapper}>
            {catalog.normalizeData.map((category: any) => {
              return (
                <div key={uuidv4()} className={classes.categoryWrapper}>
                  <NavLink to={`/parts/${category.url}`} className={clsx(classes.categoryLink, classes.depth1Name)}>
                    {category.name}
                  </NavLink>
                  {!!category.children.length && (
                    <div className={classes.depth2Wrapper}>
                      {category.children.map((depth_2: any) => {
                        return (
                          <div key={uuidv4()}>
                            <NavLink
                              to={`/parts/${depth_2.url}`}
                              className={clsx({
                                [classes.categoryLink]: true,
                                [classes.depth2Name]: true,
                                [classes.underline]: false,
                              })}
                            >
                              {depth_2.name}
                            </NavLink>
                            {!!depth_2.children.length && (
                              <div className={classes.depth3Wrapper}>
                                {depth_2.children.map((depth_3: any) => {
                                  return (
                                    <div key={uuidv4()}>
                                      <NavLink
                                        to={`/parts/${depth_3.url}`}
                                        className={clsx(classes.categoryLink, classes.depth3Name)}
                                      >
                                        {depth_3.name}
                                      </NavLink>
                                      {!!depth_3.children.length && (
                                        <div className={classes.depth4Wrapper}>
                                          {depth_3.children.map((depth_4: any) => {
                                            return (
                                              <div key={uuidv4()}>
                                                <NavLink
                                                  to={`/parts/${depth_4.url}`}
                                                  className={clsx(classes.categoryLink, classes.depth4Name)}
                                                >
                                                  {depth_4.name}
                                                </NavLink>
                                                {!!depth_4.children.length && (
                                                  <div className={classes.depth5Wrapper}>
                                                    {depth_4.children.map((depth_5: any) => {
                                                      return (
                                                        <div key={uuidv4()}>
                                                          <NavLink
                                                            to={`/parts/${depth_5.url}`}
                                                            className={clsx(classes.categoryLink, classes.depth5Name)}
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
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Catalog;
