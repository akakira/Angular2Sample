/// <reference path="../../typings/globals/jquery/index.d.ts" />

declare var $: JQueryStatic;

var onClicked = function () {
    alert("Clicked!");
}

var main = function () {
    $("#greet").click(onClicked);
}

$(document).ready(function () {
    main();
});