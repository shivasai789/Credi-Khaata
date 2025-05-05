import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Text, Box, Image } from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
import './index.css';

export default function Signup() {
  const { signUp } = useAuth();
  const [redirect, setRedirect] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const isLoggedIn = await signUp(data);
    if (isLoggedIn) {
      setRedirect(true);
    }
  };

  if (redirect || JSON.parse(localStorage.getItem("isLoggedIn"))) {
    return <Navigate to="/" replace />;
  }

  return (
    <Flex className='page-cont' minH="100vh">
      {/* Left Side - Branding */}
      <Box className='side-container' bg="blue.500" color="white" p={8}>
        <Image src={logo} alt="Credi-Khaata Logo" mb={6} />
        <Text fontSize="2xl" fontWeight="bold">Welcome to Credi-Khaata</Text>
      </Box>

      {/* Right Side - Signup Form */}
      <Flex className='signup-container' align="center" justify="center" p={8}>
        <Box 
          border="1px solid" 
          borderColor="gray.200" 
          p={8} 
          borderRadius="md" 
          boxShadow="sm"
          width="100%"
          maxWidth="400px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6}>Account Signup</Text>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Email <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid',
                  borderColor: errors.email ? 'red' : '#E2E8F0',
                  borderRadius: '0.375rem'
                }}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm" mt={1}>{errors.email.message}</Text>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Password <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid',
                  borderColor: errors.password ? 'red' : '#E2E8F0',
                  borderRadius: '0.375rem'
                }}
              />
              {errors.password && (
                <Text color="red.500" fontSize="sm" mt={1}>{errors.password.message}</Text>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Confirm Password <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => 
                    value === watch('password') || 'Passwords do not match'
                })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid',
                  borderColor: errors.confirmPassword ? 'red' : '#E2E8F0',
                  borderRadius: '0.375rem'
                }}
              />
              {errors.confirmPassword && (
                <Text color="red.500" fontSize="sm" mt={1}>{errors.confirmPassword.message}</Text>
              )}
            </div>

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt={4}
              isLoading={isSubmitting}
              loadingText="Creating account..."
            >
              Sign Up
            </Button>

            <Text fontSize="sm" mt={4} textAlign="center">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#3182CE', fontWeight: '500' }}>
                Login
              </Link>
            </Text>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}