import request from "supertest";
import app from "../app";
import { closePool } from "../config/db";

describe("Clientes Controller", () => {
  afterAll(async () => {
    await closePool();
  });

  it("deve retornar lista de clientes", async () => {
    const res = await request(app).get("/api/clientes");

    if (res.status !== 200) {
      console.error("Erro:", res.body);
    }

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// src/test/clientes.test.ts
import { createClientesRouter } from "../routes/clientesRoutes";
import { mockClientesController } from "./mocks/mockClientesController";

const app = express();
app.use("/api/clientes", createClientesRouter(mockClientesController));
