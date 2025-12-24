import express from 'express';
import {
  getAllFamilies,
  getFamilyById,
  createFamily,
  updateFamily,
  deleteFamily,
  getStatistics
} from '../controllers/familyController';

const router = express.Router();

router.get('/families', getAllFamilies);
router.get('/families/:id', getFamilyById);
router.post('/families', createFamily);
router.put('/families/:id', updateFamily);
router.delete('/families/:id', deleteFamily);
router.get('/stats', getStatistics);

export default router;
