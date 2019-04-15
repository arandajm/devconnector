import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        // Link state with the field
        value={value}
        // Bind field with onChange event
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (
        // If error has a value, show the error message
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

// Define component props
TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
