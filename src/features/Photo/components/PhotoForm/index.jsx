import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import InputField from "custom-fields/InputField";
import RandomPhotoField from "custom-fields/RandomPhotoField";
import SelectField from "custom-fields/SelectField";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  isAddMode: PropTypes.bool.isRequired,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required("This field is required."),
  categoryId: Yup.number().required("This field is required.").nullable(),
  photo: Yup.string().when("categoryId", {
    is: 1,
    then: Yup.string().required("This field is required."),
    otherwise: Yup.string().notRequired(),
  }),
});

function PhotoForm(props) {
  // npm i --save react-select
  const { initialValues, isAddMode } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

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
              {isAddMode ? (
                <Button disabled={isSubmitting} type="submit" color="primary">
                  Add to album
                </Button>
              ) : (
                <Button disabled={isSubmitting} type="submit" color="success">
                  Edit photo
                </Button>
              )}
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
