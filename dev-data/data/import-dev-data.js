const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

mongoose
  .connect(
    'mongodb+srv://yousaf:j0bTAPsABtJVXKbu@cluster0.zbwmj.mongodb.net/natour?retryWrites=true&w=majority',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .then((con) => {
    console.log('mangoose is connectted');
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully imported');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully deleted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if(process.argv[2] == '--import'){
  importData();
}else if(process.argv[2] == '--delete'){
  deleteData();
}