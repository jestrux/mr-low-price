# Google Sheets Integration Plan

## Overview
Integrate Google Sheets as a data source for products with local caching and fallback support.

## Architecture

### 1. Export Script (`scripts/export-to-xlsx.js`)
Create a Node.js script that:
- Reads `src/data/phones.ts` and `src/data/vioo.ts`
- Uses `xlsx` package to create Excel workbooks
- Groups products by brand within each type
- Creates one sheet/tab per brand in each workbook
- Columns: `type`, `brand`, `model`, `price`, `tags`
- Outputs: `exports/Simu.xlsx` and `exports/Vioo.xlsx`
- Each xlsx file contains multiple tabs (one per brand)

### 2. Data Fetching Service (`src/services/googleSheets.ts`)
Create service with:
- `extractSpreadsheetId(url)` - Extracts ID from Google Sheets URL
- `fetchSheetMetadata(spreadsheetId)` - Auto-discovers all tabs/sheets and their gids
- `fetchSheetData(spreadsheetId, gid)` - Fetches data using Google Visualization API
- `getCachedProducts()` - Returns cached data if < 1 minute old
- `fetchAllProducts()` - Automatically fetches from both Simu and Vioo sheets, discovering and reading all tabs dynamically
- Parses JSON response (strip first 47 chars, slice -2)
- Converts rows to product objects with tags array (split comma-separated tags)
- 1-minute cache using localStorage with timestamp
- Falls back to local data imports on error

**Key Feature:** No manual gid configuration needed - automatically discovers all tabs!

### 3. Configuration (`src/config/sheets.ts`)
Simple configuration with just two URLs:
- Simu: `https://docs.google.com/spreadsheets/d/1xx7cjlfF_KapG-ZJnrk2lB4nq7S1Yod-OshRuDRPqGc/edit?usp=sharing`
- Vioo: `https://docs.google.com/spreadsheets/d/1EZknsvl7ZCkC0v-Urmfid6HKAIf2wfrRlYpfyuc_Plo/edit?usp=sharing`
- Support env variables (`VITE_SIMU_SHEET_URL`, `VITE_VIOO_SHEET_URL`)
- Fallback to hardcoded URLs if env not set
- No manual brand-to-gid mapping needed!

### 4. Update Data Types
Add to product interface:
- `tags?: string[]` field (optional)
- Keep existing data structure intact

### 5. Context Integration (`src/context/AppContext.tsx`)
- Add `loadProductsFromSheets()` function
- Call on app initialization
- Merge Google Sheets data with local fallback
- Expose `refreshProducts()` for manual cache bust

### 6. UI Updates - Browse Page
- Add tag filter UI (chips/buttons for "Mzigo Mpya", "Kwenye Ofa", "All")
- Display tags as badges on product cards
- Filter products based on selected tag

## Files to Create
- `scripts/export-to-xlsx.js` - Export script
- `src/services/googleSheets.ts` - Data fetching service
- `src/config/sheets.ts` - Configuration file

## Files to Modify
- `src/context/AppContext.tsx` - Add Google Sheets integration
- `src/data/phones.ts` - Add tags type
- `src/data/vioo.ts` - Add tags type
- `src/pages/Browse.tsx` - Add tag filters
- `package.json` - Add export script and xlsx dev dependency

## Dependencies
- `xlsx` (devDependency only)

## Package.json Scripts
```json
{
  "scripts": {
    "export": "node scripts/export-to-xlsx.js"
  }
}
```

## Tag Options
- "Mzigo Mpya" (New Arrival)
- "Kwenye Ofa" (On Offer)

## Cache Strategy
- 1-minute localStorage cache
- Timestamp-based expiry
- Automatic fallback to local data on error
- Manual refresh capability via `refreshProducts()`

## Google Sheets Setup
1. Upload `Mr. Low Price - Simu.xlsx` and `Mr. Low Price - Vioo.xlsx` to Google Drive
2. Open with Google Sheets
3. Share sheets with "Anyone with link can view"
4. Copy the spreadsheet URLs (already configured):
   - Simu: https://docs.google.com/spreadsheets/d/1xx7cjlfF_KapG-ZJnrk2lB4nq7S1Yod-OshRuDRPqGc/edit?usp=sharing
   - Vioo: https://docs.google.com/spreadsheets/d/1EZknsvl7ZCkC0v-Urmfid6HKAIf2wfrRlYpfyuc_Plo/edit?usp=sharing
5. (Optional) Add data validation dropdowns for tags column in each sheet
6. No manual gid configuration needed - tabs are auto-discovered!
