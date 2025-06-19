require("dotenv").config();
const { Pinecone } = require("@pinecone-database/pinecone");

console.log("PINECONE_API_KEY:", process.env.PINECONE_API_KEY);
console.log("Current working directory:", process.cwd());

async function testPineconeConnection() {
  try {
    console.log("Testing Pinecone connection...");

    if (!process.env.PINECONE_API_KEY) {
      console.error("❌ PINECONE_API_KEY not found in environment variables");
      return;
    }

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const indexName = process.env.PINECONE_INDEX_NAME || "sourceasy-suppliers";
    console.log(`Using index: ${indexName}`);

    // Get the index
    const index = pinecone.index(indexName);

    // Create a dummy vector with 1536 dimensions (all zeros)
    const dummyVector = new Array(1536).fill(0);

    // Test a simple query in the chemicals namespace
    console.log("Testing basic query in chemicals namespace...");
    const queryResponse = await index.namespace("chemicals").query({
      vector: dummyVector,
      topK: 1,
      includeMetadata: true,
    });

    console.log("✅ Pinecone connection successful!");
    console.log(
      `Found ${
        queryResponse.matches?.length || 0
      } records in chemicals namespace`
    );

    if (queryResponse.matches && queryResponse.matches.length > 0) {
      console.log(
        "Sample record metadata keys:",
        Object.keys(queryResponse.matches[0].metadata)
      );
    }

    // Test specific email query
    console.log("\nTesting specific email query...");
    const testEmail = "jinilsavaj1711@gmail.com";
    const emailQueryResponse = await index.namespace("chemicals").query({
      vector: dummyVector,
      filter: {
        "Seller Email Address": { $eq: testEmail },
      },
      topK: 1,
      includeMetadata: true,
    });

    console.log(`Email query for ${testEmail}:`);
    console.log(JSON.stringify(emailQueryResponse, null, 2));

    if (emailQueryResponse.matches && emailQueryResponse.matches.length > 0) {
      console.log("✅ Email found in database!");
      console.log("Supplier data:", emailQueryResponse.matches[0].metadata);
    } else {
      console.log("❌ Email not found in database");
    }
  } catch (error) {
    console.error("❌ Pinecone connection failed:", error.message);
  }
}

testPineconeConnection();
