import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Register a font (optional)
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu72xKOzY.woff2",
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    textAlign: "center",
  },
  total: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// Invoice component
const InvoiceDocument = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {/* Logo */}
        <Image
          style={styles.logo}
          src="./pharmaon-icon.png" // Replace with your logo URL
        />
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.title}>PharmaOn</Text>
        <Text style={styles.subtitle}>Date: {invoice.date}</Text>
      </View>

      {/* Billing Information */}
      <View style={styles.section}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Bill To:</Text>
        <Text>{invoice.client.name}</Text>
        <Text>{invoice.client.address}</Text>
        <Text>{invoice.client.city}</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
          <Text style={styles.tableCol}>Item</Text>
          <Text style={styles.tableCol}>Quantity</Text>
          <Text style={styles.tableCol}>Price</Text>
          <Text style={styles.tableCol}>Total</Text>
        </View>
        {/* Table Rows */}
        {invoice.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{item.name}</Text>
            <Text style={styles.tableCol}>{item.quantity}</Text>
            <Text style={styles.tableCol}>${item.price?.toFixed(2)}</Text>
            <Text style={styles.tableCol}>
              ${(item.quantity * item.price)?.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View style={styles.total}>
        <Text>Total: ${invoice.total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
