import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

const YOUR_IP = 'localhost';

type Recipe = {
    name: string;
    description: string;
    time: string;
    difficulty: string;
    missing: string[];
};

export default function RecipesScreen() {
    const { ingredients } = useLocalSearchParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (ingredients) {
            try {
                const parsed = JSON.parse(ingredients as string);
                fetchRecipes(parsed);
            } catch (e) {
                setError('Could not load ingredients.');
            }
        }
    }, [ingredients]);

    
    const fetchRecipes = async (ingredientList: string[]) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://${YOUR_IP}:8000/suggest-recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients: ingredientList }),
            });
            const data = await response.json();
            console.log('Backend response:', JSON.stringify(data));
            if (data.recipes && Array.isArray(data.recipes)) {
                setRecipes(data.recipes);
            } else {
                setError('Could not load recipes. Try again.');
            }
        } catch (e) {
            console.error(e);
            setError('Could not connect to server. Make sure your backend is running!');
        }
        setLoading(false);
    };

    const canMake = Array.isArray(recipes) ? recipes.filter(r => Array.isArray(r.missing) && r.missing.length === 0) : [];
    const almostThere = Array.isArray(recipes) ? recipes.filter(r => Array.isArray(r.missing) && r.missing.length > 0) : [];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerIcon}>🧁</Text>
                <View>
                    <Text style={styles.title}>Recipe Suggestions</Text>
                    <Text style={styles.subtitle}>Based on what's in your pantry</Text>
                </View>
            </View>

            {/* Loading */}
            {loading && (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#f5c400" />
                    <Text style={styles.loadingText}>Finding recipes for you...</Text>
                </View>
            )}

            {/* Error */}
            {error ? (
                <View style={styles.errorCard}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}

            {/* You Have Everything */}
            {!loading && canMake.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>✨ You Have Everything! ({canMake.length})</Text>
                    {canMake.map((recipe, index) => (
                        <View key={index} style={styles.recipeCard}>
                            <View style={styles.recipeIcon}>
                                <Text style={styles.recipeEmoji}>🧁</Text>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeHeader}>
                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                    <View style={styles.readyBadge}>
                                        <Text style={styles.readyText}>Ready!</Text>
                                    </View>
                                </View>
                                <Text style={styles.recipeDescription}>{recipe.description}</Text>
                                <View style={styles.recipeMeta}>
                                    <Text style={styles.metaText}>⏱ {recipe.time}</Text>
                                    <View style={styles.difficultyBadge}>
                                        <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* Almost There */}
            {!loading && almostThere.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Almost There ({almostThere.length})</Text>
                    {almostThere.map((recipe, index) => (
                        <View key={index} style={styles.recipeCard}>
                            <View style={styles.recipeIcon}>
                                <Text style={styles.recipeEmoji}>🧁</Text>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeHeader}>
                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                    <Text style={styles.percentText}>85%</Text>
                                </View>
                                <Text style={styles.recipeDescription}>{recipe.description}</Text>
                                <View style={styles.recipeMeta}>
                                    <Text style={styles.metaText}>⏱ {recipe.time}</Text>
                                    <View style={styles.difficultyBadge}>
                                        <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
                                    </View>
                                </View>
                                <Text style={styles.missingText}>Missing: {recipe.missing.join(', ')}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* No results */}
            {!loading && !error && recipes.length === 0 && (
                <View style={styles.centered}>
                    <Text style={styles.emptyText}>No recipes found. Try adding more ingredients!</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fffde7' },
    header: { backgroundColor: '#f5c400', padding: 24, paddingTop: 48, flexDirection: 'row', alignItems: 'center', gap: 12 },
    headerIcon: { fontSize: 32 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    subtitle: { fontSize: 13, color: '#fff3cd', marginTop: 4 },
    centered: { padding: 40, alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: 15, color: '#6b7280' },
    errorCard: { margin: 16, backgroundColor: '#fee2e2', borderRadius: 12, padding: 16 },
    errorText: { fontSize: 14, color: '#ef4444' },
    section: { padding: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    recipeCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 12, borderWidth: 1, borderColor: '#e5e7eb' },
    recipeIcon: { backgroundColor: '#fef3c7', borderRadius: 10, width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
    recipeEmoji: { fontSize: 28 },
    recipeInfo: { flex: 1 },
    recipeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    recipeName: { fontSize: 15, fontWeight: '600', color: '#1f2937', flex: 1 },
    recipeDescription: { fontSize: 13, color: '#6b7280', marginBottom: 8 },
    recipeMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    metaText: { fontSize: 12, color: '#6b7280' },
    readyBadge: { backgroundColor: '#f3f0ff', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
    readyText: { fontSize: 12, color: '#7c3aed', fontWeight: '600' },
    percentText: { fontSize: 14, fontWeight: 'bold', color: '#6b7280' },
    difficultyBadge: { backgroundColor: '#f3f4f6', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
    difficultyText: { fontSize: 12, color: '#1f2937', fontWeight: '500' },
    missingText: { fontSize: 12, color: '#ef4444', marginTop: 6 },
    emptyText: { fontSize: 15, color: '#6b7280', textAlign: 'center' },
});