import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { VendaModel } from "./vendaModel";
import { ProdutoModel } from "./produtoModel";

export class itemVendaModel extends Model {
  id_item!: number;
  id_venda!: number;
  id_produto!: number;
  quantidade!: number;
  preco!: number;
  createdAt: number | undefined;
  updatedBy: number | undefined;
}

itemVendaModel.init(
  {
    id_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_venda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: VendaModel,
        key: "id_venda",
      },
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProdutoModel,
        key: "id_produto",
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ItensVenda",
    tableName: "itens_venda",
    timestamps: false,
  }
);
