const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct =(req,res,next) =>{
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode){
    return res.redirect('/')
  }
  Product.findById(prodId,prod=>{
    if (!prod){
      return res.redirect('/admin/products')
    }
    res.render('admin/edit-product',{
      product:prod,
      pageTitle:'Edit Product',
      path:'/admin/edit-product',
      editing:editMode
    });
  })
}

exports.postEditProduct = (req,res,next) => {
  const prodId = req.body.productId;
  const Utitle = req.body.title;
  const Uimg = req.body.imageUrl;
  const Uprice = req.body.price;
  const Udesc = req.body.description;
  const Uprod = new Product(prodId, Utitle, Uimg , Udesc , Uprice);
  Uprod.save()
  res.redirect('/admin/products')
}

exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.params.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
