require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyRecipes = [
  {
    title: "Classic Spaghetti Carbonara",
    ingredients: [
      "400g spaghetti",
      "200g pancetta",
      "4 large eggs",
      "100g Pecorino Romano cheese",
      "100g Parmigiano-Reggiano",
      "Black pepper",
      "Salt",
    ],
    instructions:
      "1. Cook pasta in salted water. 2. Fry pancetta until crispy. 3. Mix eggs, cheese, and pepper. 4. Combine hot pasta with egg mixture and pancetta. 5. Serve immediately with extra cheese and pepper.",
  },
  {
    title: "Chicken Tikka Masala",
    ingredients: [
      "800g chicken breast",
      "400ml tomato sauce",
      "300ml heavy cream",
      "2 onions",
      "4 garlic cloves",
      "Ginger",
      "Garam masala",
      "Turmeric",
      "Cumin",
    ],
    instructions:
      "1. Marinate chicken in yogurt and spices. 2. Grill chicken until charred. 3. Make sauce with onions, tomatoes, and cream. 4. Combine chicken with sauce. 5. Simmer until thick. Serve with rice.",
  },
  {
    title: "Chocolate Chip Cookies",
    ingredients: [
      "250g butter",
      "200g brown sugar",
      "100g white sugar",
      "2 eggs",
      "350g flour",
      "200g chocolate chips",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
    ],
    instructions:
      "1. Cream butter and sugars. 2. Add eggs and vanilla. 3. Mix in dry ingredients. 4. Fold in chocolate chips. 5. Bake at 180°C for 12-15 minutes until golden brown.",
  },
];

const seedDB = async () => {
  try {
    await Recipe.deleteMany({}); // Clear existing recipes
    await Recipe.insertMany(dummyRecipes);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
