import { useState } from "react";

function useFormFields (initialState) {
  const [ fields, setValues ] = useState( initialState );
  return [
    fields,
    function(event) {
      if (event.target) {
        // exp. input, textarea, select.
        setValues({
          ...fields,
          [event.target.name]: event.target.value
        });
      }
      else if (this && this.name ) {
        // exp. datepicker field.
        setValues({
          ...fields,
          [this.name]: event
        })
      }
    }
  ];
}

export { useFormFields };
