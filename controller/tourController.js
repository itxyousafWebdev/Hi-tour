const { query } = require('express');
const Tour = require('./../models/tourModel');
const ApiFeatures = require('./../utils/apiFeatures');

exports.top5Tours = (req, res, next) => {
  req.query.sort = "price";
  req.query.limit = 5;
  req.query.fields = "price name duration maxGroupSize"
  next();
}




exports.getAllTours = async (req, res) => {
  try {
    //Fillter
    // const queryObj = { ...req.query };
    // const excludedFromQuery = ['page', 'sort', 'limit', 'fields'];
    // excludedFromQuery.forEach((element) => delete queryObj[element]);

    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\bgte|lte|gt|lt\b/g, (match) => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr));
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    //EXECUTE QUERY

    const features = new ApiFeatures(Tour.find(), req.query).filter().sort().projection().pagenation();
    //SORTING
    // if (req.query.sort) {
    //   const sort = req.query.sort.split(',').join(' ');
    //   query = query.sort(sort);
    // } else {
    //   query = query.sort('price');
    // }

    //PROJECTION
    // if(req.query.fields){
    //   fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // }
    // else{
    //   query = query.select('-__v');
    // }

    //PAGENATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1|| 10;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if(req.query.page){
    //   const totaltours = await Tour.countDocuments();
    //   if(skip >= totaltours){
    //     throw ('This page do not exists...');
    //   } 
    // }


    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
      massage: error,
    });
  }
};

exports.AddNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'filled',
      massage: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'filled',
      massage: error,
    });
  }
};
/////
////////////////////
exports.UpdateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'filled',
      massage: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'filled',
      massage: error,
    });
  }
};
