const request = require('supertest');
const app = require('../app'); // Suponiendo que este archivo es donde tienes configurada tu aplicación Express

describe('Pruebas de las rutas de categorías', () => {
  // Prueba para verificar la ruta GET /categorias
  it('Debería obtener todas las categorías', async () => {
    const response = await request(app).get('/categorias');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    
  });

  // Prueba para verificar la ruta GET /categorias/:id_categoria
  it('Debería obtener la información de una categoría específica', async () => {
    const idCategoria = 1; // Define aquí el ID de la categoría que deseas probar

    const response = await request(app).get(`/categorias/${idCategoria}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.nombre_categoria).toBeDefined();
    expect(response.body.descripcion_categoria).toBeDefined();
    
  });

});
