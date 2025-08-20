import { prisma } from "../utils/prisma.js";

export async function getJobs(req, res, next) {
  try {
    const jobs = await prisma.job.findMany();
    res.json(jobs);
  } catch (err) {
    next(err);
  }
}

export async function getJob(req, res, next) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
}

export async function createJob(req, res, next) {
  try {
    const {
      title,
      description,
      skills,
      job_type,
      location,
      experience_required,
      urgency_type,
      required_education,
      min_salary,
      max_salary,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        skills, // Now skills is stored as an array
        job_type,
        location,
        experience_required,
        urgency_type,
        required_education,
        min_salary,
        max_salary,
      },
    });

    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
}

export async function updateJob(req, res, next) {
  try {
    const job = await prisma.job.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(job);
  } catch (err) {
    next(err);
  }
}

export async function deleteJob(req, res, next) {
  try {
    await prisma.job.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Job deleted" });
  } catch (err) {
    next(err);
  }
}
