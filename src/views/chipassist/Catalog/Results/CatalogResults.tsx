import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import Preloader from "@src/components/Preloader/Preloader";
import { v4 as uuidv4 } from "uuid";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getCatalog, getCatalogProducts } from "@src/store/catalog/catalogActions";
import { Paginate } from "@src/components";
import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import setUrl from "@src/utils/setUrl";
import useAppSelector from "@src/hooks/useAppSelector";
import { findCategory } from "@src/utils/catalog";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useStyles as useCatalogStyles } from "../styles";

const descriptionData: { [key: string]: string } = {
  "connectors-interconnects":
    "Buy electronic interconnectors at ChipAssist. We offer any kind of electrical connectors that you need, including USB connectors, Coaxial Connectors, D-Sub Connectors, and more. Order your electronic connectors today at chipassist.com!",
  "integrated-circuits-ics":
    "Buy integrated circuits (ICs) at Chipassist.com. We have thousands of integrated circuit parts from top manufacturers. Shop for integrated circuits today!",
  transformers:
    "Search across of thousands of Transformers parts for the best pricing, on ChipAssist. The global source for datasheets, price comparison, stock, availability, specs and more.",
  "potentiometers-variable-resistors":
    "Search across of thousands of Digital Potentiometers parts for the best pricing, on ChipAssist. The global source for datasheets, price comparison, stock, availability, specs and more.",
  "discrete-semiconductor-products":
    "Buy discrete semiconductors at ChipAssist. Browse thousands of discrete semiconductor products including diodes, thyristors, and transistors for your next project. Buy discrete semiconductors now at chipassist.com!",
  relays:
    "Search the best relays at ChipAssist. Get detailed specs, compare prices, and find reputable distributors of electrical relay solutions. Shop electrical relays from top manufacturers at ChipAssist.com!",
  "audio-products":
    "Buy Audio Products at ChipAssist. We offer any kind of audio products that you need, including Amplifiers, Microphones, Buzzer Elements, and more. Order it today at chipassist.com!",
  "industrial-controls":
    "Search across of thousands of Industrial Controls parts for the best pricing, on ChipAssist. The global source for datasheets, price comparison, stock, availability, specs and more.",
  optoelectronics:
    "Find Optoelectronics at ChipAssist. Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "industrial-controls-meters":
    "Find Industrial Controls Products, Meters, and more at ChipAssist. Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "battery-products":
    "Find Battery Products at ChipAssist. We offer any kind of Rechargeable and Non-Rechargeable Batteries, Battery Holders, Clips, Contacts, and more. Order your electronic parts today at chipassist.com!",
  "boxes-enclosures-racks":
    "Find Boxes, Enclosures, Racks, and more at ChipAssist. Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "cable-assemblies/potentiometers-variable-resistors":
    "Find Cables at ChipAssist. Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at chipassist.com!",
  "power-supplies":
    "Find Power Supplies at ChipAssist. We offer any kind of Power Supply Modules, Converters, and more. Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at chipassist.com!\n",
  "cables-wires":
    "Find Wires and Cables at ChipAssist.com. The global source for datasheets, price comparison, stock, availability, specs and more.",
  "programmers-development-systems":
    "Find Programmers, Development Systems, and more at ChipAssist. We offer any kind of Evaluation Boards, Programmers, Emulators, Debuggers, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "prototyping-fabrication-products":
    "Find Prototyping, Fabrication Products at ChipAssist. We offer any kind of Adapter, Breakout Boards, Card Extenders, PCB Routers, and more. Order your electronic parts today at chipassist.com!",
  "prototyping-products":
    "Find Prototyping Products at ChipAssist. We offer any kind of Adapter, Breakout Boards, Card Extenders, PCB Routers, and more. Order your electronic parts today at chipassist.com!",
  capacitors:
    "Find Capacitors at ChipAssist.com. We offer any kind of Aluminum, Ceramic, Film Capacitors, EDLC, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  isolators:
    "Find Isolators at ChipAssist.com. We offer any kind of Digital Isolators, Optoisolators, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  resistors:
    "Find Resistors at ChipAssist.com. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "circuit-protection":
    "Search across of thousands of Circuit Protection products for the best pricing, on ChipAssist. The global source for datasheets, price comparison, stock, availability, specs and more.",
  "crystals-oscillators-resonators":
    "Find Crystals, Oscillators, Resonators, and more at ChipAssist. Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  kits:
    "Find Kits at ChipAssist. We offer any kind of Audio, Capacitor, Connector, LED kits, and more. Order your electronic parts today at chipassist.com!",
  "rf-if-and-rfid":
    "Find RF/IF and RFID Products at ChipAssist. We offer any kind of RF Amplifiers, RF Antennas, RF Demodulators, RF Detectors, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "development-boards-kits-programmers":
    "Search across of thousands of Development Boards, Kits, Programmers for the best pricing, on ChipAssist. The global source for datasheets, price comparison, stock, availability, specs and more.",
  "computer-equipment":
    "Find Computer Equipment Products at ChipAssist. We offer any kind of Adapters, Converters, Brackets, Projectors, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "soldering-desoldering-rework-products":
    "Buy electronic parts at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "computers-office":
    "Find Computer Products at ChipAssist. We offer any kind of Adapters, Converters, Brackets, Projectors, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "static-control-esd-clean-room-products":
    "Find Static Control, ESD, Clean Room Products at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "labels-signs-barriers-identification":
    "Buy electronic parts at ChipAssist. We offer any kind of Labels, Signs, Barriers, Identification parts, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  switches:
    "Find Switches at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "line-protection-distribution-backups":
    "Find Line Protection, Distribution, Backups Products at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  magnetics:
    "Find Magnetics at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "embedded-computers":
    "Find Embedded Computers at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "maker-diy-educational":
    "Buy electronic parts at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "fans-thermal-management":
    "Find Fans, Thermal Management Products at ChipAssist. We offer any kind of AC Fans, DC Fans, and more. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "test-and-measurement":
    "Buy electronic parts at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. 20 000 000 parts in the catalog. Order Today at Chipassist.com!",
  "memory-cards-modules":
    "Find Memory Cards at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  filters:
    "Find Filters at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "motors-solenoids-driver-boards-modules":
    "Find Motors, Solenoids, Driver Boards/Modules Products at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  tools:
    "Buy electronic parts at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. 20 000 000 parts in the catalog. Order Today at Chipassist.com!",
  "networking-solutions":
    "Buy electronic parts at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. 20 000 000 parts in the catalog. Order Today at Chipassist.com!",
  "hardware-fasteners-accessories":
    "Buy electronic parts at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. 20 000 000 parts in the catalog. Order Today at Chipassist.com!",
  "optical-inspection-equipment":
    "Find Optical Inspection Equipment Products at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "inductors-coils-chokes":
    "Find Inductors, Coils, Chokes at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  "industrial-automation-and-controls":
    "Find Industrial Automation and Controls Products at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. Order Today at Chipassist.com!",
  uncategorized:
    "Buy electronic parts at ChipAssist. See Inventory, pricing, and datasheets from our 350+ Vetted Suppliers. 20 000 000 parts in the catalog. Order Today at Chipassist.com!",
};

const CatalogResults: React.FC = () => {
  const { t } = useI18n("catalog");
  const classes = useStyles();
  const catalogClasses = useCatalogStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const page = useURLSearchParams("page", false, null, false) || 1;
  const matchResult = window.location.pathname?.match(/parts\/(.*)/);
  const catalogUrl = matchResult && matchResult[1];
  const titleRef = useRef(null);

  const normalizeData = useAppSelector((state) => state.catalog.normalizeData);

  const [products, setProducts] = useState(null);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (normalizeData.length) {
      const cat = findCategory(catalogUrl, normalizeData);
      setCategory(cat || false);
      setIsCategoryLoading(false);
    } else {
      dispatch(getCatalog());
    }
  }, [catalogUrl, normalizeData]);

  useEffect(() => {
    if (category) {
      setIsProductsLoading(true);
      dispatch(getCatalogProducts(category.id, page))
        .then((res: any) => {
          setProducts(res);
          setIsProductsLoading(false);
        })
        .catch(() => {
          setProducts(false);
          setIsProductsLoading(false);
        });
    }
  }, [category]);

  const onPageChangeHandle = (data: any) => {
    if (!isProductsLoading) {
      if (titleRef.current) {
        titleRef.current.scrollIntoView({ block: "start" });
      }
      setIsProductsLoading(true);
      setUrl(navigate, `/parts/${category.url}`, data.selected + 1);
      dispatch(getCatalogProducts(category.id, data.selected + 1))
        .then((res: any) => {
          setProducts(res);
          setIsProductsLoading(false);
        })
        .catch(() => {
          setProducts(false);
          setIsProductsLoading(false);
        });
    }
  };

  return (
    <Page title={t("page_title")} description={descriptionData[catalogUrl] || descriptionData.uncategorized}>
      <Container maxWidth="xl">
        <div className={catalogClasses.titleWrapper}>
          <h1 className={catalogClasses.title}>{t("title")}</h1>
          <h2 className={catalogClasses.subTitle}>{t("sub_title")}</h2>
        </div>
        {isCategoryLoading && (
          <div className={classes.preloader}>
            <Preloader title={t("results_loading")} />
          </div>
        )}
        {/* {!isCategoryLoading && !category && ( */}
        {/*  <div className={classes.categoryNotFound}> */}
        {/*    <h2 className={classes.notFound}>{t("not_found")}</h2> */}
        {/*  </div> */}
        {/* )} */}
        {!isCategoryLoading && category && (
          <div className={classes.wrapper}>
            <div>
              <span>
                <NavLink className={classes.link} to="/parts">
                  {t("common.catalog")}
                </NavLink>
                {" > "}
              </span>
              {category && (
                <>
                  {category.breadcrumbs.map((crumb: any) => {
                    return (
                      <span key={uuidv4()}>
                        <NavLink className={classes.link} to={`/parts/${crumb?.url}`}>
                          {t(crumb?.slug)}
                        </NavLink>
                        {" > "}
                      </span>
                    );
                  })}
                  <span className={classes.disabledLink}>{t(category.slug)}</span>
                  <h2>{t(category.slug)}</h2>
                  {category.children && !!category.children.length && (
                    <div className={catalogClasses.categoriesWrapper}>
                      {category.children.map((depth_2: any) => {
                        return (
                          <div key={uuidv4()}>
                            <div className={catalogClasses.categoryWrapper}>
                              <NavLink
                                className={clsx(catalogClasses.categoryLink, catalogClasses.depth1Name)}
                                to={`/parts/${depth_2.url}`}
                              >
                                {t(depth_2.slug)}
                              </NavLink>
                              {depth_2.children && !!depth_2.children.length && (
                                <div className={catalogClasses.depth2Wrapper}>
                                  {depth_2.children.map((depth_3: any) => {
                                    return (
                                      <div key={uuidv4()}>
                                        <NavLink
                                          className={clsx({
                                            [catalogClasses.categoryLink]: true,
                                            [catalogClasses.depth2Name]: true,
                                            [catalogClasses.underline]: false,
                                          })}
                                          to={`/parts/${depth_3.url}`}
                                        >
                                          {t(depth_3.slug)}
                                        </NavLink>
                                        {depth_3.children && !!depth_3.children.length && (
                                          <div className={catalogClasses.depth3Wrapper}>
                                            {depth_3.children.map((depth_4: any) => {
                                              return (
                                                <div key={uuidv4()}>
                                                  <NavLink
                                                    className={catalogClasses.categoryLink}
                                                    to={`/parts/${depth_4.url}`}
                                                  >
                                                    {t(depth_4.slug)}
                                                  </NavLink>
                                                  {depth_4.children && !!depth_4.children.length && (
                                                    <div className={catalogClasses.depth4Wrapper}>
                                                      {depth_4.children.map((depth_5: any) => {
                                                        return (
                                                          <div key={uuidv4()}>
                                                            <NavLink
                                                              className={catalogClasses.categoryLink}
                                                              to={`/parts/${depth_5.url}`}
                                                            >
                                                              {t(depth_5.slug)}
                                                            </NavLink>
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
            {isProductsLoading && (
              <div className={classes.preloader}>
                <Preloader title={t("results_loading")} />
              </div>
            )}
            {!isProductsLoading && products && (
              <div className={classes.resultsWrapper}>
                {!products.results.length && !category.children?.length && (
                  <div className={classes.categoryNotFound}>
                    <h2 className={classes.notFound}>{t("not_results")}</h2>
                  </div>
                )}
                {!!products.results.length && (
                  <>
                    <Table>
                      <TableBody className={classes.upcWrapper}>
                        {products.results.map((item: any) => {
                          return (
                            <TableRow key={uuidv4()} className={classes.upc}>
                              <TableCell>
                                <NavLink to={`/search?query=${encodeURIComponent(item.upc)}`}>{item.upc}</NavLink>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </>
                )}
                {products && products.total_pages > 1 && (
                  <Box p={4} display="flex" justifyContent="center">
                    <Paginate pageCount={products.total_pages} activePage={+page} onPageChange={onPageChangeHandle} />
                  </Box>
                )}
              </div>
            )}
          </div>
        )}
      </Container>
    </Page>
  );
};

export default CatalogResults;
