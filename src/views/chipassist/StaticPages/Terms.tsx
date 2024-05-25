import React, { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ padding: "30px 50px" }}>
      <h1 style={{ fontSize: 26, color: "#000000" }}>Terms...</h1>

      <p style={{ color: "#595959", fontSize: 14, fontWeight: 600 }}>Terms...</p>
    </div>
  );
};

export default Terms;
