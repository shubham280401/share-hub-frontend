import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  getUserProfile,
  signUpUser,
  loginUser,
  createPost,
  getSkills,
  getPosts,
  getPostById,
} from "./api";
import { useContext } from "react";
import { AppContext } from "../context/AppState";

import {
  CompleteUserData,
  SignupResponse,
  SignUpData,
  LoginResponse,
  PostResponse,
  CreatePostData,
} from "./types";

// Define all state types
const STATE_TYPES = {
  USER: "user",
  SKILLS: "skills",
};

// Hook to get the user profile
export function useUser() {
  const { headers } = useContext(AppContext);

  const getProfile = () => getUserProfile(headers);

  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: [STATE_TYPES.USER],
    queryFn: getProfile,
  });

  return { user, refetchUser };
}

// Hook to sign up a user

export function useSignUp(): UseMutationResult<
  SignupResponse,
  Error,
  CompleteUserData,
  unknown
> {
  const { headers, setAuthToken } = useContext(AppContext);

  return useMutation({
    mutationFn: (data: CompleteUserData) => signUpUser(data, headers),
    onSuccess: (response) => {
      const { jwtToken } = response.data;
      console.log(response.data);
      setAuthToken(jwtToken);

      console.log("User signed up successfully:", response);
    },
    onError: (error) => {
      console.error("Error during signup:", error);
    },
  });
}

//Hook to login user
export function useLogin(): UseMutationResult<
  LoginResponse,
  Error,
  SignUpData,
  unknown
> {
  const { headers, setAuthToken } = useContext(AppContext);

  return useMutation({
    mutationFn: (data: SignUpData) => loginUser(data, headers),
    onSuccess: (response) => {
      const { jwtToken } = response.data;
      setAuthToken(jwtToken);

      console.log("User logged in successfully:", response);
    },
    onError: (error) => {
      console.error("Error during login:", error);
    },
  });
}

//hook for create posts

export function useCreatePost(): UseMutationResult<
  PostResponse,
  Error,
  CreatePostData,
  unknown
> {
  const { headers } = useContext(AppContext);

  return useMutation({
    mutationFn: (data: CreatePostData) => createPost(data, headers),
    onSuccess: (response) => {
      console.log("Post created successfully:", response);
    },
    onError: (error) => {
      console.error("Error during post creation:", error);
    },
  });
}
//tags
export function useSkills() {
  const { headers } = useContext(AppContext);

  const { data: skills, refetch: refetchSkills } = useQuery<Skill[]>({
    queryKey: [STATE_TYPES.SKILLS],
    queryFn: () => getSkills(headers),
  });

  return { skills, refetchSkills };
}

//post hook
export function usePosts() {
  const { headers } = useContext(AppContext);

  const { data: posts, refetch: refetchPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(headers),
  });

  return { posts, refetchPosts };
}

//get posts hook

export function usePostDetails(postId: number) {
  const { headers } = useContext(AppContext);

  const {
    data: post,
    error,
    isLoading,
  } = useQuery<PostResponse>({
    queryKey: ["postDetails", postId],
    queryFn: async () => {
      console.log(`Fetching post details for ID: ${postId}`); // Debug log
      const response = await getPostById(postId, headers);
      console.log("Fetched Post Details:", response); // Debug log
      return response;
    },
    enabled: !!postId, // Ensures the query runs only if postId is valid
  });

  console.log("Post from usePostDetails hook:", post); // Debug log
  console.log("Error from usePostDetails hook:", error); // Debug log
  console.log("Is loading from usePostDetails hook:", isLoading); // Debug log

  return { post, error, isLoading };
}
