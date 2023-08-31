export class CreateUser {
  username: string;
  password: string;

  constructor(data: CreateUser) {
    this.username = data.username;
    this.password = data.password;
  }
}

export class User extends CreateUser {
  _id: number;

  constructor(data: User) {
    super(data);
    this._id = data._id;
  }
}
