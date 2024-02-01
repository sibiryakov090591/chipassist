import React, { useEffect } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import Preloader from "@src/components/Preloader/Preloader";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import { useStyles } from "./styles";

const Brands: React.FC = () => {
  const { t } = useI18n("brands");
  const classes = useStyles();
  const { name } = useParams();

  const { groups, loaded } = useAppSelector((state) => state.manufacturers);

  useEffect(() => {
    if (groups && name) {
      const element = document.getElementById(`${name.toLowerCase()}`);
      if (element && window.pageYOffset === 0) {
        const elementRect = element.getBoundingClientRect();
        const middlePosition = elementRect.top + elementRect.height / 2;
        setTimeout(() => {
          window.scrollTo({
            top: middlePosition - window.innerHeight / 2,
            behavior: "smooth",
          });
        }, 600);
      }
    }
  }, [name, groups]);

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
                            id={`${item.name.toLowerCase()}`}
                            key={item.id}
                            to={`/search?query=${encodeURIComponent(`MANUFACTURER:${item.name}`)}`}
                            className={clsx(classes.link, {
                              [classes.highlight]: !!name && item.name.toLowerCase() === name.toLowerCase(),
                            })}
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
