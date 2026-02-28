import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const initialEntries = [
    {
        id: 1,
        name: 'Classic Butter Cookies',
        date: 'Feb 25, 2026',
        time: '30 min',
        rating: 5,
        recipe: 'Classic Butter Cookies',
        notes: 'Turned out perfectly! Everyone loved them at the party. Will definitely make again.',
    },
    {
        id: 2,
        name: 'Chocolate Cake',
        date: 'Feb 20, 2026',
        time: '1h 15min',
        rating: 4,
        recipe: 'Chocolate Layer Cake',
        notes: 'Good flavor but a bit dry. Next time I\'ll reduce baking time by 5 minutes.',
    },
    {
        id: 3,
        name: 'Sourdough Bread',
        date: 'Feb 15, 2026',
        time: '3h 00min',
        rating: 3,
        recipe: 'Classic Sourdough',
        notes: 'Crust was great but crumb was too dense. Need to work on proofing time.',
    },
];

export default function DiaryScreen() {
    const [entries, setEntries] = useState(initialEntries);

    const removeEntry = (id: number) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const renderStars = (rating: number) => {
        return [1, 2, 3, 4, 5].map(star => (
            <Text key={star} style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
        ));
    };

    const avgRating = (entries.reduce((sum, e) => sum + e.rating, 0) / entries.length).toFixed(1);
    const thisMonth = entries.filter(e => e.date.includes('Feb 2026')).length;

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
                    <Text style={styles.statLabel}>Avg Rating</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{thisMonth}</Text>
                    <Text style={styles.statLabel}>This Month</Text>
                </View>
            </View>

            {/* Log a New Bake Button */}
            <TouchableOpacity style={styles.logButton}>
                <Text style={styles.logButtonText}>+ Log a New Bake</Text>
            </TouchableOpacity>

            {/* Baking History */}
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
                            <Text style={styles.metaText}>  ⏱ {entry.time}</Text>
                        </View>
                        <View style={styles.starsRow}>
                            {renderStars(entry.rating)}
                        </View>
                        <View style={styles.recipeBadge}>
                            <Text style={styles.recipeBadgeText}>Recipe: {entry.recipe}</Text>
                        </View>
                        <Text style={styles.notes}>{entry.notes}</Text>
                    </View>
                ))}
            </View>
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
    section: { paddingHorizontal: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    cardName: { fontSize: 17, fontWeight: 'bold', color: '#1f2937' },
    removeButton: { fontSize: 22, color: '#9ca3af' },
    cardMeta: { flexDirection: 'row', marginBottom: 8 },
    metaText: { fontSize: 12, color: '#6b7280' },
    starsRow: { flexDirection: 'row', marginBottom: 8 },
    star: { fontSize: 16 },
    recipeBadge: { backgroundColor: '#fef3c7', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 8 },
    recipeBadgeText: { fontSize: 12, color: '#c8960c', fontWeight: '600' },
    notes: { fontSize: 13, color: '#4b5563', lineHeight: 18 },
}); 
