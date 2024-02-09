import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import Preloader from "@src/components/Preloader/Preloader";
import { Link } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getAllManufacturers } from "@src/store/manufacturers/manufacturersActions";
import { useStyles } from "./styles";

const Brands: React.FC = () => {
  const { t } = useI18n("brands");
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { groups, loaded } = useAppSelector((state) => state.manufacturers);

  React.useEffect(() => {
    if (!loaded) {
      dispatch(getAllManufacturers());
    }
  }, []);

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
                        const name = item.name?.trim() || "";
                        return (
                          <Link
                            key={item.id}
                            to={`/search?query=${encodeURIComponent(
                              `MANUFACTURER:${name.includes(" ") ? `"${name}"` : name}`,
                            )}`}
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
