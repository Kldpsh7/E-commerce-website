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
  Product.create({
    title : title,
    price : price,
    imageUrl : imageUrl,
    description : description
  }).then().catch(err=>console.log(err))
};

exports.getEditProduct =(req,res,next) =>{
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  Product.findByPk(prodId)
  .then(d=>{
    res.render('admin/edit-product',{
      product:d,
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
  if(!editMode){
    req.user.createProduct({
      title : Utitle,
      price : Uprice,
      imageUrl : Uimg,
      description : Udesc
    }).then(()=>res.redirect('/admin/products'))
  .catch(err=>console.log(err))
  }
  else{
    Product.findByPk(prodId)
    .then(d => {
      d.title = Utitle;
      d.imageUrl=Uimg;
      d.price=Uprice;
      d.description=Udesc;
      return d.save()
    })
    .then(()=>res.redirect('/admin/products'))
    .catch(err=>console.log(err))
  }
}

exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(d=>{
    return d.destroy()
  })
  .then(()=>res.redirect('/admin/products'))
  .catch(err=>console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(d=>{
    res.render('admin/products', {
      prods: d,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });})
  .catch(err=>console.log(err))
};
