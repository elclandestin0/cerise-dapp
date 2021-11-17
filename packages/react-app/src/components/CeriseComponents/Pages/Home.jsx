import React from "react";
import H1 from "@material-tailwind/react/Heading1";
import "./home.css";
import DemonSplayerz from "../../../assets/DS.png";

// MUI
import H2 from "@material-tailwind/react/Heading1";

const Home = () => {
  return (
    <div className="bg-test bg-cover bg-no-repeat bg-center text-primary anything">
      <div className="h-full flex items-center justify-center">
        <img class="w-72 tiny:w-auto md:w-1/2 lg:w-1/2 xl:w-1/2" src={DemonSplayerz} />
      </div>
    </div>
  );
};

export default Home;
