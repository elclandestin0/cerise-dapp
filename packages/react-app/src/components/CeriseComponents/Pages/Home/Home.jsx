import React from "react";
import H1 from "@material-tailwind/react/Heading1";
import "./home.css";
import DemonSplayerz from "../../../../assets/DS.png";

const Home = () => {
  return (
    <div>
      <div className="bg-test bg-cover bg-no-repeat bg-center text-primary anything">
        <div className="h-full flex items-center justify-center">
          <img class="w-1/2 tiny:w-1/4 md:w-1/2 lg:w-1/2 xl:w-1/2" src={DemonSplayerz} />
        </div>
      </div>
    </div>
  );
};

export default Home;
