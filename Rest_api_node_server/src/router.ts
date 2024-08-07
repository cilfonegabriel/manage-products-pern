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

router.get('/:id',
    param('id').isInt().withMessage('ID in not valid'),
    handleInputErrors,
    getProductById 
);

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

router.patch('/:id', 
    param('id').isInt().withMessage('ID in not valid'),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id', 
    param('id').isInt().withMessage('ID in not valid'),
    handleInputErrors,
    deleteProduct
);

export default router;