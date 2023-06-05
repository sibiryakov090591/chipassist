import React, { useCallback, useEffect, useRef, useState } from "react";
import { Popper } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import useAppDispatch from "@src/hooks/useAppDispatch";
import AddIcon from "@material-ui/icons/Add";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { addProductToBom, createBomWithLinesThunk } from "@src/store/bom/bomActions";
import { getDynamicMoq } from "@src/utils/product";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

function AddToBomButton({ onOpen, product, stockrecords, quantityMap, renderButton: RenderButton, completeHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const anchorEl = useRef(null);
  const bomList = useAppSelector((state) => state.bom.bomList.results || []);
  const partNumberFromQuery = useAppSelector((state) => state.search.query);
  const [updatedBomId, setUpdatedBomId] = useState(null);
  const [searchBomText, setSearchBomText] = useState("");
  const dispatch = useAppDispatch();
  const { t } = useI18n("component");
  const filteredBomList =
    searchBomText === ""
      ? bomList.filter((item) => !item.readonly)
      : bomList
          .filter((item) => !item.readonly)
          .filter((item) => {
            return item.name.toLowerCase().indexOf(searchBomText.toLowerCase()) !== -1;
          });

  const escHandler = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);

    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, [escHandler]);

  const handleClickBomBtn = () => {
    if (!isOpen) {
      if (onOpen) onOpen();
      setUpdatedBomId(null);
    }
    setIsOpen(!isOpen);
  };

  const handleCloseBomList = () => {
    setIsOpen(false);
    setUpdatedBomId(null);
  };

  const handleAddToBomCreate = () => {
    setIsOpen(false);
    const fields = [];
    stockrecords.forEach((stockrecord) => {
      const moq = getDynamicMoq(stockrecord);
      const numInStock = stockrecord?.num_in_stock;
      const quantity = quantityMap[stockrecord?.id];
      fields.push({
        stockrecord: numInStock < moq ? null : stockrecord && stockrecord.id ? stockrecord.id : null,
        part_number_ref: product.upc || partNumberFromQuery,
        quantity: quantity > moq ? quantity : moq || 1,
      });
    });
    if (!stockrecords.length) {
      fields.push({
        stockrecord: null,
        part_number_ref: product.upc || partNumberFromQuery,
        quantity: product.min_moq || 1,
      });
    }
    dispatch(createBomWithLinesThunk(product, fields)).then((bomId) => {
      setUpdatedBomId(bomId);
    });
    setIsOpen(true);
    completeHandler();
  };

  const handleAddToBom = (bomId) => () => {
    setIsOpen(false);
    stockrecords.forEach((stockrecord) => {
      const moq = getDynamicMoq(stockrecord);
      const numInStock = stockrecord?.num_in_stock;
      const quantity = quantityMap[stockrecord?.id];
      const fields = {
        stockrecord: numInStock < moq ? null : stockrecord && stockrecord.id ? stockrecord.id : null,
        part_number_ref: product.upc || partNumberFromQuery,
        quantity: quantity > moq ? quantity : moq || 1,
      };
      dispatch(addProductToBom(bomId, product, fields)).then(() => {
        setUpdatedBomId(bomId);
      });
    });
    if (!stockrecords.length) {
      const fields = {
        stockrecord: null,
        part_number_ref: product.upc || partNumberFromQuery,
        quantity: product.min_moq || 1,
      };
      dispatch(addProductToBom(bomId, product, fields)).then(() => {
        setUpdatedBomId(bomId);
      });
    }
    setIsOpen(true);
    completeHandler();
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleCloseBomList}>
        <div>
          <div ref={anchorEl}>
            <RenderButton onClick={handleClickBomBtn} />
          </div>

          <Popper open={isOpen} anchorEl={anchorEl.current} placement={"bottom"} style={{ zIndex: 1000 }}>
            <div className={classes.bomListPopover}>
              <div className={classes.bomListPopoverHead}>
                {updatedBomId !== null ? (
                  <div className={classes.bomListPopoverResult}>{t("addBom.success")}</div>
                ) : (
                  <div>
                    <div>
                      <button className={`${classes.bomListPopoverBtn} new-bom-button`} onClick={handleAddToBomCreate}>
                        <AddIcon className={classes.bomListCreateBomIcon} /> {t("addBom.new")}
                      </button>
                    </div>
                    <div className={classes.searchBomContainer}>
                      <input
                        autoFocus
                        onChange={(e) => {
                          setSearchBomText(e.target.value);
                        }}
                        type="text"
                        value={searchBomText}
                        placeholder={t("addBom.search")}
                        className={classes.searchBomInput}
                      />
                    </div>
                  </div>
                )}
              </div>
              {updatedBomId === null && filteredBomList.length > 0 && (
                <div className={classes.bomListPopoverBody}>
                  {filteredBomList
                    .sort((a, b) => b.id - a.id)
                    .map((item) => (
                      <button key={item.id} className={classes.bomListPopoverBtn} onClick={handleAddToBom(item.id)}>
                        {item.name}
                      </button>
                    ))}
                </div>
              )}
              {updatedBomId === null && searchBomText !== "" && filteredBomList.length === 0 && (
                <div className={classes.bomFilteredResultEmpty}>
                  <i>{t("addBom.no_results")}</i>
                </div>
              )}
              {updatedBomId !== null && (
                <NavLink to={`/bom/${updatedBomId}`} className={`${classes.bomListPopoverBtn} view-bom-button`}>
                  {t("addBom.view")}
                </NavLink>
              )}
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default AddToBomButton;
