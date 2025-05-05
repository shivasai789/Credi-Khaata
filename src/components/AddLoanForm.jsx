import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { customers } from '../data/users';
import { FaArrowLeft } from "react-icons/fa6";


export default function AddLoanForm() {
  const { customerId } = useParams();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const customer = customers.find(c => c.id === parseInt(customerId));
    if (customer) {
      const newLoan = {
        id: Date.now(),
        ...data,
        amount: parseFloat(data.amount),
        date: new Date().toISOString().split('T')[0],
        repayments: []
      };
      customer.loans.push(newLoan);
      
      alert(`Loan for ${data.item} has been added successfully`);
      navigate(`/customer/${customerId}`);
    }
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      <HStack align="center" mb={4}>
            <Link to={`/customer/${customerId}`}><FaArrowLeft/></Link>
            <Heading as="h2" size="lg" mb={0}>Add New Loan</Heading>
      </HStack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <label htmlFor="item" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Item
          </label>
          <input
            id="item"
            type="text"
            placeholder="Laptop"
            {...register('item', { required: 'Item is required' })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: errors.item ? 'red.300' : 'gray.200',
              borderRadius: '0.375rem'
            }}
          />
          {errors.item && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.item.message}</Text>
          )}
        </Box>

        <Box mb={4}>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Amount
          </label>
          <input
            id="amount"
            type="number"
            placeholder="1000"
            {...register('amount', {
              required: 'Amount is required',
              min: { 
                value: 1, 
                message: 'Amount must be greater than 0' 
              }
            })}
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
          <label htmlFor="dueDate" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            {...register('dueDate', {
              required: 'Due date is required',
              validate: value => {
                const today = new Date().toISOString().split('T')[0];
                return value >= today || 'Due date must be in the future';
              }
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: errors.dueDate ? 'red.300' : 'gray.200',
              borderRadius: '0.375rem'
            }}
          />
          {errors.dueDate && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.dueDate.message}</Text>
          )}
        </Box>

        <Button 
          type="submit" 
          colorScheme="blue" 
          width="full"
          mt={4}
        >
          Add Loan
        </Button>
      </form>
    </Box>
  );
}