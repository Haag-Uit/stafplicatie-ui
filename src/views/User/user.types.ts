interface User {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface CreateUser {
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

interface EditUser {
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export type { User, CreateUser, EditUser };
