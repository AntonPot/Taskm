var myTaskObject;
var numOfAllTaskEvents;
var currentTaskId = window.location.href.split("/").pop()

// $(document).ready(function(){

    // var url = '/tasks/' + currentTaskId + '/'
    // $.ajax({
    //   url: url,
    //   type: 'get',
    // }).done(function(response){
    //   console.log(response)
    //   // debugger;
    // });
  // var GetNumOfAllTaskEvents = (function (){
  // })();

  // debugger;

  var Task = function(taskName, taskLength) {
    this.taskName = taskName;
    this.taskLength = taskLength;
    this.positionInTime = 0;
  };
  Task.prototype.advanceInTime = function(){
    this.positionInTime++;
  };
  Task.prototype.gobackInTime = function(){
    this.positionInTime--;
  };

  var Board = function(task){
    this.boardLength = task.taskLength;
    this.task = task;
  };

  Board.prototype.drawBoard = function() {
    for (var i = 0; i <= this.task.taskLength; i++) {
      if (this.task.positionInTime === i) {
        this.printCurrentPositionInTime();
      } else {
        this.printEmptyPositionInTime(i);
      };
    };
  };
  Board.prototype.eraseBoard = function() {
    $("tr.progress_line").empty();
  };
  Board.prototype.printCurrentPositionInTime = function(){
    $("tr.progress_line").append('<td class="progress_field active">' + this.task.taskName + '</td>')
  };
  Board.prototype.printEmptyPositionInTime = function(numInOrder){
    $("tr.progress_line").append('<td class="progress_field">' + numInOrder + '</td>');
  };
  Board.prototype.printLogElement = function(){
    var url = '/tasks/' + currentTaskId + '/'
    // debugger;
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'JSON',
      data: {"position_in_time": this.task.positionInTime}
    }).done(function(response) {
      $("div.task_log_container").append('<div class="task_log_element"><p class="task_log_line">' + "Step " + myTaskObject.positionInTime + '</p><p class="task_log_line">' + "Assigned to: " + response.assignee + '</p><p class="task_log_line">' + "Status: " + response.current_status  + '</p>'); //+'<p class="task_log_line">' + "Why: " + response.why + '</p></div>');
    });
  };
  Board.prototype.eraseLogElement = function(){
    $('div.task_log_container div:last-child').remove()
  };

  myTaskObject = new Task('My Task', 5);
  // debugger;
$(document).ready(function(){

  var display = new Board(myTaskObject);
  display.drawBoard();
  $('body').on("click", 'button.time_travel_next', function(event){
    if (display.task.positionInTime < display.boardLength) {
      myTaskObject.advanceInTime();
      display.eraseLogElement();
      display.printLogElement();
      display.eraseBoard();
      display.drawBoard();
    };
  });
  $('body').on("click", 'button.time_travel_back', function(event){
    if (display.task.positionInTime > 0) {
      myTaskObject.gobackInTime();
      display.eraseLogElement();
      display.printLogElement();
      display.eraseBoard();
      display.drawBoard();
    };
  });
});