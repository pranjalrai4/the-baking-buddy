import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function PantryScreen() {
    const [ingredients, setIngredients] = useState(['Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract']);
    const [input, setInput] = useState('');

    const addIngredient = () => {
        if (input.trim() === '') return;
        setIngredients([...ingredients, input.trim()]);
        setInput('');
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerIcon}>🧑‍🍳</Text>
                <View>
                    <Text style={styles.title}>My Pantry</Text>
                    <Text style={styles.subtitle}>Tell me what you have, and I'll suggest what you can bake</Text>
                </View>
            </View>

            {/* Search & Add */}
            <View style={styles.searchRow}>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Search or add ingredient..."
                        placeholderTextColor="#aaa"
                        value={input}
                        onChangeText={setInput}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Ingredient Tags */}
            <View style={styles.tagsSection}>
                <Text style={styles.tagsTitle}>In Your Pantry ({ingredients.length})</Text>
                <View style={styles.tagsRow}>
                    {ingredients.map((item, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{item}</Text>
                            <TouchableOpacity onPress={() => removeIngredient(index)}>
                                <Text style={styles.tagRemove}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            {/* Ready to Bake Banner */}
            <TouchableOpacity style={styles.banner}>
                <View>
                    <Text style={styles.bannerTitle}>Ready to bake?</Text>
                    <Text style={styles.bannerSubtitle}>See recipes you can make with these ingredients</Text>
                </View>
                <Text style={styles.bannerArrow}>→</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fffde7' },
    header: { backgroundColor: '#f5c400', padding: 24, paddingTop: 48, flexDirection: 'row', alignItems: 'center', gap: 12 },
    headerIcon: { fontSize: 32 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    subtitle: { fontSize: 13, color: '#fff3cd', marginTop: 4 },
    searchRow: { flexDirection: 'row', padding: 16, gap: 10, alignItems: 'center' },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e5e7eb' },
    searchIcon: { fontSize: 16, marginRight: 8 },
    input: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#1f2937' },
    addButton: { backgroundColor: '#f5c400', borderRadius: 12, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    addButtonText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
    tagsSection: { paddingHorizontal: 16 },
    tagsTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: '#e5e7eb', gap: 6 },
    tagText: { fontSize: 14, color: '#1f2937' },
    tagRemove: { fontSize: 18, color: '#9ca3af' },
    banner: { margin: 16, marginTop: 24, backgroundColor: '#f5c400', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
    bannerSubtitle: { fontSize: 13, color: '#fff3cd' },
    bannerArrow: { fontSize: 24, color: '#fff' },
});