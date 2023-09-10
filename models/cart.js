const fs = require('fs');
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id,title,img,productPrice){
        //fetch th eprevious cart
        fs.readFile(p , (err,fileContent)=>{
            var cart= {products:[],total:0};
            if(err){
                console.log(err)
            }
            else{
                cart = JSON.parse(fileContent)
            }
            //analyze the cart => find the existing product
            let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty+1;
                cart.products[existingProductIndex]=updatedProduct;
            }
            else{
                updatedProduct = {id:id , title:title , img:img , qty:1 , price:productPrice}
                cart.products.push(updatedProduct);
            }
            cart.total = cart.total + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>console.log(err))
        })
    }
    static getCartItems(cb){
        fs.readFile(p,(err,content)=>{
            if (err){
                cb()
            }
            else{
                cb(JSON.parse(content))
            }
        })
    }
}