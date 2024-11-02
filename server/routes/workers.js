import express from 'express';
import Worker from '../models/Worker.js';

const router = express.Router();

// Middleware for validation
const validateWorker = (req, res, next) => {
  const { name, role, location, salary } = req.body;
  if (!name || !role || !location || !salary) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }
  next();
};

// Get all workers with filtering, pagination, and sorting
router.get('/', async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;
    const searchQuery = {};

    // Search by name or role if a search term is provided
    if (search) {
      searchQuery.$or = [
        { name: new RegExp(search, 'i') }, // case-insensitive search on name
        { role: new RegExp(search, 'i') }, // case-insensitive search on role
      ];
    }

    // Filter by role if specified
    if (role) {
      searchQuery.role = role;
    }

    // Fetch workers with pagination, sorting, and filtering
    const workers = await Worker.find(searchQuery)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalWorkers = await Worker.countDocuments(searchQuery);
    res.json({
      data: workers,
      total: totalWorkers,
      page: Number(page),
      totalPages: Math.ceil(totalWorkers / limit),
    });
  } catch (error) {
    next(error);
  }
});

// Create new worker
router.post('/', validateWorker, async (req, res, next) => {
  const worker = new Worker(req.body);
  try {
    const newWorker = await worker.save();
    res.status(201).json(newWorker);
  } catch (error) {
    next(error);
  }
});

// Get worker by ID
router.get('/:id', async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    next(error);
  }
});

// Update worker
router.patch('/:id', validateWorker, async (req, res, next) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    next(error);
  }
});

export default router;
