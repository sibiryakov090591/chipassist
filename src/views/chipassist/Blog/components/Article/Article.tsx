import React, { useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import Container from "@material-ui/core/Container";
import { Page } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getArticle, getBlogList } from "@src/store/blog/blogActions";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useStyles as useBlogStyles } from "../../styles";

const Article: React.FC = () => {
  const classes = useStyles();
  const blogClasses = useBlogStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down(720));

  const { selected, isLoading, list, filters } = useAppSelector((state) => state.blog);
  const { slug } = useParams();

  useEffect(() => {
    if (!list.page) dispatch(getBlogList(1, filters));
  }, []);

  useEffect(() => {
    dispatch(getArticle(slug));
    window.scrollTo({ top: 0 });
  }, [slug]);

  const isDisabledNext = isLoading || !selected || !selected.next || selected.next.title === selected.title;
  const isDisabledPrevious = isLoading || !selected || !selected.previous || selected.previous.title === selected.title;

  const previousLink = selected?.previous && `/blog/${selected.previous.slug}`;
  const nextLink = selected?.next && `/blog/${selected.next.slug}`;

  return (
    <Page title="Article" description={`${selected?.intro}`}>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            {isLoading && <Preloader title="Article is loading..." />}
            {!isLoading && !selected?.id && (
              <Box display="flex" justifyContent="center" p="32px 0">
                <h5>The article does not exist</h5>
              </Box>
            )}
            {!isLoading && !!selected?.id && (
              <>
                <h1 className={classes.title}>{selected.title}</h1>
                <p className={classes.paragraph} dangerouslySetInnerHTML={{ __html: selected.body }} />
                <Box display="flex" mb="12px">
                  <span className={blogClasses.date}>{new Date(selected.date).toDateString()}</span>
                </Box>
              </>
            )}
          </div>
          <Box className={classes.pagination}>
            {!!selected?.previous?.title && (
              <Link
                className={clsx(classes.paginationLink, { disabled: isDisabledPrevious })}
                to={!isDisabledPrevious && previousLink}
              >
                {selected.previous.title}
              </Link>
            )}
            <Link className={classes.paginationLink} to={`/blog`}>
              Return to blog
            </Link>
            {!!selected?.next?.title && (
              <Link
                className={clsx(classes.paginationLink, { disabled: isDisabledNext })}
                to={!isDisabledNext && nextLink}
              >
                {selected.next.title}
              </Link>
            )}
          </Box>
        </div>
        {!isSmDown && !!list.results.length && (
          <div className={classes.list}>
            {list.results.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className={clsx(classes.listItem, { active: item.slug === selected?.slug })}
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
