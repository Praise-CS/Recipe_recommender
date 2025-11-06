import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
//Load environment variables from .env file 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files 

app.use(express.static("../"));


// API route to fetch recipes
app.get("/api/search", async (req, res) => 
    {
  try 
  {
    // Extract query parameters
    const { meal, ingredient, diet } = req.query;

    let apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=10`;
// Build API URL with query parameters
    if (meal) apiURL += `&query=${encodeURIComponent(meal)}`;
    if (ingredient) apiURL += `&includeIngredients=${encodeURIComponent(ingredient)}`;
    if (diet) apiURL += `&diet=${encodeURIComponent(diet)}`;

    const response = await fetch(apiURL);
    const data = await response.json();

    res.json(data);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: "Error fetching recipes." });
  }
});
// Start the server
app.listen(PORT, () =>
    {
  console.log(`Server running at http://localhost:${PORT}`);
});
