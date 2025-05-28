import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import OrderFormPage from "./pages/OrderFormPage";
import PreviewPage from "./pages/PreviewPage";
import FieldViewPage from "./pages/FieldViewPage";
import { OrderProvider } from "./states/OrderContext";
import Header from "./ui/Header";
import background from "./assets/background.png";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <OrderFormPage />
                        </motion.div>
                    }
                />
                <Route
                    path="/preview"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PreviewPage />
                        </motion.div>
                    }
                />
                <Route
                    path="/field"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FieldViewPage />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <OrderProvider>
                <div className="relative min-h-screen overflow-x-hidden">
                    {/* 배경 */}
                    <div className="fixed inset-0 z-0">
                        <img src={background} alt="Background" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-white/25" />
                    </div>
                    {/* 콘텐츠 */}
                    <div className="relative z-10">
                        <Header />
                        <AnimatedRoutes />
                    </div>
                </div>
            </OrderProvider>
        </BrowserRouter>
    );
}

export default App;
