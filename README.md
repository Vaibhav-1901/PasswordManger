# 🔐 Password Manager

A full-stack password manager built with React and MongoDB that lets you securely store and manage your passwords.

> ⚠️ This is an initial version. The project will be enhanced with new features and improvements over time.



## 📸 Features

- ✅ Add and save passwords for different sites
- ✅ View passwords securely (toggle visibility)
- ✅ Copy passwords with one click
- ✅ Edit existing password entries
- ✅ Delete saved passwords
- ✅ Data stored securely in MongoDB
- ✅ Responsive and clean UI

## ✨ Future Improvements

- 🔐 User authentication
- 🌐 Deployment (Vercel + Render)
- 📱 Mobile optimization
- 🧾 Search & filter passwords




## 🧠 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Others:** UUID, React Toastify



## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
```
### 2. Start the Frontend
```bash
npm install
npm run dev
```
### 3. Start the Backend
```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` folder and add the following:

```env
MONGO_URI=mongodb://localhost:27017/PassManager
PORT=3000
```

**Note:**  You don't need to manually create the `PassManager` database.
MongoDB will automatically create it when data is added.





