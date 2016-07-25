/// <reference path="../../typings/globals/jquery/index.d.ts" />
var onClicked = function () {
    alert("Clicked!");
};
var main = function () {
    $("#greet").click(onClicked);
};
$(document).ready(function () {
    main();
});
