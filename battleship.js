$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }


  $('#generate').click(() => {
    //clear Field
    for(var i=0;i<10;i++){
      for(var j=0;j<10;j++){
        $('td[data-r="' + i + '"][data-c="' + j + '"]').removeClass('ship').addClass('water');
      }
    }
    //generate Field
    ships = [5, 4, 3, 3, 2];
    for (var i = 0; i < 5; i++) {
      placeShip(ships[i]);
    }
  });

  function placeShip(size) {
    var direction, x, y = 0;
    do {
      direction = Math.floor((Math.random() * 4) + 1);
      do {
        x = Math.floor((Math.random() * 10));
        y = Math.floor((Math.random() * 10));
      } while ($('td[data-r="' + x + '"][data-c="' + y + '"]').hasClass('ship'));
    } while (defineDirection(size, direction, x, y) > 0);
    switch (direction) {
      case 1:
        for (var i = 0; i < size; i++) {
          $('td[data-r="' + x + '"][data-c="' + y + '"]').removeClass('water').addClass('ship');
          y--;
        } break;
      case 2:
        for (var i = 0; i < size; i++) {
          $('td[data-r="' + x + '"][data-c="' + y + '"]').removeClass('water').addClass('ship');
          x++;
        } break;
      case 3:
        for (var i = 0; i < size; i++) {
          $('td[data-r="' + x + '"][data-c="' + y + '"]').removeClass('water').addClass('ship');
          y++;
        } break;
      case 4:
        for (var i = 0; i < size; i++) {
          $('td[data-r="' + x + '"][data-c="' + y + '"]').removeClass('water').addClass('ship');
          x--;
        } break;
    }
  }

  function defineDirection(numb, direction, x, y) {    //1=left 2=down 3=right 4=up       error>0 = direction must be changed
    error = 0;
    switch (direction) {
      case 1:
        for (var i = 0; i < numb; i++) {
          y--;
          if ($('td[data-r="' + x + '"][data-c="' + y + '"]').hasClass('ship')) {
            error = 1;
          }
        } break;
      case 2:
        for (var i = 0; i < numb; i++) {
          x++;
          if ($('td[data-r="' + x + '"][data-c="' + y + '"]').hasClass('ship')) {
            error = 1;
          }
        } break;
      case 3:
        for (var i = 0; i < numb; i++) {
          y++;
          if ($('td[data-r="' + x + '"][data-c="' + y + '"]').hasClass('ship')) {
            error = 1;
          }
        } break;
      case 4:
        for (var i = 0; i < numb; i++) {
          x--;
          if ($('td[data-r="' + x + '"][data-c="' + y + '"]').hasClass('ship')) {
            error = 1;
          }
        } break;
    }
    if (error === 0) {
      if (x < 0 || x > 10 || y < 0 || y > 10) {
        error = 2;
      }
    }
    return error;

  }
});