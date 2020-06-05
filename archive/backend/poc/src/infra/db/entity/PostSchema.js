const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Post = require("../../../models/Post").Post; // import {Post} from "../model/Post";
const Category = require("../../../models/Category").Category; // import {Category} from "../model/Category";

module.exports = new EntitySchema({
  name: "Post",
  tableName: "Post",
  target: Post,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    text: {
      type: "text",
    },
  },
  relations: {
    categories: {
      target: "Category",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});
