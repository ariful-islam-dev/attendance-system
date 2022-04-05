const router = require('express').Router();
const {getStudentAttendance, getStudentAttendanceStatus} = require('../Controllers/student-attendance')

router.get('/status', getStudentAttendanceStatus)

router.get('/:id', getStudentAttendance)


module.exports = router;