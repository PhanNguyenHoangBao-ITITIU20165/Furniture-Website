import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from 'src/components/userComponents/navbar/Navbar';
import { SignInPage } from 'src/pages/signIn/SignIn';
import { SignUpPage } from 'src/pages/signUp/SignUp';
import { AboutPage } from 'src/pages/user/About';
import { CartPage } from 'src/pages/user/Cart/Cart';
import { CheckoutPage } from 'src/pages/user/Checkout/Checkout';
import { ContactPage } from 'src/pages/user/Contact';
import { HomePage } from 'src/pages/user/Home';
import { ProductDetailsPage } from 'src/pages/user/ProductDetail/ProductDetail';
import { ProfilePage } from 'src/pages/user/Profile';
import { ShopPage } from 'src/pages/user/Shop/Shop';
export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route index element={<HomePage />} />
                <Route path="shop/" element={<ShopPage />} />
                <Route path="products/:id" element={<ProductDetailsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
    );
};
