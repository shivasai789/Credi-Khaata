import { Box, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { customers } from '../data/users';
import CustomerCard from '../components/CustomerCard';
import Navbar from '../components/Navbar/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Box p={5}>
        <Text fontSize="2xl" mb={4}>Customer Dashboard</Text>
        <Link to="/add-customer" style={{display: "flex",justifyContent:"flex-end"}}>
          <Button colorScheme="blue" mb={4}>Add New Customer</Button>
        </Link>
        <VStack spacing={4} align="stretch">
          {customers.map(customer => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </VStack>
      </Box>
    </>
  );
}