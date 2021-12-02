import React from "react";

const About = () => {
  return (
    <div className="flex-grow">
      <div className="flex justify-center">
        <h1 className="font-h1 text-5xl px-5 pt-32 text-center text-neonPink">About</h1>
      </div>
      <div className="flex justify-center">
        <p className="font-body text-3xl text-justify px-9 md:px-24 lg:px-48 xl:px-96">
          Cerise is a digital house that sells tokenized music, street wearables and films. Aside from making profit on
          collections over original work and cultural collaboration, Cerise also has drops where 100% of the mint sales
          go to a charity organization with a wallet on a blockchain. These drops express bloodshed around the world
          with regards to human rights issues, animal harm, domestic violence and other causes.
        </p>
      </div>
    </div>
  );
};

export default About;
