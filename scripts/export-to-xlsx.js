import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Downloads folder path
const downloadsPath = path.join(os.homedir(), 'Downloads');

// Read and parse TypeScript data files
function loadDataFromTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract the array from the TypeScript file
  // Match: const data = [ ... ];
  const match = content.match(/const data = (\[[\s\S]*?\]);/);

  if (!match) {
    throw new Error(`Could not find data array in ${filePath}`);
  }

  // Parse the array using eval (safe since we control the source)
  // Replace commented lines first
  const arrayString = match[1]
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments

  return eval(arrayString);
}

const phones = loadDataFromTS(path.join(__dirname, '../src/data/phones.ts'));
const vioo = loadDataFromTS(path.join(__dirname, '../src/data/vioo.ts'));

// Group products by brand
function groupByBrand(products) {
  const grouped = {};
  products.forEach(product => {
    const brand = product.brand;
    if (!grouped[brand]) {
      grouped[brand] = [];
    }
    grouped[brand].push({
      type: product.type,
      brand: product.brand,
      model: product.model,
      price: product.price,
      tags: product.tags ? product.tags.join(', ') : ''
    });
  });
  return grouped;
}

// Create workbook with multiple sheets
function createWorkbook(products, filename) {
  const workbook = XLSX.utils.book_new();
  const groupedProducts = groupByBrand(products);

  // Sort brands alphabetically
  const brands = Object.keys(groupedProducts).sort();

  brands.forEach(brand => {
    const brandProducts = groupedProducts[brand];

    // Create worksheet from array of objects
    const worksheet = XLSX.utils.json_to_sheet(brandProducts);

    // Get the range of the worksheet
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    // Format price column (column D, index 3)
    // Apply number format with thousand separators
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: 3 }); // Column D (price)
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].z = '#,##0'; // Number format with comma separators
      }
    }

    // Add data validation for tags column (column E, index 4)
    // Note: XLSX library has limited support for data validation
    // The validation will need to be set up manually in Google Sheets or
    // we can add a note in the header
    // const tagsHeaderCell = 'E1';
    // if (worksheet[tagsHeaderCell]) {
    //   worksheet[tagsHeaderCell].c = [{
    //     a: 'Script',
    //     t: 'Available tags: "Mzigo Mpya", "Kwenye Ofa". Separate multiple tags with comma.'
    //   }];
    // }

    // Set column widths
    worksheet['!cols'] = [
      { wch: 10 },  // type
      { wch: 20 },  // brand
      { wch: 25 },  // model
      { wch: 12 },  // price
      { wch: 30 }   // tags
    ];

    // Add the sheet to workbook
    // Sheet names are limited to 31 characters and cannot contain: : \ / ? * [ ]
    const sheetName = brand
      .replace(/[:\\/\?\*\[\]]/g, '-') // Replace invalid characters
      .substring(0, 31);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  // Write to file in Downloads folder
  const outputPath = path.join(downloadsPath, filename);
  XLSX.writeFile(workbook, outputPath);

  console.log(`✓ Created ${filename} with ${brands.length} tabs (brands)`);
  console.log(`  Brands: ${brands.join(', ')}`);
  console.log(`  Saved to: ${outputPath}`);

  return brands.length;
}

// Main execution
console.log('Exporting products to XLSX files...\n');

try {
  const simuCount = createWorkbook(phones, 'Mr. Low Price - Simu.xlsx');
  console.log('');
  const viooCount = createWorkbook(vioo, 'Mr. Low Price - Vioo.xlsx');

  console.log('\n✓ Export complete!');
  console.log(`  Total brands exported: ${simuCount + viooCount}`);
  console.log(`  Files saved to Downloads folder`);
} catch (error) {
  console.error('✗ Export failed:', error.message);
  process.exit(1);
}
