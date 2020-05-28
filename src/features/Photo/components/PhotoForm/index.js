import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import InputField from "custom-fields/InputField";
import RandomPhotoField from "custom-fields/RandomPhotoField";
import SelectField from "custom-fields/SelectField";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup } from "reactstrap";

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm() {
  // npm i --save react-select
  const initialValues = {
    title: "",
    categoryId: null,
    photo: ""
  }

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {(formilProps) => {
        const { values, errors, touched } = formilProps;
        console.log({values, errors, touched})

        return (
          <Form>
            <FastField
              name="title"
              component={InputField}

              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}

              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField 
              name="photo"
              component={RandomPhotoField}

              label="Photo"
            />

            <FormGroup>
              <Button type="submit" color="primary">Add to album</Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;