import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderFormPage from "./pages/OrderFormPage";
import PreviewPage from "./pages/PreviewPage";
import FieldViewPage from "./pages/FieldViewPage";
import { OrderProvider } from "./states/OrderContext";
import Header from "./ui/Header";
import background from "./assets/background.png";

function App() {
    return (
        <BrowserRouter>
            <OrderProvider>
                <div className="relative min-h-screen overflow-x-hidden">
                    {/* 고정 배경 */}
                    <div className="fixed inset-0 z-0">
                        <img src={background} alt="Background" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-white/25" />
                    </div>
                    {/* 헤더 + 라우팅된 페이지들 */}
                    <div className="relative z-10">
                        <Header />
                        <Routes>
                            <Route path="/" element={<OrderFormPage />} />
                            <Route path="/preview" element={<PreviewPage />} />
                            <Route path="/field" element={<FieldViewPage />} />
                        </Routes>
                    </div>
                </div>
            </OrderProvider>
        </BrowserRouter>
    );
}

export default App;
