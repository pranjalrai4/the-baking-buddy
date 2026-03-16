import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

type AnalysisResult = {
    bake_type: string;
    overall_score: number;
    crust: { score: number; feedback: string };
    crumb: { score: number; feedback: string };
    texture: { score: number; feedback: string };
    color: { score: number; feedback: string };
    improvements: string[];
    positives: string[];
};

export default function AnalyzeScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            setError('Permission to access photos is required!');
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 0.7,
        });
        if (!pickerResult.canceled && pickerResult.assets[0].base64) {
            setImage(pickerResult.assets[0].uri);
            analyzeBake(pickerResult.assets[0].base64);
        }
    };

    const analyzeBake = async (base64: string) => {
        setLoading(true);
        setResult(null);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/analyze-bake`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_base64: base64 }),
            });
            const data = await response.json();
            setResult(data);
        } catch (e) {
            setError('Could not analyze image. Make sure your backend is running!');
        }
        setLoading(false);
    };

    const ScoreBar = ({ score }: { score: number }) => (
        <View style={styles.scoreBarContainer}>
            <View style={[styles.scoreBar, { width: `${score * 10}%` }]} />
            <Text style={styles.scoreText}>{score}/10</Text>
        </View>
    );

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
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                    <>
                        <View style={styles.uploadIconCircle}>
                            <Text style={styles.uploadArrow}>⬆️</Text>
                        </View>
                        <Text style={styles.uploadTitle}>Upload a photo of your bake</Text>
                        <Text style={styles.uploadSubtitle}>Our AI will analyze the crust, crumb, and texture</Text>
                        <View style={styles.chooseButton}>
                            <Text style={styles.chooseButtonText}>📷  Choose Photo</Text>
                        </View>
                    </>
                )}
            </TouchableOpacity>

            {/* Change Photo button */}
            {image && !loading && (
                <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
                    <Text style={styles.changeButtonText}>Choose Different Photo</Text>
                </TouchableOpacity>
            )}

            {/* Loading */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#f5c400" />
                    <Text style={styles.loadingText}>Analyzing your bake...</Text>
                </View>
            )}

            {/* Error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Results */}
            {result && (
                <View style={styles.resultsContainer}>
                    {/* Overall Score */}
                    <View style={styles.overallCard}>
                        <Text style={styles.bakeType}>{result.bake_type}</Text>
                        <Text style={styles.overallScore}>{result.overall_score}/10</Text>
                        <Text style={styles.overallLabel}>Overall Score</Text>
                    </View>

                    {/* Scores */}
                    <View style={styles.scoresCard}>
                        <Text style={styles.cardTitle}>Detailed Scores</Text>
                        {[
                            { label: 'Crust', data: result.crust },
                            { label: 'Crumb', data: result.crumb },
                            { label: 'Texture', data: result.texture },
                            { label: 'Color', data: result.color },
                        ].map((item, index) => (
                            <View key={index} style={styles.scoreRow}>
                                <Text style={styles.scoreLabel}>{item.label}</Text>
                                <ScoreBar score={item.data.score} />
                                <Text style={styles.scoreFeedback}>{item.data.feedback}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Positives */}
                    <View style={styles.feedbackCard}>
                        <Text style={styles.cardTitle}>✅ What Went Well</Text>
                        {result.positives.map((positive, index) => (
                            <Text key={index} style={styles.feedbackItem}>• {positive}</Text>
                        ))}
                    </View>

                    {/* Improvements */}
                    <View style={styles.feedbackCard}>
                        <Text style={styles.cardTitle}>💡 How to Improve</Text>
                        {result.improvements.map((improvement, index) => (
                            <Text key={index} style={styles.feedbackItem}>• {improvement}</Text>
                        ))}
                    </View>
                </View>
            )}

            {/* Tips */}
            {!result && !loading && (
                <View style={styles.tipsSection}>
                    <Text style={styles.tipsTitle}>Tips for best results:</Text>
                    {[
                        { title: 'Good lighting', description: 'Use natural light or bright indoor lighting' },
                        { title: 'Clear view', description: 'Show the full bake from a slight angle' },
                        { title: 'Include cross-section', description: 'If possible, show a cut or slice for crumb analysis' },
                    ].map((tip, index) => (
                        <View key={index} style={styles.tipCard}>
                            <Text style={styles.tipCheck}>✅</Text>
                            <View style={styles.tipText}>
                                <Text style={styles.tipTitle}>{tip.title}</Text>
                                <Text style={styles.tipDescription}>{tip.description}</Text>
                            </View>
                        </View>
                    ))}
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
    uploadBox: { margin: 16, borderWidth: 2, borderColor: '#d1d5db', borderStyle: 'dashed', borderRadius: 16, padding: 32, alignItems: 'center', backgroundColor: '#fff' },
    uploadIconCircle: { backgroundColor: '#f3f0ff', borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    uploadArrow: { fontSize: 28 },
    uploadTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 8, textAlign: 'center' },
    uploadSubtitle: { fontSize: 13, color: '#6b7280', textAlign: 'center', marginBottom: 24 },
    chooseButton: { backgroundColor: '#7c3aed', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
    chooseButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    previewImage: { width: '100%', height: 250, borderRadius: 12 },
    changeButton: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#f3f4f6', borderRadius: 12, padding: 12, alignItems: 'center' },
    changeButtonText: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
    loadingContainer: { padding: 32, alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: 15, color: '#6b7280' },
    errorText: { margin: 16, fontSize: 14, color: '#ef4444', textAlign: 'center' },
    resultsContainer: { padding: 16 },
    overallCard: { backgroundColor: '#7c3aed', borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 16 },
    bakeType: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    overallScore: { fontSize: 48, fontWeight: 'bold', color: '#f5c400' },
    overallLabel: { fontSize: 14, color: '#e9d5ff', marginTop: 4 },
    scoresCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb' },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    scoreRow: { marginBottom: 12 },
    scoreLabel: { fontSize: 14, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
    scoreBarContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    scoreBar: { height: 8, backgroundColor: '#f5c400', borderRadius: 4 },
    scoreText: { fontSize: 12, color: '#6b7280' },
    scoreFeedback: { fontSize: 13, color: '#6b7280' },
    feedbackCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb' },
    feedbackItem: { fontSize: 14, color: '#1f2937', marginBottom: 6, lineHeight: 20 },
    tipsSection: { paddingHorizontal: 16 },
    tipsTitle: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
    tipCard: { backgroundColor: '#f3f0ff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, borderWidth: 1, borderColor: '#7c3aed' },
    tipCheck: { fontSize: 20 },
    tipText: { flex: 1 },
    tipTitle: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
    tipDescription: { fontSize: 13, color: '#6b7280' },
});