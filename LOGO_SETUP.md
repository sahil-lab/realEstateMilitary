# 🎨 Company Logo Setup Instructions

## 📁 **Required Action**

Your company logo needs to be placed in the correct location for it to appear throughout the website.

### **Step 1: Save Your Logo**
1. Save your `logo.png` file to: `backend/public/images/logo.png`
2. The exact path should be: `realEstateMilitary/backend/public/images/logo.png`

### **Step 2: Verify Logo Placement**
After placing the logo, it will appear in:
- ✅ **Main Website Header** (index.html)
- ✅ **Admin Dashboard** (admin-dashboard.html)  
- ✅ **Super Admin Dashboard** (superadmin-dashboard.html)
- ✅ **Registration Page** (registration.html)

### **Logo Specifications**
- **Format**: PNG (recommended)
- **Recommended Size**: 150x50 pixels or similar aspect ratio
- **Background**: Transparent preferred
- **File Name**: `logo.png` (exact name)

### **Current Logo References Updated**
All HTML files have been updated to reference: `images/logo.png`

### **Verification**
Once placed, start the server and visit:
- http://localhost:3001/index.html
- http://localhost:3001/admin-dashboard.html
- http://localhost:3001/superadmin-dashboard.html

Your logo should appear in the header of all pages.

---

## 🚀 **Quick Placement Command**

If you have the logo file in your project root, run:
```bash
copy logo.png backend/public/images/logo.png
```

Or manually drag and drop the logo file into: `backend/public/images/` folder 