const Interview = require('../models/Interview');
const { body, validationResult } = require('express-validator');
let validationMiddleware = require("../validation/interview")

class interviewController {
    static findAll = async (req, res) => {
        console.log("validationMiddleware :", validationMiddleware)
        const interviews = await Interview.find();
        res.json(validationMiddleware);
    }

    static addinterview = async (req, res) => {
    try {
        const { title, description, interviewee_email, interviewer_email, presentDate, start_time, end_time } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            alert("Please Enter valid credentials! always check -> interviewee_email and interviewer_email should be valid email.");
            return res.status(400).json({});
        }
        const interviews = await Interview.find();

        const INTERVALS = [];
        let stime = 0, etime = 0;
        for (let i = 0; i < interviews.length; i++) {
            if (interviews[i].presentDate === presentDate && (interviews[i].interviewee_email === interviewee_email || interviews[i].interviewer_email === interviewer_email)) {
                stime = Number(interviews[i].start_time.split(':')[0]) + Number(interviews[i].start_time.split(':')[1]) / 60;
                etime = Number(interviews[i].end_time.split(':')[0]) + Number(interviews[i].end_time.split(':')[1]) / 60;
                INTERVALS.push([stime, etime]);
            }
        }
        let curr_stime = Number(start_time.split(':')[0]) + Number(start_time.split(':')[1]) / 60;
        let curr_etime = Number(end_time.split(':')[0]) + Number(end_time.split(':')[1]) / 60;

        console.log(INTERVALS);
        for (let i = 0; i < INTERVALS.length; i++) {
            if (curr_stime >= INTERVALS[i][0] && curr_stime < INTERVALS[i][1] || curr_etime > INTERVALS[i][0] && curr_etime <= INTERVALS[i][1]) {
                alert("scheduled time is overlapping i.e. interviewee or interviewer is not available.");
                return res.status(200).json({});
            }
        }

        const interview = new Interview({
            title, description, interviewee_email, interviewer_email, presentDate, start_time, end_time
        })
        const savedInterview = await interview.save()
        alert("Interview scheduled successfully without an error");
        res.json(savedInterview)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
}

module.exports = interviewController;