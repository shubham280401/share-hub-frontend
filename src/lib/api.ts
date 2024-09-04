import { API_METHOD_TYPES, BACKEND_URL } from "./constant";
import {
  HeaderType,
  CompleteUserData,
  SignUpData,
  CreatePostData,
  PostResponse,
  Skill,
} from "./types";

export const signUpUser = async (
  data: CompleteUserData,
  headers: HeaderType
) => {
  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: API_METHOD_TYPES.POST,
    ...headers,
    body: JSON.stringify(data),
  });

  const body = await response.json();
  console.log(body);
  if (!response.ok) {
    throw new Error(body.error || "Signup failed");
  }

  return body;
};

export const getUserProfile = async (headers: HeaderType) => {
  const response = await fetch(`${BACKEND_URL}/users/profile`, {
    method: API_METHOD_TYPES.GET,
    ...headers,
  });

  const body = await response.json();

  if (response.status !== 200) {
    throw new Error(body);
  }

  return body;
};

//login user
export const loginUser = async (data: SignUpData, headers: HeaderType) => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: API_METHOD_TYPES.POST,
    ...headers,
    body: JSON.stringify(data),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || "Login failed");
  }

  return body;
};

//create posts
export const createPost = async (
  data: CreatePostData,
  headers: HeaderType
): Promise<PostResponse> => {
  const response = await fetch(`${BACKEND_URL}/posts`, {
    method: API_METHOD_TYPES.POST,
    ...headers,
    body: JSON.stringify(data),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || "Post creation failed");
  }

  return body;
};

//get tags
export const getSkills = async (headers: HeaderType): Promise<Skill[]> => {
  const response = await fetch(`${BACKEND_URL}/posts/tags`, {
    method: API_METHOD_TYPES.GET,
    ...headers,
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || "Failed to fetch skills");
  }

  return body.data;
};
//get posts

export const getPosts = async (headers: HeaderType) => {
  const response = await fetch(`${BACKEND_URL}/posts`, {
    method: API_METHOD_TYPES.GET,
    ...headers,
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || "Failed to fetch posts");
  }

  return body.data;
};

//get posts by id
export const getPostById = async (postId: number, headers: HeaderType) => {
  const response = await fetch(`${BACKEND_URL}/posts/${postId}`, {
    method: API_METHOD_TYPES.GET,
    ...headers,
  });

  const body = await response.json();
  console.log("This is body of get post by id", body);
  if (!response.ok) {
    throw new Error(body.error || "Failed to fetch post details");
  }

  return body;
};
