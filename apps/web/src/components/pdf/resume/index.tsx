import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const ResumePDF = () => {
  return (
    <Document>
      <Page size='LETTER'>
        <View>
          <Text>Header info</Text>
        </View>
        <View>
          <Text>Experience</Text>
        </View>
      </Page>
    </Document>
  )
}

export { ResumePDF }