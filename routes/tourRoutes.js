const express = require('express');

const tourController = require('./../controller/tourController');

const toursRouter = express.Router();

toursRouter.route('/').get(tourController.getAllTours).post(tourController.AddNewTour);
toursRouter.route('/:id').get(tourController.getTour).patch(tourController.UpdateTour).delete(tourController.deleteTour);
module.exports = toursRouter;
