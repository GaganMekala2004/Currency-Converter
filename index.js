import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { currencyMapping } from './currencyMapping.js'; // Adjust the import path if needed

const app = express();
const port = 3000;

const YOUR_API_KEY = 'your-api-key'; // Replace with your actual API key

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from "public" directory
app.set('view engine', 'ejs');

// Helper function to get currency code from name, code, or country name
const getCurrencyCode = (input) => {
  // Standardize input to uppercase for consistency
  const standardizedInput = input.toUpperCase().trim();
  console.log('Standardized Input:', standardizedInput);

  // Check if the input matches a 3-letter currency code directly
  if (/^[A-Z]{3}$/.test(standardizedInput)) {
    console.log('Input is a 3-letter currency code:', standardizedInput);
    return standardizedInput;
  }

  // Check if the input matches a currency name or country name
  const currency = currencyMapping[standardizedInput] || 
    Object.entries(currencyMapping).find(([country, c]) => 
      country.toUpperCase() === standardizedInput || c.name.toUpperCase() === standardizedInput
    );

  console.log('Currency found:', currency);

  return currency ? currency[1].code : null;
};

// Route to render the form
app.get('/', (req, res) => {
  res.render('index', { data: {} }); // Ensure `data` is always passed
});

// Route to handle form submission
app.post('/submit-currency', async (req, res) => {
  const { Currency1, Amount, Currency2 } = req.body;
  const amount = parseFloat(Amount);

  const currency1Code = getCurrencyCode(Currency1);
  const currency2Code = getCurrencyCode(Currency2);

  console.log('Currency 1:', currency1Code, 'Currency 2:', currency2Code);

  let data = {
    Amount,
    FromCurrency: Currency1,
    ToCurrency: Currency2,
    ConversionResult: '',
    ConversionRate: '',
    error: ''
  };

  if (!currency1Code || !currency2Code) {
    data.error = 'Invalid currency name, code, or country name.';
    console.log('Error:', data.error);
    return res.render('index', { data });
  }

  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${YOUR_API_KEY}/pair/${currency1Code}/${currency2Code}`);
    const conversionRate = response.data.conversion_rate;
    if (!conversionRate) {
      throw new Error('Conversion rate not available');
    }

    data.ConversionRate = conversionRate;
    data.ConversionResult = (amount * conversionRate).toFixed(2);
    console.log('Conversion Rate:', conversionRate, 'Conversion Result:', data.ConversionResult);
    res.render('index', { data });
  } catch (error) {
    data.error = 'Conversion failed. Please try again later.';
    console.log('Error:', error.message);
    res.render('index', { data });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
