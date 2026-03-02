import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const PRESET_INGREDIENTS = [
    'Flour', 'Eggs', 'Butter', 'Sugar', 'Milk', 'Vanilla Extract',
    'Baking Powder', 'Baking Soda', 'Salt', 'Cocoa Powder',
    'Brown Sugar', 'Honey', 'Olive Oil', 'Cream Cheese', 'Yeast'
];

export default function PantryScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>(['Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Extract']);
    const [input, setInput] = useState('');
    const [showPresets, setShowPresets] = useState(false);

    const addIngredient = (ingredient: string) => {
        if (!ingredient.trim() || selected.includes(ingredient)) return;
        setSelected([...selected, ingredient.trim()]);
        setInput('');
        setShowPresets(false);
    };

    const removeIngredient = (ingredient: string) => {
        setSelected(selected.filter(i => i !== ingredient));
    };

    const filteredPresets = PRESET_INGREDIENTS.filter(
        i => i.toLowerCase().includes(input.toLowerCase()) && !selected.includes(i)
    );

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
            <View style={styles.searchSection}>
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Search or add ingredient..."
                            placeholderTextColor="#aaa"
                            value={input}
                            onChangeText={(text) => { setInput(text); setShowPresets(true); }}
                            onSubmitEditing={() => addIngredient(input)}
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => addIngredient(input)}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Preset Dropdown */}
                {showPresets && input.length > 0 && filteredPresets.length > 0 && (
                    <View style={styles.presetsDropdown}>
                        {filteredPresets.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.presetItem} onPress={() => addIngredient(item)}>
                                <Text style={styles.presetText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Selected Ingredients */}
            <View style={styles.tagsSection}>
                <Text style={styles.tagsTitle}>In Your Pantry ({selected.length})</Text>
                <View style={styles.tagsRow}>
                    {selected.map((item, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{item}</Text>
                            <TouchableOpacity onPress={() => removeIngredient(item)}>
                                <Text style={styles.tagRemove}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            {/* Ready to Bake Banner */}
            {selected.length > 0 && (
                <TouchableOpacity
                    style={styles.banner}
                    onPress={() => router.push({ pathname: '/recipes', params: { ingredients: JSON.stringify(selected) } })}>
                    <View>
                        <Text style={styles.bannerTitle}>Ready to bake?</Text>
                        <Text style={styles.bannerSubtitle}>See recipes you can make with these ingredients</Text>
                    </View>
                    <Text style={styles.bannerArrow}>→</Text>
                </TouchableOpacity>
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
    searchSection: { padding: 16 },
    searchRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e5e7eb' },
    searchIcon: { fontSize: 16, marginRight: 8 },
    input: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#1f2937' },
    addButton: { backgroundColor: '#f5c400', borderRadius: 12, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    addButtonText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
    presetsDropdown: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', marginTop: 4 },
    presetItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
    presetText: { fontSize: 15, color: '#1f2937' },
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