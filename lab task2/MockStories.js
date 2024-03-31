function displayStories() {
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories",
    method: "GET",
    dataType: "json",
    success: function (data) {
      var storiesList = $("#storiesList");
      storiesList.empty();

      $.each(data, function (index, story) {
        storiesList.append(
          `<div class="mb-3 ">

                    <h3>${story.title}</h3>
                    
                    <div >${story.content} </div>
                    <div class="ButtonApi">
                        <button class="btn editbtn btn-md   " data-id="${story.id}">Edit</button>
                        <button class="btn delbtn btn-md  " data-id="${story.id}">Delete</button>
                    </div>
                </div>
                <hr />
                `
        );
      });
    },
    error: function (error) {
      console.error("Error fetching stories:", error);
    },
  });
}
// Function to delete a story
function deleteStory() {
  let storyId = $(this).attr("data-id");
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
    method: "DELETE",
    success: function () {
      displayStories(); // Refresh the list after deleting a story
    },
    error: function (error) {
      console.error("Error deleting story:", error);
    },
  });
}
function handleFormSubmission(event) {
  event.preventDefault();
  let storyId = $("#createStory").attr("data-id");
  var title = $("#createText").val();
  var content = $("#createContent").val();
  //   console.log("title is", title);
  if (storyId) {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "PUT",

      data: { title, content },
      success: function () {
        displayStories();
        $("#createForm")[0].reset();
        $("#createStory").html("Create");
        // $("#createStory").attr("data-id", data.id); // Refresh the list after creating a new story
      },
      error: function (error) {
        console.error("Error creating story:", error);
      },
    });
  } else {
    console.log("title is", title);
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories",
      method: "POST",
      data: { title, content },
      success: function () {
        displayStories(); // Refresh the list after creating a new story
      },

      error: function (error) {
        console.error("Error creating story:", error);
      },
    });
  }
}
function editBtnClicked(event) {
  console.log("in edit button");
  event.preventDefault();
  let storyId = $(this).attr("data-id");
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
    method: "GET",
    success: function (data) {
      console.log(data);
      $("#createText").val(data.title);
      $("#createContent").val(data.content);
      $("#createStory").html("Update");
      $("#createStory").attr("data-id", data.id);

      //   console.log("sucess form");
      //   $("#createForm")[0].reset();
      //   console.log("reset");
    },
    error: function (error) {
      console.error("Error deleting story:", error);
    },
  });
}
$(document).ready(function () {
  displayStories();
  $(document).on("click", ".delbtn", deleteStory);
  $(document).on("click", ".editbtn", editBtnClicked);
  $("#createForm").submit(handleFormSubmission);
});
