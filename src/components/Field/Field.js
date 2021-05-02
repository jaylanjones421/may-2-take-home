import React from "react";
import PropTypes from "prop-types";

export default function Field({ data, action }) {
  return (
    <div data-testid="field-container" className="field-container">
      <label data-testid="field-label" className="field-label">
        {data.human_label}
      </label>
      <input
        data-testid={`${data.name}-input`}
        id={data.name}
        className={data.type !== "checkbox" ? "field-input" : "field-checkbox"}
        onChange={action}
        type={data.type}
        value={data.value}
        checked={data.value}
      />
    </div>
  );
}

Field.propTypes = {
  data: PropTypes.object,
  action: PropTypes.func,
};
