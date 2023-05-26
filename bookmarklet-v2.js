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
  frame.style.fontFamily = 'Arial, sans-serif';
  frame.style.userSelect = 'none';
  frame.style.resize = 'both';
  frame.style.overflow = 'auto';

  var header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.justifyContent = 'space-between';
  header.style.padding = '8px 12px';
  header.style.background = '#f1f1f1';
  header.style.cursor = 'move';

  var title = document.createElement('span');
  title.textContent = 'Noowai Calculator';
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

  var display = document.createElement('input');
  display.type = 'text';
  display.style.width = 'calc(100% - 24px)';
  display.style.marginBottom = '8px';
  display.style.padding = '4px';
  display.style.fontSize = '18px';
  display.style.border = '1px solid #ddd';
  display.style.textAlign = 'right';

  frame.appendChild(display);

  var calculator = document.createElement('div');
  calculator.style.padding = '12px';
  calculator.style.width = 'calc(100% - 24px)';
  calculator.style.height = 'calc(100% - 48px)';
  calculator.style.overflow = 'auto';

  var buttons = document.createElement('div');
  buttons.style.display = 'grid';
  buttons.style.gridTemplateColumns = 'repeat(3, 1fr)';
  buttons.style.gridGap = '8px';

  var clearButton = createButton('C', clearResult);
  var numberButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  var operatorButtons = ['+', '-', '*', '/'];
  var equalsButton = createButton('=', evaluateResult);

  buttons.appendChild(clearButton);

  var numberRow = document.createElement('div');
  numberRow.style.display = 'grid';
  numberRow.style.gridTemplateColumns = 'repeat(3, 1fr)';
  numberRow.style.gridGap = '8px';

  var operatorRow = document.createElement('div');
  operatorRow.style.display = 'grid';
  operatorRow.style.gridTemplateColumns = 'repeat(3, 1fr)';
  operatorRow.style.gridGap = '8px';

  numberButtons.forEach(function(number) {
    numberRow.appendChild(createButton(number, function() {
      display.value += number;
    }));
  });

  operatorButtons.forEach(function(operator) {
    operatorRow.appendChild(createButton(operator, function() {
      display.value += operator;
    }));
  });

  buttons.appendChild(numberRow);
  buttons.appendChild(operatorRow);
  buttons.appendChild(equalsButton);

  calculator.appendChild(buttons);

  function createButton(text, clickHandler) {
    var button = document.createElement('button');
    button.textContent = text;
    button.style.padding = '8px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
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

  frame.appendChild(calculator);

  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.noowai.com';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.display = 'none';

  frame.appendChild(iframe);

  document.body.appendChild(frame);


  display.addEventListener('keyup', function(event) {
    if (display.value === '7913') {
      iframe.style.display = 'block';
      calculator.style.display = 'none';
    }
  });
})();
