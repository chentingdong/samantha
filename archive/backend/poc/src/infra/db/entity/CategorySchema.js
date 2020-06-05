const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Category = require("../../../models/Category").Category; // import {Category} from "../model/Category";

module.exports = new EntitySchema({
  name: "Category",
  tableName: "Category",
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
