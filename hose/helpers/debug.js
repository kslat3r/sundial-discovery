module.exports = (title, obj) => {
  console.log(title);
  console.log("\n");
  console.dir(obj, { depth: null, colors: true });
  console.log("\n");
};
