const app = require("../src/app");
const port = process.env.PORT;
app.listen(port, () => {
  console.log("The app is running on the port: ", port);
});
