import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import bcrypt from "bcrypt";

class ClienteModel extends Model {
  id_cliente: number | undefined;
  nome: string | undefined;
  email: string | undefined;
  senha: string | undefined;
  updatedBy: number | undefined;

  public async hashSenha() {
    this.senha = await bcrypt.hash(this.senha!, 10);
  }

  public async validateSenha(senha: string): Promise<boolean> {
    return await bcrypt.compare(senha, this.senha!);
  }
}

ClienteModel.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "clientes",
  }
);

ClienteModel.beforeCreate(async (cliente: ClienteModel) => {
  await cliente;
});

ClienteModel.beforeUpdate(async (cliente: ClienteModel) => {
  if (cliente.changed("senha")) {
    await cliente.hashSenha();
  }
});

export default ClienteModel;
