$("document").ready(function(){
    //When the Boundary header is clicked it will hide the other left interface pane and toggle the inteface pane which the boundary header is associated with. 
    $("#boundaryHead").click(function(){
        $("#leftInterfaceB").hide();
        $("#leftInterface").toggle();
    });
    //When the Survey Lines header is clicked it will hide the other left interface pane and toggle the inteface pane which the Survey Lines header is associated with.
    $("#linesHead").click(function(){
        $("#leftInterface").hide();
         $("#leftInterfaceB").toggle();
    });
    //When the Statistics header is clicked it will toggle the inteface pane which the Statistics header is associated with.
    $("#statsHead").click(function(){
         $("#rightInterface").toggle();
    });
})