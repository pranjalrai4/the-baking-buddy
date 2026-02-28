import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const tips = [
    { title: 'Good lighting', description: 'Use natural light or bright indoor lighting' },
    { title: 'Clear view', description: 'Show the full bake from a slight angle' },
    { title: 'Include cross-section', description: 'If possible, show a cut or slice for crumb analysis' },
];

export default function AnalyzeScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerIcon}>📷</Text>
                <View>
                    <Text style={styles.title}>Analyze Your Bake</Text>
                    <Text style={styles.subtitle}>Get AI-powered feedback on your finished creation</Text>
                </View>
            </View>

            {/* Upload Box */}
            <View style={styles.uploadBox}>
                <View style={styles.uploadIconCircle}>
                    <Text style={styles.uploadArrow}>⬆️</Text>
                </View>
                <Text style={styles.uploadTitle}>Upload a photo of your bake</Text>
                <Text style={styles.uploadSubtitle}>Our AI will analyze the crust, crumb, and texture</Text>
                <TouchableOpacity style={styles.chooseButton}>
                    <Text style={styles.chooseButtonText}>📷  Choose Photo</Text>
                </TouchableOpacity>
            </View>

            {/* Tips */}
            <View style={styles.tipsSection}>
                <Text style={styles.tipsTitle}>Tips for best results:</Text>
                {tips.map((tip, index) => (
                    <View key={index} style={styles.tipCard}>
                        <Text style={styles.tipCheck}>✅</Text>
                        <View style={styles.tipText}>
                            <Text style={styles.tipTitle}>{tip.title}</Text>
                            <Text style={styles.tipDescription}>{tip.description}</Text>
                        </View>
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
    uploadBox: { margin: 16, borderWidth: 2, borderColor: '#d1d5db', borderStyle: 'dashed', borderRadius: 16, padding: 32, alignItems: 'center', backgroundColor: '#fff' },
    uploadIconCircle: { backgroundColor: '#f3f0ff', borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    uploadArrow: { fontSize: 28 },
    uploadTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 8, textAlign: 'center' },
    uploadSubtitle: { fontSize: 13, color: '#6b7280', textAlign: 'center', marginBottom: 24 },
    chooseButton: { backgroundColor: '#7c3aed', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
    chooseButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    tipsSection: { paddingHorizontal: 16 },
    tipsTitle: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    tipCard: { backgroundColor: '#f3f0ff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, borderWidth: 1, borderColor: '#7c3aed' },
    tipCheck: { fontSize: 20 },
    tipText: { flex: 1 },
    tipTitle: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
    tipDescription: { fontSize: 13, color: '#6b7280' },
});