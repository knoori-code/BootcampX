const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id 
WHERE cohorts.name = $1
LIMIT $2;
`;

const [cohortName, numberOfResults] = process.argv.slice(2);
const values = [cohortName, numberOfResults];

pool.query(queryString, values).then((res) => {
  console.log(res.rows);
  res.rows.forEach((user) => {
    console.log(
      `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
    );
  });
});
