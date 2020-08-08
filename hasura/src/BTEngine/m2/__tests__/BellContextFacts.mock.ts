import { Block, BellContextFacts } from "../../../types"

const context: BellContextFacts = {
  task: {
    "8o_yyJjEDKmhsRA1gIlv7": {
      fields: [
        {
          optional: false,
          question: "Do you approve this purchase?",
          response_type: "SingleSelect",
          select_options: ["Approve", "Reject", "Reject for Edit"],
        },
      ],
    },
    ZKinThbIS7TwdHA49RpZp: {
      fields: [
        {
          optional: true,
          question: "Is it capitalizable?",
          response: "No",
          response_type: "SingleSelect",
          select_options: ["Yes", "No"],
        },
      ],
    },
    "zFi6jh6a-pkIEXi1_8-md": {
      fields: [
        {
          optional: true,
          question: "What is the depreciation period",
          response: "10+ years",
          response_type: "SingleSelect",
          select_options: ["<5 years", "5-10 years", "10+ years"],
        },
      ],
    },
    vuJeHylhqX0YbTVtgDsZ7: {
      fields: [
        {
          optional: false,
          question: "How much do you need to budget in dollars?",
          response: 1234,
          min_value: 0,
          response_type: "Decimal",
        },
      ],
    },
    "cO64qn3wioY6O7h_LOi-L": {
      fields: [
        {
          optional: false,
          question: "What are you purchasing?",
          response: "A new HVAC machine",
          response_type: "Text",
          max_field_size: 128,
          min_field_size: 4,
        },
      ],
    },
    Fw2rwZaa27CIyilQKNqge: {
      fields: [
        {
          optional: false,
          question: "What categories describe this purchase?",
          response: "Heating/Cooling",
          response_type: "MultiSelect",
          select_options: ["Heating/Cooling", "services", "other"],
        },
      ],
    },
  },
}

export default context
