const { StatusCodes } = require("http-status-codes");
const Job = require("../models/job");
const { customError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
    const { id } =req.params
    const job = await Job.findById(id)
    if(!job) throw new customError("No job found!")
    res.status(StatusCodes.OK).json(job); 
};

const createJob = async (req, res) => {
  req.body.createdBy = req.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = (req, res) => {};

const deleteJob = async (req, res) => {
    const { id } =req.params
    const job = await Job.findByIdAndDelete(id)
    if(!job) throw new customError("No job found!")
    res.status(StatusCodes.OK).json(job);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
