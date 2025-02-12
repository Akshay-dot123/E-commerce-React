const laptopLists = [
  {
    name: "Laptop",
    description:
      "A high-performance laptop with a fast processor and large storage.",
    price: 999.99,
    promoted: false,
    link: "https://burst.shopifycdn.com/photos/laptop-from-above.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    createdAt: new Date(),
    updatedAt: new Date(),
    relatedLaptops: [
      {
        name: "XPS 15",
        description:
          "A premium laptop from Dell with a 15-inch display, perfect for creators and professionals.",
        recommended: true,
        trending: false,
        link: "https://example.com/xps-15.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "MacBook Pro 16",
        description:
          "A powerful laptop from Apple, designed for professionals who need high performance.",
        recommended: true,
        trending: true,
        link: "https://example.com/macbook-pro-16.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Razer Blade 15",
        description:
          "A powerful gaming laptop with fast graphics and a sleek design.",
        recommended: true,
        trending: true,
        link: "https://example.com/razer-blade-15.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alienware M15",
        description:
          "A high-performance gaming laptop from Dell with top-tier graphics and processing power.",
        recommended: false,
        trending: false,
        link: "https://example.com/alienware-m15.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gaming Laptop Pro",
        description:
          "A laptop designed for high-end gaming with exceptional graphics and speed.",
        price: 1499.99,
        promoted: true,
        link: "https://example.com/gaming-laptop.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];
