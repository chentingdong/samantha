import { useState } from "react";

function useFormFields ( initialState ) {
  const [ fields, setValues ] = useState( initialState );
  return [
    fields,
    function ( event ) {
      if ( event.target ) {
        if ( event.target.tagName.toLowerCase() === 'select' && 'multiple' in event.target.attributes ) {
          let value = [];
          event.target.childNodes.forEach( option => {
            if ( option.selected && option.value ) value.push( option.value );
          } );
          setValues( {
            ...fields,
            [ event.target.name ]: value
          } );
        }
        else {
          // exp. input, textarea, select.
          setValues( {
            ...fields,
            [ event.target.name ]: event.target.name.push( event.target.value )
          } );
        }
      }
      else if ( this && this.name ) {
        // exp. datepicker field.
        setValues( {
          ...fields,
          [ this.name ]: event
        } );
      }
    }
  ];
}

export { useFormFields };
