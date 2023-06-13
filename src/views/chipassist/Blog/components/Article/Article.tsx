import React, { useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import Container from "@material-ui/core/Container";
import { Page } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getArticle, getBlogList } from "@src/store/blog/blogActions";
import clsx from "clsx";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { useStyles } from "./styles";
import { useStyles as useBlogStyles } from "../../styles";

const Article: React.FC = () => {
  const classes = useStyles();
  const blogClasses = useBlogStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down(720));

  const { selected, isLoading, list, filters } = useAppSelector((state) => state.blog);
  const articleId = useURLSearchParams("article", false, null, false);

  useEffect(() => {
    if (!list.page) dispatch(getBlogList(1, filters));
  }, []);

  useEffect(() => {
    if (articleId) dispatch(getArticle(+articleId));
    window.scrollTo({ top: 0 });
  }, [articleId]);

  const isDisabledNext = isLoading || !selected || !selected.next || selected.next.id === +articleId;
  const isDisabledPrevious = isLoading || !selected || !selected.previous || selected.previous.id === +articleId;

  const previousLink =
    selected && `/blog/${selected.previous.title.toLowerCase().split(" ").join("-")}/?article=${selected.previous.id}`;
  const nextLink =
    selected && `/blog/${selected.next.title.toLowerCase().split(" ").join("-")}/?article=${selected.next.id}`;

  return (
    <Page title="Article" description={`${selected?.intro}`}>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            {isLoading && <Preloader title="Article is loading..." />}
            {!isLoading && !selected && (
              <Box display="flex" justifyContent="center" p="32px 0">
                <h5>The article does not exist</h5>
              </Box>
            )}
            {!isLoading && selected && (
              <>
                <h1>{selected.title}</h1>
                <div className={classes.intro}>
                  <p dangerouslySetInnerHTML={{ __html: selected.intro }} />
                </div>
                <p dangerouslySetInnerHTML={{ __html: selected.body }} />
                <Box display="flex" mb="12px">
                  <span className={blogClasses.date}>{new Date(selected.date).toDateString()}</span>
                </Box>
              </>
            )}
          </div>
          <Box className={classes.pagination}>
            <Link
              className={clsx(classes.paginationLink, { disabled: isDisabledPrevious })}
              to={!isDisabledPrevious && previousLink}
            >
              {selected?.previous?.title}
            </Link>
            <Link className={classes.paginationLink} to={`/blog`}>
              Return to blog
            </Link>
            <Link
              className={clsx(classes.paginationLink, { disabled: isDisabledNext })}
              to={!isDisabledNext && nextLink}
            >
              {selected?.next?.title}
            </Link>
          </Box>
        </div>
        {!isSmDown && !!list.results.length && (
          <div className={classes.list}>
            {list.results.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={`/blog/${item.linkName}?article=${item.id}`}
                  className={clsx(classes.listItem, { active: item.linkName === selected.linkName })}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Article;
