import React from "react"

import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import Routers from "../routes/Routers.jsx";
const layout = () => {
  return ( 
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );

};

export default layout;

