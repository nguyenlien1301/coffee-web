export type TActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};

export type TMenuItem = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};

// user params
export type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};
