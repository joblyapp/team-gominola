import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import CartaComidasDispatch from "../pages/landing/pagesDispatch/cartaComidasDispatch";
import CartaDispatch from "../pages/landing/pagesDispatch/cartaDispatch";
import HomeDispatch from "../pages/landing/pagesDispatch/homeDispatch";
import LoginDispatch from "../pages/admin/adminDispatch/loginDispatch";
import AdminCategoriesDispatch from "../pages/admin/adminDispatch/adminCategoriesDispatch";
import AdminPageDispatch from "../pages/admin/adminDispatch/adminPageDispatch";
import CreateCategory from "../pages/admin/forms/createCategory";
import CreateCategoryDispatch from "../pages/admin/forms/formsDispatch/createCategoryDispatch";
import EditCategoryDispatch from "../pages/admin/forms/formsDispatch/editCategoryDispatch";
import AdminProductDispatch from "../pages/admin/adminDispatch/adminProductDispatch";
import CreateProductDispatch from "../pages/admin/forms/formsDispatch/createProductDispatch";
import EditProductDispatch from "../pages/admin/forms/formsDispatch/editProductDispatch";
import Carta from "../pages/landing/carta";



const Views = ({ token }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeDispatch></HomeDispatch>}> </Route>
                <Route path="/home" element={<HomeDispatch></HomeDispatch>}> </Route>
                <Route path="/carta" element={<Carta></Carta>}></Route>
                <Route path="/carta/comida" element={<CartaComidasDispatch></CartaComidasDispatch>}></Route>
                <Route path="/carta/bebidas" element={<CartaDispatch></CartaDispatch>}></Route>
                <Route path="/admin/login" element={<LoginDispatch></LoginDispatch>} > </Route>
                <Route path="*" element={<Navigate to="/" replace />} > </Route>
                {
                    token
                        ?
                        <Route path="/admin/admin" element={<AdminPageDispatch></AdminPageDispatch>} > </Route>
                        :
                        <Route path="*" element={<Navigate to="/admin/login" replace />} > </Route>
                }
                {
                    token
                        ?
                        <Route path="/admin/categorias" element={<AdminCategoriesDispatch></AdminCategoriesDispatch>} > </Route>
                        :
                        <Route path="*" element={<Navigate to="/admin/login" replace />} > </Route>
                }
                {
                    token
                        ?
                        <Route path="/admin/crear/categoria" element={<CreateCategoryDispatch></CreateCategoryDispatch>} > </Route>
                        :
                        <Route path="*" element={<Navigate to="/admin/login" replace />} > </Route>
                }
                {
                    token
                        ?
                        <Route path="/admin/editar/categoria/:id" element={<EditCategoryDispatch></EditCategoryDispatch>} > </Route>
                        :
                        <Route path="*" element={<Navigate to="/admin/login" replace />} > </Route>
                }
                {
                    token
                        ?
                        <Route path="/admin/productos" element={<AdminProductDispatch></AdminProductDispatch>} > </Route>
                        :
                        <Route path="*" element={<Navigate to="/admin/login" replace />} > </Route>
                }
                {
                    token
                        ?
                        <Route path="/admin/crear/producto" element={<CreateProductDispatch></CreateProductDispatch>} > </Route>
                        :
                        <Route path="*" element={<Navigate to="/admin/login" replace />} > </Route>
                }
                {
                    token
                        ?
                        <Route path="/admin/editar/producto/:id" element={<EditProductDispatch></EditProductDispatch>} > </Route>
                        :
                        <Route path="*" element={<Navigate to="/admin/login" replace />} > </Route>
                }
            </Routes>
        </Router>
    );
}

export default Views;
