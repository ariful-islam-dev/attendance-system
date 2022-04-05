const { Schema, model } = require("mongoose");

const studentAttendanceSchema = new Schema(
  {
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    adminAttendance: {
      ref: "AdminAttendance",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

module.exports = StudentAttendance;
