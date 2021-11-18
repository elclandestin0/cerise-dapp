import React from "react";
import "./home.css";

// assets
import DemonSplayerz from "../../../../assets/DS.png";
import DigFashion from "../../../../assets/dig-fashion-sample.gif";

// material tailwind
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";

const Home = () => {
  return (
    <div>
      <div className="bg-test bg-cover bg-no-repeat bg-center text-primary image-height">
        <div className="h-full flex items-center justify-center text-center">
          <img class="tiny:w-1/4 md:w-1/2 lg:w-1/2 xl:w-1/2" src={DemonSplayerz} />
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-6xl px-5 pt-16 text-center text-primary">
          <span>20(3)</span> CrypToadz Street Wearables
        </h1>
      </div>
      <div className="flex justify-center">
        <p className="text-3xl text-justify px-9 md:px-24 lg:px-48 xl:px-96">
          There are 20 exclusive street wearables items available to mint for any CrypTOADZ owners. These include cargo
          pants, jackets, hoodies and tees. Burning your token will allow you to enter your shipping address and get
          your tokenized street wearable!
        </p>
      </div>
      <div className="flex justify-center pb-5 pt-5 px-10">
        <Card className="bg-footer">
          <CardBody>
            <div className="h-full flex items-center justify-center text-center">
              <img class="tiny:w-1/4 md:w-1/2 lg:w-1/2 xl:w-1/2" src={DigFashion} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Home;
