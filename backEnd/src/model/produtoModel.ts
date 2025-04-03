import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class ProdutoModel extends Model {
  id_produto: number | undefined;
  nome: string | undefined;
  descricao: string | undefined;
  preco: number | undefined;
  createdAt: number | undefined;
  updatedBy: number | undefined;
}

ProdutoModel.init(
  {
    id_produto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Produto",
    tableName: "produtos",
  }
);
