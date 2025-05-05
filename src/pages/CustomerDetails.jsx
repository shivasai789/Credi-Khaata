import { Box, Text, Button, VStack, HStack, Badge, Icon } from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { customers } from '../data/users';
import LoanItem from '../components/LoanItem';
import Navbar from '../components/Navbar/Navbar';
import { MdPayment } from 'react-icons/md';

const calculateTotalBalance = (loans) => 
  loans.reduce((sum, loan) => {
    const repaid = loan.repayments.reduce((repSum, r) => repSum + r.amount, 0);
    return sum + (loan.amount - repaid);
  }, 0);

export default function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const customer = customers.find(c => c.id === parseInt(customerId));

  if (!customer) {
    return (
      <>
        <Navbar />
        <Box p={5}>Customer not found</Box>
      </>
    );
  }

  const totalBalance = calculateTotalBalance(customer.loans);
  const hasOverdue = customer.loans.some(loan => {
    const dueDate = new Date(loan.dueDate);
    const balance = loan.amount - loan.repayments.reduce((sum, r) => sum + r.amount, 0);
    return dueDate < new Date() && balance > 0;
  });

  return (
    <>
      <Navbar />
      <Box p={5}>
        <HStack justify="space-between" mb={4}>
          <Text fontSize="2xl">{customer.name}'s Loans</Text>
          <Badge 
            bg={
              hasOverdue ? '#E53E3E' : '#38A169'
            }
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            display="flex"
            alignItems="center"
          >
            {hasOverdue && <Icon as={MdPayment} mr={1} />}
            {hasOverdue ? 'Overdue' : 'Up-to-date'}
          </Badge>
        </HStack>

        <Text mb={2}>Phone: {customer.phone}</Text>
        <Text mb={4}>Email: {customer.email}</Text>

        <Text fontSize="xl" mb={2}>Total Balance: ₹{totalBalance}</Text>

        <Link to={`/customer/${customerId}/add-loan`}>
          <Button colorScheme="blue" mb={4}>Add New Loan</Button>
        </Link>

        <VStack spacing={4} align="stretch">
          {customer.loans.map(loan => (
            <LoanItem 
              key={loan.id} 
              loan={loan} 
              customerId={customerId} 
            />
          ))}
        </VStack>

        <Button mt={4} onClick={() => navigate('/')}>Back to Dashboard</Button>
      </Box>
    </>
  );
}