export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  role: string;
}
export interface LoginRequest {
  userName: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  refreshToken: string;
  userName: string;
  email: string;
  role: string;
}

export const registerUser = async (data: RegisterRequest): Promise<void> => {
  const response = await fetch("http://localhost:5067/api/Auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Registration failed");
  }
};
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:5067/api/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Login failed");
  }

  const result = await response.json();
  return result.message;
};
