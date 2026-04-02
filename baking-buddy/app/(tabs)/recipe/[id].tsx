import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const YOUR_IP = 'localhost';

type Ingredient = { amount: string; name: string };
type Step = { step: number; instruction: string };

type RecipeDetail = {
    name: string;
    description: string;
    time: string;
    difficulty: string;
    servings: number;
    ingredients: Ingredient[];
    steps: Step[];
    tips: string[];
};

export default function RecipeDetailScreen() {
    const { name, ingredients } = useLocalSearchParams();
    const router = useRouter();
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (name && ingredients) {
            fetchRecipeDetail();
        }
    }, []);

    const fetchRecipeDetail = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://${YOUR_IP}:8000/recipe-detail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name as string,
                    ingredients: JSON.parse(ingredients as string),
                }),
            });
            const data = await response.json();
            setRecipe(data);
        } catch (e) {
            setError('Could not load recipe. Make sure your backend is running!');
        }
        setLoading(false);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                {recipe && (
                    <>
                        <Text style={styles.title}>{recipe.name}</Text>
                        <Text style={styles.description}>{recipe.description}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaBadge}>
                                <Text style={styles.metaLabel}>Time</Text>
                                <Text style={styles.metaValue}>{recipe.time}</Text>
                            </View>
                            <View style={styles.metaBadge}>
                                <Text style={styles.metaLabel}>Difficulty</Text>
                                <Text style={styles.metaValue}>{recipe.difficulty}</Text>
                            </View>
                            <View style={styles.metaBadge}>
                                <Text style={styles.metaLabel}>Servings</Text>
                                <Text style={styles.metaValue}>{recipe.servings}</Text>
                            </View>
                        </View>
                    </>
                )}
            </View>

            {loading && (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#f5c400" />
                    <Text style={styles.loadingText}>Loading recipe...</Text>
                </View>
            )}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {recipe && !loading && (
                <>
                    {/* Time Cards */}
                    <View style={styles.timeRow}>
                        <View style={styles.timeCard}>
                            <Text style={styles.timeLabel}>Prep Time</Text>
                            <Text style={styles.timeValue}>{recipe.time}</Text>
                        </View>
                        <View style={[styles.timeCard, styles.timeCardPurple]}>
                            <Text style={[styles.timeLabel, styles.timeLabelPurple]}>Cook Time</Text>
                            <Text style={[styles.timeValue, styles.timeValuePurple]}>{recipe.time}</Text>
                        </View>
                    </View>

                    {/* Ingredients */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        <View style={styles.ingredientsList}>
                            {recipe.ingredients.map((ing, index) => (
                                <View key={index} style={[styles.ingredientRow, index === recipe.ingredients.length - 1 && styles.lastRow]}>
                                    <Text style={styles.ingredientName}>{ing.name}</Text>
                                    <Text style={styles.ingredientAmount}>{ing.amount}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Steps */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        {recipe.steps.map((step, index) => (
                            <View key={index} style={styles.stepCard}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>{step.step}</Text>
                                </View>
                                <Text style={styles.stepInstruction}>{step.instruction}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Tips */}
                    {recipe.tips && recipe.tips.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>💡 Tips</Text>
                            <View style={styles.tipsCard}>
                                {recipe.tips.map((tip, index) => (
                                    <Text key={index} style={styles.tipText}>• {tip}</Text>
                                ))}
                            </View>
                        </View>
                    )}
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fffde7' },
    header: { backgroundColor: '#f5c400', padding: 24, paddingTop: 48 },
    backButton: { marginBottom: 12 },
    backText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
    description: { fontSize: 14, color: '#fff3cd', marginBottom: 16 },
    metaRow: { flexDirection: 'row', gap: 8 },
    metaBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
    metaLabel: { fontSize: 11, color: '#fff3cd' },
    metaValue: { fontSize: 13, fontWeight: 'bold', color: '#fff' },
    centered: { padding: 40, alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: 15, color: '#6b7280' },
    errorText: { margin: 16, fontSize: 14, color: '#ef4444', textAlign: 'center' },
    timeRow: { flexDirection: 'row', padding: 16, gap: 12 },
    timeCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
    timeCardPurple: { borderColor: '#7c3aed' },
    timeLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
    timeLabelPurple: { color: '#7c3aed' },
    timeValue: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
    timeValuePurple: { color: '#7c3aed' },
    section: { paddingHorizontal: 16, marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    ingredientsList: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' },
    ingredientRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
    lastRow: { borderBottomWidth: 0 },
    ingredientName: { fontSize: 15, color: '#1f2937' },
    ingredientAmount: { fontSize: 15, color: '#6b7280', fontWeight: '500' },
    stepCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 8, borderWidth: 1, borderColor: '#e5e7eb' },
    stepNumber: { backgroundColor: '#fff3cd', borderRadius: 50, width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#f5c400' },
    stepNumberText: { fontSize: 14, fontWeight: 'bold', color: '#c8960c' },
    stepInstruction: { flex: 1, fontSize: 14, color: '#1f2937', lineHeight: 22 },
    tipsCard: { backgroundColor: '#f3f0ff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#7c3aed' },
    tipText: { fontSize: 14, color: '#6b21a8', marginBottom: 6, lineHeight: 20 },
});