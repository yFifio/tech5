import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class PagamentoModel extends Model {
  id_pagamento: number | undefined;
  forma_pagamento: string | undefined;
  createdAt: number | undefined;
  updatedBy: number | undefined;
}

PagamentoModel.init(
  {
    id_pagamento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    forma_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Pagamento",
    tableName: "pagamentos",
  }
);
