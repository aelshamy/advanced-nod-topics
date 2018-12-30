var CreateProducts = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('name', 'string');
          t.column('description', 'string');
          t.column('price', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('products', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('products', callback);
  };
};

exports.CreateProducts = CreateProducts;
