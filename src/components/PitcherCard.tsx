// PitcherCard.tsx
export type PitcherCardProps = {
    position: string;
    name: string;
    number: string;
    onChange: (field: string, value: string) => void;
    onRemove: () => void;
};

const POSITIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "DH"];

export default function PitcherCard({ position, name, number, onChange, onRemove }: PitcherCardProps) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-4 space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold">투수</span>
                <button onClick={onRemove} className="text-xs text-red-500">
                    삭제
                </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                    <label className="block text-xs mb-0.5">포지션</label>
                    <select
                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                        value={position}
                        onChange={(e) => onChange("position", e.target.value)}
                    >
                        <option value="">선택</option>
                        {POSITIONS.map((pos) => (
                            <option key={pos} value={pos}>
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
