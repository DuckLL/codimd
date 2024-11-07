/* eslint-env browser, jquery */
/* global moment */

$(document).ready(function () {
  var searchInput = $('#search-input')
  var searchResults = $('#search-results')

  $('.search-modal').on('shown.bs.modal', function () {
    searchInput.focus().select()
  })

  searchInput.on('input', function () {
    var query = searchInput.val().trim()

    if (query.length > 0) {
      $.ajax({
        url: '/api/search',
        method: 'GET',
        data: { q: query },
        success: function (data) {
          searchResults.empty()

          data.forEach(function (note) {
            var listItem = $('<li></li>')

            var link = $('<a></a>')
              .attr('href', '/' + note.shortid)
              .attr('target', '_blank')

            var title = $('<h3></h3>').text(note.title)
            var lastchangeAt = $('<div></div>')
              .text(moment(note.lastchangeAt).format('YYYY-MM-DD HH:mm'))
              .css('float', 'right')
            var content = $('<div></div>')
            note.highlighted_content.forEach(function (highlight) {
              var paragraph = $('<p></p>').html(highlight)
              content.append(paragraph)
            })

            link.append(lastchangeAt).append(title).append(content)
            listItem.append(link)

            searchResults.append(listItem)
          })
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error('error:', textStatus, errorThrown)
        }
      })
    } else {
      searchResults.empty()
    }
  })
})
