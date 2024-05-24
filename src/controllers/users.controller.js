const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  /* UM CONTROLLER POSSUI NO MÁXIMO 5 MÉTODOS SEGUINDO AS BOAS PRÁTICAS, OS MÉTODOS SÃO OS SEGUINTES:
   * INDEX: GET para listar vários registros;
   * SHOW: GET para exibir um registro específico;
   * CREATE: POST para criar um registro;
   * UPDATE: PUT para atualizar um registro;
   * DELETE: DELETE para remover um registro.
   ! SE FOR NECESSÁRIO CRIAR MAIS DO QUE ESTES 5 MÉTODOS, SIGNIFICA QUE VALE A PENA CRIAR UM NOVO CONTROLLER
   */

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este email já está em uso!");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES ((?), (?), (?))",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha!"
      );
    }

    if (password && old_password) {
      const checkOldPassoword = await compare(old_password, user.password);

      if (!checkOldPassoword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
