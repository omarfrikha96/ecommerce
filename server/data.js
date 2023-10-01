import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    }
  ],
  products: [
    {
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      name: 'Adidas Slim shirt',
      slug: 'adidas-slim-shirt',
      category: 'Shirts',
      image: '/images/2.jpg',
      price: 130,
      countInStock: 9,
      brand: 'Adidas',
      rating: 5,
      numReviews: 11,
      description: 'high quality shirt',
    },
    {
      name: 'Puma Slim shirt',
      slug: 'puma-slim-shirt',
      category: 'Shirts',
      image: '/images/3.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Puma',
      rating: 2.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      name: 'Puma Slim pant',
      slug: 'puma-slim-pant',
      category: 'Pants',
      image: '/images/4.jpg',
      price: 120,
      countInStock: 0,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
  ],
};

export default data;
