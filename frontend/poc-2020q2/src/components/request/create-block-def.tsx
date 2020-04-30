import * as React from 'react'
import FormBuilder from 'react-form-builder2'

function CreateRequestDef() {
  let items = [
    {
      key: 'Header',
      name: 'Header Text',
      icon: 'fa fa-header',
      static: true,
      content: 'Placeholder Text...',
    },
    {
      key: 'Paragraph',
      name: 'Paragraph',
      static: true,
      icon: 'fa fa-paragraph',
      content: 'Placeholder Text...',
    },
  ]

  return (
    <div className="h-100">
      <h2>create a block definition</h2>
      <FormBuilder.ReactFormBuilder
        className="h-100"
        url="../../../data/form.json"
        // toolbarItems={items}
        saveUrl="../../../data/form.json"
      />
      {/* <FormBuilder.ReactFormGenerator
        // form_action="/path/to/form/submit"
        // form_method="POST"
        // answer_data={JSON_ANSWERS}
        // authenticity_token={AUTH_TOKEN}
        // data={JSON_QUESTION_DATA}
        task_id={12} // Used to submit a hidden variable to the form from the database.
      /> */}
    </div>
  )
}

export { CreateRequestDef }
