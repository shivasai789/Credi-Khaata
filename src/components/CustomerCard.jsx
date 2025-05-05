import { Box, Text, Badge, Flex, Button, Heading, Icon, AbsoluteCenter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaRupeeSign, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

const calculateBalance = (loan) => loan.amount - loan.repayments.reduce((sum, r) => sum + r.amount, 0);
const isOverdue = (dueDate) => dueDate && new Date(dueDate) < new Date();

export default function CustomerCard({ customer }) {
  const totalBalance = customer.loans.reduce((sum, loan) => sum + calculateBalance(loan), 0);
  
  const nextDue = customer.loans.length > 0 
  ? (() => {
      const pendingLoans = customer.loans.filter(
        loan => loan.repayments.reduce((sum, r) => sum + r.amount, 0) < loan.amount
      );
      if (pendingLoans.length === 0) return null;
      return new Date(Math.min(...pendingLoans.map(l => new Date(l.dueDate).getTime())));
    })()
  : null;
  
  const status = customer.loans.some(l => isOverdue(l.dueDate) && calculateBalance(l) > 0) 
    ? 'Overdue' 
    : customer.loans.length > 0 ? 'Up-to-date' : 'No loans';

  return (
    <Box 
      p={5} 
      borderWidth={1} 
      mb={4} 
      borderRadius="lg" 
      bg={status === 'Overdue' ? 'red.50' : 'white'}
      borderColor={status === 'Overdue' ? 'red.200' : 'gray.200'}
      boxShadow="sm"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)', transition: 'all 0.2s' }}
      position="relative" 
    >
      {/* Status Badge - Top Right Corner */}
      
      <Badge
      bg={
        status === 'Overdue' ? '#E53E3E' : // red.500
        status === 'Up-to-date' ? '#38A169' : // green.500
        '#718096' // gray.500
      }
      color="white"
      px={3}
      py={1}
      borderRadius="full"
      fontSize="sm"
      display="flex"
      alignItems="center"
      position="absolute"
      top={-2}
      right={-2}
      zIndex={1}
      boxShadow="md"
    >
      {status === 'Overdue' && <Icon as={MdPayment} mr={1} />}
      {status}
    </Badge>

    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      justify="space-between" 
      align={{ base: 'stretch', md: 'flex-start' }}
      gap={4}
    >
      <Box>
        <Flex align="center" mb={2}>
          <Icon as={FaUser} mr={2} color="blue.500" />
          <Heading size="md">{customer.name}</Heading>
        </Flex>
        
        <Flex align="center" mb={1}>
          <Icon as={FaPhone} mr={2} color="gray.500" />
          <Text fontSize="sm">{customer.phone}</Text>
        </Flex>
        
        <Flex align="center">
          <Icon as={FaEnvelope} mr={2} color="gray.500" />
          <Text fontSize="sm">{customer.email}</Text>
        </Flex>
      </Box>
      
      <Box textAlign={{ base: 'left', md: 'right' }}>
        <Flex align="center" justify={{ base: 'flex-start', md: 'flex-end' }} mb={1}>
          <Icon as={FaRupeeSign} mr={1} color="gray.500" />
          <Text fontWeight="bold" fontSize="lg">₹{totalBalance}</Text>
        </Flex>
        
        <Flex align="center" justify={{ base: 'flex-start', md: 'flex-end' }} mb={2}>
          <Icon as={FaCalendarAlt} mr={1} color="gray.500" />
          <Text fontSize="sm">
            {nextDue ? nextDue.toDateString() : 'No due date'}
          </Text>
        </Flex>
      </Box>
    </Flex>

      
      <Flex justify="flex-end" mt={4}>
        <Link to={`/customer/${customer.id}`}>
          <Button 
            colorScheme="blue" 
            size="sm"
            rightIcon={<Icon as={MdPayment} />}
            variant="outline"
            style={{backgroundColor: "white",border: "1px solid black"}}
          >
            View Details
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}