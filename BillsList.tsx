import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

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

interface BillsListProps {
    apiUrl: string;
    onBillPress: (bill: Bill) => void;
}

// Dummy data for testing
const dummyBills: Bill[] = [
    {
        id: 1,
        splitter_name: "John's Dinner",
        total_price: 45.67,
        tax_amount: 3.45,
        service_charge: 2.50,
        is_paid: false,
        date: "2024-08-12",
        items: [
            { id: 1, item_name: "Burger", price: 15.99 },
            { id: 2, item_name: "Fries", price: 8.50 },
            { id: 3, item_name: "Soda", price: 3.25 }
        ]
    },
    {
        id: 2,
        splitter_name: "Sarah's Lunch",
        total_price: 28.33,
        tax_amount: 2.15,
        service_charge: 1.50,
        is_paid: true,
        date: "2024-08-11",
        items: [
            { id: 4, item_name: "Salad", price: 12.99 },
            { id: 5, item_name: "Coffee", price: 4.50 }
        ]
    }
];

const BillsList: React.FC<BillsListProps> = ({ apiUrl, onBillPress }) => {
    const renderBill = ({ item }: { item: Bill }) => (
        <TouchableOpacity style={styles.billItem} onPress={() => onBillPress(item)}>
            <Text style={styles.billName}>{item.splitter_name}</Text>
            <Text style={styles.billDate}>{item.date}</Text>
            <Text style={styles.billAmount}>${item.total_price.toFixed(2)}</Text>
            <Text style={[styles.billStatus, { color: item.is_paid ? 'green' : 'red' }]}>
                {item.is_paid ? 'Paid' : 'Unpaid'}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bills List (Dummy Data)</Text>
            <FlatList
                data={dummyBills}
                renderItem={renderBill}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    billItem: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    billName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    billDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    billAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
        marginBottom: 5,
    },
    billStatus: {
        fontSize: 14,
        fontWeight: '500',
    },
});

export default BillsList;
