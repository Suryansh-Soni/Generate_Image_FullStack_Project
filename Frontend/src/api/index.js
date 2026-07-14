import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const GetPost = async () => {
  return await API.get("/post");
};

export const CreatePost = async (data) => {
  return await API.post("/post", data);
};

export const GenerateImage = async (data) => {
  return await API.post("/generate_image", data);
};
