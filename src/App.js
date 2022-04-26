import { Container, Divider } from '@chakra-ui/react';
import Table from './components/Table';
import VoteHistory from './components/VoteHistory';

function App() {
  return (
    <div className='App'>
      <Container maxW='container.xl'>
        <Table />
      </Container>
      <Divider marginY='1rem' />
      <VoteHistory />
    </div>
  );
}

export default App;
