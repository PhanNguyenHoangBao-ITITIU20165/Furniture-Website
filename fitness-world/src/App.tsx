import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './app.scss';
import { UserRoutes } from './routes/userRoute/UserRoute';
import { AdminRoutes } from './routes/adminRoute/AdminRoutes';
import { IRootState } from './redux/store';
import { useSelector } from 'react-redux';

function App() {
    const role = useSelector((state: IRootState) => state.auth.role);
    return (
        <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            {/* <Route
                path="/admin/*"
                element={role === 'admin' ? <AdminRoutes /> : <Navigate to="/" />}
            /> */}
        </Routes>
    );
}

export default App;
