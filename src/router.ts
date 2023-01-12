import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import handlerInputErrors from './middleware/handler-input-error';

const router = Router();

/* Products */
router.get('/product', (req, res) => {
  res.status(200);
  res.json({ message: "hello product" });
})
router.get('/product/:id', (req, res) => { });
router.post('/product', body('name').isString(), handlerInputErrors, (req, res) => {
  res.json({message: 'successfully product created'});
})
router.put('/product/:id', body('name').isString(), handlerInputErrors, (req, res) => {
  res.json({message: 'successfully product updated'});
})
router.delete('/product/:id', (req, res) => { })

/* Updates */
router.get('/update',  (req,res) => { })
router.get('/update/:id',  (req,res) => { })
router.post('/update',  (req,res) => { })
router.put('/update/:id',  (req,res) => { })
router.delete('/update/:id',  (req,res) => { })

/* Update Point */
router.get('/update_point',  (req,res) => { })
router.get('/update_point/:id',  (req,res) => { })
router.post('/update_point',  (req,res) => { })
router.put('/update_point/:id',  (req,res) => { })
router.delete('/update_point/:id', (req, res) => { })

export default router;