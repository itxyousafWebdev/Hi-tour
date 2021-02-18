class ApiFeatures{
    constructor(query, req_query){
      this.query = query;
      this.req_query = req_query;
    }
  
    filter(){
      const queryObj = { ...this.req_query};
      const excludedFromQuery = ['page', 'sort', 'limit', 'fields'];
      excludedFromQuery.forEach((element) => delete queryObj[element]);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\bgte|lte|gt|lt\b/g, (match) => `$${match}`);
  
      this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort(){
      if (this.req_query.sort) {
        const sort = this.req_query.sort.split(',').join(' ');
        this.query = this.query.sort(sort);
      } else {
        this.query = this.query.sort('price');
      }
      return this;
    }
  
    projection(){
      if(this.req_query.fields){
        const fields = this.req_query.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      }
      else{
        this.query = this.query.select('-__v');
      }
      return this;
    }
  
    pagenation(){
      const page = this.req_query.page * 1 || 1;
      const limit = this.req_query.limit * 1|| 10;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  module.exports = ApiFeatures;