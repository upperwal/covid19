const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { infoService } = require('../services');

const addInfo = catchAsync(async (req, res) => {
  const info = await infoService.addInfo(req.body);
  res.status(httpStatus.CREATED).send(info);
});

const findInfo = catchAsync(async (req, res) => {
  const info = await infoService.findInfo(req.body);
  res.status(httpStatus.CREATED).send(info);
});

const addUpdate = catchAsync(async (req, res) => {
  const update = await infoService.addUpdate(req.body);
  res.status(httpStatus.CREATED).send(update);
});

const addFraud = catchAsync(async (req, res) => {
  const fraud = await infoService.addFraud(req.body);
  res.status(httpStatus.CREATED).send(fraud);
});

const findFraud = catchAsync(async (req, res) => {
  const fraud = await infoService.findFraud(req.body);
  res.status(httpStatus.CREATED).send(fraud);
});

const getStats = catchAsync(async (req, res) => {
  const fraud = await infoService.getStats(req.body);
  res.status(httpStatus.CREATED).send(fraud);
});

const findFraudCount = catchAsync(async (req, res) => {
  const fraud = await infoService.findFraudCount(req.body);
  res.status(httpStatus.CREATED).send(fraud);
});

module.exports = {
  addInfo,
  findInfo,
  addUpdate,
  addFraud,
  findFraud,
  getStats,
  findFraudCount,
};
