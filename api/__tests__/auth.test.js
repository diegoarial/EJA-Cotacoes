import request from "supertest";
import app from "../index.js";
import jwt from "jsonwebtoken";

//Substitui o BD por um falso, para evitar conexões reais durante o teste.
jest.mock("../db.js", () => ({
  db: {
    query: jest.fn(),
  },
}));

//Controla como o token vai ser gerado e validado durante os testes.
jest.mock("jsonwebtoken");

const { db } = require("../db.js");

//Agrupa os testes relacionados ao login e garante que após cada teste o mock (falso) vai ser limpo.
describe("Auth Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /login", () => {
    it("Deve retornar um token e dados do administrador para credenciais válidas", async () => {
      //Configura o mock para simular o comportamento do banco de dados ao retornar um administrador válido.
      db.query.mockImplementation((query, params, callback) => {
        callback(null, [{ idAdm: 1, usuario: "digdin", senha: "diegu2" }]);
      });

      //Garante que a função de geração de token sempre retorne um valor controlado.
      jwt.sign.mockReturnValue("fakeToken123");

      //Simula uma requisição POST para o endpoint /login com as credenciais enviadas.
      const response = await request(app)
        .post("/auth/login")
        .send({ usuario: "digdin", senha: "diegu2" });

      expect(response.status).toBe(200);
      //Garante que o corpo da resposta contém o token e os dados do administrador.
      expect(response.body).toHaveProperty("token", "fakeToken123");
      expect(response.body.administrador).toEqual(
        expect.objectContaining({ idAdm: 1, usuario: "digdin" })
      );
    });

    it("Deve retornar erro 404 para usuário não encontrado.", async () => {
      //Simula o banco retornando uma lista vazia, indicando que o usuário não foi encontrado.
      db.query.mockImplementation((query, params, callback) => {
        callback(null, []);
      });

      //Faz uma requisição de login com credenciais inválidas.
      const response = await request(app)
        .post("/auth/login")
        .send({ usuario: "wrongUser", senha: "diegu2" });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Usuário não encontrado");
    });

    it("Deve retornar erro 401 para senha inválida.", async () => {
      // Simula o banco retornando um usuário válido, mas com a senha incorreta.
      db.query.mockImplementation((query, params, callback) => {
        callback(null, [{ idAdm: 1, usuario: "digdin", senha: "diegu2" }]);
      });

      //Faz uma requisição de login com credenciais inválidas.
      const response = await request(app)
        .post("/auth/login")
        .send({ usuario: "digdin", senha: "wrongPassword" });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Senha inválida");
    });
  });

  describe("Auth Middleware", () => {
    it("Deve retornar erro 401 se o token não for fornecido", async () => {
      const response = await request(app).get("/administrador");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Token não fornecido");
    });

    it("Deve retornar erro 401 para token inválido", async () => {
      //Configura o mock para simular um token inválido, retornando um erro.
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Token inválido"), null);
      });

      //Faz uma requisição à rota protegida passando um token inválido.
      const response = await request(app)
        .get("/administrador")
        .set("Authorization", "Bearer invalidToken123");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Token inválido");
    });
  });
});
