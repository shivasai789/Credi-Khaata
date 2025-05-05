import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { customers } from '../data/users';
import { FaArrowLeft } from "react-icons/fa6";

export default function AddCustomerForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const newCustomer = {
      id: customers.length + 1,
      ...data,
      loans: []
    };
    customers.push(newCustomer);

    // Simulate a success notification
    alert(`${data.name} has been added successfully`);
    navigate('/');
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      <HStack align="center" mb={4}>
      <Link to="/"><FaArrowLeft/></Link>
      <Heading as="h2" size="lg" mb={0}>Add New Customer</Heading>
      </HStack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: errors.name ? 'red.300' : 'gray.200',
              borderRadius: '0.375rem'
            }}
          />
          {errors.name && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.name.message}</Text>
          )}
        </Box>

        <Box mb={4}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format'
              }
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: errors.email ? 'red.300' : 'gray.200',
              borderRadius: '0.375rem'
            }}
          />
          {errors.email && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.email.message}</Text>
          )}
        </Box>

        <Box mb={4}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Phone
          </label>
          <input
            id="phone"
            type="text"
            placeholder="1234567890"
            {...register('phone', { 
              required: 'Phone is required',
              minLength: {
                value: 10,
                message: 'Phone number must be at least 10 characters'
              }
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid',
              borderColor: errors.phone ? 'red.300' : 'gray.200',
              borderRadius: '0.375rem'
            }}
          />
          {errors.phone && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.phone.message}</Text>
          )}
        </Box>

        <Button 
          type="submit" 
          colorScheme="blue" 
          width="full"
          mt={4}
          isLoading={isSubmitting}
          loadingText="Adding..."
        >
          Add Customer
        </Button>
      </form>
    </Box>
  );
}