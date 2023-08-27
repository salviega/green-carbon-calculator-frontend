import React, { useEffect, useRef, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

export default function EventTable() {
	return (
		<>
            <TableContainer border="1px" borderColor="gray.200" p="4" borderRadius='lg' overflowY="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th isNumeric> Total CO2</Th>
              <Th isNumeric>Mobility</Th>
              <Th isNumeric>Accomodation</Th>
              <Th isNumeric>Catering</Th>
              <Th isNumeric>Energy</Th>
              <Th isNumeric>Materials</Th>
              <Th isNumeric>Transport</Th>
              <Th isNumeric>Waste</Th>
              <Th>Behaviour</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td>2</Td>
            </Tr>

            <Tr>
              <Td>1</Td>
              <Td>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>1</Td>
              <Td>2</Td>
            </Tr>          </Tbody>
        </Table>
        </TableContainer>
		</>
	)
}
