javascript:(function() {
  var frame = document.createElement('div');
  frame.style.position = 'fixed';
  frame.style.top = '50px';
  frame.style.left = '50px';
  frame.style.width = '500px';
  frame.style.height = '400px';
  frame.style.border = '1px solid #ddd';
  frame.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
  frame.style.zIndex = '9999';
  frame.style.background = '#fff';
  frame.style.resize = 'both';
  frame.style.overflow = 'auto';
  frame.style.fontFamily = 'Arial, sans-serif';
  frame.style.userSelect = 'none';

  var header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.justifyContent = 'space-between';
  header.style.padding = '8px 12px';
  header.style.background = '#f1f1f1';
  header.style.cursor = 'move';

  var title = document.createElement('span');
  title.textContent = 'Noowai';
  title.style.fontWeight = 'bold';

  var closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.padding = '4px 8px';
  closeButton.style.border = 'none';
  closeButton.style.background = '#ccc';
  closeButton.style.color = '#fff';
  closeButton.style.cursor = 'pointer';

  closeButton.addEventListener('click', function() {
    document.body.removeChild(frame);
  });

  header.appendChild(title);
  header.appendChild(closeButton);

  var isDragging = false;
  var startPosX;
  var startPosY;
  var startOffsetLeft;
  var startOffsetTop;

  header.addEventListener('mousedown', startDragging);

  function startDragging(event) {
    isDragging = true;
    startPosX = event.clientX;
    startPosY = event.clientY;
    startOffsetLeft = frame.offsetLeft;
    startOffsetTop = frame.offsetTop;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
  }

  function drag(event) {
    if (!isDragging) return;

    var dx = event.clientX - startPosX;
    var dy = event.clientY - startPosY;

    frame.style.left = startOffsetLeft + dx + 'px';
    frame.style.top = startOffsetTop + dy + 'px';
  }

  function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDragging);
  }

  frame.appendChild(header);

  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.noowai.com';
  iframe.style.width = '100%';
  iframe.style.height = 'calc(100% - 32px)';
  iframe.style.border = 'none';

  frame.appendChild(iframe);

  document.body.appendChild(frame);

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      document.body.removeChild(frame);
    }
  });
})();
