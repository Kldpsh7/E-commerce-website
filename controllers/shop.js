const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(d => {
    res.render('shop/product-list', {
      prods: d[0],
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err))
};

exports.getProductDetails = (req,res,next)=>{
  const prodId = req.params.productId
  Product.findById(prodId)
  .then(d => {
    res.render('shop/product-detail',{
      product:d[0][0],
      pageTitle:d[0][0].title,
      path:'/products'
    })
  })
  .catch()
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(d => {
    res.render('shop/index', {
      prods: d[0],
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  Cart.getCartItems(items =>{
    res.render('shop/cart', {
      cart:items,
      path: '/cart',
      pageTitle: 'Your Cart'
    })
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId,product.title,product.imageUrl,product.price)
  });
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
