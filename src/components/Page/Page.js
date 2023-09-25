/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const { NODE_ENV } = process.env;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

const Page = (props) => {
  const { title, description, children, ...rest } = props;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (NODE_ENV !== "production") {
      return;
    }

    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
        page_name: title,
      });
    }
  }, [title, window.location.pathname]);

  return (
    <div {...rest}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description || title} />
      </Helmet>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.any,
};

export default Page;
