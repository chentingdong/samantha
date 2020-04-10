const { getConnectionManager, createConnection } = require("typeorm"); // import * as typeorm from "typeorm";
const Post = require("../../core/models/Post").Post; // import {Post} from "./model/Post";
const Category = require("../../core/models/Category").Category; // import {Category} from "./model/Category";
const { isOffline } = require("../../utils");

module.exports.testTypeOrm = async (event, context) => {
  const connection = getConnectionManager().has("default")
    ? getConnectionManager().get("default")
    : await createConnection();

  const category1 = new Category(0, "TypeScript");
  const category2 = new Category(0, "Programming");

  await connection.manager.save([category1, category2]);

  let post = new Post();
  post.title = "Control flow based type analysis";
  post.text =
    "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.";
  post.categories = [category1, category2];

  let postRepository = connection.getRepository(Post);
  const savedPost = await postRepository.save(post);
  console.log("Post has been saved: ", savedPost);
  console.log("Now lets load all posts: ");

  const results = await postRepository.find();
  // await connection.close();
  return results;
};
