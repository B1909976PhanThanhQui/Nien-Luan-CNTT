const ProductModel = require("../models/Product");

module.exports = class API {
  //Create Product
  static async createProduct(req, res) {
    const productInput = new ProductModel(req.body);

    try {
      const createNewProduct = await productInput.save();
      res.status(200).json(createNewProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Update Product
  static async updateProduct(req, res) {
    const id_product = req.params.id;
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        id_product,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Delete Product
  static async deleteProduct(req, res) {
    const id_product = req.params.id;
    try {
      await ProductModel.findByIdAndDelete(id_product);
      res.status(200).json("Sản phẩm đã xóa thành công!");
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get One Product
  static async findoneProduct(req, res) {
    const id_product = req.params.id;
    try {
      const ProductResult = await ProductModel.findById(id_product);
      res.status(201).json(ProductResult);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get Product With Name
  static async findproductwithName(req, res) {
    try {
      const name_product = await req.params.nameproduct;
      const ProductData = await ProductModel.find({
        $or: [
          { title: { $regex: `${name_product}`, $options: "i" } },
          { description: { $regex: `${name_product}`, $options: "i" } },
        ],
      });

      res.status(201).json(ProductData);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get All Product
  static async getAllProduct(req, res) {
    try {
      const arrayProduct = await ProductModel.find();
      res.status(200).json(arrayProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get Product With Limit Collection
  static async getProductLimit(req, res) {
    try {
      const arrayProduct = await ProductModel.find().limit(12);
      res.status(200).json(arrayProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get Product Category
  static async getcategoryProduct(req, res) {
    try {
      var arrayProduct;
      if(req.params.name === 'Tất Cả Sách'){
        arrayProduct = await ProductModel.find({});
      }else{
        arrayProduct = await ProductModel.find({categories: req.params.name });
      }
      res.status(200).json(arrayProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }
};