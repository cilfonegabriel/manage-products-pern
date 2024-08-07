import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo de 40 pulgadas
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *       get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              
 */

router.get('/', getProducts );

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
 * 
 */

router.get('/:id',
    param('id').isInt().withMessage('ID in not valid'),
    handleInputErrors,
    getProductById 
);

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: return a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: 'Monitor Curvo 49 pulgadas'
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 */

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
        
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom(value => value > 0 ).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: 'Monitor Curvo 49 pulgadas'
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid Id or invalid input data
 *              404:
 *                  description: Product not fund
 */

router.put('/:id', 
    // Validación
    param('id').isInt().withMessage('ID in not valid'),
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
        
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom(value => value > 0 ).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor no válido para disponibilidad'),
    handleInputErrors,
    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid Id 
 *              404:
 *                  description: Product not fund
 * 
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID in not valid'),
    handleInputErrors,
    updateAvailability
);

/**
 * 
 * 
 * 
 * 
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID in not valid'),
    handleInputErrors,
    deleteProduct
);

export default router;