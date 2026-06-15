import type { LoginResponseData } from "../types/auth.types";

export class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string | undefined) {
    if (!baseUrl) {
      throw new Error("AuthService requiere una baseUrl válida.");
    }
    this.baseUrl = baseUrl;
  }

  async login(
    usuario: string,
    contrasenia: string,
  ): Promise<LoginResponseData> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, contrasenia }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.error || "Error al iniciar sesión");
    }

    return resData.data as LoginResponseData;
  }
}

const API_URL = import.meta.env.VITE_API_URL;
export const authService = new AuthService(API_URL);
