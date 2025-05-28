// FieldViewPage.tsx
import { useOrderContext } from "../states/OrderContext";
import fieldImage from "../assets/field.png"; // 사용자 업로드 이미지 파일
import { useRef } from "react";
import html2canvas from "html2canvas";

const positionMap = {
    "1": { top: "65%", left: "50%" }, // 투수
    "2": { top: "85%", left: "50%" }, // 포수
    "3": { top: "65%", left: "72%" }, // 1루수
    "4": { top: "53%", left: "68%" }, // 2루수
    "5": { top: "68%", left: "30%" }, // 3루수
    "6": { top: "53%", left: "37%" }, // 유격수
    "7": { top: "44%", left: "17%" }, // 좌익수
    "8": { top: "30%", left: "50%" }, // 중견수
    "9": { top: "45%", left: "83%" }, // 우익수
};

export default function FieldViewPage() {
    const { starters, pitcher } = useOrderContext();
    const fieldRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!fieldRef.current) return;
        const canvas = await html2canvas(fieldRef.current);
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        const now = new Date();
        const fileName = `field_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now
            .getDate()
            .toString()
            .padStart(2, "0")}_${now.getHours().toString().padStart(2, "0")}${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;
        link.href = dataUrl;
        link.download = `${fileName}.png`;
        link.click();
    };

    const allPlayers = [
        ...starters,
        pitcher ? { position: "1", name: pitcher.name, number: pitcher.number } : null,
    ].filter(Boolean);

    return (
        <div className="relative min-h-screen bg-transparent pt-12 flex justify-center">
            <div ref={fieldRef} className="w-[320px] h-[362px] relative">
                <img src={fieldImage} alt="야구장" className="absolute w-full h-full object-contain" />

                {allPlayers.map((p, idx) => {
                    const pos = positionMap[p?.position as keyof typeof positionMap];
                    if (!pos) return null;
                    return (
                        <div
                            key={idx}
                            className="absolute text-[10px] font-bold text-white text-center px-1 py-0.5 rounded bg-black/50"
                            style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
                        >
                            {p?.number}-{p?.name}
                        </div>
                    );
                })}
            </div>
            <button
                onClick={handleDownload}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow absolute top-[60%]"
            >
                이미지 저장
            </button>
        </div>
    );
}
