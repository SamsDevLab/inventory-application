// games controller
const db = require("../db/queries");

async function getCurrentGames(req, res) {
  const allGames = await db.queryCurrentGames();
  const gameGenres = await db.queryCurrentGameGenres();
  const gameDevelopers = await db.queryCurrentGameDevelopers();

  const gamesWithFullData = [];

  allGames.forEach((game) => {
    let developers = [];
    let genres = [];
    let currentGame = { ...game, developers, genres };

    gameDevelopers.forEach((developer) => {
      if (developer.game_id === currentGame.id) {
        developers.push(developer.developer);
        currentGame = {
          ...currentGame,
        };
      } else return;
    });

    gameGenres.forEach((genre) => {
      if (genre.game_id === currentGame.id) {
        genres.push(genre.genre);
        currentGame = {
          ...currentGame,
        };
      } else return;
    });

    gamesWithFullData.push(currentGame);
  });

  // console.log(gamesWithFullData);

  res.render("games/index", { title: "Games", rows: gamesWithFullData });
}

async function renderAddGameForm(req, res) {
  const developersResult = await db.queryAllDevelopers();
  const genresResult = await db.queryAllGenres();

  res.render("games/add", {
    title: "Add New Game",
    developerRows: developersResult.rows,
    genreRows: genresResult.rows,
  });
}

async function addGameToDatabase(req, res) {
  const newGameTitle = req.body.game;
  const developersIds = req.body.developers;
  const genresIds = req.body.genres;

  await db.addGameToGamesTable(newGameTitle);
  const gameId = await db.queryGameId(newGameTitle);

  for (const devId of developersIds) {
    await db.addToGameDevelopersTable(gameId, devId);
  }

  for (const genreId of genresIds) {
    await db.addToGameGenresTable(gameId, genreId);
  }

  res.redirect("/games/");
}

async function renderEditForm(req, res) {
  // console.log(req.params.id);
  // const queryResults = await db.queryGameById(req.params.id)
  res.render("games/edit", { title: "Edit Game" });
}

async function addEditedGameToDatabase(req, res) {
  console.log(req.params.id);
  console.log(req.body);
  // Use a query like this to overwrite existing data:
  // await db.overWriteGameDetails
  res.redirect("/games/");
}

async function deleteGame(req, res) {
  console.log(req.params.id);
  // Create query that deletes this id from Games table
  res.redirect("/games");
}

module.exports = {
  getCurrentGames,
  renderAddGameForm,
  addGameToDatabase,
  renderEditForm,
  addEditedGameToDatabase,
  deleteGame,
};
