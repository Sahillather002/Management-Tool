# Candidate Management System API Documentation

## Screenshots

### Home Screen
![Home Screen](/demo/step1.png)

### Candidate Detail Screen
![Candidate Detail](/demo/step2.png)


---

## Overview
This is a FastAPI backend for a Candidate Management System with an SQLite database that allows you to perform CRUD operations for candidate data. The API supports functionalities such as importing candidates from CSV files, retrieving candidates, updating their statuses, and generating PDFs.

## Features
- Import candidates from CSV files.
- Get a list of candidates with search and pagination options.
- View candidate details by ID.
- Update candidate status (reject or continue to next step).
- Generate PDFs for candidate profiles.

## Technologies Used
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pandas
- Pydantic
- Next.js (for the frontend)

## Installation

### Prerequisites
- Python 3.7 or above
- Pip

### Clone the Repository
```bash
git clone <repository-url>
cd candidate-management-system
```

### Install Dependencies
```bash
pip install fastapi[all] SQLAlchemy pandas
```

### Create the Database
```bash
# If using SQLite, the database will be created automatically when you start the FastAPI application
# No additional steps are needed
```

### Running the Application
To run the FastAPI server, use:
```bash
uvicorn main:app --reload
```
You can access the API at `http://127.0.0.1:8000`.

## API Endpoints

### 1. Home
- **GET** `/`
  - Returns a basic message.
  
### 2. Candidates

#### Get All Candidates
- **GET** `/candidates/`
  - Query Parameters: 
    - `skip`: Number of records to skip (default: `0`)
    - `limit`: Number of records to fetch (default: `10`)
    - `search`: Search string for filtering candidates by name.
  
- **Response**: List of candidates.

#### Import Candidates
- **POST** `/candidates/import/`
  - **Body**: CSV file (`multipart/form-data`)
  - **Response**: Message indicating the number of candidates imported.

#### Get Candidate by ID
- **GET** `/candidates/{candidate_id}`
  - **Response**: Details of the candidate.

#### Reject Candidate
- **POST** `/candidates/{candidate_id}/reject/`
  - **Response**: Message indicating candidate has been rejected.

#### Continue Candidate
- **POST** `/candidates/{candidate_id}/continue/`
  - **Response**: Message indicating candidate status updated.

#### Generate PDF
- **GET** `/candidates/{candidate_id}/pdf/`
  - **Response**: Message indicating PDF generation and path to the PDF.

## Frontend Integration with Next.js

### Prerequisites for Frontend
- Node.js
- npm or yarn

### Setting Up the Frontend
1. Create a new Next.js project:
   ```bash
   npx create-next-app candidate-management-frontend
   cd candidate-management-frontend
   ```

2. Install Axios for making API requests:
   ```bash
   npm install axios
   ```

### Making API Calls
Use Axios to interact with the FastAPI backend:

1. **Setup Axios instance**
   Create a file `api.js` in the root of your Next.js project:
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'http://127.0.0.1:8000',
   });

   export default api;
   ```

2. **Example of Fetching Candidates**
   ```javascript
   import { useEffect, useState } from 'react';
   import api from './api';

   const CandidatesList = () => {
     const [candidates, setCandidates] = useState([]);

     useEffect(() => {
       const fetchCandidates = async () => {
         const response = await api.get('/candidates/');
         setCandidates(response.data);
       };
       fetchCandidates();
     }, []);

     return (
       <div>
         <h1>Candidates</h1>
         <ul>
           {candidates.map(candidate => (
             <li key={candidate.id}>{candidate.name}</li>
           ))}
         </ul>
       </div>
     );
   };

   export default CandidatesList;
   ```

3. **Upload CSV File**
   Create a file upload component and use the `/candidates/import/` endpoint to import candidates from a CSV file.

### Running the Frontend
1. Start the Next.js development server:
   ```bash
   npm run dev
   ```

2. Access the application at `http://localhost:3000`.

## Additional Notes
- Ensure that your FastAPI backend is running before starting the Next.js application.
- You can customize the API endpoints and frontend components as needed to fit your project requirements.

## License
This project is licensed under the MIT License.

## Contributing
If you would like to contribute to this project, please create a pull request or open an issue for discussion.

---