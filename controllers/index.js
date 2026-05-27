// index controller
async function getHomepageData(req, res) {
  // console.log("Retrieved all Homepage data");
  res.render("index");
}

module.exports = {
  getHomepageData,
};
