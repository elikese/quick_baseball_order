import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlayerCard from "../components/PlayerCard";
import { useOrderContext } from "../states/OrderContext";

export default function OrderFormPage() {
    const {
        setStarters: setSharedStarters,
        setPitcher: setSharedPitcher,
        setCandidates: setSharedCandidates,
    } = useOrderContext();

    const [starters, setStarters] = useState<{ order: number; position: string; name: string; number: string }[]>([]);
    const [pitcher, setPitcher] = useState<{ name: string; number: string } | null>(null);
    const [candidates, setCandidates] = useState<{ name: string; number: string }[]>([]);

    const handleChange = (index: number, field: string, value: string | number) => {
        const next = [...starters];
        (next[index] as any)[field] = value;
        setStarters(next);
    };

    const handleCandidateChange = (index: number, field: string, value: string) => {
        const next = [...candidates];
        (next[index] as any)[field] = value;
        setCandidates(next);
    };

    const addStarter = () => {
        if (starters.length >= 9) return;
        setStarters([...starters, { order: 0, position: "", name: "", number: "" }]);
    };

    const addPitcher = () => {
        if (pitcher) return;
        setPitcher({ name: "", number: "" });
    };

    const addCandidate = () => {
        setCandidates([...candidates, { name: "", number: "" }]);
    };

    const removeStarter = (index: number) => {
        const next = [...starters];
        next.splice(index, 1);
        setStarters(next);
    };

    const removeCandidate = (index: number) => {
        const next = [...candidates];
        next.splice(index, 1);
        setCandidates(next);
    };

    const saveOrder = () => {
        setSharedStarters((prev) => {
            const filtered = prev.filter((p) => !starters.some((s) => s.order === p.order));
            return [...filtered, ...starters];
        });

        setSharedCandidates((prev) => [...prev, ...candidates]);

        if (pitcher) {
            setSharedPitcher(pitcher);
        }

        setStarters([]);
        setPitcher(null);
        setCandidates([]);
    };

    return (
        <div className="min-h-screen pt-12 px-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold ml-10">오더 입력</h1>
                <button onClick={saveOrder} className="bg-purple-600 text-white px-4 py-2 rounded shadow">
                    저장하기
                </button>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {pitcher && (
                        <motion.div
                            key="pitcher"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-4 space-y-2"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold">투수</span>
                                <button className="text-xs text-red-500" onClick={() => setPitcher(null)}>
                                    삭제
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <label className="block text-xs mb-0.5">성명</label>
                                    <input
                                        type="text"
                                        value={pitcher.name}
                                        onChange={(e) =>
                                            setPitcher((prev) => (prev ? { ...prev, name: e.target.value } : null))
                                        }
                                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                                        placeholder="이름"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs mb-0.5">배번</label>
                                    <input
                                        type="text"
                                        value={pitcher.number}
                                        onChange={(e) =>
                                            setPitcher((prev) => (prev ? { ...prev, number: e.target.value } : null))
                                        }
                                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                                        placeholder="번호"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {starters.map((player, idx) => (
                        <motion.div
                            key={`starter-${idx}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PlayerCard
                                order={player.order}
                                position={player.position}
                                name={player.name}
                                number={player.number}
                                onChange={(field, value) => handleChange(idx, field, value)}
                                onRemove={() => removeStarter(idx)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                <AnimatePresence>
                    {candidates.map((candidate, idx) => (
                        <motion.div
                            key={`candidate-${idx}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-4 space-y-2"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold">후보 {idx + 1}</span>
                                <button onClick={() => removeCandidate(idx)} className="text-xs text-red-500">
                                    삭제
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <label className="block text-xs mb-0.5">성명</label>
                                    <input
                                        type="text"
                                        value={candidate.name}
                                        onChange={(e) => handleCandidateChange(idx, "name", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                                        placeholder="이름"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs mb-0.5">배번</label>
                                    <input
                                        type="text"
                                        value={candidate.number}
                                        onChange={(e) => handleCandidateChange(idx, "number", e.target.value)}
                                        className="w-full border border-gray-300 rounded px-1 py-0.5"
                                        placeholder="번호"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 pt-2">
                <button
                    onClick={addStarter}
                    disabled={starters.length >= 9}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow disabled:opacity-40"
                >
                    + 타자
                </button>
                <button
                    onClick={addPitcher}
                    disabled={!!pitcher}
                    className="bg-green-500 text-white px-4 py-2 rounded shadow disabled:opacity-40"
                >
                    + 투수
                </button>
                <button onClick={addCandidate} className="bg-gray-500 text-white px-4 py-2 rounded shadow">
                    + 후보
                </button>
            </div>
        </div>
    );
}
