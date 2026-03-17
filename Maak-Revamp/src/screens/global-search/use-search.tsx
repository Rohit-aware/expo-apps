import React from "react";
import { useSharedValue } from "react-native-reanimated";

const useGlobalSearch = () => {
    const [search, setSearch] = React.useState('');
    const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
    const progress = useSharedValue(0);

    const removeSearch = (value: string) => setSearchHistory(prev => prev.filter(item => item !== value));

    const addToSearchHistory = (term: string) => {
        if (term.trim() && !searchHistory.includes(term)) {
            setSearchHistory((prev) => [...prev, term]);
        };
    };

    const onChangeText = (text: string) => {
        setSearch(text);
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            addToSearchHistory(text);
        }, 2000);
    };


    return {
        search,
        progress,
        onChangeText,
        removeSearch,
        searchHistory,
    };
};
export { useGlobalSearch };