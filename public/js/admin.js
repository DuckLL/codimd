require("../css/admin.css");

$(document).ready(function () {
  // Toggle admin
  $(".toggle-admin").click(function () {
    var $button = $(this);
    var userId = $button.closest(".flex-table-row").data("user-id");
    var isAdmin = $button.data("admin") === "true";

    $.ajax({
      url: "/admin/setAdmin",
      type: "POST",
      data: JSON.stringify({ userId: userId, admin: !isAdmin }),
      contentType: "application/json",
      success: function () {
        if (isAdmin) {
          $button.removeClass("glyphicon-remove").addClass("glyphicon-ok");
          $button.data("admin", "false");
          $button.prev("label").text("No");
        } else {
          $button.removeClass("glyphicon-ok").addClass("glyphicon-remove");
          $button.data("admin", "true");
          $button.prev("label").text("Yes");
        }
      },
      error: function (error) {
        alert("Failed to toggle admin status");
      },
    });
  });

  // Reset password
  $(".reset-password").click(function () {
    var userId = $(this).closest(".flex-table-row").data("user-id");

    $.ajax({
      url: "/admin/resetPassword",
      type: "POST",
      data: JSON.stringify({ userId: userId }),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        alert("New Password: " + response.newPassword);
      },
      error: function (error) {
        alert("Failed to reset password");
      },
    });
  });
});
