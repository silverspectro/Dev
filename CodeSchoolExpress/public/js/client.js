$(function(){
  $.get("/projects", appendToList);

  function appendToList(projects) {
    var list = [];
    var content, project;

    for(var i in projects) {
      project = projects[i];
      //console.log(projects);
      content = "<a href='#' data-project='"+ project.title +"'>X</a>" +
      "<a href='/projects/"+ project.title +"'>"+ project.text +"</a>";
      list.push($("<li>", { html: content}));
    }
    $(".block-list").append(list);
  }

  $("form").on("submit", function(event){
    event.preventDefault();
    var form = $(this);
    var projectData = form.serialize();

    $.ajax({
      type:"POST", url: "/projects", data: projectData
    }).done(function(project){
      appendToList([project]);
      form.trigger("reset");
    });
  });

  $(".block-list").on("click", "a[data-project]", function(event){
    if(!confirm("Are you sure ?")) {
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: "DELETE", url: "/projects/" + target.data("project")
    }).done(function(){
      target.parents("li").remove();
    });

  });

});
