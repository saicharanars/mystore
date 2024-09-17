import {
  createProductType,
  editProductType,
  productFiltersServiceType,
} from '@ecommerce/types';
import { Product } from '@ecommerce/db-postgres';
import { Op, WhereOptions } from 'sequelize';

async function createProduct(createproduct: createProductType, userid: string) {
  const productData = { ...createproduct, userId: userid };

  const res = await Product.create(productData);
  return res;
}
async function editProduct(
  editProdcut: editProductType,
  userid: string,
  productid: string
) {
  const product = await Product.findByPk(productid);
  if (!product) {
    return null;
  }

  if (product.userId === userid) {
    const updatedproduct = product.update(editProdcut);
    return updatedproduct;
  } else {
    return 'notowner';
  }
}
async function deleteProduct(productid: string, userid: string) {
  const res = await findById(productid);
  if (!res) {
    return null;
  }
  if (res.userId === userid) {
    const deleteproduct = res.destroy();
    return deleteproduct;
  } else {
    return 'notowner';
  }
}

async function findAllProducts(filters: productFiltersServiceType) {
  const { category, tags, minprice, maxprice, offset, limit } = filters;

  const whereClause: WhereOptions = {};

  if (category) {
    whereClause.category = category;
  }

  if (tags && tags.length > 0) {
    whereClause.tags = {
      [Op.overlap]: tags,
    };
  }

  if (minprice || maxprice) {
    whereClause.price = {};
    if (minprice) {
      whereClause.price[Op.gte] = parseInt(minprice);
    }
    if (maxprice) {
      whereClause.price[Op.lte] = parseInt(maxprice);
    }
  }

  const { count, rows } = await Product.findAndCountAll({
    where: whereClause,
    offset: parseInt(offset) | 0,
    limit: parseInt(limit) | 10,
  });
  const res = { rows, count };
  console.log(res);
  return res;
}
async function findById(productId: string) {
  const res = await Product.findByPk(productId);
  if (!res) {
    return null;
  }
  return res;
}
export { createProduct, deleteProduct, editProduct, findById, findAllProducts };
