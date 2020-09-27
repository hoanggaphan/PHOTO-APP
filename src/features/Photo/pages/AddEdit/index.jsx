import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { randomNumber } from "utils/common";
import Banner from "../../../../components/Banner";
import PhotoForm from "../../components/PhotoForm";
import "./styles.scss";

AddEditPage.propTypes = {};

function AddEditPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;

  const editPhoto = useSelector((state) =>
    state.photos.find((item) => item.id === +photoId)
  );
  
  const initialValues = isAddMode
    ? {
        title: "",
        categoryId: null,
        photo: "",
      }
    : editPhoto;

  const handleSubmit = (values) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Form submit: ", values);

        if (isAddMode) {
          const action = addPhoto({ id: randomNumber(10000, 99999), ...values });
          dispatch(action);
        } else { //Edit mode
          const action = updatePhoto(values);
          dispatch(action);
        }
        
        history.push("/photos");
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handleSubmit} initialValues={initialValues} isAddMode={isAddMode} />
      </div>
    </div>
  );
}

export default AddEditPage;
