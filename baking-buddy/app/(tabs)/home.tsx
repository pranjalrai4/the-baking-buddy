import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.logo}>
                        <Text style={styles.logoIcon}>🧁</Text>
                    </View>
                    <View>
                        <Text style={styles.appName}>Baking Buddy</Text>
                        <Text style={styles.welcome}>Welcome back, baker!</Text>
                    </View>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>5</Text>
                    <Text style={styles.statLabel}>Pantry Items</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Recipes Ready</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Bakes Analyzed</Text>
                </View>
            </View>

            {/* Tip of the Day */}
            <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>✨</Text>
                <View style={styles.tipText}>
                    <Text style={styles.tipTitle}>Tip of the Day</Text>
                    <Text style={styles.tipBody}>Room temperature ingredients blend more easily! Take butter and eggs out 30 minutes before baking.</Text>
                </View>
            </View>

            {/* Ready to Bake */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ready to Bake</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>
                {[
                    { name: 'Butter Cookies', time: '30 min' },
                    { name: 'Pound Cake', time: '1h 15m' },
                    { name: 'Sugar Cookies', time: '45 min' },
                ].map((recipe, index) => (
                    <View key={index} style={styles.recipeCard}>
                        <View style={styles.recipeIcon}><Text>🧁</Text></View>
                        <View style={styles.recipeInfo}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeTime}>⏱ {recipe.time}</Text>
                        </View>
                        <View style={styles.badge}><Text style={styles.badgeText}>100%</Text></View>
                    </View>
                ))}
            </View>

            {/* Recent Activity */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {[
                    { name: 'Classic Butter Cookies', time: '2 days ago' },
                    { name: 'Sourdough Bread', time: '4 days ago' },
                ].map((activity, index) => (
                    <View key={index} style={styles.recipeCard}>
                        <View style={styles.recipeIcon}><Text>🧁</Text></View>
                        <View style={styles.recipeInfo}>
                            <Text style={styles.recipeName}>{activity.name}</Text>
                            <Text style={styles.recipeTime}>{activity.time}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff9c4' },
    header: { backgroundColor: '#f5c400', padding: 32, paddingTop: 64, flexDirection: 'row', alignItems: 'center' },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    logo: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 50, width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
    logoIcon: { fontSize: 24 },
    appName: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    welcome: { fontSize: 13, color: '#ffffff' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, gap: 8 },
    statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', shadowColor: '#7c3aed', shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 },
    statNumber: { fontSize: 24, fontWeight: 'bold', color: '#c8960c' },
    statLabel: { fontSize: 11, color: '#000000', textAlign: 'center', marginTop: 4 },
    tipCard: { margin: 16, marginTop: 0, backgroundColor: '#7c3aed', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
    tipIcon: { fontSize: 28 },
    tipText: { flex: 1 },
    tipTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
    tipBody: { fontSize: 13, color: '#e9d5ff', lineHeight: 18 },
    section: { padding: 16, paddingTop: 0 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    seeAll: { fontSize: 14, color: '#7c3aed' },
    recipeCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    recipeIcon: { backgroundColor: '#fef3c7', borderRadius: 10, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    recipeInfo: { flex: 1 },
    recipeName: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
    recipeTime: { fontSize: 12, color: '#6b7280', marginTop: 2 },
    badge: { backgroundColor: '#f3f0ff', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
    badgeText: { fontSize: 12, color: '#7c3aed', fontWeight: '600' },
});