export interface Inscription {
  curso:     Curso;
  usuario:   Usuario;
  createdAt: Date;
  updatedAt: Date;
}

export interface Usuario {
  id:           number;
  nombre:       string;
  correo:       string;
  password:     string;
  tipo_usuario: string;
  createdAt:    Date;
  updatedAt:    Date;
}

export interface Curso {
  id:            number;
  nombre:        string;
  descripcion:   string;
  carga_horaria: number;
  createdAt:     Date;
  updatedAt:     Date;
  InstitucionId: null;
}
