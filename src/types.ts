export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
}

export interface Launch {
  id: string;
  userId: string;
  date: string;
  success: boolean;
  destination: string;
}

export interface SocialLinks {
  instagram: string;
  telegram: string;
  github: string;
  website: string;
}