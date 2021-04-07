const connectToDB = require("./database/db");
const dotenv = require("dotenv");
const colors = require("colors");
const { User } = require("./models/userModel");
const Product = require("./models/productModel");
const { Category, subCategory } = require("./models/categoryModel");
const users = require("./data/users");
const products = require("./data/products");
const Service = require("./models/serviceModel");
const services = require("./data/services");

dotenv.config();

connectToDB();

const importProducts = async function () {
  await User.deleteMany();
  await Category.deleteMany();
  await subCategory.deleteMany();
  await Product.deleteMany();
  await Service.deleteMany();

  const createdUsers = await User.insertMany(users);
  const adminUser = createdUsers[0]._id;

  const sampleProducts = [];
  for (var product of products) {
    try {
      const categoryExists = await Category.findOne({ name: product.category });
      //console.log(`${product.category}`);
      if (categoryExists) {
        product.category = categoryExists._id;
        try {
          const subCategoryExists = await subCategory.findOne({
            name: product.subCategory,
          });
          if (subCategoryExists) {
            product.subCategory = subCategoryExists._id;
          } else {
            const newSubCategory = subCategory({
              name: product.subCategory,
              isService: false,
            });
            const savedSubCat = await newSubCategory.save();
            product.subCategory = savedSubCat._id;
            await categoryExists.subCategory.push(newSubCategory);
            await categoryExists.save();
          }
        } finally {
        }
      } else {
        const newCategory = Category({
          name: product.category,
          isService: false,
        });
        const savedCat = await newCategory.save();
        product.category = savedCat._id;
        const newSubCategory = subCategory({
          name: product.subCategory,
          isService: false,
        });
        const savedSubCat = await newSubCategory.save();
        product.subCategory = savedSubCat._id;
        await savedCat.subCategory.push(newSubCategory);
        await savedCat.save();
      }
    } catch (error) {
      console.log(error);
      return;
    }
    product.user = adminUser;
    sampleProducts.push(product);
  }

  await Product.insertMany(sampleProducts);
  console.log(`Data Successfully Imported!`.green.inverse);
  process.exit();
};

const importServices = async function () {
  // await User.deleteMany();
  // await Category.deleteMany();
  // await subCategory.deleteMany();
  await Service.deleteMany();
  // await Product.deleteMany();

  const createdUsers = await User.insertMany(users);
  const adminUser = createdUsers[0]._id;

  const sampleServices = [];
  for (var service of services) {
    try {
      const categoryExists = await Category.findOne({ name: service.category });

      if (categoryExists) {
        service.category = categoryExists._id;
        try {
          const subCategoryExists = await subCategory.findOne({
            name: service.subCategory,
          });
          if (subCategoryExists) {
            service.subCategory = subCategoryExists._id;
          } else {
            const newSubCategory = subCategory({
              name: service.subCategory,
              isService: true,
            });
            const savedSubCat = await newSubCategory.save();
            service.subCategory = savedSubCat._id;
            await categoryExists.subCategory.push(newSubCategory);
            await categoryExists.save();
          }
        } finally {
        }
      } else {
        const newCategory = Category({
          name: service.category,
          isService: true,
        });
        const savedCat = await newCategory.save();
        service.category = savedCat._id;
        const newSubCategory = subCategory({
          name: service.subCategory,
          isService: true,
        });
        const savedSubCat = await newSubCategory.save();
        service.subCategory = savedSubCat._id;
        await savedCat.subCategory.push(newSubCategory);
        await savedCat.save();
      }
    } catch (error) {
      console.log(error);
      return;
    }
    service.user = adminUser;
    sampleServices.push(service);
  }

  await Service.insertMany(sampleServices);
  console.log(`Data Successfully Imported!`.green.inverse);
  process.exit();
};

// importProducts();
importServices();
