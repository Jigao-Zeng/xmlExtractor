const fs = require("fs");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();

// Function to remove leading zeros (if any)
function removeLeadingZeros(value) {
  if (value && typeof value === "string") {
    return value.replace(/^0+/, "") || "0"; // Ensure it doesn't turn to an empty string
  }
  return value;
}

// Function to safely extract values from XML, ensuring resilience
function extractField(field) {
  return field && field[0] ? field[0] : ""; // Safely return the field value
}

// Function to process each object recursively
function processObject(obj) {
  if (typeof obj === "object" && obj !== null) {
    const result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = extractField(obj[key]);
        if (["VendorNumber__", "DocNumber__", "Material__"].includes(key)) {
          value = removeLeadingZeros(value); // Apply the leading zero removal logic
        }
        result[key] = processObject(value); // Recurse for nested structures
      }
    }
    return result;
  }
  return obj; // Return primitive values as is
}

// Function to process the XML data
function processXMLData(result) {
  console.log({ result });
  // Start processing from the root level
  return { PurchaseOrder: processObject(result.PurchaseOrder) };
}

// Read the XML file and parse it
fs.readFile("./sampleXml.xml", (err, data) => {
  const path = require("path");

  console.log("Absolute path to XML file:", path.resolve("./sampleXml.xml"));
  if (err) {
    console.error("Error reading XML file:", err);
    return;
  }

  parser.parseString(data, (err, result) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return;
    }

    // Process and format the extracted data
    const formattedData = processXMLData(result);

    // Write the formatted JSON output to a file
    fs.writeFile(
      "formatted_output.json",
      JSON.stringify(formattedData, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
        } else {
          console.log("Formatted JSON output saved as formatted_output.json");
        }
      }
    );
  });
});
