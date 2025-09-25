const exampleList = [
    {
        id: 1,
        movieName: 'Casablanca',
        image: "/images/Casablanca.jpg",
        genre: ["Drama", "Romantik"],
        releaseYear: 1942,
        age: 15,
        length: 102,
        distributor: "Warner Bros",
        director: "Michael Curtiz",
        actors: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"],
        description: "En cynisk amerikansk expatriat i Casablanca måste välja mellan sin kärlek till en kvinna och att hjälpa hennes och hennes motståndsledare make att fly från nazisterna.",
        "youtubeTrailers": [
            "Z9AYPxH5NTM"
        ], "reviews": [
            {
                reviewer: "Filmkritiker 1",
                comment: "En tidlös klassiker som fortfarande håller.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "Fantastiska prestationer av skådespelarna.",
                rating: 4
            }
        ],
        themeDay: "any",
    },
    {
        id: 2,
        movieName: 'Citizen Kane',
        image: "/images/Citizen-kane.jpg",
        genre: ["Drama", "Mystik"],
        releaseYear: 1941,
        age: 15,
        length: 119,
        distributor: "RKO Radio Pictures",
        director: "Orson Welles",
        actors: ["Orson Welles", "Joseph Cotten", "Dorothy Comingore"],
        description: "En undersökning av livet och arvet efter en publiceringsmagnat avslöjar komplexiteten",
        "youtubeTrailers": [
            "YQe3yXg-s1c"
        ], "reviews": [
            {
                reviewer: "Filmkritiker 1",
                comment: "En djupgående och tankeväckande film.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "En mästerlig prestation av Orson Welles.",
                rating: 4
            }
        ],
        themeDay: "any",
    },
    {
        id: 3,
        movieName: 'Die Hard',
        image: "/images/die-hard.webp",
        genre: ["Action"],
        releaseYear: 1988,
        age: 15,
        length: 132,
        distributor: "20th Century Fox",
        director: "John McTiernan",
        actors: ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia"],
        description: "En polisman måste rädda gisslan i en skyskrapa som har tagits över av terrorister.",
        "youtubeTrailers": [
            "Q0m1g1g1g1g"
        ], "reviews": [
            {
                reviewer: "Filmkritiker 1",
                comment: "En actionfylld klassiker som fortfarande imponerar.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "Bruce Willis är fantastisk i huvudrollen.",
                rating: 4
            }
        ],
        themeDay: "any",
    },
    {
        id: 4,
        movieName: 'Ghostbusters',
        image: "/images/ghost-busters.webp",
        genre: ["Komedi"],
        releaseYear: 1984,
        age: 11,
        length: 105,
        distributor: "Columbia Pictures",
        director: "Ivan Reitman",
        actors: ["Bill Murray", "Dan Aykroyd", "Sigourney Weaver"],
        description: "Ett team av parapsykologer startar en spökjakt i New York City.",
        "youtubeTrailers": [
            "K1j1g1g1g1g"
        ], "reviews": [
            {
                reviewer: "Filmkritiker 1",
                comment: "En rolig och underhållande film.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "Fantastiska prestationer av skådespelarna.",
                rating: 4
            }
        ],
        themeDay: "any",
    },
    {
        id: 5,
        movieName: 'Jurassic Park',
        image: "/images/Jurassic-park.webp",
        genre: "Äventyr",
        releaseYear: 1993,
        age: 11,
        length: 127,
        distributor: "Universal Pictures",
        director: "Steven Spielberg",
        actors: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
        description: "En nöjespark med klonade dinosaurier går fruktansvärt fel när säkerhetssystemen slås ut.",
        youtubeTrailers: [
            "jNQXAC9IVRw"
        ], reviews: [
            {
                reviewer: "Filmkritiker 1",
                comment: "En fantastisk filmupplevelse med banbrytande effekter.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "En spännande och välgjord film.",
                rating: 4
            }
        ],
        themeDay: "any"
    },
    {
        id: 6,
        movieName: 'Jaws',
        image: "/images/jaws.webp",
        genre: ["Skräck", "Äventyr", "Thriller"],
        releaseYear: 1975,
        age: 15,
        length: 124,
        distributor: "Universal Pictures",
        director: "Steven Spielberg",
        actors: ["Roy Scheider", "Robert Shaw", "Richard Dreyfuss"],
        description: "En stor vit haj terroriserar en strandstad, och en grupp män måste stoppa den.",
        youtubeTrailers: [
            "U1j1g1g1g1g"
        ], reviews: [
            {
                reviewer: "Filmkritiker 1",
                comment: "En klassiker inom skräckgenren.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "Spännande och välgjord film.",
                rating: 4
            }
        ],
        themeDay: "any"
    },
    {
        id: 7,
        movieName: 'Körkarlen',
        image: "/images/körkarlen.webp",
        genre: ["Drama", "Fantasi", "Skräck"],
        releaseYear: 1921,
        age: 15,
        length: 106,
        distributor: "Svensk Filmundustri",
        director: "Victor Sjöström",
        actors: ["Victor Sjöström", "Hilda Borgström", "Tore Svennberg"],
        description: "På nyårsafton tvingar föraren av en spöklik vagn en berusad man att reflektera över sitt själviska, bortkastade liv.",
        youtubeTrailers: [
            "U1j1g1g1g1g"
        ], reviews: [
            {
                reviewer: "Filmkritiker 1",
                comment: "En klassiker inom skräckgenren.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "Spännande och välgjord film.",
                rating: 4
            }
        ],
        themeDay: "thursday"
    },
    {
        id: 8,
        movieName: 'Safety Last!',
        image: "/images/safetylast.webp",
        genre: ["Komedi", "Romantik"],
        releaseYear: 1923,
        age: 15,
        length: 73,
        distributor: "Hal Roach Studios",
        director: "Fred C. Newmeyer",
        actors: ["Harold Lloyd", "Mildred Davis", "Bill Strother"],
        description: "En pojke lämnar sin lilla landsortsstad och beger sig till storstaden för att få ett jobb. Så fort han slår igenom kommer hans käresta att gifta sig med honom. Hans entusiasm för att ta sig fram leder till några intressanta äventyr.",
        youtubeTrailers: [
            "U1j1g1g1g1g"
        ], reviews: [
            {
                reviewer: "Filmkritiker 1",
                comment: "En klassiker inom skräckgenren.",
                rating: 5
            },
            {
                reviewer: "Filmkritiker 2",
                comment: "Spännande och välgjord film.",
                rating: 4
            }
        ],
        themeDay: "thursday"
    },
]

export default exampleList;