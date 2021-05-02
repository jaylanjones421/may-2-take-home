import React from "react";
import PropTypes from "prop-types";
import Field from "../Field/Field";

export default function FormBuilder({ data, submitAction }) {
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    const initializedFormData = {};
    data.forEach((field) =>
      field.type !== "checkbox"
        ? (initializedFormData[field.name] = "")
        : (initializedFormData[field.name] = false)
    );
    setFormData(initializedFormData);
  }, [data]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    const updatedFormData = { ...formData };
    if (type === "checkbox") {
      updatedFormData[id] = !formData[id];
    } else {
      updatedFormData[id] = value;
    }
    setFormData(updatedFormData);
  };

  const renderDataFields = data.map((field, i) => {
    return field.conditional ? (
      field.conditional.show_if(formData[field.conditional.name]) && (
        <Field
          key={`${data.name}-${i}`}
          data={{ ...field, value: formData[field.name] }}
          action={handleChange}
        />
      )
    ) : (
      <Field
        key={`${data.name}-${i}`}
        data={{
          ...field,
          value: formData[field.name],
          checked: formData[field.name],
        }}
        action={handleChange}
      />
    );
  });

  const clearForm = () => {
    const clearedForm = {};
    Object.keys(formData).forEach((key) => (clearedForm[key] = ""));
    setFormData(clearedForm);
  };
  const handleSubmit = () => {
    submitAction(formData);
    clearForm();
  };
  const isSubmitDisabled =
    data.filter((field) => !field.conditional && formData[field.name] === "")
      .length > 0;

  return (
    <div data-testid="form-container" className="form-container">
      {renderDataFields}
      <button
        key="button"
        data-testid="form-submit"
        className="form-submit"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </div>
  );
}

FormBuilder.propTypes = {
  data: PropTypes.array,
  submitAction: PropTypes.func,
};
