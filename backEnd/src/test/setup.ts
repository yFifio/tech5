import { closePool } from "../config/db";

afterAll(async () => {
  await closePool(); // Implemente esta função no seu db.ts
});
