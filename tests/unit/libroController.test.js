const {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
} = require("../../src/controllers/libroController");

const libroModel = require("../../src/models/libroModel");

jest.mock("../../src/models/libroModel");

describe("Libro Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllLibros deberia obtener todos los libros", async () => {
    const mockLibros = [
      { titulo: "Libro 1", autor: "Autor 1" },
      { titulo: "Libro 2", autor: "Autor 2" },
    ];

    libroModel.find.mockResolvedValue(mockLibros);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllLibros(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLibros);
  });

  test("getAllLibros deberia manejar errores", async () => {
    const errorMessage = "Error al obtener los libros";

    libroModel.find.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllLibros(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    expect(libroModel.find).toHaveBeenCalledTimes(1);
  });

  test("getLibroById deberia obtener un libro", async () => {
    const mockLibro = { id: "1", titulo: "Libro X", autor: "Autor X" };
    libroModel.findById.mockResolvedValue(mockLibro);

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getLibroById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLibro);
  });

  test("createLibro deberia crear un libro", async () => {
    const mockLibro = { id: "1", titulo: "Libro Creado", autor: "Autor" };

    mockLibro.save = () => {};

    libroModel.create.mockResolvedValue(mockLibro);

    const req = { body: mockLibro };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createLibro(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockLibro);
  });

  test("updateLibro deberia actualizar un libro", async () => {
    const mockLibro = { id: "1", titulo: "Libro Actualizado", autor: "Autor" };

    libroModel.findByIdAndUpdate.mockResolvedValue(mockLibro);

    const req = { params: { id: "1" }, body: mockLibro };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateLibro(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLibro);
  });

  test("deleteLibro deberia eliminar un libro", async () => {
    const mockLibroEliminado = {
      id: "1",
      titulo: "Libro Eliminado",
      autor: "Autor",
    };

    libroModel.findByIdAndRemove.mockResolvedValue(mockLibroEliminado);

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteLibro(req, res);

    expect(libroModel.findByIdAndRemove).toHaveBeenCalledWith(req.params.id);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLibroEliminado);
  });
});
