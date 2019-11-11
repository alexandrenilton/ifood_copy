export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string) { }

  matches(another: User): boolean {
    return another !== undefined
      && another.email === this.email
      && another.password === this.password;
  }
}
// chave do tipo string e retorno valor do tipo User
export const users: { [key: string]: User } = {
  'alexandrenilton@gmail.com': new User('alexandrenilton@gmail.com', 'Alexandre Six', 'alexandre'),
  'alexandre.matos@unidesc.edu.br': new User('alexandre.matos@unidesc.edu.br', 'Alexandre Matos', 'alexandre')
}
