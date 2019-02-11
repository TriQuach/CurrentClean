$(function () {
    var isMouseDown = false,
      isHighlighted;
    $("#freq td")
      .mousedown(function () {
        isMouseDown = true;
        $(this).toggleClass("highlighted");
        isHighlighted = $(this).hasClass("highlighted");
        return false; // prevent text selection
      })
      .mouseover(function () {
        if (isMouseDown) {
          $(this).toggleClass("highlighted", isHighlighted);
        }
      })
      .bind("selectstart", function () {
        return false;
      })
  
    $(document)
      .mouseup(function () {
        isMouseDown = false;
      });
  });