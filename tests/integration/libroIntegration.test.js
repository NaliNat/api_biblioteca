const request = require("supertest");
const app = require("../../src/app");
const libroModel = require("../../src/models/libroModel");

jest.mock("express-oauth2-jwt-bearer", () => {
  return {
    auth: jest.fn().mockImplementation(() => (req, res, next) => next()),
    requiredScopes: jest
      .fn()
      .mockImplementation(() => (req, res, next) => next()),
  };
});

jest.mock("../../src/models/libroModel");

describe("Libro API", () => {
  test("Obtener la lista de libros", async () => {
    const response = await request(app).get("/api/libros");

    expect(response.statusCode).toBe(200);
  });

  test("Crear un libro", async () => {
    const nuevoLibro = { id: "1", titulo: "Libro Nuevo", autor: "Autor Nuevo" };
    nuevoLibro.save = () => {};

    libroModel.create.mockResolvedValue(nuevoLibro);

    const response = await request(app).post("/api/libros").send(nuevoLibro);

    expect(response.statusCode).toBe(201);
    expect(libroModel.create).toHaveBeenCalledTimes(1);
  });
});
