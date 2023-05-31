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
  frame.style.background = '#000';
  frame.style.color = '#fff';
  frame.style.fontFamily = 'monospace';
  frame.style.userSelect = 'none';
  frame.style.overflow = 'hidden';

  var isDragging = false;
  var dragStartX = 0;
  var dragStartY = 0;

  var header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.justifyContent = 'space-between';
  header.style.padding = '8px 12px';
  header.style.background = '#333';
  header.style.userSelect = 'none';

  var title = document.createElement('span');
  title.textContent = 'Noowai Calculator';
  title.style.fontWeight = 'bold';

  var closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.padding = '4px 8px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'red';
  closeButton.style.color = '#fff';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', function() {
    frame.style.display = 'none';
  });

  header.appendChild(title);
  header.appendChild(closeButton);

  var calculator = document.createElement('div');
  calculator.style.padding = '12px';
  calculator.style.width = 'calc(100% - 24px)';
  calculator.style.height = 'calc(100% - 48px)';
  calculator.style.overflow = 'auto';

  var display = document.createElement('input');
  display.type = 'text';
  display.style.width = '100%';
  display.style.marginBottom = '8px';
  display.style.padding = '4px';
  display.style.fontSize = '24px';
  display.style.border = 'none';
  display.style.background = 'yellow';
  display.style.textAlign = 'right';
  display.style.fontFamily = 'monospace';

  calculator.appendChild(display);

  var buttons = document.createElement('div');
  buttons.style.display = 'grid';
  buttons.style.gridTemplateColumns = 'repeat(4, 1fr)';
  buttons.style.gridGap = '8px';

  var buttonData = [
    { text: '7', action: 'append' },
    { text: '8', action: 'append' },
    { text: '9', action: 'append' },
    { text: '+', action: 'append' },
    { text: '4', action: 'append' },
    { text: '5', action: 'append' },
    { text: '6', action: 'append' },
    { text: '-', action: 'append' },
    { text: '1', action: 'append' },
    { text: '2', action: 'append' },
    { text: '3', action: 'append' },
    { text: '*', action: 'append' },
    { text: 'C', action: 'clear' },
    { text: '0', action: 'append' },
    { text: '=', action: 'evaluate' },
    { text: '/', action: 'append' }
  ];

  buttonData.forEach(function(button) {
    var calcButton = createButton(button.text, function() {
      if (button.action === 'append') {
        display.value += button.text;
      } else if (button.action === 'clear') {
        clearResult();
      } else if (button.action === 'evaluate') {
        evaluateResult();
      }
    });
    buttons.appendChild(calcButton);
  });

  calculator.appendChild(buttons);

  function createButton(text, clickHandler) {
    var button = document.createElement('button');
    button.textContent = text;
    button.style.padding = '8px';
    button.style.fontSize = '18px';
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.background = 'green';
    button.style.color = '#fff';
    button.style.borderRadius = '5px';
    button.addEventListener('click', clickHandler);
    return button;
  }

  function clearResult() {
    display.value = '';
  }

  function evaluateResult() {
    if (display.value === '7913') {
      calculator.style.display = 'none';
      iframe.style.display = 'block';
    } else {
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Error';
      }
    }
  }

  frame.appendChild(header);
  frame.appendChild(calculator);

  var resizeHandle = document.createElement('div');
  resizeHandle.style.position = 'absolute';
  resizeHandle.style.width = '10px';
  resizeHandle.style.height = '10px';
  resizeHandle.style.bottom = '0';
  resizeHandle.style.right = '0';
  resizeHandle.style.cursor = 'se-resize';
  resizeHandle.style.borderBottom = '2px solid #ddd';
  resizeHandle.style.borderRight = '2px solid #ddd';

  resizeHandle.addEventListener('mousedown', function(event) {
    event.preventDefault();
    isResizing = true;
    resizeStartX = event.clientX;
    resizeStartY = event.clientY;
    startWidth = parseInt(getComputedStyle(frame).width, 10);
    startHeight = parseInt(getComputedStyle(frame).height, 10);
  });

  document.addEventListener('mousemove', function(event) {
    if (isResizing) {
      var newWidth = startWidth + event.clientX - resizeStartX;
      var newHeight = startHeight + event.clientY - resizeStartY;
      frame.style.width = newWidth + 'px';
      frame.style.height = newHeight + 'px';
    } else if (isDragging) {
      var offsetX = event.clientX - dragStartX;
      var offsetY = event.clientY - dragStartY;
      frame.style.top = frame.offsetTop + offsetY + 'px';
      frame.style.left = frame.offsetLeft + offsetX + 'px';
      dragStartX = event.clientX;
      dragStartY = event.clientY;
    }
  });

  document.addEventListener('mouseup', function() {
    isResizing = false;
    isDragging = false;
  });

  header.addEventListener('mousedown', function(event) {
    event.preventDefault();
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  });

  frame.appendChild(resizeHandle);

  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.noowai.com';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.display = 'none';

  frame.appendChild(iframe);
  document.body.appendChild(frame);

  display.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && display.value === '7913') {
      iframe.style.display = 'block';
      calculator.style.display = 'none';
    }
  });

  iframe.addEventListener('load', function() {
    iframe.contentWindow.document.body.style.overflow = 'hidden';
  });
})();
