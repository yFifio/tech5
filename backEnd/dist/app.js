"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const produtosRoutes_1 = __importDefault(require("./routes/produtosRoutes"));
const pagamentosRoutes_1 = __importDefault(require("./routes/pagamentosRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/clientes", clientesRoutes_1.default);
app.use("/api/produtos", produtosRoutes_1.default);
app.use("/api/pagamentos", pagamentosRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
