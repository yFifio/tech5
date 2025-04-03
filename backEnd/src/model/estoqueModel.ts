import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { ProdutoModel } from "./produtoModel";

class EstoqueModel extends Model {
  id_estoque!: number;
  id_produto!: number;
  quantidade!: number;
  pdatedBy!: number;
}

EstoqueModel.init(
  {
    id_produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: EstoqueModel,
        key: "id_produto",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Estoque",
    tableName: "estoques",
  }
);

EstoqueModel.beforeCreate(async (estoque: EstoqueModel) => {
  await estoque;
});

export default EstoqueModel;

EstoqueModel.belongsTo(ProdutoModel, { foreignKey: "id_produto" });
