import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import Preloader from "@src/components/Preloader/Preloader";
import { Link } from "react-router-dom";
import { changeManufacturer, setQueryValue } from "@src/store/search/searchActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";

const Brands: React.FC = () => {
  const { t } = useI18n("brands");
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { groups, loaded } = useAppSelector((state) => state.manufacturers);

  const setManufacturer = (item: any) => () => {
    dispatch(changeManufacturer({ id: item.id, name: item.name?.trim() }));
    dispatch(setQueryValue(""));
  };

  return (
    <noindex>
      <Page title={t("page_title")} description={t("page_description")}>
        <Container maxWidth="xl">
          <h1 className={classes.title}>{t("title")}</h1>
          {!loaded && (
            <div className={classes.preloader}>
              <Preloader title={t("loading")} />
            </div>
          )}
          {loaded && !Object.keys(groups).length && <h3 className={classes.emptyMessage}>{t("empty_message")}</h3>}
          {loaded && !!Object.keys(groups).length && (
            <div>
              {Object.entries(groups).map(([key, group]) => {
                return (
                  <div key={key} className={classes.groupWrapper}>
                    <div className={classes.groupLabel}>
                      {key}
                      <span>({group.length || 0})</span>
                    </div>
                    <div className={classes.itemsWrapper}>
                      {group?.map((item) => {
                        return (
                          <Link
                            key={item.id}
                            to={`/search?query=&m_id=${item.id}`}
                            onClick={setManufacturer(item)}
                            className={classes.link}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </Page>
    </noindex>
  );
};

export default Brands;
