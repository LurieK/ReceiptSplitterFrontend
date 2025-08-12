/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import ImagePicker, { ImageLibraryOptions } from 'react-native-image-picker';
import axios from 'axios';

import { API_URL } from '@env';

import BillsList from './BillsList';
import ReceiptBreakdown from './ReceiptBreakdown';

interface BillItem {
    id: number;
    item_name: string;
    price: number;
}

interface Bill {
    id: number;
    splitter_name: string;
    total_price: number;
    tax_amount: number;
    service_charge: number;
    is_paid: boolean;
    date: string;
    items: BillItem[];
}


function App() {
    const [screen, setScreen] = useState<'home' | 'imagePicker' | 'breakdown' | 'bills'>('home');
    const [currentBill, setCurrentBill] = useState<Bill | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line react/no-unstable-nested-components
    const HomeScreen = () => (
        
        <View style={styles.container}>
            <Text style={styles.title}>Receipt Splitter</Text>
            <Button title="Split a New Receipt" onPress={() => setScreen('imagePicker')} />
            <Button title="View All Bills" onPress={() => setScreen('bills')} />
        </View>
    );

    
    const ImagePickerScreen = () => {
        const handleImageUpload = async () => {
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                maxWidth: 500,
                maxHeight: 500,
                quality: 1,
            };

            ImagePicker.launchImageLibrary(options, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    setError(response.error);
                } else if (response.assets && response.assets.length > 0) {
                    const { uri, fileName, type } = response.assets[0];
                    const file = {
                        uri,
                        name: fileName!,
                        type: type!,
                    };

                    const formData = new FormData();
                    formData.append('image', file);

                    try {
                        setIsLoading(true);
                        const res = await axios.post<Bill>(`${API_URL}/api/upload-receipt/`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        setCurrentBill(res.data);
                        setScreen('breakdown');
                    } catch (err) {
                        console.error('API Error:', err);
                        setError('Failed to upload receipt. Please try again.');
                    } finally {
                        setIsLoading(false);
                    }
                }
            });
        };

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Upload Receipt</Text>
                <Button title="Choose from Library" onPress={handleImageUpload} />
                <Button title="Back" onPress={() => setScreen('home')} />
                {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    };

    const BillsListScreen = () => (
        <View style={styles.container}>
            <Text style={styles.header}>All Bills</Text>
            <BillsList 
                apiUrl={API_URL}
                onBillPress={(bill) => {
                    setCurrentBill(bill);
                    setScreen('breakdown');
                }}
            />
            <Button title="Back" onPress={() => setScreen('home')} />
        </View>
    );

    const ReceiptBreakdownScreen = () => (
        <View style={styles.container}>
            <Text style={styles.header}>Receipt Breakdown</Text>
            {currentBill && <ReceiptBreakdown bill={currentBill} />}
            <Button title="Back to Bills" onPress={() => setScreen('bills')} />
        </View>
    );

    interface ButtonProps {
        onPress: () => void;
        title: string;
    }

    const Button = ({ onPress, title }: ButtonProps) => (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );

    let activeScreen: JSX.Element;
    switch (screen) {
        case 'imagePicker':
            activeScreen = <ImagePickerScreen />;
            break;
        case 'breakdown':
            activeScreen = <ReceiptBreakdownScreen />;
            break;
        case 'bills':
            activeScreen = <BillsListScreen />;
            break;
        default:
            activeScreen = <HomeScreen />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {activeScreen}
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonWrapper: {
        marginVertical: 10,
        width: '80%',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

