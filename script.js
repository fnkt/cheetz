javascript:(function() {
  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.noowai.com';
  iframe.style.position = 'fixed';
  iframe.style.top = '50px';
  iframe.style.left = '50px';
  iframe.style.width = '400px';
  iframe.style.height = '300px';
  iframe.style.border = '1px solid black';
  iframe.style.zIndex = '9999';
  iframe.style.background = 'white';

  var closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';
  closeButton.addEventListener('click', function() {
    document.body.removeChild(iframe);
  });

  var draggableArea = document.createElement('div');
  draggableArea.style.position = 'absolute';
  draggableArea.style.top = '0';
  draggableArea.style.left = '0';
  draggableArea.style.width = '100%';
  draggableArea.style.height = '30px';
  draggableArea.style.cursor = 'move';
  draggableArea.style.background = 'gray';
  draggableArea.style.opacity = '0.7';
  draggableArea.style.zIndex = '9999';
  draggableArea.addEventListener('mousedown', startDragging, false);

  function startDragging(e) {
    var startX = e.clientX;
    var startY = e.clientY;
    var offsetX = iframe.offsetLeft;
    var offsetY = iframe.offsetTop;

    document.addEventListener('mousemove', drag, false);
    document.addEventListener('mouseup', stopDragging, false);

    function drag(e) {
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;

      iframe.style.left = offsetX + dx + 'px';
      iframe.style.top = offsetY + dy + 'px';
    }

    function stopDragging() {
      document.removeEventListener('mousemove', drag, false);
      document.removeEventListener('mouseup', stopDragging, false);
    }
  }

  document.body.appendChild(iframe);
  iframe.contentWindow.document.body.appendChild(closeButton);
  iframe.contentWindow.document.body.appendChild(draggableArea);
})();
