const { Schema, model } = require("mongoose");

const studentAttendanceSchema = new Schema(
  {
   userId:{
       ref: 'User',
       type: Schema.Types.ObjectId
   },
   adminAttendanceId:{
       ref: 'AdminAttendance',
       type: Schema.Types.ObjectId
   }
  },
  {
    timestamps: true,
  }
);

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

module.exports = StudentAttendance;
