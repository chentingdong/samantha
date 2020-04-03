import {useState} from 'react';

function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);
  return [
    fields,
    function (event) {
      if (event.target) {
        if (
          event.target.tagName.toLowerCase() === 'select' &&
          'multiple' in event.target.attributes
        ) {
          // multiple select
          let values = [];
          event.target.childNodes.forEach((option) => {
            if (
              option.selected &&
              option.value &&
              values.indexOf(option.value) === -1
            )
              values.push(option.value);
          });
          setValues({
            ...fields,
            [event.target.name]: values,
          });
        } else {
          // exp. input, textarea, single select.
          setValues({
            ...fields,
            [event.target.name]: event.target.value,
          });
        }
      } else if (this && this.name) {
        // exp. datepicker field.
        setValues({
          ...fields,
          [this.name]: event,
        });
      }
    },
  ];
}

export {useFormFields};
