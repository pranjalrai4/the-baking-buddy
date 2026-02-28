import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';

const YOUR_IP = 'localhost'; // Replace with your actual IP

const categories = [
    {
        name: 'Fats',
        items: [{ name: 'Butter', count: 3 }],
    },
    {
        name: 'Binding Agents',
        items: [{ name: 'Eggs', count: 3 }],
    },
    {
        name: 'Flours',
        items: [{ name: 'All-Purpose Flour', count: 3 }],
    },
    {
        name: 'Sweeteners',
        items: [{ name: 'Sugar', count: 3 }],
    },
];

export default function SwapScreen() {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState('');

    const getSubstitutions = async (ingredient: string) => {
        if (!ingredient.trim()) return;
        setLoading(true);
        setResult('');
        setSearched(ingredient);
        try {
            const response = await fetch(`http://${YOUR_IP}:8000/substitutions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredient }),
            });
            const data = await response.json();
            setResult(data.substitutions);
        } catch (error) {
            setResult('Could not connect to server. Make sure your backend is running!');
        }
        setLoading(false);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerIcon}>🔄</Text>
                <View>
                    <Text style={styles.title}>Substitutions</Text>
                    <Text style={styles.subtitle}>Missing an ingredient? Find the perfect swap</Text>
                </View>
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Search for an ingredient..."
                        placeholderTextColor="#aaa"
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={() => getSubstitutions(search)}
                        returnKeyType="search"
                    />
                    <TouchableOpacity onPress={() => getSubstitutions(search)}>
                        <Text style={styles.goButton}>Go</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Pro Tip */}
            <View style={styles.proTip}>
                <Text style={styles.proTipIcon}>ℹ️</Text>
                <View style={styles.proTipText}>
                    <Text style={styles.proTipTitle}>Pro Tip</Text>
                    <Text style={styles.proTipBody}>
                        Substitutions marked with a star (⭐) are the closest match to the original ingredient in both taste and texture.
                    </Text>
                </View>
            </View>

            {/* Loading */}
            {loading && <ActivityIndicator size="large" color="#f5c400" style={{ marginTop: 20 }} />}

            {/* Results */}
            {result ? (
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>Substitutes for {searched}:</Text>
                    <Text style={styles.resultText}>{result}</Text>
                </View>
            ) : !loading && (
                <>
                    {categories.map((category, index) => (
                        <View key={index} style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{category.name}</Text>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{category.items.length}</Text>
                                </View>
                            </View>
                            {category.items.map((item, i) => (
                                <TouchableOpacity key={i} style={styles.card} onPress={() => {
                                    setSearch(item.name);
                                    getSubstitutions(item.name);
                                }}>
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.cardName}>{item.name}</Text>
                                        <Text style={styles.cardSubs}>{item.count} substitutes available</Text>
                                    </View>
                                    <Text style={styles.arrow}>→</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </>
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
    searchRow: { padding: 16 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e5e7eb' },
    searchIcon: { fontSize: 16, marginRight: 8 },
    input: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#1f2937' },
    goButton: { fontSize: 15, fontWeight: 'bold', color: '#f5c400', paddingHorizontal: 8 },
    proTip: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#f3f0ff', borderRadius: 16, padding: 16, flexDirection: 'row', gap: 12, borderWidth: 1, borderColor: '#7c3aed' },
    proTipIcon: { fontSize: 20 },
    proTipText: { flex: 1 },
    proTipTitle: { fontSize: 15, fontWeight: 'bold', color: '#7c3aed', marginBottom: 4 },
    proTipBody: { fontSize: 13, color: '#6b21a8', lineHeight: 18 },
    resultCard: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f5c400' },
    resultTitle: { fontSize: 16, fontWeight: 'bold', color: '#c8960c', marginBottom: 8 },
    resultText: { fontSize: 14, color: '#1f2937', lineHeight: 22 },
    section: { paddingHorizontal: 16, marginBottom: 8 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
    badge: { backgroundColor: '#e5e7eb', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
    badgeText: { fontSize: 12, color: '#6b7280', fontWeight: '600' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, borderWidth: 1, borderColor: '#e5e7eb' },
    cardInfo: { flex: 1 },
    cardName: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
    cardSubs: { fontSize: 13, color: '#6b7280', marginTop: 2 },
    arrow: { fontSize: 18, color: '#9ca3af' }
});