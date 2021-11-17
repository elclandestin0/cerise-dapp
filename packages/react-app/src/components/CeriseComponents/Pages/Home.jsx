import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Toad from "../../../assets/1.jpg";
import "./home.css";

// MUI
import H2 from "@material-tailwind/react/Heading1";

const Home = () => {
  return (
    <div className="bg-test bg-no-repeat bg-center text-primary anything">
      <div className="h-full flex items-center justify-center">
        <H2> some text </H2>
      </div>
    </div>
  );
};

export default Home;
