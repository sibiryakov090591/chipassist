import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import HomePageVer2 from "@src/views/chipassist/ChipassistHomePage/ver2/HomePageVer2";
import HomePageVer1 from "@src/views/chipassist/ChipassistHomePage/ChipassistHomePage";

const allowedCounties = [
  "FRA", // France
  "DEU", // Germany
];

const HomePage: React.FC = () => {
  const geolocation = useAppSelector((state) => state.profile.geolocation);

  const isAllowedCounty = allowedCounties.some((i) => i === geolocation?.country_code_iso3);

  return isAllowedCounty ? <HomePageVer2 /> : <HomePageVer1 />;
};

export default HomePage;
