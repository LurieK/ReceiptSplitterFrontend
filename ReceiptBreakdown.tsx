import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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

interface ReceiptBreakdownProps {
    bill: Bill;
}

const ReceiptBreakdown: React.FC<ReceiptBreakdownProps> = ({ bill }) => {
    const subtotal = bill.items.reduce((sum, item) => sum + item.price, 0);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{bill.splitter_name}</Text>
                <Text style={styles.date}>{bill.date}</Text>
                <Text style={[styles.status, { color: bill.is_paid ? 'green' : 'red' }]}>
                    {bill.is_paid ? 'PAID' : 'UNPAID'}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Items</Text>
                {bill.items.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                        <Text style={styles.itemName}>{item.item_name}</Text>
                        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal:</Text>
                    <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax:</Text>
                    <Text style={styles.summaryValue}>${bill.tax_amount.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Service Charge:</Text>
                    <Text style={styles.summaryValue}>${bill.service_charge.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue}>${bill.total_price.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.dummyNote}>
                <Text style={styles.dummyText}>
                    📝 This is dummy data for testing the component
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#f8f9fa',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f8f9fa',
        marginBottom: 5,
        borderRadius: 5,
    },
    itemName: {
        fontSize: 16,
        flex: 1,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007AFF',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        marginTop: 10,
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    dummyNote: {
        backgroundColor: '#fff3cd',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffeaa7',
        marginTop: 20,
    },
    dummyText: {
        fontSize: 14,
        color: '#856404',
        textAlign: 'center',
    },
});

export default ReceiptBreakdown;
