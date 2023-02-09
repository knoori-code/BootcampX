const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const [ cohortName ] = process.argv.slice(2);

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${cohortName}';
`)
.then(res => {
  console.log(res.rows)
  res.rows.forEach(row => {
    console.log(`${row.name}: ${row.teacher} `);
  })
});