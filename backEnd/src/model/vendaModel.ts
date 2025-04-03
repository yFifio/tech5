import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import Cliente from "./clienteModel";
export class VendaModel extends Model {
  id_venda!: number;
  id_cliente!: number | null;
  data_venda!: Date;
  valor_total!: number;
  numero_cartao!: string;
  validade!: string;
  cvv!: string;
  nome_completo!: string;
  endereco!: string;
  cidade!: string;
  estado!: string;
  cep!: string;
  createdAt!: number | undefined;
  updatedBy!: number | undefined;
}

VendaModel.init(
  {
    id_venda: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Cliente,
        key: "id_cliente",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    data_venda: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    numero_cartao: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    validade: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    nome_completo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Venda",
    tableName: "vendas",
  }
);

VendaModel.belongsTo(Cliente, { foreignKey: "id_cliente" });
