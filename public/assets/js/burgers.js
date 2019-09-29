$(function () {
    $(".devour-btn").on("click", function (event) {
        event.preventDefault();

        let id = $(this).data("id");
        let devoured = $(this).data("devoured") == 0 ? true: false;

        let devouredState = {
            devoured: devoured
        };

        // Send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $("#add_burger").on("click", function (event) {
        event.preventDefault();

        let newBurger = {
            burger_name: $("#burger_name").val().trim()
        };

        // Send the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});