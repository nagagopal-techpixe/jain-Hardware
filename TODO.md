# TODO - Product Search Navigation Fix

## Task
When user clicks a product suggestion in search:
- Go to ProductListView (NOT product-detail)
- Auto open its category
- Auto open its subcategory
- Show all related products

## Steps

- [ ] 1. Update StoreContext.jsx - Add selectedSubCategoryId state and setViewWithCategoryAndSubCategory function
- [ ] 2. Update Header.jsx - Modify handleSearch and suggestion click handlers to navigate to products view with category + subcategory
- [ ] 3. Update ProductListView.jsx - Read selectedSubCategoryId from store and auto-select subcategory

## Progress
- [ ] Step 1: StoreContext.jsx
- [ ] Step 2: Header.jsx  
- [ ] Step 3: ProductListView.jsx
