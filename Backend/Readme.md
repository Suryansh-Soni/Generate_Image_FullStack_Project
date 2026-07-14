# CanvasAI Backend

## Overview

CanvasAI Backend is a RESTful API built with Node.js and Express that powers the CanvasAI application. It handles AI image generation requests, stores generated artwork, manages community posts, and provides endpoints for the frontend application.

The backend integrates with external AI services for image generation and MongoDB for persistent storage, offering a scalable and modular architecture.

---

## Features

- RESTful API architecture
- AI image generation integration
- Create and store generated artwork
- Retrieve all published artwork
- MongoDB database integration
- Cloud image storage support
- Environment-based configuration
- Modular project structure
- Cross-Origin Resource Sharing (CORS) support

---

## Technology Stack

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | Runtime Environment             |
| Express.js | Web Framework                   |
| MongoDB    | Database                        |
| Mongoose   | MongoDB ODM                     |
| Cloudinary | Image Storage                   |
| Axios      | HTTP Requests                   |
| Dotenv     | Environment Variable Management |
| Cors       | Cross-Origin Resource Sharing   |

---

## Project Structure

```text
Backend
│
├── controllers/
├── models/
├── routes/
├── config/
├── utils/
├── index.js
├── package.json
├── .env
└── README.md
```

> The folder structure may vary slightly depending on the project organization.

---

## Installation

Clone the repository.

```bash
git clone https://github.com/Suryansh-Soni/Generate_Image_FullStack_Project.git
```

Navigate to the backend directory.

```bash
cd Generate_Image_FullStack_Project/Backend
```

Install project dependencies.

```bash
npm install
```

Create an environment file.

```text
.env
```

Configure the required environment variables.

```env
PORT=8080

MONGODB_URL=your_mongodb_connection_string

OPENAI_API_KEY=your_openai_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the development server.

```bash
npm start
```

If your project uses Nodemon:

```bash
npm run dev
```

---

## API Endpoints

### Generate Image

```http
POST /api/generateImage
```

Generates an AI image from a text prompt.

---

### Create Post

```http
POST /api/post
```

Stores a generated image and its associated metadata.

---

### Get Posts

```http
GET /api/post
```

Retrieves all published artwork.

---

## Database

The application uses MongoDB for storing community posts.

Each document typically contains:

- Author Name
- Prompt
- Generated Image URL
- Creation Timestamp

---

## Environment Variables

| Variable                | Description               |
| ----------------------- | ------------------------- |
| `PORT`                  | Server Port               |
| `MONGODB_URL`           | MongoDB Connection String |
| `OPENAI_API_KEY`        | OpenAI API Key            |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name     |
| `CLOUDINARY_API_KEY`    | Cloudinary API Key        |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret     |

---

## Running the Application

Development mode

```bash
npm run dev
```

Production mode

```bash
npm start
```

---

## Deployment

The backend can be deployed to platforms such as:

- Render
- Railway
- Heroku
- Azure App Service
- AWS Elastic Beanstalk
- DigitalOcean App Platform

Ensure all required environment variables are configured before deployment.

---

## API Integration

The backend serves as the central service layer between the frontend application and external services.

It is responsible for:

- Processing image generation requests
- Managing database operations
- Uploading and storing generated images
- Returning structured JSON responses
- Handling errors and validation

---

## Future Improvements

Potential enhancements include:

- User authentication and authorization
- JWT-based security
- Rate limiting
- Request validation
- Image history
- User-specific galleries
- Favorites and bookmarks
- Pagination and filtering
- Logging and monitoring
- Unit and integration testing
- Docker containerization
- API documentation with Swagger

---

## License

This project is intended for educational and portfolio purposes.
