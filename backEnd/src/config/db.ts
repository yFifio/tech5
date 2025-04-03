import { Sequelize } from "sequelize";

const sequelize = new Sequelize("loja_roupas", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
