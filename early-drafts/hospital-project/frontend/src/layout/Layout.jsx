

import React from "react"
import Header from "../components/Header/Header";
import Footer from " ../components/Footer/Footer";
import Routers from "../components/Routers/Routers";
const layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
    </>
  );

};

export default layout;

