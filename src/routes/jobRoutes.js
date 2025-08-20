import express from "express";
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get("/", getJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
router.get("/:id", getJob);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               job_type:
 *                 type: string
 *               location:
 *                 type: string
 *               experience_required:
 *                 type: string
 *               urgency_type:
 *                 type: string
 *               required_education:
 *                 type: string
 *               min_salary:
 *                 type: string
 *               max_salary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, createJob);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job by ID (partial updates supported)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Job title (optional - only update fields you want to change)
 *               description:
 *                 type: string
 *                 description: Job description (optional)
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of skills (optional)
 *               job_type:
 *                 type: string
 *                 description: Type of job (optional)
 *               location:
 *                 type: string
 *                 description: Job location (optional)
 *               experience_required:
 *                 type: string
 *                 description: Required experience level (optional)
 *               urgency_type:
 *                 type: string
 *                 description: Urgency level (optional)
 *               required_education:
 *                 type: string
 *                 description: Required education level (optional)
 *               min_salary:
 *                 type: string
 *                 description: Minimum salary (optional)
 *               max_salary:
 *                 type: string
 *                 description: Maximum salary (optional)
 *           example:
 *             title: "Professional"
 *             description: "Updated description"
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */
router.put("/:id", authMiddleware, updateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, deleteJob);

export default router;
