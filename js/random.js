// function getRandomSearch() {
//     // A list of all characters that can be chosen.
//     const characters = 'abcdefghijklmnopqrstuvwxyz';
    
//     // Gets a random character from the characters string.
//     const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
//     let randomSearch = '';
  
//     // Places the wildcard character at the beginning, or both beginning and end, randomly.
//     switch (Math.round(Math.random())) {
//       case 0:
//         randomSearch = randomCharacter + '%';
//         break;
//       case 1:
//         randomSearch = '%' + randomCharacter + '%';
//         break;
//     }
  
//     return randomSearch;
//   }

// //   const randomOffset = Math.floor(Math.random() * 10000);


// //   GET https://api.spotify.com/v1/search
// // type=track
// // q=getRandomSearch()
// // offset=randomOffset