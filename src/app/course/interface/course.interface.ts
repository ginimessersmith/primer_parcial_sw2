export interface Course {
  id:            number;
  nombre:        string;
  descripcion:   string;
  carga_horaria: number;
  InstitucionId: number;
  updatedAt:     Date;
  createdAt:     Date;
}
