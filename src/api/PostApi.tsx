import axios from "axios";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostInput = {
  title: string;
  body: string;
};

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPost = () => {
  return api.get<Post[]>("/posts");
};

export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

export const postData = (post: PostInput) => {
  return api.post<Post>("/posts", post);
};

export const updateData = (id: number, post: PostInput) => {
  return api.put<Post>(`/posts/${id}`, post);
};
