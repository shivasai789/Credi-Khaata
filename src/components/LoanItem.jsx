import { Box, Text, Badge, Flex, Button, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const calculateBalance = (loan) => loan.amount - loan.repayments.reduce((sum, r) => sum + r.amount, 0);
const isOverdue = (dueDate) => dueDate && new Date(dueDate) < new Date();

export default function LoanItem({ loan, customerId }) {
  // Base case when no loan is provided
  if (!loan) {
    return (
      <Box 
        p={6} 
        borderWidth={1} 
        borderRadius="md" 
        borderColor="gray.200"
        textAlign="center"
      >
        <Heading size="md" mb={2} color="gray.500">
          No Loan Items
        </Heading>
        <Text color="gray.500">This customer has no active loans</Text>
        <Link to={`/customer/${customerId}/add-loan`}>
          <Button mt={4} colorScheme="blue" size="sm">
            Add New Loan
          </Button>
        </Link>
      </Box>
    );
  }

  const balance = calculateBalance(loan);
  const overdue = isOverdue(loan.dueDate) && balance > 0;

  return (
    <Box 
      p={4} 
      borderWidth={1} 
      mb={3} 
      borderRadius="md"
      bg={overdue ? 'red.50' : 'white'}
      borderColor={overdue ? 'red.200' : 'gray.200'}
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" fontSize="lg">{loan.item}</Text>
        <Badge 
          colorScheme={overdue ? 'red' : 'blue'} 
          fontSize="sm"
          px={2}
          py={1}
        >
          ₹{loan.amount}
        </Badge>
      </Flex>

      <Flex mt={2} direction="column" gap={1}>
        <Text fontSize="sm">Date: {new Date(loan.date).toDateString()}</Text>
        <Text fontSize="sm" color={overdue ? 'red.500' : 'inherit'}>
          Due: {new Date(loan.dueDate).toDateString()}
        </Text>
        <Text fontSize="sm" fontWeight="semibold">
          Remaining: ₹{balance}
        </Text>
      </Flex>

      {loan.repayments.length > 0 && (
        <>
          <Box 
            as="hr" 
            my={3} 
            border={0} 
            borderTop="1px solid" 
            borderColor="gray.200" 
          />
          <Text fontSize="sm" fontWeight="bold" mb={2}>Repayments:</Text>
          {loan.repayments.map((repayment, i) => (
            <Flex 
              key={i} 
              justify="space-between" 
              fontSize="sm" 
              mb={1}
              bg="gray.50"
              p={2}
              borderRadius="sm"
            >
              <Text>{new Date(repayment.date).toDateString()}</Text>
              <Text fontWeight="medium">₹{repayment.amount}</Text>
            </Flex>
          ))}
        </>
      )}

      {balance > 0 && (
        <Link to={`/customer/${customerId}/loan/${loan.id}/repayment`}>
          <Button 
            mt={4} 
            colorScheme="blue" 
            size="sm" 
            width="full"
            variant={overdue ? 'solid' : 'outline'}
          >
            Record Repayment
          </Button>
        </Link>
      )}
    </Box>
  );
}