import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Grid, Table, TableBody, TableCell, TableRow, Box, Container } from "@material-ui/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { title } from "@src/constants/defaults";
import { Page, ProductCard, ProductCardNew } from "@src/components";
import { loadProductById, loadStockrecordById } from "@src/store/products/productsActions";
import { addApiUrl } from "@src/utils/transformUrl";
// import SidebarMenuBlock from "@src/components/SidebarMenu";
// import Breadcrumbs from "@src/components/BreadCrumbs/BreadCrumbs";
// import { loadBomListThunk } from "@src/store/bom/bomActions";
import { isUrl } from "@src/utils/validation";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";

import Preloader from "@src/components/Preloader/Preloader";

import useAppSelector from "@src/hooks/useAppSelector";

import { Attribute, ProductStateItem, Stockrecord } from "@src/store/products/productTypes";
import { getImage } from "@src/utils/product";
import Error404 from "@src/views/chipassist/Error404";
import placeholderImg from "@src/images/cpu.png";
import constants from "@src/constants/constants";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { useStyles } from "./productStyles";

const img = require("@src/images/cpu.png");

export const getAttributes = (
  data: ProductStateItem,
): {
  [key: string]: {
    name: string;
    value: string | number | string[] | number[];
  }[];
} => {
  if (!data || !data.attributes) return {};
  const groups: {
    [key: string]: {
      name: string;
      value: string | number | string[] | number[];
    }[];
  } = {};
  const attributes = data.attributes.filter((attr) => attr.value && !isUrl(attr.value) && attr.name !== "Manufacturer");
  attributes.forEach((val) => {
    let group_name = "Others";
    if (val.group) group_name = val.group.name;
    const item = { name: val.name === "Lead Time" ? "Manufacturer Lead Time" : val.name, value: val.value };

    if (groups[group_name]) {
      groups[group_name].push(item);
    } else {
      groups[group_name] = [item];
    }
  });

  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
  });

  const result = sortedKeys.reduce((acc: any, val) => {
    acc[val] = groups[val];
    return acc;
  }, {});

  return result;
};

const ProductView = () => {
  // const [categoryState, setCategoryState] = useState({ activeNode: null, toggled: null });
  const { partnumber, stockrecordId } = useParams<{ partnumber: string; stockrecordId: string }>();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("product.product_view");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = useURLSearchParams("productId", false, null, false);

  // const [categoryState, setCategoryState] = useState({ activeNode: null, toggled: null });
  const [mainImage, setMainImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [stockrecord, setStockrecord] = useState<Stockrecord>();

  const productData = useAppSelector((state) => state.products.productViewData);
  // const treeMenu = useAppSelector((state) => state.treeMenu.treeMenu);

  const downloadsReady = false;

  // const cats = productData && productData.categories && productData.categories.length > 0 && productData.categories[0];
  // const categoriesId = cats && cats.id;
  const local_images = productData ? productData.images : [];
  const productImage = local_images.length > 0 ? addApiUrl(local_images[0].original) : img;
  const imgTitle = local_images.length > 0 && local_images[0].caption;
  // const logo =
  //   productData &&
  //   productData.stockrecords &&
  //   productData.stockrecords.length &&
  //   productData.stockrecords[0].manufacturer
  //     ? productData.stockrecords[0].manufacturer.logo || productData.stockrecords[0].manufacturer.logo_url
  //     : "";

  const product = {
    id: productData?.id,
    imgSrc: productImage,
    imgTitle,
    manufacturer: productData ? productData.manufacturer?.name : "",
    manufacturerLink: "/link",
    model: productData ? productData.upc : "",
    description: productData ? productData.description : "",
    dataSheetLink: "/dataSheetLink",
    // dataSheetImage: require('../../../images/products/ti_logo-fecba51765.png'),
    // manufacturerLogo: require('../../../images/products/370-1939869ad9.png'),
    referenceDesigns: "/",
    cadModels: "",
    symbolImg: "", // require('../../../images/products/15a3a5683be384eb_600x300.png'),
    footPrintImage: "", // require('../../../images/products/15a3a5683be384eb_600x300-footprint.png'),
  };

  useEffect(() => {
    if (!isLoading && (!productData || productData.upc !== decodeURIComponent(partnumber))) {
      navigate(`/search?query=${partnumber}`, { state: { background: location } });
    }
  }, [productData, isLoading]);

  useEffect(() => {
    if (productData) setMainImg(getImage(productData));
  }, [productData]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // dispatch(loadBomListThunk(1, true));
    if (productId) {
      dispatch(loadProductById(productId)).finally(() => setIsLoading(false));
    } else {
      dispatch(loadStockrecordById(stockrecordId)) // At first we suppose that it is stockrecord id
        .then((sr: Stockrecord) => {
          // setStockrecord(sr);
          dispatch(loadProductById(sr.product)).finally(() => setIsLoading(false));
        })
        .catch(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    const { referrer } = document;
    const { origin, search, href } = window.location;
    const wasSent = sessionStorage.getItem("visit");
    if (!wasSent && referrer && !referrer.includes(origin) && search.includes("utm_")) {
      dispatch(
        sendFeedbackMessageThunk("visit", {
          href,
          referrer,
        }),
      ).then(() => {
        sessionStorage.setItem("visit", "true");
      });
    }
  }, []);

  const getDownloadable = () => {
    const data: Attribute[] = [];
    if (productData && productData.attributes) {
      productData.attributes
        .filter((attr) => isUrl(attr.value))
        .map((attr) => {
          data.push(attr);
          return attr;
        });
    }
    return data;
  };
  const getImages = () => {
    const data: Attribute[] = [];
    if (productData && productData.attributes) {
      productData.attributes
        .filter(
          (attr) =>
            isUrl(attr.value) && ((attr.value as string).endsWith(".jpg") || (attr.value as string).endsWith(".png")),
        )
        .map((attr) => {
          data.push(attr);
          return attr;
        });
    }
    return data;
  };
  const downloadables = getDownloadable();
  const imagesFromAttributes = getImages();

  return (
    <Page title={product.model} description={product.description}>
      <Container maxWidth="xl">
        <div className={classes.main}>
          {isLoading && (
            <div style={{ padding: "120px 0" }}>
              <Preloader title="" />
            </div>
          )}
          {!isLoading && !productData && <Error404 />}
          {!isLoading && productData && (
            <div>
              {/* <SidebarMenuBlock */}
              {/*  treeMenu={treeMenu} */}
              {/*  activeNode={categoryState.activeNode} */}
              {/*  toggled={categoryState.toggled} */}
              {/*  onToggleNode={onToggleHandle} */}
              {/* /> */}
              <div className={classes.cartContainer}>
                <h1 className={classes.title}>{t("title")}</h1>
                <div className={classes.priceModel}>{product && product.model}</div>
                {/* <div className={classes.topRow}> */}
                {/*  <Breadcrumbs categoriesId={categoriesId} /> */}
                {/*  <div className={classes.rightColumn}> */}
                {/*    <img className={classes.logoImg} src={logo} /> */}
                {/*  </div> */}
                {/* </div> */}

                <Box className={classes.dataContainer}>
                  <Box className={classes.imagesContainer}>
                    <Box className={classes.mainImg}>
                      <img
                        className={classes.mainImgItem}
                        src={mainImage}
                        alt={"main image"}
                        onError={() => setMainImg(placeholderImg)}
                      />
                    </Box>
                    <Box className={classes.imagesWrapper}>
                      {imagesFromAttributes &&
                        !!imagesFromAttributes.length &&
                        imagesFromAttributes.map((attr, i) => {
                          return (
                            <div key={`${attr.id}-${i}`} className={classes.imagesColumn}>
                              <a
                                className={classes.imagesLink}
                                href={attr.value as string}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img className={classes.imagesItem} src={attr.value as string} alt={attr.name} />
                              </a>
                            </div>
                          );
                        })}
                    </Box>
                  </Box>
                  <Box className={classes.contentContainer}>
                    <div className={classes.cadModelsRow}>
                      <div className={classes.blockTitle}>{t("technical")}</div>

                      <Grid container>
                        <Grid item style={{ width: "100%" }}>
                          <Table key={uuidv4()} className={classes.attributeTable}>
                            <TableBody>
                              <TableRow className={classes.attributeTableRow} key={uuidv4()}>
                                <TableCell className={classes.attributeTableHeader}>Manufacturer</TableCell>
                                <TableCell>{product.manufacturer}</TableCell>
                              </TableRow>
                              {!!Object.keys(getAttributes(productData)).length &&
                                Object.keys(getAttributes(productData)).map((group_name) => {
                                  return getAttributes(productData)[group_name].map((val) => (
                                    <TableRow className={classes.attributeTableRow} key={uuidv4()}>
                                      <TableCell className={classes.attributeTableHeader}>{val.name}</TableCell>
                                      <TableCell>{val.value}</TableCell>
                                    </TableRow>
                                  ));
                                })}
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </div>
                    {downloadsReady && (
                      <Box>
                        <div className={classes.blockTitle}>{t("cad_title")}</div>
                        <div className={classes.priceModel}>{t("cad_model")}</div>
                        <Box className={classes.cadModelsRow}>
                          <div className={classes.imgBlock}>
                            <div className={classes.imgColumn}>
                              <div className={classes.imgHeader}>Symbol</div>
                              <img src={product.symbolImg} />
                            </div>
                            <div className={classes.imgColumn}>
                              <div className={classes.imgHeader}>Footprint</div>
                              <img src={product.footPrintImage} />
                            </div>
                          </div>
                          <div className={classes.selectRow}>{t("policy", { title })}</div>
                        </Box>
                      </Box>
                    )}
                    <div className={classes.documentsBlock}>
                      {downloadables && !!downloadables.length && (
                        <>
                          <div className={classes.blockTitle}>{t("documents")}</div>
                          <div className={classes.documentsDescription}>
                            {t("documents_text")}
                            <strong>
                              {product && product.manufacturer} {product && product.model}
                            </strong>
                            .
                            {downloadables && (
                              <ul style={{ padding: 20 }}>
                                {downloadables.map((attr, i) => {
                                  return (
                                    <li key={`${attr.id}-${i}`}>
                                      <a
                                        className={appTheme.hyperlink}
                                        href={attr.value as string}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {attr.name}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </Box>
                </Box>

                {!!productData &&
                  (constants.isNewSearchPage ? (
                    <ProductCardNew product={productData} />
                  ) : (
                    <ProductCard product={productData} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Page>
  );
};

export default ProductView;
