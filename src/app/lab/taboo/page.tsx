'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = 'setup' | 'category' | 'game' | 'win';
type Category = 'cinema' | 'music' | 'sports' | 'geography' | 'food' | 'tech' | 'animals' | 'history' | 'streaming' | 'science' | 'mixed';

interface Card { word: string; forbidden: string[]; }
interface GameSettings { targetScore: number; roundDuration: number; penaltyEnabled: boolean; }

// ─── Card Data ────────────────────────────────────────────────────────────────
const CARDS: Record<Exclude<Category,'mixed'>, Card[]> = {
  cinema: [
    { word: "Titanic",            forbidden: ["ship","Leonardo","DiCaprio","iceberg","Kate Winslet"] },
    { word: "Avatar",             forbidden: ["blue","Pandora","Cameron","3D","aliens"] },
    { word: "Harry Potter",       forbidden: ["wizard","Hogwarts","wand","Voldemort","scar"] },
    { word: "Star Wars",          forbidden: ["space","Jedi","lightsaber","Force","Skywalker"] },
    { word: "The Matrix",         forbidden: ["Neo","pill","virtual","reality","Keanu"] },
    { word: "Inception",          forbidden: ["dream","DiCaprio","totem","spinning","subconscious"] },
    { word: "Joker",              forbidden: ["clown","Gotham","Batman","laugh","Joaquin Phoenix"] },
    { word: "Avengers",           forbidden: ["Marvel","superheroes","Iron Man","Thanos","gauntlet"] },
    { word: "Frozen",             forbidden: ["Elsa","Anna","snow","Let It Go","Olaf"] },
    { word: "Shrek",              forbidden: ["green","donkey","princess","Fiona","swamp"] },
    { word: "Toy Story",          forbidden: ["toys","Woody","Buzz","Lightyear","Andy"] },
    { word: "The Lion King",      forbidden: ["Simba","Mufasa","savanna","Hakuna Matata","Pride"] },
    { word: "Forrest Gump",       forbidden: ["Tom Hanks","running","chocolate","Jenny","feather"] },
    { word: "Gladiator",          forbidden: ["Rome","arena","warrior","emperor","revenge"] },
    { word: "Jurassic Park",      forbidden: ["dinosaurs","park","T-Rex","DNA","island"] },
    { word: "The Godfather",      forbidden: ["mafia","Corleone","Brando","offer","Sicily"] },
    { word: "Pulp Fiction",       forbidden: ["Tarantino","diner","wallet","Samuel L.","suitcase"] },
    { word: "Interstellar",       forbidden: ["space","wormhole","gravity","Cooper","black hole"] },
    { word: "The Dark Knight",    forbidden: ["Batman","Gotham","Heath Ledger","chaos","joker"] },
    { word: "Fight Club",         forbidden: ["Brad Pitt","soap","rules","underground","twist"] },
    { word: "Goodfellas",         forbidden: ["mafia","Scorsese","mob","Ray Liotta","New York"] },
    { word: "The Shining",        forbidden: ["hotel","Jack Nicholson","axe","twins","Kubrick"] },
    { word: "Parasite",           forbidden: ["Korea","class","Bong Joon-ho","basement","Oscar"] },
    { word: "Oppenheimer",        forbidden: ["atomic","bomb","Cillian Murphy","Manhattan","physicist"] },
    { word: "Barbie",             forbidden: ["doll","pink","Ken","Mattel","Margot Robbie"] },
    { word: "Dune",               forbidden: ["desert","sand","worm","Arrakis","spice"] },
    { word: "Spider-Man",         forbidden: ["spider","web","Peter Parker","superhero","mask"] },
    { word: "Top Gun",            forbidden: ["pilot","jet","Maverick","Tom Cruise","F-14"] },
    { word: "Back to the Future", forbidden: ["time","DeLorean","1985","Doc Brown","flux"] },
    { word: "Schindler's List",   forbidden: ["Holocaust","war","factory","Jews","Spielberg"] },
  ],
  music: [
    { word: "Beyoncé",         forbidden: ["Single Ladies","Jay-Z","Destiny's Child","Queen","Halo"] },
    { word: "Ed Sheeran",      forbidden: ["Shape of You","guitar","red hair","Perfect","Thinking"] },
    { word: "Taylor Swift",    forbidden: ["Shake It Off","country","relationships","Eras","tour"] },
    { word: "Rihanna",         forbidden: ["Umbrella","Barbados","Fenty","Diamonds","Work"] },
    { word: "Drake",           forbidden: ["Hotline Bling","Canada","rapper","God's Plan","Toronto"] },
    { word: "Adele",           forbidden: ["Rolling in the Deep","Hello","voice","Britain","Someone Like You"] },
    { word: "The Weeknd",      forbidden: ["Blinding Lights","Can't Feel My Face","Abel","Starboy","After Hours"] },
    { word: "Billie Eilish",   forbidden: ["Bad Guy","green hair","Ocean Eyes","Finneas","whisper"] },
    { word: "Bruno Mars",      forbidden: ["Uptown Funk","Just the Way You Are","dance","24K","Magic"] },
    { word: "Ariana Grande",   forbidden: ["Thank U Next","7 Rings","ponytail","high note","Manchester"] },
    { word: "Eminem",          forbidden: ["Rap God","Lose Yourself","8 Mile","Marshall","Detroit"] },
    { word: "Madonna",         forbidden: ["Like a Virgin","Queen of Pop","Material Girl","80s","cone bra"] },
    { word: "Michael Jackson", forbidden: ["Thriller","moonwalk","King of Pop","Neverland","Billie Jean"] },
    { word: "Queen",           forbidden: ["Bohemian Rhapsody","Freddie Mercury","We Will Rock You","rock","live aid"] },
    { word: "The Beatles",     forbidden: ["Liverpool","John Lennon","Paul McCartney","Let It Be","Hey Jude"] },
    { word: "Elvis Presley",   forbidden: ["King","rock and roll","Graceland","Hound Dog","Las Vegas"] },
    { word: "Nirvana",         forbidden: ["Kurt Cobain","Smells Like Teen Spirit","grunge","Seattle","Nevermind"] },
    { word: "Coldplay",        forbidden: ["Yellow","Fix You","Chris Martin","Viva la Vida","Britain"] },
    { word: "Bob Marley",      forbidden: ["Jamaica","reggae","One Love","Rastafari","No Woman No Cry"] },
    { word: "David Bowie",     forbidden: ["Space Oddity","Ziggy Stardust","Heroes","Starman","glam rock"] },
    { word: "Whitney Houston", forbidden: ["I Will Always Love You","Greatest Love","voice","Bodyguard","diva"] },
    { word: "Shakira",         forbidden: ["Hips Don't Lie","Waka Waka","Colombia","Latin","hair"] },
    { word: "Justin Bieber",   forbidden: ["Baby","Canada","Selena","Purpose","Beliebers"] },
    { word: "Lady Gaga",       forbidden: ["Poker Face","Bad Romance","meat dress","Joanne","Born This Way"] },
    { word: "Pink Floyd",      forbidden: ["The Wall","Dark Side of the Moon","psychedelic","Wish You Were Here","Floyd"] },
    { word: "Led Zeppelin",    forbidden: ["Stairway to Heaven","Jimmy Page","Robert Plant","Whole Lotta Love","Zeppelin"] },
    { word: "AC/DC",           forbidden: ["Highway to Hell","Thunderstruck","Australia","rock","Angus Young"] },
    { word: "Radiohead",       forbidden: ["Creep","OK Computer","Thom Yorke","Karma Police","alternative"] },
    { word: "Daft Punk",       forbidden: ["Harder Better","helmet","French","electronic","Get Lucky"] },
    { word: "Kendrick Lamar",  forbidden: ["Compton","rapper","DAMN","Not Like Us","Pulitzer"] },
  ],
  sports: [
    { word: "Lionel Messi",           forbidden: ["Argentina","Barcelona","football","goals","World Cup"] },
    { word: "Cristiano Ronaldo",      forbidden: ["Portugal","CR7","Real Madrid","goals","penalty"] },
    { word: "LeBron James",           forbidden: ["Lakers","basketball","NBA","King","Cleveland"] },
    { word: "Michael Jordan",         forbidden: ["Chicago Bulls","Air Jordan","23","NBA","championships"] },
    { word: "Serena Williams",        forbidden: ["tennis","sister","Venus","Grand Slam","US Open"] },
    { word: "Roger Federer",          forbidden: ["tennis","Switzerland","Grand Slam","Wimbledon","20 titles"] },
    { word: "Usain Bolt",             forbidden: ["Jamaica","100 metres","speed","gold","lightning"] },
    { word: "Muhammad Ali",           forbidden: ["boxing","Greatest","float butterfly","Clay","Louisville"] },
    { word: "Mike Tyson",             forbidden: ["boxing","ear","heavyweight","Iron","knockout"] },
    { word: "Tiger Woods",            forbidden: ["golf","Masters","green jacket","club","hole"] },
    { word: "Neymar",                 forbidden: ["Brazil","PSG","Barcelona","10","dribble"] },
    { word: "Kylian Mbappé",          forbidden: ["PSG","France","speed","World Cup","Monaco"] },
    { word: "Rafael Nadal",           forbidden: ["tennis","clay","Spain","Roland Garros","22 Slams"] },
    { word: "Novak Djokovic",         forbidden: ["tennis","Serbia","Grand Slam","23 titles","Wimbledon"] },
    { word: "Tom Brady",              forbidden: ["NFL","quarterback","Patriots","Super Bowl","Tampa Bay"] },
    { word: "Kobe Bryant",            forbidden: ["Lakers","24","basketball","Mamba","five rings"] },
    { word: "Stephen Curry",          forbidden: ["Warriors","three-pointer","Golden State","30","shooting"] },
    { word: "Giannis Antetokounmpo",  forbidden: ["Bucks","Greece","Greek Freak","Milwaukee","championship"] },
    { word: "Lewis Hamilton",         forbidden: ["Formula 1","Mercedes","Britain","championships","44"] },
    { word: "Diego Maradona",         forbidden: ["Argentina","hand of God","Napoli","World Cup","dribble"] },
    { word: "Pelé",                   forbidden: ["Brazil","Santos","three World Cups","King","goals"] },
    { word: "Michael Phelps",         forbidden: ["swimming","gold medals","Olympics","butterfly","28 medals"] },
    { word: "Simone Biles",           forbidden: ["gymnastics","vault","gold","USA","flips"] },
    { word: "Max Verstappen",         forbidden: ["Formula 1","Red Bull","Netherlands","champion","overtake"] },
    { word: "Zinedine Zidane",        forbidden: ["France","headbutt","Real Madrid","World Cup","midfielder"] },
    { word: "Floyd Mayweather",       forbidden: ["boxing","undefeated","50-0","Money","defensive"] },
    { word: "Patrick Mahomes",        forbidden: ["Chiefs","quarterback","Kansas City","Super Bowl","arm"] },
    { word: "Iga Świątek",            forbidden: ["tennis","Poland","clay","world number one","French Open"] },
    { word: "Naomi Osaka",            forbidden: ["tennis","Japan","Grand Slam","mental health","serve"] },
    { word: "Shaquille O'Neal",       forbidden: ["Lakers","centre","Diesel","Orlando","comedy"] },
  ],
  geography: [
    { word: "Eiffel Tower",        forbidden: ["Paris","France","iron","tall","lights"] },
    { word: "Colosseum",           forbidden: ["Rome","amphitheatre","gladiators","Italy","ancient"] },
    { word: "Great Wall of China", forbidden: ["China","wall","long","defence","visible from space"] },
    { word: "Statue of Liberty",   forbidden: ["New York","green","torch","harbour","France"] },
    { word: "Taj Mahal",           forbidden: ["India","white","marble","monument","love"] },
    { word: "Pyramids of Giza",    forbidden: ["Egypt","pharaoh","Sphinx","Cairo","triangle"] },
    { word: "Big Ben",             forbidden: ["London","clock","tower","England","bell"] },
    { word: "Acropolis",           forbidden: ["Athens","Parthenon","Greece","marble","ancient"] },
    { word: "Machu Picchu",        forbidden: ["Peru","Inca","mountain","ancient","city"] },
    { word: "Petra",               forbidden: ["Jordan","pink","rock","carved","desert"] },
    { word: "Sydney",              forbidden: ["Australia","Opera House","harbour","bridge","kangaroo"] },
    { word: "Tokyo",               forbidden: ["Japan","capital","anime","sushi","Fuji"] },
    { word: "Paris",               forbidden: ["France","Eiffel","Louvre","Mona Lisa","Seine"] },
    { word: "Venice",              forbidden: ["Italy","canals","gondola","water","San Marco"] },
    { word: "New York",            forbidden: ["USA","Manhattan","Times Square","Big Apple","skyscrapers"] },
    { word: "Dubai",               forbidden: ["Emirates","Burj Khalifa","gold","luxury","desert"] },
    { word: "Rio de Janeiro",      forbidden: ["Brazil","Christ","Copacabana","carnival","samba"] },
    { word: "Bali",                forbidden: ["Indonesia","island","temples","beaches","yoga"] },
    { word: "Santorini",           forbidden: ["Greece","white","blue","volcano","sunset"] },
    { word: "Iceland",             forbidden: ["northern lights","volcanoes","ice","Reykjavik","geysers"] },
    { word: "Amazon Rainforest",   forbidden: ["Brazil","jungle","river","biodiversity","trees"] },
    { word: "Sahara Desert",       forbidden: ["Africa","sand","hot","camels","dunes"] },
    { word: "Mount Everest",       forbidden: ["Nepal","highest","Himalayas","climbing","summit"] },
    { word: "Niagara Falls",       forbidden: ["Canada","USA","waterfall","border","mist"] },
    { word: "Great Barrier Reef",  forbidden: ["Australia","coral","ocean","fish","diving"] },
    { word: "Angkor Wat",          forbidden: ["Cambodia","temple","jungle","Hindu","sunrise"] },
    { word: "Grand Canyon",        forbidden: ["Arizona","river","red rock","deep","Colorado"] },
    { word: "Maldives",            forbidden: ["island","Indian Ocean","coral","luxury","overwater"] },
    { word: "Stonehenge",          forbidden: ["England","ancient","stones","mystery","circle"] },
    { word: "Northern Lights",     forbidden: ["aurora","Norway","sky","green","cold"] },
  ],
  food: [
    { word: "Pizza",           forbidden: ["Italy","cheese","tomato","dough","slice"] },
    { word: "Sushi",           forbidden: ["Japan","fish","rice","raw","wasabi"] },
    { word: "Burger",          forbidden: ["McDonald's","patty","bun","fast food","cheese"] },
    { word: "Taco",            forbidden: ["Mexico","tortilla","meat","salsa","spicy"] },
    { word: "Croissant",       forbidden: ["France","butter","breakfast","flaky","Paris"] },
    { word: "Paella",          forbidden: ["Spain","rice","seafood","saffron","Valencia"] },
    { word: "Curry",           forbidden: ["India","spicy","spices","red","chicken"] },
    { word: "Ramen",           forbidden: ["Japan","noodles","broth","egg","pork"] },
    { word: "Pasta",           forbidden: ["Italy","noodles","sauce","carbonara","boiling"] },
    { word: "Cheesecake",      forbidden: ["cream cheese","sweet","base","dessert","New York"] },
    { word: "Tiramisu",        forbidden: ["Italy","coffee","mascarpone","biscuits","dessert"] },
    { word: "Falafel",         forbidden: ["chickpeas","Middle East","fried","pita","vegetarian"] },
    { word: "Peking Duck",     forbidden: ["China","skin","poultry","crispy","Beijing"] },
    { word: "Crepe",           forbidden: ["France","thin","Nutella","sweet","savoury"] },
    { word: "Baklava",         forbidden: ["Turkey","pastry","honey","nuts","sweet"] },
    { word: "Burrito",         forbidden: ["Mexico","tortilla","beans","wrapped","rice"] },
    { word: "Schnitzel",       forbidden: ["Austria","breaded","pork","fried","veal"] },
    { word: "Hot Dog",         forbidden: ["sausage","bun","mustard","American","baseball"] },
    { word: "Fish and Chips",  forbidden: ["Britain","newspaper","fried","batter","vinegar"] },
    { word: "Dim Sum",         forbidden: ["China","Hong Kong","dumplings","steamed","basket"] },
    { word: "Guacamole",       forbidden: ["avocado","Mexico","dip","lime","nachos"] },
    { word: "Fondue",          forbidden: ["Switzerland","cheese","pot","bread","dipping"] },
    { word: "Pancakes",        forbidden: ["breakfast","maple syrup","flat","stack","batter"] },
    { word: "Waffles",         forbidden: ["grid","Belgian","breakfast","syrup","crispy"] },
    { word: "Dumplings",       forbidden: ["China","stuffed","steamed","dough","filling"] },
    { word: "Kebab",           forbidden: ["Turkey","meat","skewer","grill","Middle East"] },
    { word: "Moussaka",        forbidden: ["Greece","aubergine","mince","béchamel","oven"] },
    { word: "Churros",         forbidden: ["Spain","fried","dough","chocolate","cinnamon"] },
    { word: "Naan",            forbidden: ["India","bread","tandoor","oven","flatbread"] },
    { word: "Pho",             forbidden: ["Vietnam","soup","noodles","broth","herbs"] },
  ],
  tech: [
    { word: "Instagram",               forbidden: ["photo","stories","Meta","filter","hashtag"] },
    { word: "TikTok",                  forbidden: ["video","dance","15 seconds","viral","China"] },
    { word: "YouTube",                 forbidden: ["video","Google","subscribe","creator","views"] },
    { word: "Facebook",                forbidden: ["Meta","Zuckerberg","like","friends","blue"] },
    { word: "Twitter / X",             forbidden: ["tweet","Elon Musk","280","characters","bird"] },
    { word: "Snapchat",                forbidden: ["filters","ghost","disappear","stories","selfie"] },
    { word: "WhatsApp",                forbidden: ["messages","green","Meta","tick","phone"] },
    { word: "Spotify",                 forbidden: ["music","podcast","streaming","playlist","green"] },
    { word: "Netflix",                 forbidden: ["series","films","streaming","red","N"] },
    { word: "Amazon",                  forbidden: ["shopping","online","Bezos","Prime","package"] },
    { word: "Google",                  forbidden: ["search","Chrome","Gmail","Android","Alphabet"] },
    { word: "Apple",                   forbidden: ["iPhone","Mac","iOS","bite","Steve Jobs"] },
    { word: "Microsoft",               forbidden: ["Windows","Bill Gates","Xbox","Office","PC"] },
    { word: "Tesla",                   forbidden: ["Elon Musk","electric","car","Autopilot","Model S"] },
    { word: "PlayStation",             forbidden: ["Sony","console","controller","X","O"] },
    { word: "Nintendo",                forbidden: ["Mario","Switch","Pokemon","console","Japan"] },
    { word: "Fortnite",                forbidden: ["game","battle royale","dance","V-Bucks","Epic"] },
    { word: "Minecraft",               forbidden: ["blocks","crafting","creeper","world","building"] },
    { word: "Zoom",                    forbidden: ["video call","meeting","pandemic","camera","tiles"] },
    { word: "Uber",                    forbidden: ["taxi","app","driver","ride","map"] },
    { word: "Airbnb",                  forbidden: ["accommodation","rental","home","travel","host"] },
    { word: "Bitcoin",                 forbidden: ["crypto","blockchain","digital","Satoshi","mining"] },
    { word: "ChatGPT",                 forbidden: ["AI","artificial intelligence","chat","OpenAI","bot"] },
    { word: "iPhone",                  forbidden: ["Apple","smartphone","iOS","bite mark","mobile"] },
    { word: "Android",                 forbidden: ["Google","smartphone","operating system","green","robot"] },
    { word: "Wi-Fi",                   forbidden: ["internet","wireless","signal","router","password"] },
    { word: "Bluetooth",               forbidden: ["wireless","connect","blue","headphones","tooth"] },
    { word: "Artificial Intelligence", forbidden: ["AI","machine","learning","robot","ChatGPT"] },
    { word: "Virtual Reality",         forbidden: ["VR","headset","goggles","Meta Quest","immersive"] },
    { word: "Cybersecurity",           forbidden: ["hacker","password","firewall","virus","encrypt"] },
  ],
  animals: [
    { word: "Elephant",    forbidden: ["trunk","big","Africa","ears","tusks"] },
    { word: "Shark",       forbidden: ["teeth","sea","Jaws","white","dangerous"] },
    { word: "Panda",       forbidden: ["bamboo","black","white","China","bear"] },
    { word: "Penguin",     forbidden: ["Antarctica","ice","fish","waddle","bird"] },
    { word: "Kangaroo",    forbidden: ["Australia","jump","baby","pouch","tail"] },
    { word: "Koala",       forbidden: ["Australia","eucalyptus","grey","cute","slow"] },
    { word: "Dolphin",     forbidden: ["smart","sea","sound","grey","friendly"] },
    { word: "Whale",       forbidden: ["blue","largest","sea","mammal","enormous"] },
    { word: "Lion",        forbidden: ["king","mane","Africa","savanna","pride"] },
    { word: "Tiger",       forbidden: ["striped","orange","black","Asia","predator"] },
    { word: "Bear",        forbidden: ["honey","hibernation","brown","forest","claws"] },
    { word: "Wolf",        forbidden: ["pack","howl","moon","grey","wild"] },
    { word: "Fox",         forbidden: ["red","cunning","tail","bushy","forest"] },
    { word: "Cheetah",     forbidden: ["fastest","spots","Africa","race","yellow"] },
    { word: "Hippopotamus",forbidden: ["water","Africa","large","mouth","dangerous"] },
    { word: "Zebra",       forbidden: ["striped","horse","black","white","Africa"] },
    { word: "Giraffe",     forbidden: ["neck","tall","Africa","spots","leaves"] },
    { word: "Gorilla",     forbidden: ["primate","strong","chest","King Kong","black"] },
    { word: "Crocodile",   forbidden: ["teeth","water","reptile","green","dangerous"] },
    { word: "Snake",       forbidden: ["reptile","venom","bite","tongue","slither"] },
    { word: "Eagle",       forbidden: ["bird","hawk","predator","sky","talons"] },
    { word: "Owl",         forbidden: ["night","Harry Potter","feathers","big eyes","hoot"] },
    { word: "Parrot",      forbidden: ["colourful","talks","tropical","bird","cage"] },
    { word: "Butterfly",   forbidden: ["insect","metamorphosis","caterpillar","wings","flying"] },
    { word: "Bee",         forbidden: ["sting","honey","yellow","black","hive"] },
    { word: "Octopus",     forbidden: ["tentacles","8","sea","ink","smart"] },
    { word: "Flamingo",    forbidden: ["pink","one leg","bird","water","beak"] },
    { word: "Chameleon",   forbidden: ["colour","change","lizard","tongue","camouflage"] },
    { word: "Platypus",    forbidden: ["Australia","duck bill","eggs","mammal","beaver tail"] },
    { word: "Turtle",      forbidden: ["shell","slow","sea","land","long life"] },
  ],
  history: [
    { word: "Alexander the Great",   forbidden: ["Macedonia","conqueror","general","empire","horse"] },
    { word: "Cleopatra",             forbidden: ["Egypt","queen","Caesar","Antony","beauty"] },
    { word: "Napoleon",              forbidden: ["France","short","emperor","Waterloo","hat"] },
    { word: "Adolf Hitler",          forbidden: ["Germany","WWII","Nazi","Holocaust","moustache"] },
    { word: "Socrates",              forbidden: ["philosopher","Athens","hemlock","dialogue","know thyself"] },
    { word: "Julius Caesar",         forbidden: ["Rome","assassination","knife","general","emperor"] },
    { word: "Galileo",               forbidden: ["telescope","Earth","moves","scientist","Church"] },
    { word: "Isaac Newton",          forbidden: ["apple","gravity","physicist","laws","motion"] },
    { word: "Albert Einstein",       forbidden: ["relativity","E=mc²","physicist","tongue","hair"] },
    { word: "Leonardo da Vinci",     forbidden: ["Mona Lisa","Renaissance","painter","inventor","genius"] },
    { word: "Christopher Columbus",  forbidden: ["America","1492","ship","discovery","Santa Maria"] },
    { word: "French Revolution",     forbidden: ["1789","guillotine","Louis","Bastille","Paris"] },
    { word: "World War II",          forbidden: ["Hitler","1939","Nazi","atomic","Holocaust"] },
    { word: "Berlin Wall",           forbidden: ["Germany","division","1989","Cold War","east west"] },
    { word: "Cold War",              forbidden: ["USA","USSR","nuclear","iron curtain","spy"] },
    { word: "Martin Luther King",    forbidden: ["dream","assassination","racism","equality","pastor"] },
    { word: "Nelson Mandela",        forbidden: ["South Africa","prison","apartheid","president","Nelson"] },
    { word: "Gandhi",                forbidden: ["India","peace","independence","Britain","fasting"] },
    { word: "Moon Landing",          forbidden: ["Apollo","Neil Armstrong","1969","NASA","one giant leap"] },
    { word: "Trojan War",            forbidden: ["Troy","horse","Helen","Achilles","Homer"] },
    { word: "Roman Empire",          forbidden: ["Rome","Caesar","gladiators","Latin","legions"] },
    { word: "Industrial Revolution", forbidden: ["steam","factory","Britain","18th century","machine"] },
    { word: "Black Death",           forbidden: ["plague","rats","Europe","medieval","pandemic"] },
    { word: "American Civil War",    forbidden: ["Lincoln","slavery","north south","1861","union"] },
    { word: "D-Day",                 forbidden: ["Normandy","WWII","beaches","June 1944","invasion"] },
    { word: "Hiroshima",             forbidden: ["atomic bomb","Japan","1945","WWII","explosion"] },
    { word: "Cuban Missile Crisis",  forbidden: ["Kennedy","USSR","nuclear","1962","standoff"] },
    { word: "9/11",                  forbidden: ["September 11","twin towers","planes","terrorism","New York"] },
    { word: "Magna Carta",           forbidden: ["1215","king","rights","England","document"] },
    { word: "Vikings",               forbidden: ["Scandinavia","longship","Ragnar","raid","Norse"] },
  ],
  streaming: [
    { word: "Stranger Things",     forbidden: ["Eleven","Upside Down","Hawkins","Demogorgon","80s"] },
    { word: "Game of Thrones",     forbidden: ["dragons","throne","Westeros","Jon Snow","winter"] },
    { word: "Breaking Bad",        forbidden: ["Walter White","meth","chemistry teacher","cancer","blue"] },
    { word: "The Office",          forbidden: ["office","Michael Scott","Dwight","Jim","Pam"] },
    { word: "Friends",             forbidden: ["Central Perk","Monica","Chandler","coffee","Rachel"] },
    { word: "Squid Game",          forbidden: ["Korea","games","debt","red","green"] },
    { word: "Wednesday",           forbidden: ["Addams","Jenna Ortega","gothic","school","hand"] },
    { word: "The Mandalorian",     forbidden: ["Baby Yoda","space","bounty hunter","Star Wars","Grogu"] },
    { word: "Peaky Blinders",      forbidden: ["Birmingham","Tommy Shelby","cap","gangster","razor"] },
    { word: "Black Mirror",        forbidden: ["technology","future","episode","dark","society"] },
    { word: "The Crown",           forbidden: ["queen","Elizabeth","England","palace","monarchy"] },
    { word: "Narcos",              forbidden: ["Pablo Escobar","cocaine","Colombia","cartel","drug"] },
    { word: "La Casa de Papel",    forbidden: ["heist","mask","Dali","Professor","red suit"] },
    { word: "Sherlock",            forbidden: ["Holmes","Watson","detective","London","mystery"] },
    { word: "Prison Break",        forbidden: ["prison","Michael Scofield","tattoo","escape","Lincoln"] },
    { word: "Lost",                forbidden: ["island","plane","crash","mystery","numbers"] },
    { word: "The Witcher",         forbidden: ["Geralt","monster","Yennefer","Ciri","white hair"] },
    { word: "Bridgerton",          forbidden: ["Regency","romance","London","society","duke"] },
    { word: "Ozark",               forbidden: ["money laundering","cartel","Missouri","lake","Marty"] },
    { word: "Succession",          forbidden: ["Roy family","media","Logan","Kendall","billionaire"] },
    { word: "The Boys",            forbidden: ["superheroes","Homelander","corrupt","Amazon","Butcher"] },
    { word: "Euphoria",            forbidden: ["high school","drugs","Rue","Zendaya","makeup"] },
    { word: "Ted Lasso",           forbidden: ["football","coach","American","AFC Richmond","biscuits"] },
    { word: "The Last of Us",      forbidden: ["zombie","fungus","Joel","Ellie","post-apocalyptic"] },
    { word: "House of the Dragon", forbidden: ["dragon","Targaryen","fire","Game of Thrones","prequel"] },
    { word: "The Bear",            forbidden: ["restaurant","chef","Chicago","kitchen","sandwich"] },
    { word: "White Lotus",         forbidden: ["resort","hotel","Hawaii","murder","guests"] },
    { word: "Yellowstone",         forbidden: ["ranch","Montana","Dutton","cowboys","Kevin Costner"] },
    { word: "Andor",               forbidden: ["Star Wars","spy","rebellion","Empire","prison"] },
    { word: "Severance",           forbidden: ["work","memory","split","office","Lumon"] },
  ],
  science: [
    { word: "DNA",               forbidden: ["gene","heredity","double helix","Watson","chromosome"] },
    { word: "Atom",              forbidden: ["proton","neutron","electron","nucleus","small"] },
    { word: "Gravity",           forbidden: ["Newton","fall","apple","attraction","force"] },
    { word: "Photosynthesis",    forbidden: ["plants","chlorophyll","sun","oxygen","green"] },
    { word: "Evolution",         forbidden: ["Darwin","species","adaptation","natural selection","survival"] },
    { word: "Periodic Table",    forbidden: ["elements","Mendeleev","chemistry","symbols","atomic"] },
    { word: "Electricity",       forbidden: ["current","voltage","volt","ampere","charge"] },
    { word: "Magnetism",         forbidden: ["magnet","poles","attract","repel","north"] },
    { word: "Cell",              forbidden: ["membrane","nucleus","DNA","microscope","living"] },
    { word: "Volcano",           forbidden: ["lava","eruption","magma","crater","ash"] },
    { word: "Earthquake",        forbidden: ["tremor","Richter","fault","tectonic","plates"] },
    { word: "Tsunami",           forbidden: ["wave","sea","disaster","earthquake","Japan"] },
    { word: "Black Hole",        forbidden: ["space","gravity","light","event horizon","singularity"] },
    { word: "Big Bang",          forbidden: ["universe","origin","explosion","expansion","theory"] },
    { word: "Brain",             forbidden: ["neurons","thinking","head","mind","memory"] },
    { word: "Heart",             forbidden: ["beat","blood","pump","chest","veins"] },
    { word: "Cloning",           forbidden: ["copy","genetics","sheep","Dolly","DNA"] },
    { word: "Antibiotics",       forbidden: ["bacteria","penicillin","medicine","infection","Fleming"] },
    { word: "Vaccine",           forbidden: ["immunity","injection","virus","jab","disease"] },
    { word: "Quantum Physics",   forbidden: ["particles","superposition","wave","uncertainty","Heisenberg"] },
    { word: "Climate Change",    forbidden: ["global warming","CO2","greenhouse","temperature rising","ice melting"] },
    { word: "Relativity",        forbidden: ["Einstein","E=mc²","speed of light","time","space"] },
    { word: "Light",             forbidden: ["bright","speed","wave","particle","photon"] },
    { word: "Sound",             forbidden: ["wave","ear","decibel","vibration","frequency"] },
    { word: "Water",             forbidden: ["H2O","liquid","hydrogen","oxygen","drink"] },
    { word: "Oxygen",            forbidden: ["O2","air","breathe","colourless","gas"] },
    { word: "Carbon",            forbidden: ["C","organic","diamond","graphite","element"] },
    { word: "Temperature",       forbidden: ["degrees","Celsius","heat","cold","thermometer"] },
    { word: "Energy",            forbidden: ["force","motion","Joule","conversion","conservation"] },
    { word: "Ecosystem",         forbidden: ["nature","food chain","habitat","species","balance"] },
  ],
};

const CAT_CONFIG: { id: Category; label: string; icon: string; color: string }[] = [
  { id: 'cinema',    label: 'Cinema & TV',  icon: '🎬', color: '#e74c3c' },
  { id: 'music',     label: 'Music',        icon: '🎵', color: '#9b59b6' },
  { id: 'sports',    label: 'Sports',       icon: '⚽', color: '#2ecc71' },
  { id: 'geography', label: 'Geography',    icon: '🌍', color: '#f39c12' },
  { id: 'food',      label: 'Food',         icon: '🍔', color: '#e67e22' },
  { id: 'tech',      label: 'Tech',         icon: '💻', color: '#3498db' },
  { id: 'animals',   label: 'Animals',      icon: '🦁', color: '#16a085' },
  { id: 'history',   label: 'History',      icon: '🏛️', color: '#6b8e23' },
  { id: 'streaming', label: 'Streaming',    icon: '📺', color: '#1e90ff' },
  { id: 'science',   label: 'Science',      icon: '⚗️', color: '#9c27b0' },
  { id: 'mixed',     label: 'Mixed — All Categories', icon: '🎲', color: '#e74c3c' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(category: Category): Card[] {
  if (category === 'mixed') {
    return shuffle(Object.values(CARDS).flat());
  }
  return shuffle([...CARDS[category]]);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TabooPage() {
  const [screen, setScreen]   = useState<Screen>('setup');
  const [settings, setSettings] = useState<GameSettings>({ targetScore: 20, roundDuration: 60, penaltyEnabled: true });
  const [category, setCategory] = useState<Category>('mixed');

  const [deck, setDeck]         = useState<Card[]>([]);
  const [cardIdx, setCardIdx]   = useState(0);
  const [scoreA, setScoreA]     = useState(0);
  const [scoreB, setScoreB]     = useState(0);
  const [team, setTeam]         = useState<'A' | 'B'>('A');
  const [round, setRound]       = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timePct, setTimePct]   = useState(100);
  const [switching, setSwitching] = useState(false);

  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef    = useRef(0);
  const durationRef = useRef(60);
  const scoreARef   = useRef(0);
  const scoreBRef   = useRef(0);
  const teamRef     = useRef<'A'|'B'>('A');
  const roundRef    = useRef(1);
  const targetRef   = useRef(20);
  const penaltyRef  = useRef(true);
  const categoryRef = useRef<Category>('mixed');

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const doTeamSwitch = useCallback(() => {
    stopTimer();
    const nextTeam = teamRef.current === 'A' ? 'B' : 'A';
    if (nextTeam === 'A') { roundRef.current += 1; setRound(r => r + 1); }
    teamRef.current = nextTeam;
    setTeam(nextTeam);
    setSwitching(true);
    setTimeout(() => {
      setSwitching(false);
      // restart timer
      startRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startRef.current) / 1000;
        const rem = durationRef.current - elapsed;
        setTimeLeft(Math.max(Math.ceil(rem), 0));
        setTimePct(Math.max((rem / durationRef.current) * 100, 0));
        if (rem <= 0) { stopTimer(); doTeamSwitch(); }
      }, 100);
    }, 2200);
  }, [stopTimer]);

  const startTimer = useCallback(() => {
    stopTimer();
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const rem = durationRef.current - elapsed;
      setTimeLeft(Math.max(Math.ceil(rem), 0));
      setTimePct(Math.max((rem / durationRef.current) * 100, 0));
      if (rem <= 0) { stopTimer(); doTeamSwitch(); }
    }, 100);
  }, [stopTimer, doTeamSwitch]);

  const startGame = useCallback((cat: Category) => {
    stopTimer();
    categoryRef.current = cat;
    setCategory(cat);
    durationRef.current  = settings.roundDuration;
    targetRef.current    = settings.targetScore;
    penaltyRef.current   = settings.penaltyEnabled;
    teamRef.current      = 'A';
    roundRef.current     = 1;
    scoreARef.current    = 0;
    scoreBRef.current    = 0;
    setScoreA(0); setScoreB(0);
    setTeam('A'); setRound(1);
    setCardIdx(0);
    setDeck(buildDeck(cat));
    setScreen('game');
    setTimeout(() => startTimer(), 50);
  }, [settings, stopTimer, startTimer]);

  const checkWin = useCallback((a: number, b: number) => {
    if (a >= targetRef.current || b >= targetRef.current) {
      stopTimer();
      setScreen('win');
    }
  }, [stopTimer]);

  const correct = useCallback(() => {
    const isA = teamRef.current === 'A';
    const newA = isA ? scoreARef.current + 1 : scoreARef.current;
    const newB = !isA ? scoreBRef.current + 1 : scoreBRef.current;
    scoreARef.current = newA; scoreBRef.current = newB;
    setScoreA(newA); setScoreB(newB);
    setCardIdx(i => i + 1);
    checkWin(newA, newB);
  }, [checkWin]);

  const taboo = useCallback(() => {
    if (!penaltyRef.current) { setCardIdx(i => i + 1); return; }
    const isA = teamRef.current === 'A';
    const newA = isA ? Math.max(scoreARef.current - 1, 0) : scoreARef.current;
    const newB = !isA ? Math.max(scoreBRef.current - 1, 0) : scoreBRef.current;
    scoreARef.current = newA; scoreBRef.current = newB;
    setScoreA(newA); setScoreB(newB);
    setCardIdx(i => i + 1);
  }, []);

  const skip = useCallback(() => { setCardIdx(i => i + 1); }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const card = deck[cardIdx % Math.max(deck.length, 1)];
  const danger  = timePct < 15;
  const warning = timePct < 35 && !danger;
  const timerColor = danger ? '#e74c3c' : warning ? '#f39c12' : '#25c491';
  const catCfg = CAT_CONFIG.find(c => c.id === category)!;

  return (
    <div style={{ minHeight: '100vh', background: '#05070a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 16px 24px', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#e2e8f0', position: 'relative', overflowX: 'hidden' }}>

      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: '#e74c3c', filter: 'blur(120px)', opacity: 0.08, top: -100, left: -80 }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#9b59b6', filter: 'blur(100px)', opacity: 0.08, bottom: -60, right: -40 }} />
      </div>

      {/* Team switch overlay */}
      {switching && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,7,10,0.85)' }}>
          <div style={{ background: 'linear-gradient(135deg,#e74c3c,#c0392b)', borderRadius: 20, padding: '32px 52px', textAlign: 'center', boxShadow: '0 20px 60px rgba(231,76,60,0.4)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Team {teamRef.current === 'A' ? 'B' : 'A'} → Team {teamRef.current}'s Turn!</div>
            <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)' }}>Score — A: {scoreARef.current} · B: {scoreBRef.current}</div>
          </div>
        </div>
      )}

      {/* ── SETUP SCREEN ── */}
      {screen === 'setup' && (
        <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: 3, color: '#f5f1e8', marginBottom: 4 }}>🎮 TABOO</div>
            <div style={{ color: 'rgba(245,241,232,0.5)', fontSize: '0.9rem' }}>Describe the word — avoid the forbidden ones</div>
          </div>

          {[
            { label: '🏆 Win at (points)', key: 'targetScore' as const, min: 5, max: 50, step: 5 },
            { label: '⏱️ Round duration (sec)', key: 'roundDuration' as const, min: 20, max: 120, step: 10 },
          ].map(({ label, key, min, max, step }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 18px', marginBottom: 10 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setSettings(s => ({ ...s, [key]: Math.max(min, s[key] - step) }))} style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: '#e74c3c', color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>−</button>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', minWidth: 32, textAlign: 'center' }}>{settings[key]}</span>
                <button onClick={() => setSettings(s => ({ ...s, [key]: Math.min(max, s[key] + step) }))} style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: '#e74c3c', color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 18px', marginBottom: 24 }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8' }}>⛔ Penalty for taboo violation</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.8rem', color: settings.penaltyEnabled ? '#e74c3c' : '#475569', fontWeight: 700 }}>{settings.penaltyEnabled ? 'ON' : 'OFF'}</span>
              <div onClick={() => setSettings(s => ({ ...s, penaltyEnabled: !s.penaltyEnabled }))}
                style={{ width: 46, height: 26, borderRadius: 13, background: settings.penaltyEnabled ? '#e74c3c' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                <div style={{ position: 'absolute', width: 20, height: 20, borderRadius: '50%', background: '#fff', top: 3, left: settings.penaltyEnabled ? 23 : 3, transition: 'left 0.3s' }} />
              </div>
            </div>
          </div>

          <button onClick={() => setScreen('category')} style={{ width: '100%', padding: '16px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg,#e74c3c,#c0392b)', color: '#fff', fontSize: '1.1rem', fontWeight: 800, letterSpacing: 1, cursor: 'pointer', boxShadow: '0 6px 20px rgba(231,76,60,0.35)' }}>
            Choose Category →
          </button>
        </div>
      )}

      {/* ── CATEGORY SCREEN ── */}
      {screen === 'category' && (
        <div style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1 }}>
          <button onClick={() => setScreen('setup')} style={{ background: 'none', border: 'none', color: '#475569', fontSize: '0.85rem', cursor: 'pointer', marginBottom: 16, fontFamily: 'inherit' }}>← Back</button>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 18, color: '#f5f1e8' }}>🗂️ Choose a Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CAT_CONFIG.map(cat => (
              <button key={cat.id} onClick={() => startGame(cat.id)}
                style={{ padding: '18px 12px', border: `0.5px solid ${cat.color}33`, borderRadius: 14, background: `${cat.color}0d`, color: '#f5f1e8', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: 'inherit', transition: 'all 0.2s', gridColumn: cat.id === 'mixed' ? 'span 2' : undefined }}>
                <span style={{ fontSize: '1.8rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: cat.color }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── GAME SCREEN ── */}
      {screen === 'game' && card && (
        <div style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1 }}>

          {/* Scores */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            {(['A','B'] as const).map(t => (
              <div key={t} style={{ flex: 1, padding: '12px', borderRadius: 14, textAlign: 'center', fontWeight: 700, fontSize: '1.2rem', background: t === 'A' ? 'linear-gradient(135deg,#e74c3c,#c0392b)' : 'linear-gradient(135deg,#34495e,#2c3e50)', color: '#fff', outline: team === t ? '2px solid #f39c12' : 'none', outlineOffset: 2, boxShadow: team === t ? `0 4px 20px rgba(231,76,60,0.3)` : 'none', transition: 'all 0.3s' }}>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: 2 }}>TEAM {t}</div>
                <div>{t === 'A' ? scoreA : scoreB}</div>
              </div>
            ))}
          </div>

          {/* Round info */}
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#475569', marginBottom: 10, fontWeight: 600, letterSpacing: 0.5 }}>
            Round {round} · Team {team}'s turn · Target: {settings.targetScore}pts
          </div>

          {/* Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ width: `${timePct}%`, height: '100%', borderRadius: 3, background: timerColor, transition: 'width 0.1s linear, background 0.4s', boxShadow: `0 0 10px ${timerColor}` }} />
            </div>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: timerColor, minWidth: 44, textAlign: 'right', fontVariantNumeric: 'tabular-nums', transition: 'color 0.4s' }}>
              {timeLeft}
            </span>
          </div>

          {/* Card */}
          <div style={{ background: 'linear-gradient(135deg,#e74c3c,#c0392b)', borderRadius: 20, padding: '32px 24px', marginBottom: 16, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 10px 40px rgba(231,76,60,0.3)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ textAlign: 'center', fontSize: 'clamp(2rem,8vw,2.8rem)', fontWeight: 900, color: '#fff', marginBottom: 24, textShadow: '0 2px 10px rgba(0,0,0,0.2)', wordBreak: 'break-word' }}>
              {card.word}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#f39c12', textAlign: 'center', marginBottom: 12 }}>⛔ Forbidden Words</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {card.forbidden.map(w => (
                  <span key={w} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', borderRadius: 20, fontSize: '0.88rem', fontWeight: 600 }}>{w}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <button onClick={correct} style={{ flex: 1, padding: '14px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#43e97b,#38f9d7)', color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 0.5 }}>
              ✓ Correct
            </button>
            <button onClick={taboo} style={{ flex: 1, padding: '14px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#fa709a,#ff9a44)', color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 0.5 }}>
              ✗ Taboo!
            </button>
          </div>
          <button onClick={skip} style={{ width: '100%', padding: '11px', border: 'none', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#64748b', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 8 }}>
            ⟶ Skip (no penalty)
          </button>
          <button onClick={() => { stopTimer(); setScreen('category'); }} style={{ width: '100%', padding: '9px', border: 'none', borderRadius: 10, background: 'transparent', color: '#334155', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            ← Change Category
          </button>
        </div>
      )}

      {/* ── WIN SCREEN ── */}
      {screen === 'win' && (
        <div style={{ width: '100%', maxWidth: 460, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '5rem', marginBottom: 16 }}>🏆</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#e74c3c', marginBottom: 8 }}>
            Team {scoreA >= settings.targetScore ? 'A' : 'B'} Wins!
          </h2>
          <p style={{ color: '#475569', marginBottom: 28 }}>First to reach {settings.targetScore} points</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
            {(['A','B'] as const).map(t => {
              const s = t === 'A' ? scoreA : scoreB;
              const winner = (t === 'A' && scoreA >= settings.targetScore) || (t === 'B' && scoreB >= settings.targetScore);
              return (
                <div key={t} style={{ flex: 1, padding: 20, borderRadius: 16, background: winner ? 'linear-gradient(135deg,#f39c12,#e67e22)' : 'rgba(255,255,255,0.05)', border: `0.5px solid ${winner ? 'transparent' : 'rgba(255,255,255,0.08)'}`, transform: winner ? 'scale(1.05)' : 'none' }}>
                  <div style={{ fontSize: '0.75rem', color: winner ? 'rgba(255,255,255,0.8)' : '#475569', marginBottom: 6 }}>TEAM {t}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: winner ? '#fff' : '#94a3b8' }}>{s}</div>
                </div>
              );
            })}
          </div>
          <button onClick={() => { setScreen('setup'); }} style={{ width: '100%', padding: '16px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#e74c3c,#c0392b)', color: '#fff', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 1 }}>
            🔄 Play Again
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { opacity: 0.9; }
        button:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}