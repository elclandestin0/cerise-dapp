import React from "react";

const returnColoredText = (className, text) => {
  return <span className={className}>{text}</span>
}

const charityCopy = "100% of the mint sales go to a charity organization with a wallet on a blockchain";
const About = () => {
  return (
    <div className="flex-grow">
      <div className="flex justify-center">
        <h1 className="font-h1 text-5xl px-5 pt-32 text-center text-neonPink">About</h1>
      </div>
      <div className="flex justify-center">
        <p className="font-h1 text-3xl text-neonPink text-justify px-9 lg:px-72">
          {returnColoredText("text-neonRed", "Cerise")} is a digital house that sells tokenized {returnColoredText("text-neonGreen", "music")}, {returnColoredText("text-neonGreen", "streetwear")}, {returnColoredText("text-neonGreen", "books")}, {returnColoredText("text-neonGreen", "films")}, {returnColoredText("text-neonGreen", "collectibles")} and {returnColoredText("text-neonGreen", "art")}. <br/> <br/> 
          {returnColoredText("text-neonRed", "Cerise")} also has drops where {returnColoredText("text-neonGreen", charityCopy)}. These {returnColoredText("text-neonGreen", "drops")} express {returnColoredText("text-neonRed", "bloodshed")} around the world with {returnColoredText("text-neonRed", "human rights issues")}, {returnColoredText("text-neonRed", "animal harm")}, {returnColoredText("text-neonRed", "domestic violence")}, {returnColoredText("text-neonRed", "war")} and other causes.
        </p>
      </div>
    </div>
  );
};

export default About;
