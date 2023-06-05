import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Typography } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { authUserProfile } from "@src/store/authentication/authActions";
import { saveBomEdit, clearBomEdit, loadAllBomPagesThunk } from "@src/store/bom/bomActions";

import { CustomSelect } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import BomEditorNew, { tableHeadLabels } from "@src/views/chipassist/Bom/components/BomViewNew/BomEditor/BomEditorNew";
import RowsType, { rowsTypesValues } from "@src/views/chipassist/Bom/components/RowsType/RowsType";
import useAppSelector from "@src/hooks/useAppSelector";
import { BomFields, EditorBomData } from "@src/store/bom/bomTypes";
import { parseOrderValues } from "../TableHeadLabel/TableHeadLabel";

interface Props {
  bomId: string;
}

const BomEdit: React.FC<Props> = ({ bomId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n("bom");

  const bom = useAppSelector((state) => state.bom.bomItem);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  const editorBomData: EditorBomData = {
    id: bom.id,
    name: bom.name,
    cost: bom.cost,
    items: bom.items,
    error: bom.error,
    search: bom.search,
    saved: bom.saved,
    saving: bom.saving,
    stockrecords: bom.stockrecords,
    rowsForDelete: bom.rowsForDelete,
    count: bom.count,
    readonly: bom.readonly,
  };

  const params = new URLSearchParams(location.search);
  const showBy = localStorage.getItem("bomViewShowBy");
  const page = params.get("page") ? +params.get("page") : 1;
  const storageOrderBy = localStorage.getItem("bomEditOrderBy");
  let orderBy = params.get("order_by") || storageOrderBy;
  orderBy = tableHeadLabels
    .filter((v) => v.hasSort)
    .map((v) => v.name)
    .includes(parseOrderValues(orderBy)[0])
    ? orderBy
    : "part_number_ref_asc";
  const storageRowsType = localStorage.getItem("bomRowsType");
  const rowsType = params.get("type") ? params.get("type") : storageRowsType || rowsTypesValues[0].value;
  const isExist = !!bom.id;

  const [isInitialized, setIsInitialized] = useState(false);
  const [pageSize, setPageSize] = useState(+showBy || 25);

  localStorage.setItem("bomViewShowBy", pageSize.toString());
  localStorage.setItem("bomEditOrderBy", orderBy);
  localStorage.setItem("bomRowsType", rowsType);

  const onSaveBom = (bomFields: BomFields) => {
    dispatch(saveBomEdit(bomFields));
  };

  // const onAddLine = (id, templateItemKey) => {
  //   dispatch(addBomItem(id, templateItemKey, "edit"));
  // };

  // const onDeleteLines = (keys) => {
  //   dispatch(setBomEditRowsForDelete(keys));
  // };

  // const onEdit = (bomData) => {
  //   return dispatch(editBomThunk(bomData, page, pageSize, orderBy));
  // };

  // const onUnmount = () => {
  //   // dispatch(clearBomEdit());
  // };

  const onChangeOrderBy = (value: string) => {
    if (!bom.loading) {
      navigate({
        pathname: `/bom/${bomId}`,
        search: `?page=1&page_size=${pageSize}&order_by=${value}&type=${rowsType}`,
      });
    }
  };

  const onChangeRowsType = (value: string) => {
    if (!bom.loading) {
      navigate({
        pathname: `/bom/${bomId}`,
        search: `?page=1&page_size=${pageSize}&order_by=${orderBy}&type=${value}`,
      });
    }
  };

  const onSelectPageSize = (bomFields: BomFields) => (value: number) => {
    if (!bom.loading) {
      onSaveBom(bomFields);
      setPageSize(value);
    }
  };

  useEffect(() => {
    dispatch(authUserProfile());
  }, []);

  useEffect(() => {
    if (!bom.loading) {
      // dispatch(getBomEditThunk(bomId, page, pageSize, orderBy, rowsType));
      dispatch(loadAllBomPagesThunk(+bomId, 1, 500, orderBy, rowsType));
      setIsInitialized(true);
    }

    return () => {
      dispatch(clearBomEdit());
    };
  }, [bomId, shouldUpdateBackend]);
  // }, [bomId, page, pageSize, orderBy, rowsType, shouldUpdateBackend]);

  const pageSizeOptions = [
    { value: 15, title: "15" },
    { value: 25, title: "25" },
    { value: 100, title: "100" },
  ];

  const renderPageSizeSelect = (className: string, bomFields: BomFields) => (
    <CustomSelect
      className={className}
      options={pageSizeOptions}
      value={pageSize}
      onChange={onSelectPageSize(bomFields)}
    />
  );

  const renderRowsType = () => <RowsType value={rowsType} onChange={onChangeRowsType} />;

  return (
    <React.Fragment>
      {!isExist && !bom.loading && isInitialized && (
        <Typography variant="h5" component="h5">
          {t("bom.bom_not_found")}
        </Typography>
      )}
      {bom.loading && <Preloader title={t("bom.opening_page")} />}
      {isExist && !bom.loading && (
        <React.Fragment>
          <BomEditorNew
            title={t("bom.bom_edit")}
            bom={editorBomData}
            // onSaveBom={onSaveBom}
            actionText={t("bom.edit.save")}
            page={page}
            pageSize={pageSize}
            rowsType={rowsType}
            renderPageSizeSelect={renderPageSizeSelect}
            onChangeOrderBy={onChangeOrderBy}
            orderByValue={orderBy}
            renderRowsType={renderRowsType}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BomEdit;
