import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "./api";
import { useContext } from "react";
import { AppContext } from "../context/AppState";

// list all keys used in hook
const STATE_TYPES = {
  USER: "user",
};

// write your react query hooks
export function useUser() {
  const { headers } = useContext(AppContext);

  const getProfile = () => getUserProfile(headers);

  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: [STATE_TYPES.USER],
    queryFn: getProfile,
  });

  return { user, refetchUser };
}
