export const mockClientesController = {
  getAllClientes: jest.fn((req, res) =>
    res.status(200).json([{ id: 1, nome: "Teste" }])
  ),
};
