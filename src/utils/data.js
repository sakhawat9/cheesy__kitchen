import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
      user: false
    },
    {
      name: "user",
      email: "user@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
      user: false
    },
  ],
  food: [
    {
      name: "Bargar",
      slug: "bargar",
      category: "bargar",
      shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg",
      // isFeatured: true,
      // featuredImage: "/images/banner1.jpg",
      price: 70,
      rating: 4.5,
      countInStock: 20,
      description:
        "Food description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "Pizza Italian",
      slug: "pizza-italian",
      category: "pizza",
      shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
      // isFeatured: true,
      // featuredImage: "/images/banner2.jpg",
      price: 80,
      rating: 4.2,
      countInStock: 20,
      description:
        "Food description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "Chicken",
      slug: "chicken",
      category: "chicken",
      shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://cdn.pixabay.com/photo/2016/07/31/18/00/chicken-1559579_960_720.jpg",
      price: 90,
      rating: 4.5,
      countInStock: 20,
      description:
        "Food description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "Pizza plate food",
      slug: "pizza-plate-food",
      category: "pizza",
      shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://cdn.pixabay.com/photo/2019/04/24/12/11/burger-4152013_960_720.jpg",
      price: 90,

      rating: 4.5,
      countInStock: 20,
      description:
        "Food description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "Food grilled chicken",
      slug: "food-grilled-chicken",
      category: "chicken",
      shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://cdn.pixabay.com/photo/2016/08/30/18/45/grilled-1631727_960_720.jpg",
      price: 95,
      rating: 4.5,
      countInStock: 20,
      description:
        "Food description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "Pizza tomato pastry food",
      slug: "pizza-tomato-pastry-food",
      category: "pizza",
      shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://cdn.pixabay.com/photo/2017/09/24/14/29/pizza-2782012_960_720.jpg",
      price: 75,
      rating: 4.5,
      countInStock: 20,
      description:
        "Food description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
    {
      name: "Pasta",
      slug: "pasta",
      category: "pasta",
      shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, neque! Similique inventore labore ex error.",
      image:
        "https://cdn.pixabay.com/photo/2017/10/05/16/10/pasta-2819873_960_720.jpg",
      price: 75,
      rating: 4.5,
      countInStock: 20,
      description:
        "Food description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, asperiores culpa recusandae architecto dolores earum!",
    },
  ],
};

export default data;
