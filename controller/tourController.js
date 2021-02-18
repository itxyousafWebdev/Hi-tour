const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    const queryObj = { ...req.query };
    const excludedFromQuery = ['page', 'sort', 'limit', 'fields'];
    excludedFromQuery.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\bgte|lte|gt|lt\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
    //EXECUTE QUERY
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort('-createdAt');
    }
    const tours = await query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'filled',
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
