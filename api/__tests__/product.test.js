import request from "supertest";
import app from "../index.js";
import jwt from "jsonwebtoken";

// Substitui o BD por um falso, para evitar conexões reais durante o teste.
jest.mock("../db.js", () => ({
  db: {
    query: jest.fn(),
  },
}));

jest.mock("jsonwebtoken");

const { db } = require("../db.js");

describe("CRUD Produtos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /produto", () => {
    it("Deve retornar um status 200 de produto cadastrado com sucesso.", async () => {
        jwt.verify.mockImplementation(() => ({ id: 1, usuario: "digdin" }));

      db.query.mockImplementation((query, params, callback) => {
        console.log("Query executada!");
        callback(null, { affectedRows: 1 });
      });

      const response = await request(app)
        .post("/produto")
        .set("Authorization", "Bearer fakeToken123")
        .send({
          titulo: "teste",
          precoVenda: 23.50,
          precoCusto: 10.25,
          peso: 500,
          altura: 100,
          largura: 100,
          profundidade: 100,
        });

      console.log("Status da resposta:", response.status);  // Verifique o status da resposta
      console.log("Resposta do corpo:", response.body);  // Verifique o corpo da resposta

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Produto cadastrado com sucesso.");
    });
  });
});
