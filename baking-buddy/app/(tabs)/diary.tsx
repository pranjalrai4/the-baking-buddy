import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState } from 'react';

type DiaryEntry = {
    id: number;
    name: string;
    date: string;
    time: string;
    rating: number;
    recipe: string;
    notes: string;
};

export default function DiaryScreen() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));
    const [rating, setRating] = useState(5);
    const [recipe, setRecipe] = useState('');
    const [notes, setNotes] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    const saveEntry = () => {
        if (!name.trim()) return;
        const timeStr = `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'min' : ''}`.trim();
        const newEntry: DiaryEntry = {
            id: Date.now(),
            name,
            date,
            time: timeStr,
            rating,
            recipe,
            notes,
        };
        setEntries([newEntry, ...entries]);
        resetForm();
        setModalVisible(false);
    };

    const resetForm = () => {
        setName('');
        setDate(new Date().toLocaleDateString('en-US'));
        setHours('');
        setMinutes('');
        setRating(5);
        setRecipe('');
        setNotes('');
    }

    const removeEntry = (id: number) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    const renderStars = (rating: number, onPress?: (star: number) => void) => {
        return [1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => onPress && onPress(star)}>
                <Text style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
        ));
    };

    const avgRating = entries.length > 0
        ? (entries.reduce((sum, e) => sum + e.rating, 0) / entries.length).toFixed(1)
        : '0.0';

    const hoursBaked = entries.reduce((sum, e) => {
        const match = e.time.match(/(\d+)\s*h/);
        const mins = e.time.match(/(\d+)\s*min/);
        const hours = match ? parseInt(match[1]) : 0;
        const minutes = mins ? parseInt(mins[1]) / 60 : 0;
        return sum + hours + minutes;
    }, 0).toFixed(1);

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerIcon}>📖</Text>
                <View>
                    <Text style={styles.title}>Bakery Diary</Text>
                    <Text style={styles.subtitle}>Track your baking journey and celebrate every creation</Text>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{entries.length}</Text>
                    <Text style={styles.statLabel}>Total Bakes</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{avgRating}</Text>
                    <Text style={styles.statLabel}>Average Rating</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{hoursBaked}</Text>
                    <Text style={styles.statLabel}>Hours of Baking</Text>
                </View>
            </View>

            {/* Log Button */}
            <TouchableOpacity style={styles.logButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.logButtonText}>+ Log a New Bake</Text>
            </TouchableOpacity>

            {/* Empty State */}
            {entries.length === 0 && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>🧁</Text>
                    <Text style={styles.emptyTitle}>No bakes logged yet!</Text>
                    <Text style={styles.emptySubtitle}>Tap "Log a New Bake" to start tracking your baking journey.</Text>
                </View>
            )}

            {/* Entries */}
            {entries.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Baking History ({entries.length})</Text>
                    {entries.map((entry) => (
                        <View key={entry.id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardName}>{entry.name}</Text>
                                <TouchableOpacity onPress={() => removeEntry(entry.id)}>
                                    <Text style={styles.removeButton}>×</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardMeta}>
                                <Text style={styles.metaText}>📅 {entry.date}</Text>
                                {entry.time ? <Text style={styles.metaText}>  ⏱ {entry.time}</Text> : null}
                            </View>
                            <View style={styles.starsRow}>
                                {renderStars(entry.rating)}
                            </View>
                            {entry.recipe ? (
                                <View style={styles.recipeBadge}>
                                    <Text style={styles.recipeBadgeText}>Recipe: {entry.recipe}</Text>
                                </View>
                            ) : null}
                            {entry.notes ? <Text style={styles.notes}>{entry.notes}</Text> : null}
                        </View>
                    ))}
                </View>
            )}

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Log a New Bake</Text>
                            <TouchableOpacity onPress={() => { setModalVisible(false); resetForm(); }}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Name */}
                        <Text style={styles.fieldLabel}>What did you bake?*</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Chocolate Chip Cookies"
                            placeholderTextColor="#aaa"
                            value={name}
                            onChangeText={setName}
                        />

                        {/* Date & Time */}
                        <View style={styles.rowFields}>
                            <View style={styles.halfField}>
                                <Text style={styles.fieldLabel}>Date</Text>
                                <TextInput
                                    style={styles.input}
                                    value={date}
                                    onChangeText={setDate}
                                    placeholderTextColor="#aaa"
                                />
                            </View>
                            <View style={styles.halfField}>
                                <Text style={styles.fieldLabel}>Hours</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g., 1"
                                    placeholderTextColor="#aaa"
                                    value={hours}
                                    onChangeText={setHours}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.halfField}>
                                <Text style={styles.fieldLabel}>Minutes</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g., 30"
                                    placeholderTextColor="#aaa"
                                    value={minutes}
                                    onChangeText={setMinutes}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* Rating */}
                        <Text style={styles.fieldLabel}>Rating</Text>
                        <View style={styles.starsRow}>
                            {renderStars(rating, setRating)}
                        </View>

                        {/* Recipe */}
                        <Text style={styles.fieldLabel}>Recipe (optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Recipe name or link"
                            placeholderTextColor="#aaa"
                            value={recipe}
                            onChangeText={setRecipe}
                        />

                        {/* Notes */}
                        <Text style={styles.fieldLabel}>Notes</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="How did it turn out? Any tips for next time?"
                            placeholderTextColor="#aaa"
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                        />

                        {/* Buttons */}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalVisible(false); resetForm(); }}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
                                <Text style={styles.saveButtonText}>Save Entry</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fffde7' },
    header: { backgroundColor: '#f5c400', padding: 24, paddingTop: 48, flexDirection: 'row', alignItems: 'center', gap: 12 },
    headerIcon: { fontSize: 32 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    subtitle: { fontSize: 13, color: '#fff3cd', marginTop: 4 },
    statsCard: { margin: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    statItem: { alignItems: 'center' },
    statNumber: { fontSize: 24, fontWeight: 'bold', color: '#c8960c' },
    statLabel: { fontSize: 12, color: '#6b7280', marginTop: 4 },
    statDivider: { width: 1, height: 40, backgroundColor: '#e5e7eb' },
    logButton: { marginHorizontal: 16, backgroundColor: '#c8960c', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
    logButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    emptyState: { alignItems: 'center', padding: 48 },
    emptyIcon: { fontSize: 64, marginBottom: 16 },
    emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
    emptySubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 20 },
    section: { paddingHorizontal: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    cardName: { fontSize: 17, fontWeight: 'bold', color: '#1f2937' },
    removeButton: { fontSize: 22, color: '#9ca3af' },
    cardMeta: { flexDirection: 'row', marginBottom: 8 },
    metaText: { fontSize: 12, color: '#6b7280' },
    starsRow: { flexDirection: 'row', marginBottom: 8 },
    star: { fontSize: 24, marginRight: 4 },
    recipeBadge: { backgroundColor: '#fef3c7', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 8 },
    recipeBadgeText: { fontSize: 12, color: '#c8960c', fontWeight: '600' },
    notes: { fontSize: 13, color: '#4b5563', lineHeight: 18 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '90%', maxHeight: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
    closeButton: { fontSize: 20, color: '#9ca3af' },
    fieldLabel: { fontSize: 14, fontWeight: '600', color: '#1f2937', marginBottom: 6, marginTop: 12 },
    input: { backgroundColor: '#f3f4f6', borderRadius: 10, padding: 12, fontSize: 15, color: '#1f2937' },
    textArea: { height: 80, textAlignVertical: 'top' },
    rowFields: { flexDirection: 'row', gap: 12 },
    halfField: { flex: 1 },
    modalButtons: { flexDirection: 'row', gap: 12, marginTop: 20 },
    cancelButton: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 12, padding: 14, alignItems: 'center' },
    cancelButtonText: { fontSize: 15, fontWeight: '600', color: '#6b7280' },
    saveButton: { flex: 1, backgroundColor: '#c8960c', borderRadius: 12, padding: 14, alignItems: 'center' },
    saveButtonText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});