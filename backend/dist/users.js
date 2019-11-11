"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined
            && another.email === this.email
            && another.password === this.password;
    };
    return User;
}());
exports.User = User;
// chave do tipo string e retorno valor do tipo User
exports.users = {
    'alexandrenilton@gmail.com': new User('alexandrenilton@gmail.com', 'Alexandre Six', 'alexandre'),
    'alexandre.matos@unidesc.edu.br': new User('alexandre.matos@unidesc.edu.br', 'Alexandre Matos', 'alexandre')
};
