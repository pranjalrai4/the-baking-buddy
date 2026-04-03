import { createContext, useContext, useState, ReactNode } from 'react';

type PantryContextType = {
    ingredients: string[];
    setIngredients: (ingredients: string[]) => void;
    totalBaked: number;
    setTotalBaked: (count: number) => void;
    bakesAnalyzed: number;
    setBakesAnalyzed: (count: number) => void;
};

const PantryContext = createContext<PantryContextType>({
    ingredients: [],
    setIngredients: () => { },
    totalBaked: 0,
    setTotalBaked: () => { },
    bakesAnalyzed: 0,
    setBakesAnalyzed: () => { },
});

export function PantryProvider({ children }: { children: ReactNode }) {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [totalBaked, setTotalBaked] = useState(0);
    const [bakesAnalyzed, setBakesAnalyzed] = useState(0);

    return (
        <PantryContext.Provider value={{ ingredients, setIngredients, totalBaked, setTotalBaked, bakesAnalyzed, setBakesAnalyzed }}>
            {children}
        </PantryContext.Provider>
    );
}

export function usePantry() {
    return useContext(PantryContext);
}