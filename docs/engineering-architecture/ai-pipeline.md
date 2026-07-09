# AI Pipeline

## 1. OCR
- Extract text regions from receipt images
- Detect merchant information, totals, taxes, dates, and item lines
- Return structured OCR output with confidence values

## 2. Text Cleaning
- Normalize casing, punctuation, and spacing
- Remove noise and irrelevant OCR artifacts
- Standardize units, currency, and date formatting

## 3. Product Matching
- Match extracted product strings to catalog entries
- Resolve partial names and synonyms
- Use deterministic fuzzy matching and internal product dictionaries

## 4. Product Categorization
- Classify products into categories such as food, beverage, household, personal care, and electronics
- Assign default sustainability metadata when exact match is unavailable

## 5. Carbon Estimation
- Apply weighted factors for emissions, packaging, transport, and lifecycle impacts
- Estimate emissions per item and per receipt
- Produce a bounded result with explanation fields

## 6. Confidence Score
- Compute confidence from OCR quality, matching certainty, and factor completeness
- Use a score range that supports low-confidence handling and fallback logic

## 7. Alternative Recommendation
- Compare the detected item against a catalog of lower-carbon alternatives
- Rank alternatives by carbon reduction and overall utility

## 8. Insight Generation
- Create user-readable insights such as highest-impact products and repeat patterns
- Prepare summaries for analytics and reports

## 9. Analytics
- Store results for cohort analysis, user trends, and report generation
- Enable future model refinement and product improvements
