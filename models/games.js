const pool = require("../db/pool");
const genreModel = require("../models/genres");
const developerModel = require("../models/developers");

// ********************** //
// **** Render Games **** //
// ********************** //

async function queryCurrentGames() {
  const allGames = await pool.query(`SELECT * FROM games ORDER BY game`);
  return allGames.rows;
}

async function getAllGamesWithDetails() {
  const allGames = await queryCurrentGames();
  const gameGenres = await genreModel.queryGenresForCurrentGames();
  const gameDevelopers = await developerModel.queryDevelopersForCurrentGames();

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

  return gamesWithFullData;
}

// ******************* //
// **** Add Games **** //
// ******************* //

async function addGameToGamesTable(newGameTitle) {
  try {
    await pool.query(`INSERT INTO games (game) VALUES ($1)`, [newGameTitle]);
  } catch (error) {
    console.log(error);
  }
}

async function queryGameId(gameTitle) {
  try {
    const result = await pool.query(
      `SELECT games.id FROM games WHERE games.game = $1`,
      [gameTitle],
    );

    const gameId = result.rows[0].id;
    return gameId;
  } catch (error) {
    console.log(error);
  }
}

async function addToGameDevelopersTable(gameId, developerId) {
  try {
    await pool.query(
      `INSERT INTO game_developers (game_id, developer_id) VALUES($1, $2)`,
      [gameId, developerId],
    );
  } catch (error) {
    console.log(error);
  }
}

async function addToGameGenresTable(gameId, genreId) {
  try {
    await pool.query(
      `INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)`,
      [gameId, genreId],
    );
  } catch (error) {
    console.log(error);
  }
}

async function addNewGameWithDetails(newGameTitle, developerIds, genreIds) {
  await addGameToGamesTable(newGameTitle);
  const gameId = await queryGameId(newGameTitle);

  for (const developerId of developerIds) {
    await addToGameDevelopersTable(gameId, developerId);
  }

  for (const genreId of genreIds) {
    await addToGameGenresTable(gameId, genreId);
  }
}

// ********************** //
// **** Edit Games ****** //
// ********************** //

async function queryTitleByGameID(gameId) {
  const result = await pool.query(
    `SELECT * 
        FROM games
            WHERE games.id = $1
    `,
    [gameId],
  );

  const gameTitle = result.rows;
  return gameTitle;
}

async function queryGameForEditing(gameId) {
  const gameTitle = await queryTitleByGameID(gameId);
  const gameDevelopers = await developerModel.queryDevelopersByGameId(gameId);
  const gameGenres = await genreModel.queryGenreByGameId(gameId);

  const allDevelopers = await developerModel.queryAllDevelopers();
  const allGenres = await genreModel.queryAllGenres();

  const gameEditingData = {
    gameTitle,
    gameDevelopers,
    gameGenres,
    allDevelopers,
    allGenres,
  };

  return gameEditingData;
}

async function updateGameInGamesTable(gameId, gameTitle) {
  await pool.query(
    `
    UPDATE games
        SET game = $1
        WHERE games.id = $2
      `,
    [gameTitle, gameId],
  );
}

/*******************************/
/*** Edit Game Developers *****/
/*****************************/

async function queryCurrentDevelopersByGameId(gameId) {
  const result = await pool.query(
    ` SELECT *
        FROM game_developers
        WHERE game_developers.game_id = $1
    `,
    [gameId],
  );

  const devIdsArr = [];

  result.rows.forEach((row) => {
    devIdsArr.push(row.developer_id);
  });

  return devIdsArr;
}

async function addGameDeveloperRelation(gameId, newDeveloperIds) {
  await pool.query(
    `INSERT INTO game_developers (game_id, developer_id)
      SELECT $1, developer_id
      FROM UNNEST($2::int[]) AS developer_id
    `,
    [gameId, newDeveloperIds],
  );
}

async function removeGameDeveloperRelation(gameId, currentDeveloperIds) {
  await pool.query(
    `DELETE FROM game_developers
      WHERE game_id = $1
      AND developer_id = ANY($2::int[])
  `,
    [gameId, currentDeveloperIds],
  );
}

async function updateGameDevelopersTable(gameId, developers) {
  const newDeveloperIdsSet = new Set(developers.map(Number));
  const currentDeveloperIdsSet = new Set(
    await queryCurrentDevelopersByGameId(gameId),
  );

  const uniqueNewDeveloperIds = Array.from(
    newDeveloperIdsSet.difference(currentDeveloperIdsSet),
  );
  const uniqueCurrentDeveloperIds = Array.from(
    currentDeveloperIdsSet.difference(newDeveloperIdsSet),
  );

  await addGameDeveloperRelation(gameId, uniqueNewDeveloperIds);
  await removeGameDeveloperRelation(gameId, uniqueCurrentDeveloperIds);
}

/*******************************/
/*** Edit Game Genres *********/
/*****************************/

async function queryCurrentGenresByGameId(gameId) {
  const result = await pool.query(
    ` SELECT genre_id FROM game_genres
        WHERE game_genres.game_id = $1
    `,
    [gameId],
  );

  const genreIdsArr = [];

  result.rows.forEach((genre) => {
    genreIdsArr.push(genre.genre_id);
  });

  return genreIdsArr;
}

async function addGameGenreRelation(gameId, newGenreIds) {
  await pool.query(
    `INSERT INTO game_genres (game_id, genre_id)
      SELECT $1, genre_id
      FROM UNNEST($2::int[]) AS genre_id
    `,
    [gameId, newGenreIds],
  );
}

async function removeGameGenreRelation(gameId, currentGenreIds) {
  await pool.query(
    `DELETE FROM game_genres
      WHERE game_id = $1
      AND genre_id = ANY($2::int[])
    `,
    [gameId, currentGenreIds],
  );
}

async function updateGameGenresTable(gameId, genres) {
  const newGenreIdsSet = new Set(genres.map(Number));
  const currentGenreIdsSet = new Set(await queryCurrentGenresByGameId(gameId));

  const uniqueNewGenreIds = Array.from(
    newGenreIdsSet.difference(currentGenreIdsSet),
  );
  const uniqueCurrentGenreIds = Array.from(
    currentGenreIdsSet.difference(newGenreIdsSet),
  );

  await addGameGenreRelation(gameId, uniqueNewGenreIds);
  await removeGameGenreRelation(gameId, uniqueCurrentGenreIds);
}

async function editGameDetails(gameDetails) {
  const gameId = Number(gameDetails.gameId);
  const gameTitle = gameDetails.game;
  let developers;
  let genres;

  if (gameDetails.developers === undefined) {
    developers = [];
  } else developers = gameDetails.developers;

  if (gameDetails.genres === undefined) {
    genres = [];
  } else genres = gameDetails.genres;

  await updateGameInGamesTable(gameId, gameTitle);
  await updateGameDevelopersTable(gameId, developers);
  await updateGameGenresTable(gameId, genres);
}

module.exports = {
  getAllGamesWithDetails,
  addGameToGamesTable,
  queryGameId,
  addToGameDevelopersTable,
  addToGameGenresTable,
  addNewGameWithDetails,
  queryGameForEditing,
  editGameDetails,
};
