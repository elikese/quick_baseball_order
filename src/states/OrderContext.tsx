// states/OrderContext.tsx
import { createContext, useContext, useState } from "react";

type Player = { order: number; position: string; name: string; number: string };
type Pitcher = { name: string; number: string };
type Candidate = { name: string; number: string };

type OrderContextType = {
    starters: Player[];
    setStarters: React.Dispatch<React.SetStateAction<Player[]>>;
    pitcher: Pitcher | null;
    setPitcher: React.Dispatch<React.SetStateAction<Pitcher | null>>;
    candidates: Candidate[];
    setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [starters, setStarters] = useState<Player[]>([]);
    const [pitcher, setPitcher] = useState<Pitcher | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    return (
        <OrderContext.Provider value={{ starters, setStarters, pitcher, setPitcher, candidates, setCandidates }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrderContext() {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrderContext must be used within OrderProvider");
    return context;
}
