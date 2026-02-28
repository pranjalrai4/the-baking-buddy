import { View, Text, StyleSheet } from 'react-native';

export default function Substitutions() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧁 Baking Buddy</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffbea' },
    title: { fontSize: 32, fontWeight: 'bold', color: '#c8960c' }
});
