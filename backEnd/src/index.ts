import express from "express";
import produtoRoutes from "./routes/produtoRoutes";
import clienteRoutes from "./routes/clientesRoutes";
import pagamentoRoutes from "./routes/pagamentoRoutes";
import vendaRoutes from "./routes/vendaRouter";
import estoqueRoutes from "./routes/estoqueRoutes";
import itemVendaRoutes from "./routes/itemVendaRoutes";
import cors from "cors";
import sequelize from "./config/db";
import { loginCliente } from "./controllers/loginController";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(clienteRoutes);

app.use(produtoRoutes);

app.use(pagamentoRoutes);

app.use(vendaRoutes);

app.use(estoqueRoutes);

app.use(itemVendaRoutes);

app.use(loginCliente);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("deu zica no bagulho", error);
  });

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
