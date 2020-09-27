import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import Banner from "../../../../components/Banner";
import Images from "../../../../constants/images";

Main.propTypes = {};

function Main() {
  const photos = useSelector(state => state.photos);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePhotoEditClick = (photo) => {
    console.log("Edit: ", photo);

    const url = `/photos/${photo.id}`;
    history.push(url);
  };

  const handlePhotoRemoveClick = (photo) => {
    console.log("Remove: ", photo);

    const photoId = photo.id;
    const action = removePhoto(photoId);
    dispatch(action);
  };

  return (
    <div>
      <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

export default Main;
