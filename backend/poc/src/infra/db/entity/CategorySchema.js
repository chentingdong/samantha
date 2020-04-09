const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Category = require("../../../core/models/Category").Category; // import {Category} from "../model/Category";

module.exports = new EntitySchema({
  name: "Category",
  target: Category,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
});
