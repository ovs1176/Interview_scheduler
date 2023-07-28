const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const { body, validationResult } = require('express-validator');
var alert = require('alert');
const userController = require("../controller/user");

// ROUTE 1: Get All the Interviews using: GET "/api/interviews/getuser"
router.get('/', userController.getHome);

// ROUTE 2: Add a new Interview using: POST "/api/interviews/addinterview"
router.post('/addinterview', [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 1 }),
    body('interviewee_email').isEmail(),
    body('interviewer_email').isEmail(),
], async (req, res) => {
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
})

// ROUTE 3: Update an existing Interview using: PUT "/api/interviews/updateinterview"
router.put('/updateinterview/:id', [
        body('title', 'Enter a valid title').isLength({ min: 1 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 1 }),
        body('interviewee_email').isEmail(),
        body('interviewer_email').isEmail(),
    ], async (req, res) => {
    const { title, description, interviewee_email, interviewer_email, presentDate, start_time, end_time } = req.body;
    try {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            alert("Please Enter valid credentials! interviewee_email and interviewer_email should be valid email.");
            return res.status(400).json({});
        }
        
        // Create a newInterview object
        const newInterview = {};
        if (title) { newInterview.title = title };
        if (description) { newInterview.description = description };
        if (interviewee_email) { newInterview.interviewee_email = interviewee_email };
        if (interviewer_email) { newInterview.interviewer_email = interviewer_email };
        if (presentDate) { newInterview.presentDate = presentDate };
        if (start_time) { newInterview.start_time = start_time };
        if (end_time) { newInterview.end_time = end_time };

        const interview = await Interview.findByIdAndUpdate(req.params.id, { $set: newInterview }, { new: true })
        res.json({ interview });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Interview using: DELETE "/api/interviews/deleteinterview"
router.delete('/deleteinterview/:id', async (req, res) => {
    try {
        const interview = await Interview.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Interview has been deleted", interview: interview });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router