export interface UserSessionData {
  username: string;
  role: string;
}

export class LandingApi {
  // Simula obtener los datos básicos del usuario que acaba de loguearse
  async getCurrentUser(): Promise<UserSessionData> {
    return {
      username: "Usuario Administrador",
      role: "Admin",
    };
  }
}

export const landingApi = new LandingApi();
