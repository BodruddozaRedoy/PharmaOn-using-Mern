import {
    Page,
    Text,
    View,
    Document,
    PDFViewer,
    Image,
    PDFDownloadLink,
  } from "@react-pdf/renderer";
  import { styles } from "./style";
  import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { tableData, totalData } from "./Data";
import logo from '/pharmaon-icon.svg'
  
  export default function Invoice2() {
    const payment = JSON.parse(localStorage.getItem('payment'))
    
    const InvoicePDF = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
              <Text>Invoice #{payment.transactionId}</Text>
            </View>
            <View style={styles.spaceY}>
                <Image style={{width: '30px'}} src={"./pharmaon-icon.png"}/>
              <Text style={styles.textBold}>PharmaOn</Text>
              {/* <Text>East Shewrapara</Text> */}
              <Text>Mirpur, Dhaka Bangladesh</Text>
            </View>
          </View>
  
          <View style={styles.spaceY}>
            <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
            <Text>Name:{payment.billingDetails.name}</Text>
            <Text>Address:{payment.billingDetails.address}</Text>
            <Text>Phone Number:{payment.billingDetails.phoneNumber}</Text>
            <Text>Country:{payment.billingDetails.country}</Text>
            {/* <Text>Address</Text> */}
            {/* <Text>City, State ZIP</Text> */}
          </View>
  
          {/* Render the table */}
          <Table style={styles.table}>
            <TH style={[styles.tableHeader, styles.textBold]}>
              <TD style={styles.td}>Description</TD>
              <TD style={styles.td}>Quantity</TD>
              <TD style={styles.td}>Unit Price</TD>
              <TD style={styles.td}>Total</TD>
            </TH>
            {payment.cartData.map((item, index) => (
              <TR key={index}>
                <TD style={styles.td}>{item.name}</TD>
                <TD style={styles.td}>{item.quantity}</TD>
                <TD style={styles.td}>${item.price?.toFixed(2)}</TD>
                <TD style={styles.td}>${item.totalPrice?.toFixed(2)}</TD>
              </TR>
            ))}
          </Table>
  
          <View style={styles.totals}>
            <View
              style={{
                minWidth: "256px",
              }}
            >
              {totalData.map((item, index) => (
                <View
                key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Text style={item.label === "Total" ? styles.textBold : {}}>
                    {item.label}
                  </Text>
                  <Text style={item.label === "Total" ? styles.textBold : {}}>
                    ${payment.price}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
    return (
      <div className="max-w-2xl mx-auto my-10">
        <div className="w-full h-[600px] hidden">
          <PDFViewer width="100%" height="100%">
            <InvoicePDF />
          </PDFViewer>
        </div>
        <div className="mt-6 flex justify-center">
          <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Download PDF
            </button>
          </PDFDownloadLink>
        </div>
      </div>
    );
  }