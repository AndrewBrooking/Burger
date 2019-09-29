const express = require("express");
const router = express.Router();

// Import the model to use its database functions.
const model = require("../models/model.js");

const API_ROUTE = "/api/burgers";

router.get("/", function (req, res) {
    model.all(function (result) {
        let hbObj = {
            data: result
        };

        res.render("index", hbObj);
    });
});

router.post(API_ROUTE, function (req, res) {
    model.create(
        [
            "burger_name", "devoured"
        ],
        [
            req.body.burger_name, false
        ],
        function (result) {
            // Send back the ID of the new quote
            res.json({
                id: result.insertId
            });
        }
    );
});

router.put(API_ROUTE + "/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    model.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        }

        res.status(200).end();
    });
});

module.exports = router;