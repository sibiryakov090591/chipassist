/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import constants from "@src/constants/constants";
import image from "@src/images/link-preview-image.png";

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
        <meta name="description" data-react-helmet="true" data-rh="true" content={description || title} />

        <meta property="og:type" content="website" data-react-helmet="true" data-rh="true" />
        <meta property="og:site_name" content={`${constants?.title}`} data-react-helmet="true" data-rh="true" />
        <meta property="og:title" content={title} data-react-helmet="true" data-rh="true" />
        <meta property="og:description" content={description || title} data-react-helmet="true" data-rh="true" />
        <meta property="og:image" content={image} data-react-helmet="true" data-rh="true" />

        <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" data-rh="true" />
        <meta
          name="twitter:site"
          content={`@${constants?.title?.toLowerCase()}`}
          data-react-helmet="true"
          data-rh="true"
        />
        <meta name="twitter:title" value={title} data-react-helmet="true" data-rh="true" />
        <meta name="twitter:description" value={description || title} data-react-helmet="true" data-rh="true" />
        <meta name="twitter:image" content={image} data-react-helmet="true" data-rh="true" />
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
