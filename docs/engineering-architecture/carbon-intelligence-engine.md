# Carbon Intelligence Engine

## 1. Purpose
The Carbon Intelligence Engine estimates the environmental impact of detected products from receipts using deterministic, explainable rules rather than opaque AI outputs.

## 2. Inputs
- Product name and category
- Brand and subcategory
- Quantity and unit
- Packaging type
- Estimated transportation distance
- Country or region
- Price and optional product metadata
- User context where relevant

## 3. Processing
The engine processes each item through multiple weighted factors:
1. Base emission factor by product category
2. Packaging factor based on material and packaging complexity
3. Transportation factor based on origin and supply chain assumption
4. Lifecycle factor based on production durability and end-of-life considerations
5. Quantity adjustment for multiple units

## 4. Algorithms
The engine uses a deterministic scoring model:
- Base emission score
- Packaging multiplier
- Transportation multiplier
- Lifecycle multiplier
- Quantity multiplier

Formula:

$$
carbon\_impact = base\_emission \times packaging\_factor \times transportation\_factor \times lifecycle\_factor \times quantity\_factor
$$

## 5. Confidence Calculation
Confidence is derived from data quality and match certainty:
- High confidence when exact product match and complete metadata exist
- Medium confidence when category-level estimation is used
- Low confidence when minimal metadata is available

## 6. Emission Factors
- Food items use category-specific agricultural and processing factors
- Consumer goods use production and packaging-related factors
- Electronics use higher lifecycle and manufacturing weighting

## 7. Packaging Factors
- Plastic, paper, glass, metal, and composite materials each receive different multipliers
- Reusable packaging lowers the packaging factor
- Reduced packaging complexity lowers the overall estimate

## 8. Transportation Factors
- Local products receive lower transportation impact
- Cross-country and global shipping increase impact estimates
- Shipping mode assumptions are applied when available

## 9. Lifecycle Factors
- Durable items receive lifecycle adjustments based on expected shelf life and reuse potential
- Highly disposable products receive higher lifecycle weighting
- Recyclability and reusability are considered where available

## 10. Outputs
- Per-item carbon estimate
- Per-receipt aggregate estimate
- Confidence score
- Breakdown explanation
- Comparison reference against lower-carbon alternatives

## 11. Future Scalability
The model is designed to evolve with:
- Larger product catalogs
- Region-specific emission data
- Supplier-specific lifecycle data
- More precise packaging and transportation assumptions
- Expansion into enterprise procurement and retail integration
