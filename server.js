const express = require("express");
const apiRoutes = require("./routes/apiRoute");
const HTMLRoutes = require("./routes/HTMLRoute");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api", apiRoutes);
app.use("/", HTMLRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(` loading on PORT: ${PORT}`);
});
