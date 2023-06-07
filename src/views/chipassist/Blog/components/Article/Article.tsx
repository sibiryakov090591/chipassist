import React, { useEffect } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import Container from "@material-ui/core/Container";
import { Page } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import { Box } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { getArticle } from "@src/store/blog/blogActions";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useStyles as useBlogStyles } from "../../styles";

const Article: React.FC = () => {
  const classes = useStyles();
  const blogClasses = useBlogStyles();
  const dispatch = useAppDispatch();
  const { articleId } = useParams();

  const { selected, isLoading } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (articleId) dispatch(getArticle(+articleId));
    window.scrollTo({ top: 0 });
  }, [articleId]);

  const isDisabledNext = isLoading || !selected || !selected.next || selected.next.id === +articleId;
  const isDisabledPrevious = isLoading || !selected || !selected.previous || selected.previous.id === +articleId;

  return (
    <Page title="Article" description={`${selected?.intro}`}>
      <Box p="2em">
        <Container maxWidth="lg">
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
          <Box display="flex" justifyContent="space-around" p="42px 0 24px 0">
            <Link
              className={clsx(classes.paginationLink, { disabled: isDisabledPrevious })}
              to={!isDisabledPrevious && `/blog/${selected?.previous.id}`}
            >
              {selected?.previous?.title}
            </Link>
            <Link className={classes.paginationLink} to={`/blog`}>
              Return to blog
            </Link>
            <Link
              className={clsx(classes.paginationLink, { disabled: isDisabledNext })}
              to={!isDisabledNext && `/blog/${selected?.next.id}`}
            >
              {selected?.next?.title}
            </Link>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default Article;
