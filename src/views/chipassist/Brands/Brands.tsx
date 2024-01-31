import React, { useEffect, useState } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import { Items } from "@src/store/manufacturers/manufacturersTypes";
import Preloader from "@src/components/Preloader/Preloader";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

const Brands: React.FC = () => {
  const { t } = useI18n("brands");
  const classes = useStyles();

  const { items, loaded } = useAppSelector((state) => state.manufacturers);

  const [normalizedData, setNormalizedData] = useState<{ [key: string]: Items[] }>(null);

  useEffect(() => {
    if (loaded) {
      const data: { [key: string]: Items[] } = {};
      if (items?.length) {
        items.sort().forEach((item) => {
          const key = item?.name?.charAt(0)?.toUpperCase();
          if (data[key]) {
            data[key].push(item);
          } else {
            data[key] = [item];
          }
        });
      }
      setNormalizedData(data);
    }
  }, [loaded]);

  return (
    <noindex>
      <Page title={t("page_title")} description={t("page_description")}>
        <Container maxWidth="xl">
          <h1 className={classes.title}>{t("title")}</h1>
          {!normalizedData && (
            <div className={classes.preloader}>
              <Preloader title={t("loading")} />
            </div>
          )}
          {normalizedData && !Object.keys(normalizedData).length && (
            <h3 className={classes.emptyMessage}>{t("empty_message")}</h3>
          )}
          {normalizedData && !!Object.keys(normalizedData).length && (
            <div>
              {Object.entries(normalizedData).map(([key, group]) => {
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
                            to={`/search?query=${encodeURIComponent(`MANUFACTURER:${item.name}`)}`}
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
