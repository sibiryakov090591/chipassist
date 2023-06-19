import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import useStyles from "@src/views/chipassist/StaticPages/FAQ/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

export function CustomAccordion(props: { children: { summary: any; details: any } }) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  const expIcon = () => {
    return isExpanded ? <RemoveIcon /> : <AddIcon />;
  };

  return (
    <Accordion
      onChange={(event, expanded) => {
        setIsExpanded(expanded);
      }}
    >
      <AccordionSummary classes={{ root: classes.summaryRoot }} expandIcon={expIcon()}>
        {props.children.summary}
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDescr}>{props.children.details}</AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;
