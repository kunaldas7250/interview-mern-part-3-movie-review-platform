import express from "express";
const app = express();
import sql from "mssql";
import connection from "../Database/Db.js";   // ✅ include .js and match exact case

import { verifyToken } from "./LoginRegisterRoutes.js";
import multer from "multer";
import upload from "./FileUpload.js";
import fs from "fs";
// app.use(upload);
// app.get("/movies", verifyToken, async (req, res) => {
//   try {
//     const pool = await connection();
//     await pool.request().query(`select * from dbo.Movies`);
//   } catch (error) {
//     console.error(`something went wrong ${error}`);
//   }
// });
app.get("/movies", verifyToken, async (req, res) => {
  try {
    const pool = await connection();
    const result = await pool.request().query(`SELECT *
FROM dbo.Movies AS m
ORDER BY m.MovieId         
OFFSET 0 ROWS
FETCH NEXT 20 ROWS ONLY`);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("❌ Error fetching movies:", error);
    res.status(500).send("Internal server error");
  }
});

// app.get("/movies/:id", async (req, res) => {
//   try {
//     const { MovieId } = req.params;
//     if (!MovieId) {
//       req.statusCode(403).send("sorry");
//     }
//     const pool = await connection();
//     const result = await pool
//       .request()
//       .input("MovieId", sql.Int, MovieId)
//       .query(`select * from dbo.Movies as m where m.MovieId=@MovieId`);
//     if (!result.recordset.length === 0) {
//       res.status(404).send("invalid id");
//     }
//     res.status(200).send(result.recordset[0]);
//   } catch (error) {
//     console.error(`something went wrong ${error}`);
//   }
// });
// app.post("/movies", upload.single("fileImage"), async (req, res) => {
//   try {
//     const {
//       Title,
//       Genre,
//       ReleaseYear,
//       Director,
//       Cast,
//       Synopsis,
//       PosterURL,
//       AverageRataing,
//     } = req.body;
//     if (
//       !Title ||
//       !Genre ||
//       !ReleaseYear ||
//       !Director ||
//       !Cast ||
//       !Synopsis ||
//       PosterURL ||
//       !AverageRataing
//     ) {
//       res.status(403).send("soorry");
//     }
//     const MoviePoster = req.file ? req.file.filename : null;
//     const pool = await connection();
//     const result = await pool
//       .request()
//       .input("Title", sql.VarChar, Title)
//       .input("Genre", sql.VarChar, Genre)
//       .input("ReleaseYear", sql.Int, ReleaseYear)
//       .input("Director", sql.VarChar, Director)
//       .input("Cast", sql.VarChar, Cast)
//       .input("Synopsis", sql.VarChar, Synopsis)
//       .input("PosterURL", sql.VarChar, MoviePoster)
//       .input("AverageRataing", sql.Int, AverageRataing)
//       .query(
//         `INSERT INTO Movies (Title, Genre, ReleaseYear, Director, Cast, Synopsis, PosterURL, AverageRataing) VALUES(@Title,@Genre,@ReleaseYear,@Director,@Cast,@Synopsis,@PosterURL,@AverageRataing)`
//       );
//     res.status(200).send(result.recordset);
//   } catch (error) {
//     console.error(`something went wrong ${error}`);
//   }
// });
app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await connection();
    const result = await pool
      .request()
      .input("MovieId", sql.Int, id)
      .query(`SELECT * FROM dbo.Movies WHERE MovieId=@MovieId`);

    if (result.recordset.length === 0) {
      return res.status(404).send("❌ Movie not found");
    }
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("❌ Error fetching movie:", error);
    res.status(500).send("Internal server error");
  }
});

// app.post("/movies", upload.single("fileImage"), async (req, res) => {
//   try {
//     const {
//       Title,
//       Genre,
//       ReleaseYear,
//       Director,
//       Cast,
//       Synopsis,
//       AverageRataing,
//     } = req.body;
//     const MoviePoster = req.file ? req.file.filename : null;

//     const pool = await connection();
//     await pool
//       .request()
//       .input("Title", sql.VarChar, Title)
//       .input("Genre", sql.VarChar, Genre)
//       .input("ReleaseYear", sql.Int, ReleaseYear)
//       .input("Director", sql.VarChar, Director)
//       .input("Cast", sql.VarChar, Cast)
//       .input("Synopsis", sql.VarChar, Synopsis)
//       .input("PosterURL", sql.VarChar, MoviePoster)
//       .input("AverageRataing", sql.Int, AverageRataing).query(`
//         INSERT INTO Movies (Title, Genre, ReleaseYear, Director, Cast, Synopsis, PosterURL, AverageRataing) 
//         VALUES (@Title,@Genre,@ReleaseYear,@Director,@Cast,@Synopsis,@PosterURL,@AverageRataing)
//       `);

//     res.status(201).send("✅ Movie added successfully");
//   } catch (error) {
//     console.error("❌ Error adding movie:", error);
//     res.status(500).send("Internal server error");
//   }
// });
// backend
app.post("/movies", upload.single("MoviePoster"), async (req, res) => {
  try {
    const {
      Title,
      Genre,
      ReleaseYear,
      Director,
      Cast,
      Synopsis,
      AverageRataing, // fixed spelling
    } = req.body;

    const PosterURL = req.file ? req.file.filename : null;

    const pool = await connection();
    await pool
      .request()
      .input("Title", sql.VarChar, Title)
      .input("Genre", sql.VarChar, Genre)
      .input("ReleaseYear", sql.Int, ReleaseYear)
      .input("Director", sql.VarChar, Director)
      .input("Cast", sql.VarChar, Cast)
      .input("Synopsis", sql.VarChar, Synopsis)
      .input("PosterURL", sql.VarChar, PosterURL)
      .input("AverageRataing", sql.Int, AverageRataing)
      .query(`
        INSERT INTO Movies (Title, Genre, ReleaseYear, Director, Cast, Synopsis, PosterURL, AverageRataing) 
        VALUES (@Title,@Genre,@ReleaseYear,@Director,@Cast,@Synopsis,@PosterURL,@AverageRataing)
      `);

    res.status(201).send("✅ Movie added successfully");
  } catch (error) {
    console.error("❌ Error adding movie:", error);
    res.status(500).send("Internal server error");
  }
});

// app.get("/movies/:id/reviews", async (req, res) => {
//   try {
//     const { MovieId } = req.params;
//     if (!MovieId) {
//       res.status(403).send("sorry");
//     }
//     const pool = await connection();
//     await pool.request().input("MovieId", sql.Int, MovieId)
//       .query(`select * from dbo.Movies as m 
// join dbo.Reviews as r
// on m.MovieId =r.MovieID
// where M.MovieId=@MovieId`);
//   } catch (error) {
//     console.error(`something went wrong ${error.message}`);
//   }
// });
app.get("/movies/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params; // ✅ use 'id'
    if (!id) {
      return res.status(400).send("MovieId is required"); // better 400 than 403
    }

    const pool = await connection();
    const result = await pool.request()
      .input("MovieId", sql.Int, id)
      .query(`
        SELECT * 
        FROM dbo.Movies AS m
        JOIN dbo.Reviews AS r ON m.MovieId = r.MovieID
        WHERE m.MovieId = @MovieId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).send("No reviews found for this movie");
    }

    res.status(200).json(result.recordset); // ✅ send back rows
  } catch (error) {
    console.error("❌ something went wrong:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/movies/:id/reviews", async (req, res) => {
  try {
    const { UserID, MovieID, Rating, ReviewText } = req.body;
    if (!UserID || !MovieID || !Rating || !ReviewText) {
      res.status(403).send("soorry");
    }
    const pool = await connection();
    const result = await pool
      .request()
      .input("UserID", sql.Int, UserID)
      .input("MovieID", sql.Int, MovieID)
      .input("Rating", sql.Int, Rating)
      .input("ReviewText", sql.NVarChar, ReviewText)
      .query(`INSERT INTO Reviews (UserID, MovieID, Rating, ReviewText)
VALUES(@UserID,@MovieID,@Rating,@ReviewText)
`);
    res.status(200).send(result.recordset);
  } catch (error) {
    console.error(`something went wrong ${error}`);
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const { UserID } = req.params;
    if (!UserID) {
      res.status(403).send("sorry");
    }
    const pool = await connection();
    const result = await pool.request().input("UserID", sql.Int, UserID)
      .query(`select * from dbo.Users as u
join dbo.Reviews as r
on u.UserId=r.UserID
where u.UserId=@UserId`);
    res.status(200).send(result.recordset[0]);
  } catch (error) {
    console.error(`something went wrong ${error}`);
  }
});
// app.put("/users/:id", upload.single("fileImage"), async (req, res) => {
//   try {
//     const { Username, Password, Email } = req.body;
//     if (!Username || !Password || !Email) {
//       req.status(403).send("sorry");
//     }
//     ProfilePicture = req.file ? req.file.filename : null;
//     const pool = await connection();
//     const result = await pool
//       .request()
//       .input("Username", sql.VarChar, Username)
//       .input("Password", sql.VarChar, Password)
//       .input("Email", sql.VarChar, Email)
//       .input("ProfilePicture", sql.VarChar, ProfilePicture)
//       .query(`INSERT INTO Users (Username, Email, Password, ProfilePicture)
// VALUES(@Username,@Email,@Password,@ProfilePicture)`);
//     res.status(200).send(result.recordset[0]);
//   } catch (error) {
//     console.error(`something went wrong ${error}`);
//   }
// });
app.put("/users/:id", upload.single("fileImage"), async (req, res) => {
  try {
    const { id } = req.params;
    const { Username, Password, Email } = req.body;
    const ProfilePicture = req.file ? req.file.filename : null;

    if (!Username || !Password || !Email) {
      return res.status(400).send("⚠️ Missing required fields");
    }

    const pool = await connection();
    const result = await pool
      .request()
      .input("UserID", sql.Int, id)
      .input("Username", sql.VarChar, Username)
      .input("Password", sql.VarChar, Password)
      .input("Email", sql.VarChar, Email)
      .input("ProfilePicture", sql.VarChar, ProfilePicture).query(`
        UPDATE Users
        SET Username=@Username, Email=@Email, Password=@Password, ProfilePicture=@ProfilePicture
        WHERE UserId=@UserID
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("❌ User not found");
    }

    res.status(200).send("✅ User updated successfully");
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).send("Internal server error");
  }
});

// app.get("/users/:id/watchlist", async (req, res) => {
//   try {
//     const { UserID } = req.params;
//     if (!UserID) {
//       res.status(403).send("sorry");
//     }
//     const pool = await connection();
//     const result = await pool.request().input("UserID", sql.Int, UserID)
//       .query(`select * from dbo.Users as u
// join dbo.Watchlist as w
// on u.UserId=w.UserID
// where u.UserId=@id`);
//   } catch (error) {
//     console.error(`something went wrong ${error}`);
//   }
// });
app.get("/users/:id/watchlist", async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await connection();
    const result = await pool.request().input("UserID", sql.Int, id).query(`
        SELECT w.WatchlistID, m.Title, m.Genre, m.ReleaseYear, m.Director
        FROM dbo.Watchlist w
        JOIN dbo.Movies m ON w.MovieID = m.MovieId
        WHERE w.UserID=@UserID
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("❌ Error fetching watchlist:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/users/:id/watchlist", async (req, res) => {
  try {
    const { UserID } = req.params;
    const { MovieID } = req.body;
    if (!UserID || !MovieID) {
      res.status(403).send("sorry");
    }
    const pool = await connection();
    const result = await pool
      .request()
      .input("UserID", sql.Int, UserID)
      .input("MovieID", sql.Int, MovieID)
      .query(`INSERT INTO Watchlist (UserID, MovieID)
VALUES(@UserID,@MovieID)`);
  } catch (error) {
    console.error(`something went wrong ${error}`);
  }
});
app.delete("/users/:id/watchlist/:movieId", async (req, res) => {
  try {
    const { id, movieId } = req.params;

    const pool = await connection();
    const result = await pool
      .request()
      .input("UserID", sql.Int, id)
      .input("MovieID", sql.Int, movieId).query(`
        DELETE FROM dbo.Watchlist
        OUTPUT deleted.*
        WHERE UserID = @UserID AND MovieID = @MovieID
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "❌ Watchlist entry not found" });
    }

    res.status(200).json({
      message: "✅ Movie removed from watchlist",
      deleted: result.recordset[0],
    });
  } catch (error) {
    console.error("❌ Error deleting watchlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
