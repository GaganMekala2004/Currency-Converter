Currency Converter
This is a simple web-based currency converter application that allows users to convert between different currencies by entering a currency name, country name, or currency code.

Features
Convert between different currencies using an API.
Accepts inputs as currency names, country names, or currency codes (e.g., INR, USD, etc.).
Displays the conversion result and rate based on the user's input.
Technologies Used
Node.js: JavaScript runtime for server-side development.
Express.js: Web framework for handling routing and server logic.
EJS: Template engine used for rendering dynamic HTML pages.
Axios: Promise-based HTTP client used for making API requests.
Body-parser: Middleware for parsing incoming request bodies.
Nodemon: Utility to automatically restart the server during development.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/currency-converter.git
Navigate to the project directory:

bash
Copy code
cd currency-converter
Install the required dependencies:

bash
Copy code
npm install
Replace the API Key: Open index.js and replace YOUR_API_KEY with your actual ExchangeRate-API key.

Usage
Run the app:

bash
Copy code
npm start
Or use Nodemon for automatic server restarts during development:

bash
Copy code
nodemon
Access the application: Open your browser and visit:

arduino
Copy code
http://localhost:3000
Use the Currency Converter:

Enter a currency name, country name, or currency code.
Enter the amount you want to convert.
Select the currency to convert to and get the conversion result.
Dependencies
express: Web framework for Node.js.
ejs: Template engine for rendering HTML.
axios: For making API requests.
body-parser: Middleware for parsing request bodies.
nodemon: Development tool for automatically restarting the server.
