import React, { useEffect, useState } from "react";
import { useStyles } from "@src/views/chipassist/Rfq/components/RFQForm/styles";
import { orderBy } from "lodash";
import useAppSelector from "@src/hooks/useAppSelector";
import BaseFilterDropdown from "@src/views/chipassist/Search/components/BaseFilterDropdown/BaseFilterDropdown";
import { getAllManufacturers } from "@src/store/manufacturers/manufacturersActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

interface Distributor {
  id: number;
  code: string;
  name: string;
}

function returnSelectedItems(items: Distributor[], ids: number[]) {
  if (!ids) return [];
  return items.reduce((res, val) => {
    if (ids.includes(val.id)) res.push(val);
    return res;
  }, []);
}

function createSelectOptions(items: Array<Distributor>) {
  if (!items) return [];
  return items.reduce((res, item) => {
    res.push({ value: item.id, label: item.name });
    return res;
  }, []);
}

interface Props {
  styleClasses: any;
  style: any;
  globalOnChange: any;
}

const ManufacturerInput: React.FC<Props> = ({ styleClasses, style, globalOnChange }) => {
  const classes = useStyles();
  const { t } = useI18n("rfq");
  const [item, setItem] = useState({ manufacturers: [] });
  const dispatch = useAppDispatch();
  const all_manufacturers = [
    { id: "All", name: "All" },
    ...orderBy(
      useAppSelector((state) => state.manufacturers.items || []),
      ["name"],
    ),
  ];
  const selectedManufacturers = returnSelectedItems(all_manufacturers, item.manufacturers);
  //
  // const selectedSellers: any = null;
  useEffect(() => {
    if (item) {
      dispatch(getAllManufacturers());
    }
  }, [item]);

  useEffect(() => {
    console.log(all_manufacturers);
  }, [all_manufacturers]);

  const handleHiddenInputChange = () => {
    return true;
  };

  useEffect(() => {
    console.log(selectedManufacturers);
    globalOnChange({
      target: { name: "manufacturer", value: selectedManufacturers.map((elem) => elem.name).toString() },
    });
  }, [item]);

  const handleSelectChange = (values: Array<{ label: string; value: number | string }>) => {
    let manufacturers: Array<string | number> = [];
    if (values && !!values.length) {
      values.forEach((val) => {
        manufacturers.push(val.value);
      });
    }
    if (values?.some((v) => v.value === "All")) {
      manufacturers = [];
      const allValue = values.filter((i) => i.value === "All");
      allValue.forEach((val) => {
        manufacturers.push(val.value);
      });
    }
    setItem((prevState) => ({ manufacturers }));
  };
  return (
    <div style={style}>
      <div className={`${styleClasses}`}>
        <input
          className={classes.hiddenInput}
          style={{height: 0}}
          onChange={handleHiddenInputChange}
          value={selectedManufacturers.length ? "yes" : ""}
        />
        <BaseFilterDropdown
          defaultLabel={t("distributor.distributors")}
          selectedItems={createSelectOptions(selectedManufacturers)}
          options={createSelectOptions(all_manufacturers)}
          changeHandler={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default ManufacturerInput;
