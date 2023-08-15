const express = require('express');
const router = express.Router();

// router.get('/:username', async (req, res) => {
//   const query = `
//     query getUserProfile($username: String!) {
//       allQuestionsCount {
//         difficulty
//         count
//       }
//       matchedUser(username: $username) {
//         contributions {
//           points
//         }
//         profile {
//           reputation
//           ranking
//         }
//         submissionCalendar
//         submitStats {
//           acSubmissionNum {
//             difficulty
//             count
//             submissions
//           }
//           totalSubmissionNum {
//             difficulty
//             count
//             submissions
//           }
//         }
//       }
//     }
//     `;

//   try {
//     fetch('https://leetcode.com/graphql', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         'Referrer': 'https://leetcode.com'
//       },
//       body: JSON.stringify({query: query, variables: {username: req.params.username}})
//     })
//     .then(resp => resp.json())
//     .then(data => {
//       res.status(200).json({ username: req.params.username, ...data });
//     });

//   } catch(err) {
//     res.status(500).json({ message: "err.message" });
//   }
// })

router.get('/pic', async (req, res) => {
  const svg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect
      width="300"
      height="200"
      fill="purple"
      stroke-width="4"
      stroke="blue"
      />
  </svg>`;
  try {
    res.header('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
})

module.exports = router;