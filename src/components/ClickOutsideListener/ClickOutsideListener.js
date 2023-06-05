import React, { useEffect, useRef } from "react";

function ClickOutsideListener({ children, onClickOutside }) {
  const ref = useRef(null);

  const clickOutside = (e) => {
    if (ref && !ref.current.contains(e.target)) {
      if (onClickOutside) onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="click-outside" ref={ref}>
      {children}
    </div>
  );
}

export default ClickOutsideListener;
