import React from "react";

// Icons
import { withBaseIcon } from "react-icons-kit";
import { ic_chevron_right } from "react-icons-kit/md/ic_chevron_right";

const ToggleIcon = withBaseIcon({
  size: 15,
  style: {},
});

const Toggle = ({ style, onClick }) => {
  return (
    <div style={style.base} onClick={onClick}>
      <div style={style.wrapper}>
        <ToggleIcon icon={ic_chevron_right} />
      </div>
    </div>
  );
};

export default Toggle;
