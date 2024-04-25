export interface CreateUserResponse {
  id:           number;
  nombre:       string;
  correo:       string;
  password:     string;
  tipo_usuario: string;
  updatedAt:    Date;
  createdAt:    Date;
}
