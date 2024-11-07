/* eslint-env browser, jquery */

require('../css/admin.css')

$(document).ready(function () {
  // Toggle admin
  $('.toggle-admin').click(function () {
    var $button = $(this)
    var userId = $button.closest('.flex-table-row').data('user-id')
    var isAdmin = $button.data('admin') === 'true'

    $.ajax({
      url: '/admin/setAdmin',
      type: 'POST',
      data: JSON.stringify({ userId: userId, admin: !isAdmin }),
      contentType: 'application/json',
      success: function () {
        if (isAdmin) {
          $button.removeClass('glyphicon-remove').addClass('glyphicon-ok')
          $button.data('admin', 'false')
          $button.prev('label').text('No')
        } else {
          $button.removeClass('glyphicon-ok').addClass('glyphicon-remove')
          $button.data('admin', 'true')
          $button.prev('label').text('Yes')
        }
      },
      error: function (error) {
        alert(error)
      }
    })
  })

  // Reset password
  $('.reset-password').click(function () {
    var userId = $(this).closest('.flex-table-row').data('user-id')

    // Show confirmation dialog
    var confirmed = confirm('Are you sure you want to reset the password?')

    // If user confirms, proceed with the AJAX request
    if (confirmed) {
      $.ajax({
        url: '/admin/resetPassword',
        type: 'POST',
        data: JSON.stringify({ userId: userId }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
          alert('New Password: ' + response.newPassword)
        },
        error: function (error) {
          alert(error)
        }
      })
    }
  })
})
