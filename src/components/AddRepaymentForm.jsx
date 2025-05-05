import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { customers } from '../data/users';
import { FaArrowLeft } from "react-icons/fa6";

export default function AddRepaymentForm() {
  const { customerId, loanId } = useParams();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const navigate = useNavigate();

  const customer = customers.find(c => c.id === parseInt(customerId));
  const loan = customer?.loans.find(l => l.id === parseInt(loanId));
  const remaining = loan ? loan.amount - loan.repayments.reduce((sum, r) => sum + r.amount, 0) : 0;

  const onSubmit = (data) => {
    if (loan) {
      const newRepayment = {
        amount: parseFloat(data.amount),
        date: data.date || new Date().toISOString().split('T')[0]
      };
      
      // Add the new repayment
      loan.repayments.push(newRepayment);
      
      // Calculate new remaining balance
      const newRemaining = loan.amount - loan.repayments.reduce((sum, r) => sum + r.amount, 0);
      
      // Update due date logic
      if (newRemaining <= 0) {
        loan.dueDate = null; // Clear due date if fully paid
      } else {
        // Set due date to 30 days from payment date
        const lastPaymentDate = new Date(newRepayment.date);
        lastPaymentDate.setDate(lastPaymentDate.getDate() + 30);
        loan.dueDate = lastPaymentDate.toISOString().split('T')[0];
      }
      
      navigate(`/customer/${customerId}`);
    }
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      <HStack align="center" mb={4}>
                  <Link to={`/customer/${customerId}`}><FaArrowLeft/></Link>
                  <Heading as="h2" size="lg" mb={0}>Record Repayment</Heading>
            </HStack>
      
      <Box bg="gray.50" p={4} borderRadius="md" mb={4}>
        <Text><strong>Loan:</strong> {loan?.item}</Text>
        <Text><strong>Original Amount:</strong> ₹{loan?.amount}</Text>
        <Text><strong>Remaining Balance:</strong> ₹{remaining}</Text>
        {loan?.dueDate && (
          <Text><strong>Current Due Date:</strong> {new Date(loan.dueDate).toDateString()}</Text>
        )}
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Amount
          </label>
          <input
            id="amount"
            type="number"
            {...register('amount', { 
              required: 'Amount is required',
              min: {
                value: 1,
                message: 'Amount must be at least ₹1'
              },
              max: {
                value: remaining,
                message: `Amount cannot exceed ₹${remaining}`
              }
            })}
            placeholder="500"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: errors.amount ? 'red.300' : 'gray.200',
              borderRadius: '0.375rem'
            }}
          />
          {errors.amount && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.amount.message}</Text>
          )}
        </Box>

        <Box mb={4}>
          <label htmlFor="date" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Date (leave blank for today)
          </label>
          <input
            id="date"
            type="date"
            {...register('date', {
              validate: value => {
                if (!value) return true; // allow empty (will default to today)
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // remove time
                return selectedDate < today || 'Date must be before today';
              }
            })}
          />
          {errors.date && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.date.message}</Text>
          )}
        </Box>

        <Button 
          type="submit" 
          colorScheme="blue" 
          width="full"
          mt={4}
        >
          Record Repayment
        </Button>
      </form>
    </Box>
  );
}