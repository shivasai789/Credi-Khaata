export const customers = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    loans: [
      {
        id: 101,
        item: "Laptop",
        amount: 2000,
        date: "2025-03-15",
        dueDate: "2025-04-15",
        repayments: [
          { amount: 500, date: "2025-03-20" }
        ]
      },
      {
        id: 102,
        item: "Phone",
        amount: 1000,
        date: "2025-02-10",
        dueDate: "2025-03-10",
        repayments: [
          { amount: 1000, date: "2025-03-05" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "987-654-3210",
    email: "jane@example.com",
    loans: [
      {
        id: 201,
        item: "TV",
        amount: 3000,
        date: "2025-01-20",
        dueDate: "2025-02-20",
        repayments: [
          { amount: 3000, date: "2025-01-25" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Bob Johnson",
    phone: "555-123-4567",
    email: "bob@example.com",
    loans: [
    ]
  }
];
