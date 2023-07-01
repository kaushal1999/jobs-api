const { StatusCodes } = require("http-status-codes");
const Job = require("../models/job");
const { customError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById({ _id: id, createdBy: req.userId });
  if (!job) throw new customError("No job found!",404);
  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: req.userId },
    req.body,
    {
        new: true,
        runValidators:true
    }
  );
  if (!job) throw new customError("No job found!",404);
  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete({ _id: id, createdBy: req.userId });
  if (!job) throw new customError("No job found!",StatusCodes.NOT_FOUND);
  res.status(StatusCodes.OK).json(job);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
