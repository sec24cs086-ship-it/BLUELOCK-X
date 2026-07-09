# Recommendation Engine

## 1. Goal
The recommendation engine generates deterministic, explainable lower-carbon alternatives for products detected from receipts.

## 2. Optimization Criteria
Recommendations are ranked using a weighted scoring model that balances:
- Carbon reduction
- Cost impact
- Product similarity
- Availability
- User preference

## 3. Deterministic Design
The system does not rely on LLMs. It uses rule-based scoring and structured product metadata.

## 4. Scoring Model
Each candidate alternative receives a score based on:

$$
score = w_1 \times carbon\_reduction + w_2 \times cost\_fit + w_3 \times similarity + w_4 \times availability + w_5 \times preference
$$

## 5. Ranking Factors
### Carbon Reduction
- Prioritize candidates with significantly lower estimated emissions

### Cost
- Favor alternatives that are cost-neutral or cost-effective

### Product Similarity
- Prefer items that closely match the original product in function and category

### Availability
- Prefer items that are present in retailer inventory or accessible catalogs

### User Preference
- Honor prior user selections, preferred brands, and saved preferences

## 6. Output
- Ranked alternatives
- Explanation of why each alternative was selected
- Expected carbon savings
- Expected cost delta
- Confidence level

## 7. Governance
- Recommendations must be transparent and explainable
- Low-confidence or unavailable alternatives should be filtered out
- The engine should support future experimentation through rule tuning rather than model retraining
