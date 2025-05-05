import { Navigate, Route, Routes, useParams } from "react-router-dom"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Sign-up"
import Dashboard from "./pages/Dashboard"
import CustomerDetails from "./pages/CustomerDetails"
import NotFound from "./pages/NotFound"
import AddCustomerPage from "./pages/AddCustomerPage"
import AddLoanPage from "./pages/AddLoanPage"
import AddRepaymentPage from "./pages/AddRepaymentPage"

const ProtectedRoute = ({ children }) => {
  const isLogin = localStorage.getItem("isLoggedIn") === "true";
  return isLogin ? children : <Navigate to="/login" replace />;
};


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/add-customer" element={<AddCustomerPage />} />
      <Route path="/customer/:customerId" element={<CustomerDetails></CustomerDetails>}></Route>
      <Route path="/customer/:customerId/add-loan" element={<AddLoanPage />} />
      <Route path="/customer/:customerId/loan/:loanId/repayment" element={<AddRepaymentPage />} />
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  </>
  )
}

export default App
