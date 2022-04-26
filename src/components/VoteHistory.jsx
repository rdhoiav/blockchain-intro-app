import {
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

function VoteHistory() {
  const { loading, error, data } = {};

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <TableContainer className='table-responsive'>
      <Center>
        {' '}
        <Text fontSize='2xl'>In love with React & Solidity</Text>
      </Center>

      <Table variant='simple' className='table table-bordered'>
        <Thead>
          <Tr>
            <Th textAlign='center'>Address Name</Th>
            <Th textAlign='center'>Proposal Choosen</Th>
          </Tr>
        </Thead>
        <Tbody>
          {new Array(10).fill(1).map((data, i) => {
            console.log(data);

            return (
              <Tr key={i}>
                <Td>{data}</Td>
                <Td>{data}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default VoteHistory;
