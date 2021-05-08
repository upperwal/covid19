const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const infoController = require('../../controllers/info.controller');

const router = express.Router();

router
  .route('/')
  .post(infoController.addInfo)

router
  .route('/find')
  .post(infoController.findInfo)

router
  .route('/addUpdate')
  .post(infoController.addUpdate)

router
  .route('/addFraud')
  .post(infoController.addFraud)

router
  .route('/findFraud')
  .post(infoController.findFraud)
  
router
  .route('/getStats')
  .get(infoController.getStats)

module.exports = router;
