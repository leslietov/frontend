export class Mail {
  constructor(
    public id_correo: number,
    public email: string,
    public cratedAt: string,
    public updateAt: string,
    public num_document: number,
    public id_group: number,
    public name_user: string,
    public type_document: number
  ){}
}
