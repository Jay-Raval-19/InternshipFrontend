const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { Pinecone } = require("@pinecone-database/pinecone");
require("dotenv").config();

const app = express();

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:8080", // Updated to match your frontend URL
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test email configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Check if email exists in Pinecone database
app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Get the index with the correct namespace
    const index = pinecone.index(
      process.env.PINECONE_INDEX_NAME || "chemical-frontend"
    );

    // Create a dummy vector with 1024 dimensions (first element is 1, rest are 0)
    const dummyVector = new Array(1024).fill(0);
    dummyVector[0] = 1;

    // Query the index for the email in the "chemicals" namespace
    const queryResponse = await index.namespace("chemicals").query({
      vector: dummyVector,
      filter: {
        "Seller Email Address": { $eq: email },
      },
      topK: 1,
      includeMetadata: true,
    });

    console.log(
      "Pinecone query response:",
      JSON.stringify(queryResponse, null, 2)
    );

    if (queryResponse.matches && queryResponse.matches.length > 0) {
      // Email found in database
      const supplierData = queryResponse.matches[0].metadata;
      res.status(200).json({
        exists: true,
        message: "Email found in database",
        supplierData: {
          sellerName: supplierData["Seller Name"],
          sellerEmail: supplierData["Seller Email Address"],
          sellerVerified: supplierData["Seller Verified"],
          sellerRating: supplierData["Seller Rating"],
          region: supplierData["Region"],
          sellerAddress: supplierData["Seller Address"],
          sellerPOCContact: supplierData["Seller POC Contact Number"],
        },
      });
    } else {
      // Email not found in database
      res.status(200).json({
        exists: false,
        message:
          "Email is not registered, please register your business with WhatsApp",
      });
    }
  } catch (error) {
    console.error("Error checking email in Pinecone:", error);
    res.status(500).json({
      error: "Failed to check email in database",
      details: error.message,
    });
  }
});

// Get all suppliers/products for a specific email
app.post("/api/suppliers/email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Get the index with the correct namespace
    const index = pinecone.index(
      process.env.PINECONE_INDEX_NAME || "chemical-frontend"
    );

    // Create a dummy vector with 1024 dimensions (first element is 1, rest are 0)
    const dummyVector = new Array(1024).fill(0);
    dummyVector[0] = 1;

    // Query the index for all records with the email in the "chemicals" namespace
    const queryResponse = await index.namespace("chemicals").query({
      vector: dummyVector,
      filter: {
        "Seller Email Address": { $eq: email },
      },
      topK: 100, // Get up to 100 products for this email
      includeMetadata: true,
    });

    console.log(
      "Pinecone query response for suppliers:",
      JSON.stringify(queryResponse, null, 2)
    );

    if (queryResponse.matches && queryResponse.matches.length > 0) {
      // Transform the data to match the frontend expectations
      const suppliers = queryResponse.matches.map((match) => {
        const metadata = match.metadata;
        return {
          productName: metadata["Product Name"] || "Unknown Product",
          productDescription:
            metadata["Product Description"] || "No description available",
          productCategory: metadata["Product Category"] || "Uncategorized",
          productPrice: metadata["Product Price"] || 0,
          productSize: metadata["Product Size"] || "N/A",
          productUnit: metadata["Product Unit"] || "Kg",
          minimumOrderQuantity: metadata["Minimum Order Quantity"] || 0,
          productPictures: metadata["Product Pictures"] || "",
          productRating: metadata["Product Rating"] || 0,
          sellerName: metadata["Seller Name"] || "Unknown Seller",
          sellerEmail: metadata["Seller Email Address"] || email,
          sellerPOCContactNumber:
            metadata["Seller POC Contact Number"] || "N/A",
          sellerAddress: metadata["Seller Address"] || "N/A",
          region: metadata["Region"] || "Unknown Region",
          sellerVerified: metadata["Seller Verified"] || false,
          sellerRating: metadata["Seller Rating"] || 0,
          pinCode: metadata["PIN Code"] || "N/A",
          productAddress: metadata["Product Address"] || "N/A",
        };
      });

      res.status(200).json({
        success: true,
        suppliers: suppliers,
        count: suppliers.length,
      });
    } else {
      // No products found for this email
      res.status(200).json({
        success: true,
        suppliers: [],
        count: 0,
        message: "No products found for this email",
      });
    }
  } catch (error) {
    console.error("Error fetching suppliers by email:", error);
    res.status(500).json({
      error: "Failed to fetch suppliers",
      details: error.message,
    });
  }
});

// Get buy products for a specific email
app.get("/api/buy-products/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    console.log(`Fetching buy products for email: ${email}`);

    // Get the buy products index
    const index = pinecone.index("products-you-buy");

    // Create a dummy vector with 1024 dimensions (first element is 1, rest are 0)
    const dummyVector = new Array(1024).fill(0);
    dummyVector[0] = 1;

    // Query the index for the email in the "products" namespace
    const queryResponse = await index.namespace("products").query({
      vector: dummyVector,
      filter: {
        email: { $eq: email },
      },
      topK: 1,
      includeMetadata: true,
    });

    console.log(
      "Pinecone query response for buy products:",
      JSON.stringify(queryResponse, null, 2)
    );

    if (queryResponse.matches && queryResponse.matches.length > 0) {
      const metadata = queryResponse.matches[0].metadata;
      console.log("Found metadata:", metadata);

      // Support both array and string for productList
      let products = [];
      if (Array.isArray(metadata.productList)) {
        products = metadata.productList;
      } else if (typeof metadata.productList === "string") {
        try {
          products = JSON.parse(metadata.productList);
        } catch (e) {
          console.error("Error parsing productList:", e);
          products = [];
        }
      }
      console.log("Parsed products:", products);

      res.status(200).json({
        success: true,
        products: products,
        count: products.length,
      });
    } else {
      console.log("No matches found for email:", email);
      // No products found for this email
      res.status(200).json({
        success: true,
        products: [],
        count: 0,
        message: "No products found for this email",
      });
    }
  } catch (error) {
    console.error("Error fetching buy products:", error);
    res.status(500).json({
      error: "Failed to fetch buy products",
      details: error.message,
    });
  }
});

// Add a product to user's buy list
app.post("/api/buy-products/add", async (req, res) => {
  try {
    const { email, productName } = req.body;

    console.log("Adding product request:", { email, productName });

    if (!email || !productName) {
      return res
        .status(400)
        .json({ error: "Email and product name are required" });
    }

    // Get the buy products index
    const index = pinecone.index("products-you-buy");

    // Create a dummy vector with 1024 dimensions (first element is 1, rest are 0)
    const dummyVector = new Array(1024).fill(0);
    dummyVector[0] = 1;

    // First, check if user already has a record in the "products" namespace
    const queryResponse = await index.namespace("products").query({
      vector: dummyVector,
      filter: {
        email: { $eq: email },
      },
      topK: 1,
      includeMetadata: true,
    });

    console.log(
      "Query response for existing record:",
      JSON.stringify(queryResponse, null, 2)
    );

    let existingProducts = [];
    let recordId = null;

    if (queryResponse.matches && queryResponse.matches.length > 0) {
      // User already has products, update existing record
      const metadata = queryResponse.matches[0].metadata;
      // Support both array and string for productList
      if (Array.isArray(metadata.productList)) {
        existingProducts = metadata.productList;
      } else if (typeof metadata.productList === "string") {
        existingProducts = JSON.parse(metadata.productList);
      } else {
        existingProducts = [];
      }
      recordId = queryResponse.matches[0].id;
      console.log("Found existing products:", existingProducts);
    } else {
      console.log("No existing record found, will create new one");
    }

    // Check if product already exists
    if (existingProducts.includes(productName)) {
      return res.status(400).json({
        error: "Product already exists in your list",
      });
    }

    // Add new product
    existingProducts.push(productName);
    console.log("Updated products list:", existingProducts);

    if (recordId) {
      // Delete existing record and recreate with updated data
      console.log("Deleting existing record with ID:", recordId);
      await index.namespace("products").deleteOne(recordId);

      console.log("Creating updated record with ID:", recordId);
      await index.namespace("products").upsert([
        {
          id: recordId,
          values: dummyVector,
          metadata: {
            email: email,
            id: recordId,
            productList: JSON.stringify(existingProducts),
            productCount: existingProducts.length,
          },
        },
      ]);
    } else {
      // Create new record in the "products" namespace
      const newId = `buy_products_${Date.now()}`;
      console.log("Creating new record with ID:", newId);
      await index.namespace("products").upsert([
        {
          id: newId,
          values: dummyVector,
          metadata: {
            email: email,
            id: newId,
            productList: JSON.stringify(existingProducts),
            productCount: existingProducts.length,
          },
        },
      ]);
    }

    console.log("Successfully saved products:", existingProducts);

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      products: existingProducts,
      count: existingProducts.length,
    });
  } catch (error) {
    console.error("Error adding buy product:", error);
    res.status(500).json({
      error: "Failed to add product",
      details: error.message,
    });
  }
});

// Remove a product from user's buy list
app.delete("/api/buy-products/remove", async (req, res) => {
  try {
    const { email, productName } = req.body;

    if (!email || !productName) {
      return res
        .status(400)
        .json({ error: "Email and product name are required" });
    }

    // Get the buy products index
    const index = pinecone.index("products-you-buy");

    // Create a dummy vector with 1024 dimensions (first element is 1, rest are 0)
    const dummyVector = new Array(1024).fill(0);
    dummyVector[0] = 1;

    // Find user's record in the "products" namespace
    const queryResponse = await index.namespace("products").query({
      vector: dummyVector,
      filter: {
        email: { $eq: email },
      },
      topK: 1,
      includeMetadata: true,
    });

    if (!queryResponse.matches || queryResponse.matches.length === 0) {
      return res.status(404).json({
        error: "No products found for this email",
      });
    }

    const metadata = queryResponse.matches[0].metadata;
    // Support both array and string for productList
    if (Array.isArray(metadata.productList)) {
      existingProducts = metadata.productList;
    } else if (typeof metadata.productList === "string") {
      existingProducts = JSON.parse(metadata.productList);
    } else {
      existingProducts = [];
    }
    const recordId = queryResponse.matches[0].id;

    // Remove the product
    const updatedProducts = existingProducts.filter(
      (product) => product !== productName
    );

    if (updatedProducts.length === existingProducts.length) {
      return res.status(404).json({
        error: "Product not found in your list",
      });
    }

    // Delete existing record and recreate with updated data
    console.log("Deleting existing record with ID:", recordId);
    await index.namespace("products").deleteOne(recordId);

    console.log("Creating updated record with ID:", recordId);
    await index.namespace("products").upsert([
      {
        id: recordId,
        values: dummyVector,
        metadata: {
          email: email,
          id: recordId,
          productList: JSON.stringify(updatedProducts),
          productCount: updatedProducts.length,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      products: updatedProducts,
      count: updatedProducts.length,
    });
  } catch (error) {
    console.error("Error removing buy product:", error);
    res.status(500).json({
      error: "Failed to remove product",
      details: error.message,
    });
  }
});

// Email sending endpoint
app.post("/api/send-email", async (req, res) => {
  console.log("Received email request:", req.body);

  const { firstName, lastName, email, company, message, to } = req.body;

  if (!firstName || !lastName || !email || !company || !message || !to) {
    console.log("Missing required fields:", {
      firstName,
      lastName,
      email,
      company,
      message,
      to,
    });
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    console.log("Attempting to send email to:", to);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Email configuration:", {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? "****" : "not set",
  });
  console.log("Pinecone configuration:", {
    apiKey: process.env.PINECONE_API_KEY ? "****" : "not set",
    indexName: process.env.PINECONE_INDEX_NAME || "chemical-frontend",
  });
});
