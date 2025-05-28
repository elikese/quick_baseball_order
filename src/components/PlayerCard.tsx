// PlayerCard.tsx
import React from "react";
import { useOrderContext } from "../states/OrderContext";

export type PlayerCardProps = {
    order: number;
    position: string;
    name: string;
    number: string;
    onChange: (field: string, value: string | number) => void;
    onRemove: () => void;
};

const POSITIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "DH"];

export default function PlayerCard({ order, position, name, number, onChange, onRemove }: PlayerCardProps) {
    const { starters: globalStarters, pitcher } = useOrderContext();

    // 전역 상태 기준 + 현재 입력 항목까지 포함한 중복 방지
    const allOrders = [...globalStarters.map((p) => p.order), order].filter((v, i, arr) => v && arr.indexOf(v) === i);
    const allPositions = [...globalStarters.map((p) => p.position), ...(pitcher ? ["1"] : []), position].filter(
        (v, i, arr) => v && arr.indexOf(v) === i
    );

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-4 space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold">타순 {order || "?"}번</span>
                <button onClick={onRemove} className="text-xs text-red-500">
                    삭제
                </button>
            </div>
            <div className="grid grid-cols-4 gap-2 text-sm">
                <div>
                    <label className="block text-xs mb-0.5">타순</label>
                    <select
                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                        value={order || ""}
                        onChange={(e) => onChange("order", Number(e.target.value))}
                    >
                        <option value="">선택</option>
                        {[...Array(9)].map((_, i) => {
                            const val = i + 1;
                            return (
                                <option key={val} value={val} disabled={allOrders.includes(val) && val !== order}>
                                    {val}번
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label className="block text-xs mb-0.5">포지션</label>
                    <select
                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                        value={position}
                        onChange={(e) => onChange("position", e.target.value)}
                    >
                        <option value="">선택</option>
                        {POSITIONS.map((pos) => (
                            <option
                                key={pos}
                                value={pos}
                                disabled={(allPositions.includes(pos) && pos !== position) || pos === "1"}
                            >
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs mb-0.5">성명</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onChange("name", e.target.value)}
                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                        placeholder="이름"
                    />
                </div>
                <div>
                    <label className="block text-xs mb-0.5">배번</label>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => onChange("number", e.target.value)}
                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                        placeholder="번호"
                    />
                </div>
            </div>
        </div>
    );
}
