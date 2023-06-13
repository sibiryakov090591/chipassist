import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getBlogList, onChangeFiltersValues } from "@src/store/blog/blogActions";
import useAppSelector from "@src/hooks/useAppSelector";
import Container from "@material-ui/core/Container";
import { Page } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import { Box, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import useAppTheme from "@src/theme/useAppTheme";
import InfiniteScroll from "react-infinite-scroller";
import { clsx } from "clsx";
import FallbackImage from "@src/components/FallbackImage/FallbackImage";
import placeholderImg from "@src/images/no-article-image.png";
import { useStyles } from "./styles";

const Blog: React.FC = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const { isLoading, list, filters } = useAppSelector((state) => state.blog);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // first loading
    if (!list.page) dispatch(getBlogList(1, filters));
    if (filters.search) setSearchValue(filters.search);
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSearchHandler = () => {
    if (filters.search !== searchValue) {
      dispatch(onChangeFiltersValues({ search: searchValue }));
      dispatch(getBlogList(1, { search: searchValue }));
    }
  };

  const onScrollLoading = () => {
    if (!isLoading && list.total_pages > list.page) {
      dispatch(getBlogList(list.page + 1, filters, true));
    }
  };

  const onEnterHandler = (event: any) => {
    if (event.keyCode === 13) {
      onSearchHandler();
    }
  };

  return (
    <Page title="Blog" description="Articles about ChipAssist">
      <Container maxWidth="lg">
        <div className={classes.header}>
          <h1>ChipAssist News</h1>
          <TextField
            className={classes.searchInput}
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: <SearchIcon onClick={onSearchHandler} />,
            }}
            placeholder="Search"
            value={searchValue}
            onChange={onChangeSearch}
            onKeyDown={onEnterHandler}
          />
        </div>
        <Box display="flex" justifyContent="center">
          {isLoading && <Preloader title="Articles are loading..." />}
          {!isLoading && !list.results.length && (
            <Box display="flex" justifyContent="center" p="32px 0">
              <h5>No articles</h5>
            </Box>
          )}
        </Box>
        <InfiniteScroll
          className={classes.wrapper}
          threshold={250}
          loadMore={onScrollLoading}
          hasMore={list.page < list.total_pages}
        >
          {!isLoading &&
            list.results.map((item) => {
              return (
                <Link key={item.id} to={`${item.slug}`}>
                  <div className={classes.article}>
                    {!!item.img && <FallbackImage src={item.img} fallbackSrc={placeholderImg} alt="image of article" />}
                    <div className={classes.content}>
                      <div>
                        <h1 className={classes.title}>{item.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: item.intro }} />{" "}
                      </div>
                      <Box display="flex" justifyContent="space-between" mt="12px">
                        <span className={clsx(appTheme.hyperlink, classes.link)}>Read more...</span>
                        <span className={classes.date}>{new Date(item.date).toDateString()}</span>
                      </Box>
                    </div>
                  </div>
                </Link>
              );
            })}
        </InfiniteScroll>
      </Container>
    </Page>
  );
};

export default Blog;
