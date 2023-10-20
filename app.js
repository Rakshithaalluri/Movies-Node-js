const express = require("express");
const path = require("path");

const dbPath = path.join(__dirname, "moviesData.db");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(2375, () => {
      console.log("Server is running at http://localhost:2375");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const convertMovieDbObjectToResponseObject = (dbObject) => {
  return {
    movieId: dbObject.movie_id,
    directionId: dbObject.director_id,
    movieName: dbObject.movie_name,
    leadActor: dbObject.lead_actor,
  };
};

const convertDirectorDbObjectToResponseObject = (dbObject) => {
  return {
    directorId: dbObject.director_id,
    directorName: dbObject.director_name,
  };
};

const app = express();

app.get("/movies/", async (request, response) => {
  const getMovieNames = `
    SELECT 
       movie_name 
    FROM 
       movies`;

  const movieNamesQuery = await db.all(getMovieNames);
  response.send(
    movieNamesQuery.map((eachMovie) => ({ movieName: movie_name }))
  );
});
