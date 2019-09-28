const express = require("express");
const router = express.Router();

// Import the model to use its database functions.
const model = require("../models/model.js");

router.get("/", function (req, res) {
    model.all(function (result) {
        let hbObj = {
            data: data
        };

        res.render("index", hbObj);
    });
});

router.post("/api/model", function (req, res) {
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

router.put("/api/model/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    model.update({
        // ** ADD UPDATE DATA HERE **
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        }

        res.status(200).end();
    });
});

router.delete("/api/model/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    model.delete(condition, function (result) {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        }

        res.status(200).end();
    });
});

module.exports = router;