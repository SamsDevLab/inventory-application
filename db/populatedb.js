const { Client } = require("pg");

const insertDevelopers = `
    INSERT INTO developers (developer, img_url)
        VALUES
            ('Atmos Games',
                'https://images.squarespace-cdn.com/content/v1/580ba631e3df286976055239/1588711611410-FXEUHG02VIYB792KLDUE/AppIcon.png'
            ),
            ('CD Projekt Red',
                'https://www.cdprojekt.com/en/wp-content/uploads-en/2016/01/cdp_004-1024x760-1024x760.jpg'
            ), 
            ('Jasozz Games',
                'https://pbs.twimg.com/profile_images/1503471344272429058/I4B-Aoh8.jpg'
            ),
            ('Team Cherry',
                'https://avatars.akamai.steamstatic.com/6dd64832e621ff348935216b4d4bd993587f783c_full.jpg'
            ),    
            ('Team Meat','https://media.indiedb.com/images/groups/1/5/4194/Preview.png'
            ) 
`;

const insertGenres = `
    INSERT INTO genres (genre)
        VALUES
            ('Action'),
            ('Adventure'), 
            ('FPS'), 
            ('Indie'), 
            ('Metroidvania'), 
            ('Platformer'), 
            ('Puzzle'), 
            ('RPG')   
`;

const insertGames = `
    INSERT INTO games (game, img_url)
        VALUES
            ('Pinstripe','https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Pinstripe_2018_Nintendo_Switch_Digital_Cover_Art.jpg/250px-Pinstripe_2018_Nintendo_Switch_Digital_Cover_Art.jpg'
            ),
            ('Cyberpunk 2077','https://store-images.s-microsoft.com/image/apps.47379.63407868131364914.bcaa868c-407e-42c2-baeb-48a3c9f29b54.89bb995b-b066-4a53-9fe4-0260ce07e894'
            ),
            ('Cultic','https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1684930/e5fb1d970685a3424fbee8e051c8eeac20353966/capsule_616x353.jpg?t=1765478494'
            ),
            ('Hollow Knight','https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Hollow_Knight_2026_cover_art.jpg/250px-Hollow_Knight_2026_cover_art.jpg'
            ),
            ('Super Meat Boy',
                'https://f4.bcbits.com/img/a1679001039_16.jpg'
            )      
`;

const insertGameDevelopers = `
    INSERT INTO game_developers (game_id, developer_id)
        VALUES 
            (1, 1),
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5)       
`;

const insertGameGenres = `
    INSERT INTO game_genres (game_id, genre_id)
        VALUES 
            (1, 2),
            (1, 4),
            (1, 7),
            (2, 3),
            (2, 8),
            (3, 1),
            (3, 3),
            (3, 4),
            (4, 4),
            (4, 5),
            (4, 6),
            (5, 4),
            (5, 6)
`;

const databaseUrl = process.env.DATABASE_URL;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `${databaseUrl}`,
  });
  await client.connect();
  await client.query(insertDevelopers);
  await client.query(insertGenres);
  await client.query(insertGames);
  await client.query(insertGameDevelopers);
  await client.query(insertGameGenres);
  await client.end();
  console.log("done");
}

main();
