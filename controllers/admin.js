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
  const product = new Product(title, imageUrl, description, price);
  product.save()
  .then(()=>res.redirect('/'))
  .catch(err => console.log(err))
};

exports.getEditProduct =(req,res,next) =>{
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  Product.findById(prodId)
  .then(d=>{
    res.render('admin/edit-product',{
      product:d[0][0],
      pageTitle:'Edit Product',
      path:'/admin/edit-product',
      editing:editMode
    });
  })
  .catch(err=>console.log(err))
}

exports.postEditProduct = (req,res,next) => {
  const editMode = req.query.edit;
  const prodId = req.body.productId;
  const Utitle = req.body.title;
  const Uimg = req.body.imageUrl;
  const Uprice = req.body.price;
  const Udesc = req.body.description;
  const Uprod = new Product(prodId, Utitle, Uimg , Udesc , Uprice);
  if(!editMode){
    Uprod.save()
  .then(()=>res.redirect('/admin/products'))
  .catch(err=>console.log(err))
  }
  else{
    Uprod.update()
    .then(()=> res.redirect('/admin/products'))
    .catch(err=>console.log(err))
  }
}

exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.params.productId;
  Product.deleteById(prodId)
  .then(()=>res.redirect('/admin/products'))
  .catch(err=>console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(d=>{
    res.render('admin/products', {
      prods: d[0],
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });})
  .catch(err=>console.log(err))
};
