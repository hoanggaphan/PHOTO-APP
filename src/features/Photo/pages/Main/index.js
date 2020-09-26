import { selectPhotos } from "features/Photo/photoSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import Banner from "../../../../components/Banner";
import Images from "../../../../constants/images";

Main.propTypes = {};

function Main(props) {
  const photoList = useSelector(selectPhotos);
  console.log(photoList);
  return (
    <div>
      <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <Link to="/photos/add">Add new photo</Link>
      </Container>
    </div>
  );
}

export default Main;
