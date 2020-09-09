export class rBusqueda {
  constructor(public id_resolucion: string,
    public num_general_resolucion: string,
    public num_resolucion: string,
    public expediente_resolucion: string,
    public fecha_resolucion: string,
    public descripcion_resolucion: string,
    public oficina_origen: Number,
    public motivo_resolucion: Number,
    public pdf_resolucion: string,
    public anexo_resolucion: string,
    public tipo_resolucion: Number,
    //public createdAt: String,
    //  public descripcion_motivo: string,

    //  public num_expediente: string,


    // public cod_tipo: Number,
    //  public descripcion_tipo:string,

    //  public desc_oficina: string,
    //  public dep: string,
    public codDep: Number,
    public id_area: Number,


    public link_ftp: String,
    public nombre: String,
    public apellido: String,
    public dni: Number
  ) { }
}
