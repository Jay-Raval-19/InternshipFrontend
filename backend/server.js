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
      process.env.PINECONE_INDEX_NAME || "sourceasy-suppliers"
    );

    // Create a dummy vector with 1536 dimensions (all zeros)
    const dummyVector = new Array(1536).fill(0);

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
    indexName: process.env.PINECONE_INDEX_NAME || "sourceasy-suppliers",
  });
});
