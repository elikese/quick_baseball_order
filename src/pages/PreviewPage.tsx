import { useOrderContext } from "../states/OrderContext";
import html2canvas from "html2canvas";
import { useRef } from "react";

const PreviewPage = () => {
    const { starters, setStarters, pitcher, setPitcher, candidates, setCandidates } = useOrderContext();

    const tableRef = useRef<HTMLDivElement>(null);

    const sorted = [...starters].sort((a, b) => a.order - b.order);

    const removeStarter = (order: number) => {
        setStarters((prev) => prev.filter((p) => p.order !== order));
    };

    const removeCandidate = (number: string) => {
        setCandidates((prev) => prev.filter((c) => c.number !== number));
    };

    const removePitcher = () => {
        setPitcher(null);
    };

    const handleDownload = async () => {
        if (!tableRef.current) return;

        const buttons = tableRef.current.querySelectorAll("button");
        buttons.forEach((btn) => btn.classList.add("hidden"));
        const canvas = await html2canvas(tableRef.current);
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        const now = new Date();
        const fileName = `preview_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now
            .getDate()
            .toString()
            .padStart(2, "0")}_${now.getHours().toString().padStart(2, "0")}${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;
        link.href = dataUrl;
        link.download = `${fileName}.png`;
        link.click();

        // 버튼 다시 보이기
        buttons.forEach((btn) => btn.classList.remove("hidden"));
    };

    return (
        <div className="min-h-screen bg-transparent pt-[48px] px-4">
            <div className="text-right mb-2">
                <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded shadow">
                    이미지 저장
                </button>
            </div>
            <div ref={tableRef}>
                <h1 className="text-xl font-bold text-center mb-4">라인업</h1>
                <table className="w-full text-sm border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>타순</th>
                            <th>포지션</th>
                            <th>이름</th>
                            <th>배번</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((p) => (
                            <tr key={p.order} className="text-center border-t bg-yellow-50">
                                <td>{p.order}</td>
                                <td>{p.position}</td>
                                <td>{p.name}</td>
                                <td>{p.number}</td>
                                <td>
                                    <button onClick={() => removeStarter(p.order)} className="text-xs text-red-500">
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {pitcher && (
                            <tr className="text-center border-t bg-yellow-50">
                                <td colSpan={1}>투수</td>
                                <td>1</td>
                                <td>{pitcher.name}</td>
                                <td>{pitcher.number}</td>
                                <td>
                                    <button onClick={removePitcher} className="text-xs text-red-500">
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <h1 className="text-xl font-bold text-center mb-4 mt-4">대기명단</h1>
                <table className="w-full text-sm border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>이름</th>
                            <th>배번</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c) => (
                            <tr key={c.number} className="text-center border-t bg-yellow-50">
                                <td>{c.name}</td>
                                <td>{c.number}</td>
                                <td>
                                    <button onClick={() => removeCandidate(c.number)} className="text-xs text-red-500">
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PreviewPage;
