# Recipe Sharing App

A command-line interface application for managing and sharing recipes. Users can create, search, update, and export their favorite recipes through an interactive console interface.

## Features

- Add new recipes with title, ingredients, and instructions
- List all saved recipes
- Search recipes by title or ingredients
- Update existing recipes
- Delete recipes
- Export recipes to JSON files
- Interactive CLI menu interface

## Prerequisites

- Node.js
- MongoDB

## Installation

```bash
# Clone the repository
git clone https://github.com/prathamdby/recipe-sharing.git

# Navigate to project directory
cd recipe-sharing

# Install dependencies
npm install

# Create .env file and configure environment variables
cp .env.example .env
```

## Environment Variables

Create a `.env` file in the root directory with:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

## Usage

Start the application:

```bash
npm start
```

Use the interactive menu to:

1. Add Recipe - Create a new recipe
2. List Recipes - View all saved recipes
3. Search Recipe - Find recipes by title or ingredients
4. Delete Recipe - Remove a recipe
5. Export Recipe - Save a recipe as JSON file
6. Update Recipe - Modify an existing recipe
7. Exit - Close the application

## Tech Stack

- Node.js
- MongoDB (mongoose)
- readline (for CLI interface)

## License

This project is licensed under the MIT License.

## Author

- [@prathamdby](https://github.com/prathamdby)
