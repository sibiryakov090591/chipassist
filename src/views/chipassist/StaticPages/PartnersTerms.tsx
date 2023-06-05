import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      marginLeft: 40,
      marginBottom: 20,
    },
    decimalList: {
      listStyleType: "decimal",
    },
  }),
);

const PartnersTerms = () => {
  const classes = useStyles();

  return (
    <div style={{ padding: "30px 50px" }}>
      <h1 style={{ textAlign: "center" }}>
        Terms and conditions <br /> ChipAssist platform for suppliers
      </h1>
      <h2>Terms and definitions:</h2>
      <ul className={classes.list}>
        <li>
          Supplier - a company that a) provides its stocks for sale on Service Provider’s platform and/or b) was granted
          access to the rapid RFQ exchange service.
        </li>
        <li>Service Provider - ChipAssist AG or its Authorised Partner.</li>
        <li>
          Authorised Partner - ELFARO OÜ, Estonia, performing purchasing of Components (materials), issuing invoices,
          and providing logistics services.
        </li>
        <li>
          Components (materials) - any products of a Supplier intended for sale using the Service Provider’s platform.
        </li>
      </ul>
      <h2>The Supplier undertakes to:</h2>
      <ul className={clsx(classes.list, classes.decimalList)}>
        <li>
          In relation to Components (materials) origin and compatibility:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>supply Components (materials) that are not counterfeit or forgery.</li>
            <li>provide information regarding the original manufacturer.</li>
            <li>provide part-numbers cross-reference for the compatible Components (materials) as applicable.</li>
          </ul>
        </li>
        <li>
          In relation to Components (materials) quality and condition:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>
              supply new Components (materials), unless otherwise explicitly agreed between the Supplier and the Service
              Provider on a case-by-case basis.
            </li>
            <li>
              supply Components (materials) in good condition, i.e. ensuring the performance according to the original
              characteristics.
            </li>
            <li>
              store and transport Components (materials) according to the corresponding requirements of an original
              manufacturer.
            </li>
            <li>
              inform the Service Provider regarding all possible issues related to the quality and condition of
              Components (materials), e.g. unreadable or unavailable marking and/or labelling, damaged or non-original
              packaging, storage conditions violation, etc.
            </li>
          </ul>
        </li>
        <li>
          In relation to Components (materials) price:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>
              to provide a price for Components (materials) in order of priority: through API, in a stock file, on a
              request from the Service Provider.
            </li>
            <li>
              to fix the price for 72 hours after the moment of provision, unless otherwise separately agreed between
              the Supplier and the Service Provider.
            </li>
          </ul>
        </li>
        <li>
          In relation to warranty:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>inform explicitly about warranty period and conditions.</li>
            <li>
              return any payments made by the Service Provider for the Components (materials) of inadequate quality or,
              in cases agreed with an end customer, provide a replacement. Transportation of Components (materials) and
              corresponding replacement the Supplier performs at own expense.
            </li>
          </ul>
        </li>
        <li>
          In relation to confidentiality:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>
              use and share with third parties information received from the Service Provider or retrieved from the
              ChipAssist.com site exclusively for the purpose of a) Components (materials) sales and b) promotion of the
              Service Provider’s platform.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        The Supplier acknowledges that the Service Provider can change these Terms and Conditions without separate
        notification to improve customers’ and own interests protection.
      </p>
    </div>
  );
};

export default PartnersTerms;
