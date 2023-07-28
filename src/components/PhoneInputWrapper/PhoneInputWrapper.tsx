import InputPhone from "@src/components/InputPhone/InputPhone";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

interface Props {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  small?: boolean;
  style?: any;
  classes?: any;
}

const useStyle = makeStyles((theme: any) => ({
  phone: {
    width: "100%",
    height: "100%",
    position: "relative",
    [theme.breakpoints.down(460)]: {
      height: "37.63px",
      margin: "8px 0",
    },
  },
}));

export const PhoneInputWrapper: React.FC<Props> = ({ label, value, onChange, small, classes, style }) => {
  const inlineClasses = useStyle();
  return (
    <div className={clsx(inlineClasses.phone, classes)} style={style}>
      <InputPhone label={label} value={value} onChange={onChange} small={small} />
    </div>
  );
};

export default PhoneInputWrapper;
