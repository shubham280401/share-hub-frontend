export type HeaderType = {
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
};

export type SignUpData = {
  email: string;
  password: string;
};

export type CompleteUserData = SignUpData & {
  firstName: string;
  lastName: string;
};
export type SignupResponse = {
  data: {
    jwtToken: string;
    user: {
      email: string;
      firstName: string;
      lastName: string;
      id: number;
    };
  };
  message: string;
  error: string | null;
};
export type LoginResponse = {
  data: {
    jwtToken: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  message: string;
  error: string | null;
};

export type CreatePostData = {
  title: string;
  thumbnailUrl?: string;
  articleLink: string;
  description: string;
  tagIds: number[];
  newTags?: string[];
  videoLink?: string;
};

export type Skill = {
  id: number;
  name: string;
};

export type PostResponse = {
  data: {
    userId: number;
    description: string;
    title: string;
    thumbnailUrl: string;
    videoLink: string;
    articleLink: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    id: number;
  };
  message: string;
  error: string | null;
};
