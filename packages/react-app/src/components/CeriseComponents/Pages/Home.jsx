import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Toad from "../../../assets/1.jpg";

// MUI
import H2 from "@material-tailwind/react/Heading1";

const Home = () => {
  return (
    <Card>
      <CardImage src={Toad} alt="Card Image" />
      <CardBody>
        <H6 className="text-primary">Card Title</H6>
        <Paragraph color="gray">
          Don't be scared of the truth because we need to restart the human foundation in truth And I love you like
          Kanye loves Kanye I love Rick Owens’ bed design but the back is...
        </Paragraph>
      </CardBody>

      <CardFooter>
        <Button color="lightBlue" size="lg" ripple="light">
          Read More
        </Button>
      </CardFooter>
      <CardImage src={Toad} alt="Card Image" />
      <CardBody>
        <H6 className="text-primary">Card Title</H6>
        <Paragraph color="gray">
          Don't be scared of the truth because we need to restart the human foundation in truth And I love you like
          Kanye loves Kanye I love Rick Owens’ bed design but the back is...
        </Paragraph>
      </CardBody>

      <CardFooter>
        <Button color="lightBlue" size="lg" ripple="light">
          Read More
        </Button>
      </CardFooter>
      <CardImage src={Toad} alt="Card Image" />
      <CardBody>
        <H6 className="text-primary">Card Title</H6>
        <Paragraph color="gray">
          Don't be scared of the truth because we need to restart the human foundation in truth And I love you like
          Kanye loves Kanye I love Rick Owens’ bed design but the back is...
        </Paragraph>
      </CardBody>

      <CardFooter>
        <Button color="lightBlue" size="lg" ripple="light">
          Read More
        </Button>
      </CardFooter>
      <CardImage src={Toad} alt="Card Image" />
      <CardBody>
        <H6 className="text-primary">Card Title</H6>
        <Paragraph color="gray">
          Don't be scared of the truth because we need to restart the human foundation in truth And I love you like
          Kanye loves Kanye I love Rick Owens’ bed design but the back is...
        </Paragraph>
      </CardBody>

      <CardFooter>
        <Button color="lightBlue" size="lg" ripple="light">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Home;
