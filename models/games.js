const pool = require("../db/pool");
const genreModel = require("../models/genres");
const developerModel = require("../models/developers");

// ********************** //
// **** Render Games **** //
// ********************** //
async function queryAllGames() {
  const result = await pool.query(
    `SELECT * FROM games
      ORDER BY game
    `,
  );

  return result.rows;
}

async function queryAllGameDevelopers() {
  const result = await pool.query(
    `SELECT game_id, developer
      FROM games
        JOIN game_developers ON game_developers.game_id = games.id
        JOIN developers ON game_developers.developer_id = developers.id
        ORDER BY developer
    `,
  );

  return result.rows;
}

async function queryAllGameGenres() {
  const result = await pool.query(
    `SELECT game_id, genre
      FROM games
        JOIN game_genres ON game_genres.game_id = games.id
        JOIN genres ON game_genres.genre_id = genres.id
        ORDER BY genre
    `,
  );

  return result.rows;
}

async function queryAllGamesWithDetails() {
  const games = await queryAllGames();
  const developersArr = await queryAllGameDevelopers();
  const genresArr = await queryAllGameGenres();

  const mergedGamesArr = games.map((game) => ({
    ...game,
    developers: developersArr
      .filter((developer) => developer.game_id === game.id)
      .map((developer) => developer.developer),
    genres: genresArr
      .filter((genre) => genre.game_id === game.id)
      .map((genre) => genre.genre),
  }));

  return mergedGamesArr;
}

// ******************* //
// **** Add Games **** //
// ******************* //

async function addGameToGamesTable(newGameTitle, gameImgUrl) {
  try {
    await pool.query(`INSERT INTO games (game, img_url) VALUES ($1, $2)`, [
      newGameTitle,
      gameImgUrl,
    ]);
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

async function addNewGameWithDetails(
  newGameTitle,
  gameImgUrl,
  developerIds,
  genreIds,
) {
  await addGameToGamesTable(newGameTitle, gameImgUrl);
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

async function updateGameInGamesTable(gameId, gameTitle, gameImgUrl) {
  await pool.query(
    `
    UPDATE games
        SET 
          game = $2,
          img_url = $3
        WHERE games.id = $1
      `,
    [gameId, gameTitle, gameImgUrl],
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
  const gameImgUrl = gameDetails.gameImgUrl;

  let developers;
  let genres;

  if (gameDetails.developers === undefined) {
    developers = [];
  } else developers = gameDetails.developers;

  if (gameDetails.genres === undefined) {
    genres = [];
  } else genres = gameDetails.genres;

  await updateGameInGamesTable(gameId, gameTitle, gameImgUrl);
  await updateGameDevelopersTable(gameId, developers);
  await updateGameGenresTable(gameId, genres);
}

/**********************/
/**** Delete Game ****/
/********************/

async function deleteGameFromGamesTable(gameId) {
  await pool.query(`DELETE FROM games WHERE games.id = $1`, [gameId]);
}

async function deleteGameFromGameDevelopersTable(gameId) {
  await pool.query(
    `DELETE FROM game_developers WHERE game_developers.game_id = $1`,
    [gameId],
  );
}

async function deleteGameFromGameGenresTable(gameId) {
  await pool.query(`DELETE FROM game_genres WHERE game_genres.game_id = $1`, [
    gameId,
  ]);
}

async function deleteGame(gameId) {
  await deleteGameFromGamesTable(gameId);
  await deleteGameFromGameDevelopersTable(gameId);
  await deleteGameFromGameGenresTable(gameId);
}

module.exports = {
  queryAllGamesWithDetails,
  addGameToGamesTable,
  queryGameId,
  addToGameDevelopersTable,
  addToGameGenresTable,
  addNewGameWithDetails,
  queryGameForEditing,
  editGameDetails,
  deleteGame,
};
