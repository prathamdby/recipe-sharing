# Recipe Sharing CLI

A Node.js command-line interface application for managing recipes with MongoDB storage, featuring a clean, interactive UI and efficient data operations.

## Quick Start

### Prerequisites
- Node.js 12+
- MongoDB 4.0+
- npm 6+

### Setup & Run
```bash
# Clone repository
git clone https://github.com/prathamdby/recipe-sharing.git
cd recipe-sharing

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start application
npm start
```

### MongoDB Setup
```bash
# Start MongoDB service
mongod --dbpath /data/db

# Configure connection string in .env:
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
```

## Core Features

- **Recipe Management**
  - Create & edit recipes
  - Search by title/ingredients
  - Export to JSON format
  - Delete operations

- **Interactive CLI**
  - User-friendly menu system
  - Real-time feedback
  - Cross-platform support

- **Data Handling**
  - MongoDB persistence
  - Schema validation
  - Efficient querying
  - Export capabilities

## Technical Stack

- **Runtime**: Node.js
- **Storage**: MongoDB with Mongoose
- **Interface**: readline module
- **Config**: dotenv
- **File I/O**: fs module

## Development

Enable debug logging:
```bash
DEBUG=* npm start
```

MongoDB debugging:
```bash
DEBUG=mongodb:* npm start
```

## Contributing

Open to contributions! Please fork, create a feature branch, and submit a PR.

## License

MIT License - See LICENSE file

## Links

- **Author**: [@prathamdby](https://github.com/prathamdby)
- **Project**: [GitHub](https://github.com/prathamdby/recipe-sharing)

See TECHNICAL_INDEX.md for detailed technical documentation.
