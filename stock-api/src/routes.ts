import { Router } from "express";

/* Controllers */
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { requireAdmin } from "./middlewares/requireAdmin";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";
import { EditProductController } from "./controllers/product/EditProductController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { SaleProductController } from "./controllers/product/SaleProductController";

const router = Router();

/* USER */
router.post("/user", new CreateUserController().handle);
router.post("/auth", new AuthUserController().handle);

/* CATEGORY */
router.post(
  "/category",
  isAuthenticated,
  requireAdmin, new CreateCategoryController().handle
);
router.put(
  "/category/edit",
  isAuthenticated,
  requireAdmin, new EditCategoryController().handle
);
router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle
);
router.delete(
  "/category/delete",
  isAuthenticated,
  requireAdmin, new DeleteCategoryController().handle
);

/* PRODUCT */
router.post("/product", isAuthenticated, requireAdmin, new CreateProductController().handle);
router.put(
  "/product/edit",
  isAuthenticated,
  requireAdmin, new EditProductController().handle
);
router.get("/products", isAuthenticated, new ListProductsController().handle);
router.delete(
  "/product/delete",
  isAuthenticated,
  requireAdmin, new DeleteProductController().handle
);
router.put(
  "/product/sale",
  isAuthenticated,
  requireAdmin, new SaleProductController().handle
);

export { router };
