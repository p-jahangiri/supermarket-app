import {
  Category,
  Product,
  User,
  Order,
  OrderStatus,
  PaymentMethod,
} from "../types";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat1",
    name: "Fruits & Vegetables",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "cat2",
    name: "Dairy & Eggs",
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "cat3",
    name: "Meat & Seafood",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "cat4",
    name: "Bakery",
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "cat5",
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1596803244618-8dea4ebff6c2?q=80&w=1469&auto=format&fit=crop",
  },
  {
    id: "cat6",
    name: "Snacks",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1470&auto=format&fit=crop",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod1",
    name: "Organic Bananas",
    description:
      "Fresh organic bananas from local farms. Rich in potassium and perfect for smoothies or a quick snack.",
    price: 2.99,
    discountPrice: 2.49,
    images: [
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1374&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[0],
    inStock: true,
    quantity: 100,
    unit: "kg",
    rating: 4.5,
    featured: true,
    tags: ["organic", "fruit", "fresh"],
  },
  {
    id: "prod2",
    name: "Fresh Milk",
    description:
      "Pasteurized whole milk from grass-fed cows. Rich and creamy with essential nutrients.",
    price: 3.49,
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1470&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[1],
    inStock: true,
    quantity: 50,
    unit: "liter",
    rating: 4.8,
    featured: true,
    tags: ["dairy", "fresh"],
  },
  {
    id: "prod3",
    name: "Chicken Breast",
    description:
      "Boneless, skinless chicken breast. High in protein and perfect for various recipes.",
    price: 8.99,
    discountPrice: 7.99,
    images: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1374&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[2],
    inStock: true,
    quantity: 30,
    unit: "kg",
    rating: 4.3,
    tags: ["meat", "protein"],
  },
  {
    id: "prod4",
    name: "Whole Wheat Bread",
    description:
      "Freshly baked whole wheat bread. High in fiber and perfect for sandwiches.",
    price: 4.29,
    images: [
      "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1470&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[3],
    inStock: true,
    quantity: 20,
    unit: "loaf",
    rating: 4.6,
    featured: true,
    tags: ["bakery", "whole grain"],
  },
  {
    id: "prod5",
    name: "Orange Juice",
    description:
      "Freshly squeezed orange juice. Rich in vitamin C and perfect for breakfast.",
    price: 5.99,
    images: [
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[4],
    inStock: true,
    quantity: 40,
    unit: "liter",
    rating: 4.7,
    tags: ["beverage", "juice", "fresh"],
  },
  {
    id: "prod6",
    name: "Potato Chips",
    description: "Crispy potato chips with sea salt. Perfect for snacking.",
    price: 3.99,
    discountPrice: 2.99,
    images: [
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1470&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[5],
    inStock: true,
    quantity: 60,
    unit: "pack",
    rating: 4.2,
    tags: ["snack", "chips"],
  },
  {
    id: "prod7",
    name: "Red Apples",
    description:
      "Fresh red apples. Sweet and crispy, perfect for snacking or baking.",
    price: 4.49,
    images: [
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1470&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[0],
    inStock: true,
    quantity: 80,
    unit: "kg",
    rating: 4.4,
    tags: ["fruit", "fresh"],
  },
  {
    id: "prod8",
    name: "Eggs",
    description:
      "Farm fresh eggs from free-range chickens. Rich in protein and essential nutrients.",
    price: 5.99,
    images: [
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1470&auto=format&fit=crop",
    ],
    category: MOCK_CATEGORIES[1],
    inStock: true,
    quantity: 100,
    unit: "dozen",
    rating: 4.9,
    featured: true,
    tags: ["dairy", "protein"],
  },
];

export const MOCK_USER: User = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  address: {
    id: "addr-001",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    isDefault: true,
  },
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    userId: "user-001",
    items: [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 2,
      },
      {
        product: MOCK_PRODUCTS[2],
        quantity: 1,
      },
    ],
    totalAmount: MOCK_PRODUCTS[0].price * 2 + MOCK_PRODUCTS[2].price,
    status: OrderStatus.DELIVERED,
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-15T15:45:00Z",
    shippingAddress: {
      id: "addr-001",
      street: "خیابان ولیعصر، پلاک ۱۲۳",
      city: "تهران",
      state: "تهران",
      zipCode: "۱۲۳۴۵۶۷۸۹۰",
      country: "ایران",
      isDefault: true,
    },
    paymentMethod: "online_payment",
  },
  {
    id: "ORD-002",
    userId: "user-001",
    items: [
      {
        product: MOCK_PRODUCTS[1],
        quantity: 3,
      },
      {
        product: MOCK_PRODUCTS[3],
        quantity: 2,
      },
    ],
    totalAmount: MOCK_PRODUCTS[1].price * 3 + MOCK_PRODUCTS[3].price * 2,
    status: OrderStatus.SHIPPED,
    createdAt: "2023-11-05T14:20:00Z",
    updatedAt: "2023-11-06T09:15:00Z",
    shippingAddress: {
      id: "addr-001",
      street: "خیابان ولیعصر، پلاک ۱۲۳",
      city: "تهران",
      state: "تهران",
      zipCode: "۱۲۳۴۵۶۷۸۹۰",
      country: "ایران",
      isDefault: true,
    },
    paymentMethod: "cash_on_delivery",
  },
  {
    id: "ORD-003",
    userId: "user-001",
    items: [
      {
        product: MOCK_PRODUCTS[4],
        quantity: 1,
      },
    ],
    totalAmount: MOCK_PRODUCTS[4].price,
    status: OrderStatus.PROCESSING,
    createdAt: "2023-12-01T08:45:00Z",
    updatedAt: "2023-12-01T10:30:00Z",
    shippingAddress: {
      id: "addr-002",
      street: "خیابان شریعتی، کوچه بهار، پلاک ۴۵",
      city: "تهران",
      state: "تهران",
      zipCode: "۱۲۳۴۵۶۷۸۹۰",
      country: "ایران",
      isDefault: false,
    },
    paymentMethod: "online_payment",
  },
  {
    id: "ORD-004",
    userId: "user-001",
    items: [
      {
        product: MOCK_PRODUCTS[5],
        quantity: 2,
      },
      {
        product: MOCK_PRODUCTS[6],
        quantity: 1,
      },
      {
        product: MOCK_PRODUCTS[7],
        quantity: 3,
      },
    ],
    totalAmount:
      MOCK_PRODUCTS[5].price * 2 +
      MOCK_PRODUCTS[6].price +
      MOCK_PRODUCTS[7].price * 3,
    status: OrderStatus.PENDING,
    createdAt: "2023-12-10T16:20:00Z",
    updatedAt: "2023-12-10T16:20:00Z",
    shippingAddress: {
      id: "addr-001",
      street: "خیابان ولیعصر، پلاک ۱۲۳",
      city: "تهران",
      state: "تهران",
      zipCode: "۱۲۳۴۵۶۷۸۹۰",
      country: "ایران",
      isDefault: true,
    },
    paymentMethod: "online_payment",
  },
  {
    id: "ORD-005",
    userId: "user-001",
    items: [
      {
        product: MOCK_PRODUCTS[8],
        quantity: 1,
      },
    ],
    totalAmount: MOCK_PRODUCTS[8]?.price,
    status: OrderStatus.CANCELLED,
    createdAt: "2023-11-20T11:10:00Z",
    updatedAt: "2023-11-21T09:30:00Z",
    shippingAddress: {
      id: "addr-001",
      street: "خیابان ولیعصر، پلاک ۱۲۳",
      city: "تهران",
      state: "تهران",
      zipCode: "۱۲۳۴۵۶۷۸۹۰",
      country: "ایران",
      isDefault: true,
    },
    paymentMethod: "cash_on_delivery",
  },
];
