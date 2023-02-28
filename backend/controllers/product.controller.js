const ProductModel = require("../models/Product");

module.exports = class API{
    //Create Product
    static async createProduct(req, res){
        const productInput = new ProductModel(req.body);

        try{
            const createNewProduct = await productInput.save();
            res.status(200).json(createNewProduct);
        }catch(err){
            res.status(501).json(err);
        }
    }

    //Update Product
    static async updateProduct(req,res){
        const id_product = req.params.id;
        try{
            const updateProduct = await ProductModel.findByIdAndUpdate(
                id_product,
                {
                    $set: req.body,
                },
                {new :true}
            );
            res.status(200).json(updateProduct);
        }catch(err){
            res.status(501).json(err);
        }
    }

    //Delete Product
    static async deleteProduct(req, res){
        const id_product = req.params.id;
        try{
            await ProductModel.findByIdAndDelete(id_product);
            res.status(200).json("Sản phẩm đã xóa thành công!");
        }catch(err){
            res.status(501).json(err);
        }
    }

    //Get One Product
    static async findoneProduct(req, res){
        const id_product = req.params.id;
        try{
            const ProductResult = await ProductModel.findById(id_product);
            res.status(201).json(ProductResult);
        }catch(err){
            res.status(501).json(err);
        }
    }

    //Get All Product
    static async getAllProduct(req, res){
        try{
            const arrayProduct = await ProductModel.find();
            res.status(200).json(arrayProduct)
        }catch(err){
            res.status(501).json(err)
        }
    }
}