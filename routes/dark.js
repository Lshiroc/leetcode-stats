express = require('express');
const router = express();

router.get('/:username', async (req, res) => {
  const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
  `;
  let circumstance = 2 * Math.PI * 50;
  let percent = 0;
  let offset;
  let allSolved = 0;
  let easy = 0;
  let easyPercentage = 0;
  let medium = 0;
  let mediumPercentage = 0;
  let hard = 0;
  let hardPercentage = 0;

  try {
    fetch('https://leetcode.com/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Referrer': 'https://leetcode.com'
      },
      body: JSON.stringify({query: query, variables: {username: req.params.username}})
    })
    .then(resp => resp.json())
    .then(data => {
      percent = Number(((data.data.matchedUser.submitStats.acSubmissionNum[0].count*100)/data.data.allQuestionsCount[0].count)).toFixed(1);
      offset = circumstance * ((100 - percent)/100);
      allSolved = data.data.matchedUser.submitStats.acSubmissionNum[0].count;
      easy = data.data.matchedUser.submitStats.acSubmissionNum[1].count;
      easyPercentage = (data.data.matchedUser.submitStats.acSubmissionNum[1].count*100)/data.data.allQuestionsCount[1].count;
      medium = data.data.matchedUser.submitStats.acSubmissionNum[2].count;
      mediumPercentage = (data.data.matchedUser.submitStats.acSubmissionNum[2].count*100)/data.data.allQuestionsCount[2].count;
      hard = data.data.matchedUser.submitStats.acSubmissionNum[3].count;
      hardPercentage = (data.data.matchedUser.submitStats.acSubmissionNum[3].count*100)/data.data.allQuestionsCount[3].count;

      const svg = `<svg width="350" height="210" viewBox="0 0 350 210" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <style>
        * {
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        }

        .title {
          font-size: 20px;
          fill: #f3f3f3cf;
        }

        .progress-circle {
          transform: rotate(-90deg) translateX(-100px);
        }

        .difficulty-title {
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
          font-size: 12px;
          font-weight: 400;
          fill: #EFF2F699;
        }

        .overNum {
          font-size: 12px;
          fill: #ebebf54d;
        }

        .overNum .bold {
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 1px;
          fill: #ffffff;
        }

        .bar {
          transform: translateY(90px) translateX(20px);
        }

        .overall {
          font-size: 24px;
          font-weight: 500;
          fill: #ffffff;
        }

        .solvedText {
          font-size: 12px;
          fill: #EFF2F699;
        }

        .username {
          font-weight: 700;
          fill: #e3e2e2eb;
        }
      </style>
        <rect
          width="350"
          height="210"
          fill="#151515"
          stroke-width="1"
          stroke="#f1f1f1"
          rx="4.5"
        />
        <g>
          <text
            transform="translate(25, 40)"
            class="title"
          ><tspan class="username">${req.params.username}</tspan>'s LeetCode stats</text>
        </g>
        <g
          transform="translate(20, 80)"
        >
          <g>
            <text
              text-anchor="middle"
              class="overall"
              transform="translate(50, 50)"
            >${allSolved}</text>
            <text
              class="solvedText"
              transform="translate(32, 71)"
            >Solved</text>
            <circle
              cx="50"
              cy="50"
              r="50"
              stroke-width="3"
              stroke="#4a4a4a"
              fill="transparent"
            ></circle>
            <circle
              cx="50"
              cy="50"
              r="50"
              stroke-width="5"
              stroke="#ffa116"
              fill="transparent"
              stroke-dasharray="${circumstance}"
              stroke-dashoffset="${offset}"
              stroke-linecap="round"
              class="progress-circle"
            ></circle>
          </g>
        </g>
        <g
          transform="translate(120, -5)"
        >
          <g
            transform="translate(20, 80)"
            class="easy"
          >
            <text class="difficulty-title">Easy</text>
          </g>
          <g
            class="ratio"
            transform="translate(100, 80)"
          >
            <text class="overNum"><tspan class="bold">${easy}</tspan> /705</text>
          </g>
          <g
            class="bar"
          >
            <rect width="180" height="8" fill="#2cbb5d40" rx="5" />
            <g
              class="progress-bar"
            >
              <rect width="${(easyPercentage*180)/100}" height="8" fill="#00b8a3" rx="5" ry="5"/>
            </g>
          </g>
        </g>
        <g
        transform="translate(120, 40)"
      >
        <g
          transform="translate(20, 80)"
          class="medium"
        >
          <text class="difficulty-title">Medium</text>
        </g>
        <g
          class="ratio"
          transform="translate(100, 80)"
        >
          <text class="overNum"><tspan class="bold">${medium}</tspan> /1494</text>
        </g>
        <g
          class="bar"
        >
          <rect width="180" height="8" fill="#ffc01e40" rx="5" />
          <g
            class="progress-bar"
          >
            <rect width="${(mediumPercentage*180)/100}" height="8" fill="#ffc01e" rx="5" ry="5"/>
          </g>
        </g>
      </g>
      <g
        transform="translate(120, 85)"
      >
        <g
          transform="translate(20, 80)"
          class="hard"
        >
          <text class="difficulty-title">Hard</text>
        </g>
        <g
          class="ratio"
          transform="translate(100, 80)"
        >
          <text class="overNum"><tspan class="bold">${hard}</tspan> /1494</text>
        </g>
        <g
          class="bar"
        >
          <rect width="180" height="8" fill="#ef474340" rx="5" />
          <g
            class="progress-bar"
          >
            <rect width="${(hardPercentage*180)/100}" height="8" fill="#ef4743" rx="5" ry="5"/>
          </g>
        </g>
      </g>
      </svg>`;

      res.header('Content-Type', 'image/svg+xml');
      res.status(200).send(svg);
    });
  } catch(err) {
    res.status(500).send({message: err.message});
  }
})

module.exports = router;
