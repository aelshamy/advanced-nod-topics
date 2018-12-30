var Products = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Product.all(function(err, products) {
      if (err) {
        throw err;
      }
      self.respondWith(products, {type:'Product'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , product = geddy.model.Product.create(params);

    if (!product.isValid()) {
      this.respondWith(product);
    }
    else {
      product.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(product, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Product.first(params.id, function(err, product) {
      if (err) {
        throw err;
      }
      if (!product) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(product);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Product.first(params.id, function(err, product) {
      if (err) {
        throw err;
      }
      if (!product) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(product);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Product.first(params.id, function(err, product) {
      if (err) {
        throw err;
      }
      product.updateProperties(params);

      if (!product.isValid()) {
        self.respondWith(product);
      }
      else {
        product.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(product, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Product.first(params.id, function(err, product) {
      if (err) {
        throw err;
      }
      if (!product) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Product.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(product);
        });
      }
    });
  };

};

exports.Products = Products;
