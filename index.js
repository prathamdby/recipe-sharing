require("dotenv").config();
const mongoose = require("mongoose");
const readline = require("readline");
const fs = require("fs");
const Recipe = require("./models/Recipe");
const os = require("os");

// Function to clear console based on OS
const clearConsole = () => {
  if (os.platform() === "win32") {
    console.log("\x1Bc");
  } else {
    console.clear();
  }
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    clearConsole();
    console.log("\nConnected to MongoDB successfully!");
    showMenu();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Main menu options
const showMenu = () => {
  console.log("\n========= Recipe Sharing App =========");
  console.log("1. Add Recipe");
  console.log("2. List Recipes");
  console.log("3. Search Recipe");
  console.log("4. Delete Recipe");
  console.log("5. Export Recipe");
  console.log("6. Update Recipe");
  console.log("7. Exit");
  console.log("===================================");
  rl.question("\nSelect an option (1-7): ", handleOption);
};

// Handle user input for adding recipe
const addRecipe = async () => {
  try {
    console.log("\n========= Add New Recipe =========");

    const title = await new Promise((resolve) => {
      rl.question("Enter recipe title: ", resolve);
    });

    const ingredients = await new Promise((resolve) => {
      rl.question("Enter ingredients (comma-separated): ", (answer) => {
        resolve(
          answer
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i)
        );
      });
    });

    const instructions = await new Promise((resolve) => {
      rl.question("Enter cooking instructions: ", resolve);
    });

    if (!title.trim() || ingredients.length === 0 || !instructions.trim()) {
      throw new Error("All fields are required!");
    }

    const recipe = new Recipe({ title, ingredients, instructions });
    await recipe.save();

    console.log("\nRecipe added successfully!");
  } catch (err) {
    console.error("\nError adding recipe:", err.message);
  }
  showMenu();
};

// List all recipes
const listRecipes = async () => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    if (recipes.length === 0) {
      console.log("\nNo recipes found.");
    } else {
      console.log("\n========= All Recipes =========");
      recipes.forEach((recipe, index) => {
        console.log(`Recipe #${index + 1}: ${recipe.title}`);
        console.log("Ingredients:", recipe.ingredients.join(", "));
        console.log("Instructions:", recipe.instructions);
        console.log("Created:", recipe.createdAt.toLocaleDateString());
        console.log("\n" + "=".repeat(35));
      });
    }
  } catch (err) {
    console.error("Error listing recipes:", err.message, "\n");
  }
  showMenu();
};

// Search for recipes
const searchRecipe = async () => {
  try {
    console.log("\n========= Search Recipes =========");

    const searchTerm = await new Promise((resolve) => {
      rl.question("Enter search term (title or ingredient): ", resolve);
    });

    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { ingredients: { $regex: searchTerm, $options: "i" } },
      ],
    });

    if (recipes.length === 0) {
      console.log("\nNo matching recipes found.");
    } else {
      console.log(`Found ${recipes.length} matching recipes:\n`);
      recipes.forEach((recipe, index) => {
        console.log(`Recipe #${index + 1}: ${recipe.title}`);
        console.log("Ingredients:", recipe.ingredients.join(", "));
        console.log("Instructions:", recipe.instructions);
        console.log("\n" + "=".repeat(35));
      });
    }
  } catch (err) {
    console.error("Error searching recipes:", err.message, "\n");
  }
  showMenu();
};

// Delete a recipe
const deleteRecipe = async () => {
  try {
    console.log("\n========= Delete Recipe =========");

    const title = await new Promise((resolve) => {
      rl.question("Enter recipe title to delete: ", resolve);
    });

    const recipe = await Recipe.findOneAndDelete({
      title: { $regex: new RegExp(title, "i") },
    });

    if (recipe) {
      console.log("\nRecipe deleted successfully!");
    } else {
      console.log("\nRecipe not found.");
    }
  } catch (err) {
    console.error("Error deleting recipe:", err.message, "\n");
  }
  showMenu();
};

// Export a recipe
const exportRecipe = async () => {
  try {
    console.log("\n========= Export Recipe =========");

    const title = await new Promise((resolve) => {
      rl.question("Enter recipe title to export: ", resolve);
    });

    const recipe = await Recipe.findOne({
      title: { $regex: new RegExp(title, "i") },
    });

    if (recipe) {
      const exportDir = os.tmpdir();
      const fileName = `${recipe.title.replace(
        /[^a-z0-9]/gi,
        "_"
      )}_recipe.json`;
      const filePath = `${exportDir}/${fileName}`;

      const recipeData = {
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        createdAt: recipe.createdAt,
      };

      fs.writeFileSync(filePath, JSON.stringify(recipeData, null, 2));
      console.log(`\nRecipe exported successfully to: ${filePath}`);
    } else {
      console.log("\nRecipe not found.");
    }
  } catch (err) {
    console.error("Error exporting recipe:", err.message, "\n");
  }
  showMenu();
};

// Handle menu options
// Update a recipe
const updateRecipe = async () => {
  try {
    console.log("\n========= Update Recipe =========");

    const searchTitle = await new Promise((resolve) => {
      rl.question("Enter recipe title to update: ", resolve);
    });

    const recipe = await Recipe.findOne({
      title: { $regex: new RegExp(searchTitle, "i") },
    });

    if (recipe) {
      const newTitle = await new Promise((resolve) => {
        rl.question(
          `Enter new title (current: ${recipe.title}) or press Enter to keep current: `,
          (answer) => resolve(answer.trim() || recipe.title)
        );
      });

      const newIngredients = await new Promise((resolve) => {
        rl.question(
          `Enter new ingredients (current: ${recipe.ingredients.join(
            ", "
          )}) or press Enter to keep current: `,
          (answer) =>
            resolve(
              answer.trim()
                ? answer
                    .split(",")
                    .map((i) => i.trim())
                    .filter((i) => i)
                : recipe.ingredients
            )
        );
      });

      const newInstructions = await new Promise((resolve) => {
        rl.question(
          `Enter new instructions or press Enter to keep current:\nCurrent: ${recipe.instructions}\nNew: `,
          (answer) => resolve(answer.trim() || recipe.instructions)
        );
      });

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipe._id,
        {
          title: newTitle,
          ingredients: newIngredients,
          instructions: newInstructions,
        },
        { new: true }
      );

      console.log("\nRecipe updated successfully!");
      console.log("\nUpdated Recipe Details:");
      console.log("Title:", updatedRecipe.title);
      console.log("Ingredients:", updatedRecipe.ingredients.join(", "));
      console.log("Instructions:", updatedRecipe.instructions);
    } else {
      console.log("\nRecipe not found.");
    }
  } catch (err) {
    console.error("Error updating recipe:", err.message, "\n");
  }
  showMenu();
};

const handleOption = (option) => {
  switch (option) {
    case "1":
      addRecipe();
      break;
    case "2":
      listRecipes();
      break;
    case "3":
      searchRecipe();
      break;
    case "4":
      deleteRecipe();
      break;
    case "5":
      exportRecipe();
      break;
    case "6":
      updateRecipe();
      break;
    case "7":
      console.log("\nThank you for using Recipe Sharing App!");
      rl.close();
      mongoose.connection.close();
      process.exit(0);
    default:
      console.log("\nInvalid option. Please try again.");
      showMenu();
  }
};

// Start the application
clearConsole();
console.log("\n========= Recipe Sharing App =========");
console.log("Starting application...");
console.log("===================================");
