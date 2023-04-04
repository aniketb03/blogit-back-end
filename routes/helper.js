import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function createBlogs(data) {
  return await client
    .db("blog-node-router")
    .collection("blogs")
    .insertOne(data);
}
export async function getAllBlogs(request) {
  return await client
    .db("blog-node-router")
    .collection("blogs")
    .find(request.query)
    .toArray();
}

export async function getBlogbyId(id) {
  return await client
    .db("blog-node-router")
    .collection("blogs")
    .findOne({ _id: new ObjectId(id) });
}

export async function deleteBlogById(id) {
  return await client
    .db("blog-node-router")
    .collection("blogs")
    .deleteOne({ _id: new ObjectId(id) });
}
export async function updateBlogById(id, data) {
  return await client
    .db("blog-node-router")
    .collection("blogs")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function createUser(data) {
  return await client
    .db("blog-node-router")
    .collection("users")
    .insertOne(data);
}
export async function getUserByName(userName) {
  return await client
    .db("blog-node-router")
    .collection("users")
    .findOne({ userName: userName });
}
