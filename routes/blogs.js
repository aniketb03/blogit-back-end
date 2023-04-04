import express from "express";
import {
  createBlogs,
  deleteBlogById,
  getAllBlogs,
  getBlogbyId,
  updateBlogById,
} from "./helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await createBlogs(data);
  response.send(result);
});

router.get("/", async function (request, response) {
  const Blogs = await getAllBlogs(request);
  response.status(200).send(Blogs);
});

// Get Movies by ID
router.get("/:id", auth, async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // db.movies.findOne({id:"101"});
  const movie = await getBlogbyId(id);
  // const movie = movies.find((mv) => mv.id == id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send("Error: Movie not found ");
});

router.delete("/:id", auth, async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  // db.movies.deleteOne({id:"101"});
  const result = await deleteBlogById(id);
  // const movie = movies.find((mv) => mv.id == id);
  console.log(result);
  result.deletedCount > 0
    ? response.send("Blog Deleted Succesfully☠️")
    : response.status(404).send("Error: Blog not found ");
});

router.post("/", auth, async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data);
  const result = await createBlogs(data);
  response.send(result);
});

router.put("/:id", auth, async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  const data = request.body;
  // db.movies.updateOne({id:"101"},{$set:data});
  const result = await updateBlogById(id, data);
  response.send(result);
});

export const blogRouter = router;
