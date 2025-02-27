import { Router } from 'express';
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js';

const router = Router();

router.route('/').get(getThoughts);
router.route('/:thoughtId').get(getSingleThought);
router.route('/').post(createThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export default router;
