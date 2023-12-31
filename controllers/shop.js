const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(d => {
    res.render('shop/product-list', {
      prods: d,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err))
};

exports.getProductDetails = (req,res,next)=>{
  const prodId = req.params.productId
  Product.findByPk(prodId)
  .then(d => {
    res.render('shop/product-detail',{
      product:d,
      pageTitle:d.title,
      path:'/products'
    })
  })
  .catch(err=>console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(d => {
    res.render('shop/index', {
      prods: d,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart=>{
    cart.getProducts().then(products=>{
      res.render('shop/cart',{
        path : '/cart',
        pageTitle : 'Your Cart',
        products : products
      })
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart;
    return cart.getProducts({where : {id : prodId}})
  })
  .then(products=>{
    let product;
    if(products.length>0){
      product=products[0];
    }
    let newQuantity = 1;
    if(product){
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity+1;
      return fetchedCart.addProduct(product,{
        through : {quantity : newQuantity}
      })
    }
    return Product.findByPk(prodId)
    .then(product=>{
      return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
    })
    .catch(err=>console.log(err))
  })
  .then(()=>res.redirect('/cart'))
  .catch(err=>console.log(err))
}

exports.postCartDeleteProduct = ((req,res,next)=>{
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where : {id : prodId}})
  })
  .then(products=>{
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(()=>res.redirect('/cart'))
  .catch(err=>console.log(err))
})

exports.postOrder = (req,res,next)=>{
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart;
    return cart.getProducts()
  })
  .then(products=>{
    return req.user.createOrder()
    .then(order=>{
      return order.addProduct(products.map(product=>{
        product.orderItem ={quantity : product.cartItem.quantity}
        return product;
      }))
    })
  })
  .then(()=>{
    return fetchedCart.setProducts(null);
  })
  .then(res=>{
    res.redirect('/orders');
  })
  .catch(err=>console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders({include : ['products']})
  .then(orders=>{
    res.render('shop/orders',{
      path : '/orders',
      pageTitle : 'Your Orders',
      orders : orders
    })
  })
  .catch(err=>console.log(err))
};