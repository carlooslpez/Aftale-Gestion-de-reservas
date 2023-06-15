const request = require('supertest');
const app = require('../app'); // Importa tu archivo principal de la aplicación Express
const connection = require('../db');

describe('API endpoints', () => {
  // Antes de cada prueba, establece una conexión temporal a la base de datos de prueba
  beforeEach(() => {
    connection.connect();
  });

  // Después de cada prueba, cierra la conexión a la base de datos
  afterEach(() => {
    connection.end();
  });

  // Prueba el endpoint POST '/empresa-servicio/:id_servicio'
  describe('POST /empresa-servicio/:id_servicio', () => {
    it('should return the information of the empresa-servicio with the specified id_servicio', async () => {
      const servicioId = 1; // Reemplaza con el ID válido de un servicio existente en tu base de datos de prueba
      const response = await request(app).post(`/empresa-servicio/${servicioId}`);
      expect(response.status).toBe(200);
      
    });

    it('should return a 404 status if the empresa-servicio is not found', async () => {
      const invalidServicioId = 999; // Reemplaza con un ID de servicio que no exista en tu base de datos de prueba
      const response = await request(app).post(`/empresa-servicio/${invalidServicioId}`);
      expect(response.status).toBe(404);
      
    });
  });

  // Prueba el endpoint POST '/empresa-servicio/id_empresa/:id_empresa'
  describe('POST /empresa-servicio/id_empresa/:id_empresa', () => {
    it('should return the information of the empresa-servicio with the specified id_empresa', async () => {
      const empresaId = 1; // Reemplaza con el ID válido de una empresa existente en tu base de datos de prueba
      const response = await request(app).post(`/empresa-servicio/id_empresa/${empresaId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      
    });

    it('should return a 404 status if the empresa-servicio is not found', async () => {
      const invalidEmpresaId = 999; // Reemplaza con un ID de empresa que no exista en tu base de datos de prueba
      const response = await request(app).post(`/empresa-servicio/id_empresa/${invalidEmpresaId}`);
      expect(response.status).toBe(404);
      
    });
  });

  // Prueba el endpoint GET '/empresa-servicio/id_categoria/:id_categoria'
  describe('GET /empresa-servicio/id_categoria/:id_categoria', () => {
    it('should return the information of the empresa-servicio with the specified id_categoria', async () => {
      const categoriaId = 1; // Reemplaza con el ID válido de una categoría existente en tu base de datos de prueba
      const response = await request(app).get(`/empresa-servicio/id_categoria/${categoriaId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      
    });

    it('should return a 404 status if no empresa-servicio is found for the specified id_categoria', async () => {
      const invalidCategoriaId = 999; // Reemplaza con un ID de categoría que no exista en tu base de datos de prueba
      const response = await request(app).get(`/empresa-servicio/id_categoria/${invalidCategoriaId}`);
      expect(response.status).toBe(404);
      
    });
  });

  // Prueba el endpoint POST '/borrar-empresa-servicio/:id_servicio/:id_empresa'
  describe('POST /borrar-empresa-servicio/:id_servicio/:id_empresa', () => {
    it('should delete the empresa-servicio relationship with the specified id_servicio and id_empresa', async () => {
      const servicioId = 1; // Reemplaza con el ID válido de un servicio existente en tu base de datos de prueba
      const empresaId = 1; // Reemplaza con el ID válido de una empresa existente en tu base de datos de prueba
      const response = await request(app).post(`/borrar-empresa-servicio/${servicioId}/${empresaId}`);
      expect(response.status).toBe(200);
      expect(response.text).toBe('Relación empresa-servicio eliminada con éxito');
      
    });

    it('should return a 404 status if the empresa-servicio relationship is not found', async () => {
      const invalidServicioId = 999; // Reemplaza con un ID de servicio que no exista en tu base de datos de prueba
      const invalidEmpresaId = 999; // Reemplaza con un ID de empresa que no exista en tu base de datos de prueba
      const response = await request(app).post(`/borrar-empresa-servicio/${invalidServicioId}/${invalidEmpresaId}`);
      expect(response.status).toBe(404);
      
    });
  });

  // Prueba el endpoint POST '/empresa-servicio'
  describe('POST /empresa-servicio', () => {
    it('should register a new empresa-servicio relationship', async () => {
      const newEmpresaServicio = {
        id_servicio: 1, // Reemplaza con el ID válido de un servicio existente en tu base de datos de prueba
        id_empresa: 1, // Reemplaza con el ID válido de una empresa existente en tu base de datos de prueba
        precio: 100, // Reemplaza con el precio válido que desees
      };

      const response = await request(app).post('/empresa-servicio').send(newEmpresaServicio);
      expect(response.status).toBe(200);
      expect(response.text).toBe('Relación empresa-servicio registrada con éxito');
      
    });

    it('should return a 500 status if an error occurs while registering the empresa-servicio relationship', async () => {
      const invalidEmpresaServicio = {
        
      };

      const response = await request(app).post('/empresa-servicio').send(invalidEmpresaServicio);
      expect(response.status).toBe(500);
      
    });
  });

  // Prueba el endpoint GET '/empresas-default'
  describe('GET /empresas-default', () => {
    it('should return the default information of empresas', async () => {
      const response = await request(app).get('/empresas-default');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      
    });

    it('should return a 500 status if an error occurs while retrieving the empresas', async () => {
      // Simula un error en la consulta de la base de datos
      jest.spyOn(connection, 'query').mockImplementation((sql, callback) => {
        callback(new Error('Database error'));
      });

      const response = await request(app).get('/empresas-default');
      expect(response.status).toBe(500);
      
    });
  });
});
