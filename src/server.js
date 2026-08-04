const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
