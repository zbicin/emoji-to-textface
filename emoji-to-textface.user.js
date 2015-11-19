// ==UserScript==
// @name          Emoji to textface
// @namespace     http://zbic.in
// @description   Changes emoji-like keywords into textfaces (e.g. ":lenny:" into "( ͡° ͜ʖ ͡°)") after hitting Ctrl+Space.
// @author        Zbicin (http://github.com/zbicin)
// @include       *
// @downloadURL   https://github.com/zbicin/emoji-to-textface/emoji-to-textface.user.js
// @version       0.0.1
// @noframes
// ==/UserScript==

var injectedScript = function () {
  var faces = [
    {
      keywords: [
        ':lenny:',
        ':lennyface:'
      ],
      textface: '( ͡° ͜ʖ ͡°)'
    },
    {
      keywords: [
        ':lookofdisapproval:',
        ':lod:'
      ],
      textface: 'ಠ_ಠ'
    },
    {
      keywords: [
        ':shrug:',
        ':whocares:'
      ],
      textface: '¯\_(ツ)_/¯'
    },
    {
      keywords: [
        ':doit:',
      ],
      textface: '(☞ﾟヮﾟ)☞'
    }
  ];

  function keyupListener(event) {
    var isCtrlSpace = event.keyCode === 32 && event.ctrlKey === true;
    
    if (isCtrlSpace) {
      var activeElement = document.activeElement;
      var activeElementIsEditable = activeElement.localName === 'input' || activeElement.localName === 'textarea';
      
      if (activeElementIsEditable) {
        activeElement.value = replaceKeywordsWithFaces(activeElement.value);    
        event.preventDefault();
      }
    }
  };

  function replaceKeywordsWithFaces(input) {
    var result = input;
    faces.forEach(function (singleFace) {
      singleFace.keywords.forEach(function (singleKeyword) {
         result = result.split(singleKeyword).join(singleFace.textface);
      });
    });
    return result;
  };

  document.body.addEventListener('keyup', keyupListener);
};

// Inject script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + injectedScript.toString() + ')();';
document.body.appendChild(script);