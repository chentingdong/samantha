import { useState } from "react";

function useFormFields (initialState) {
  const [fields, setValues] = useState(initialState);
  return [
    fields,
    function(event) {
      if (event.target !== undefined) {
        setValues({
          ...fields,
          [event.target.name]: event.target.value
        });
      }
      else if (this.name !== undefined) {
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
