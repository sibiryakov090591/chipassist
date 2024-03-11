import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Grid, Table, TableBody, TableCell, TableRow, Box, Container } from "@material-ui/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Page, ProductCard } from "@src/components";
import { loadProductById, loadStockrecordById } from "@src/store/products/productsActions";
import { addApiUrl } from "@src/utils/transformUrl";
import { isUrl } from "@src/utils/validation";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import Preloader from "@src/components/Preloader/Preloader";
import useAppSelector from "@src/hooks/useAppSelector";
import { Attribute, Stockrecord } from "@src/store/products/productTypes";
import { getAttributes, getImage } from "@src/utils/product";
import Error404 from "@src/views/chipassist/Error404";
import placeholderImg from "@src/images/cpu.png";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { useStyles } from "./productStyles";

const img = require("@src/images/cpu.png");

const isICSearch = constants.id === ID_ICSEARCH;

const ProductView = () => {
  const { partnumber, stockrecordId } = useParams<{ partnumber: string; stockrecordId: string }>();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("product.product_view");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = useURLSearchParams("productId", false, null, false);

  const productData = useAppSelector((state) => state.products.productViewData);

  const [mainImage, setMainImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [stockrecord, setStockrecord] = useState<Stockrecord>();

  const local_images = productData ? productData.images : [];
  const productImage = local_images.length > 0 ? addApiUrl(local_images[0].original) : img;
  const imgTitle = local_images.length > 0 && local_images[0].caption;

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
    let params = {};
    if (isICSearch) {
      params = { ...params, base_num_in_stock: 1 };
    }
    if (productId) {
      dispatch(loadProductById(productId, params)).finally(() => setIsLoading(false));
    } else {
      dispatch(loadStockrecordById(stockrecordId, params)) // At first we suppose that it is stockrecord id
        .then((sr: Stockrecord) => {
          // setStockrecord(sr);
          dispatch(loadProductById(sr.product, params)).finally(() => setIsLoading(false));
        })
        .catch(() => setIsLoading(false));
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
              <div className={classes.cartContainer}>
                <h1 className={classes.title}>{t("title")}</h1>
                <div className={classes.priceModel}>{product && product.model}</div>

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
                    <div className={classes.documentsBlock}>
                      {!!downloadables?.length && (
                        <>
                          <div className={classes.blockTitle}>{t("documents")}</div>
                          <div className={classes.documentsDescription}>
                            {t("documents_text")}
                            <strong>
                              {product && product.manufacturer} {product && product.model}
                            </strong>
                            .
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
                          </div>
                        </>
                      )}
                    </div>
                  </Box>
                </Box>

                {!!productData && <ProductCard product={productData} />}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Page>
  );
};

export default ProductView;
