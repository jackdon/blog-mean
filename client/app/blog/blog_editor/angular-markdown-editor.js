angular
  .module('angular-markdown-editor', ['ngMaterial'])
  .directive('markdownEditor', ['$rootScope', function ($rootScope) {

    return {
        restrict: 'A',
        require:  ['ngModel', 'uploadImage'],
        scope: false,
        link: {
          pre: function preLink(scope, element, attrs, injectors) {
            var options = scope.$eval(attrs.markdownEditor);
            var ngModel = injectors[0];
            var dialogCtrl = injectors[1];
            // Only initialize the $.markdown plugin once.
            if (! element.hasClass('processed')) {
              element.addClass('processed');

              // Setup the markdown WYSIWYG.
              element.markdown({
                autofocus: options.autofocus || false,
                saveable: options.saveable || false,
                iconlibrary: options.iconlibrary || 'glyph',
                hideable: options.hideable || false,
                width: options.width || 'inherit',
                height: options.height || 'inherit',
                resize: options.resize || 'none',
                language: options.language || 'en',
                footer: options.footer || '',
                fullscreen: options.fullscreen || { enable: true, icons: {}},
                hiddenButtons: options.hiddenButtons || null,
                disabledButtons: options.disabledButtons || null,
                initialstate: options.initialstate || 'editor',
                parser: options.parser || null,
                dropZoneOptions: options.dropZoneOptions || null,
                enableDropDataUri: options.enableDropDataUri || false,
                showButtons: options.showButtons || null,
                additionalButtons: options.additionalButtons || (options.addExtraButtons ? addNewButtons(scope) : []),

                //-- Events/Hooks --
                // each of them are defined as callback available in the directive
                // example: <textarea markdown-editor="{'iconlibrary': 'fa'}" on-fullscreen-exit="vm.exitFullScreenCallback()"></textarea>
                //  NOTE: If you want this one to work, you will have to manually download the JS file, not sure why but they haven't released any versions in a while
                //       https://github.com/toopay/bootstrap-markdown/tree/master/js
                onPreview: function (e) { runScopeFunction(scope, attrs.onPreview, e); },
                onPreviewEnd: function (e) { runScopeFunction(scope, attrs.onPreviewEnd, e); },
                onSave: function (e) { runScopeFunction(scope, attrs.onSave, e); },
                onBlur: function (e) { runScopeFunction(scope, attrs.onBlur, e); },
                onFocus: function (e) { runScopeFunction(scope, attrs.onFocus, e); },
                onFullscreen: function (e) { runScopeFunction(scope, attrs.onFullscreen, e); },
                onSelect: function (e) { runScopeFunction(scope, attrs.onSelect, e); },
                onFullscreenExit: function (e) { runScopeFunction(scope, attrs.onFullscreenExit, e); },
                onChange: function(e) {
                  // When a change occurs, we need to update scope in case the user clicked one of the plugin buttons
                  // (which isn't the same as a keydown event that angular would listen for).
                  ngModel.$setViewValue(e.getContent());

                  runScopeFunction(scope, attrs.onChange, e);
                },
                onShow: function (e) {
                  // keep the Markdown Object in $rootScope so that it's available also from anywhere (like in the parent controller)
                  // we will keep this in an object under the ngModel name so that it also works having multiple editor in same controller
                  $rootScope.markdownEditorObjects = $rootScope.markdownEditorObjects || {};
                  $rootScope.markdownEditorObjects[ngModel.$name] = e;

                  if (!!attrs.onShow) {
                    runScopeFunction(scope, attrs.onShow, e);
                  }
                }
              });
            }
          },

          post: function postLink(scope, iElement, iAttrs, controller) {
            this.scope = scope;
          }
        }
    };
}]);

/**
 * Add new extra buttons: Strikethrough & Table
 * @return mixed additionButtons
 */
function addNewButtons(scope) {
  return [[{
        name: "groupFont",
        data: [{
          name: "cmdStrikethrough",
          toggle: false,
          title: "Strikethrough",
          icon: {
            fa: "fa fa-strikethrough",
            glyph: "glyphicon glyphicon-minus"
          },
          callback: function(e) {
            // Give/remove ~~ surround the selection
            var chunk, cursor, selected = e.getSelection(),
              content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('strikethrough');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start - 2, 2) === '~~' &&
              content.substr(selected.end, 2) === '~~') {
              e.setSelection(selected.start - 2, selected.end + 2);
              e.replaceSelection(chunk);
              cursor = selected.start - 2;
            } else {
              e.replaceSelection('~~' + chunk + '~~');
              cursor = selected.start + 2;
            }

            // Set the cursor
            e.setSelection(cursor, cursor + chunk.length);
          }
        }]
  },
  {
        name: "groupMisc",
        data: [{
          name: "cmdTable",
          toggle: false,
          title: "Table",
          icon: {
            fa: "fa fa-table",
            glyph: "glyphicon glyphicon-th"
          },
          callback: function(e) {
            // Replace selection with some drinks
            var chunk, cursor,
                selected = e.getSelection(), content = e.getContent(),
                chunk = "\n| Tables        | Are           | Cool  | \n"
                + "| ------------- |:-------------:| -----:| \n"
                + "| col 3 is      | right-aligned | $1600 | \n"
                + "| col 2 is      | centered      |   $12 | \n"
                + "| zebra stripes | are neat      |    $1 |"

            // transform selection and set the cursor into chunked text
            e.replaceSelection(chunk);
            cursor = selected.start;

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
  }, {
        name: "groupLink",
        data: [
          {
            name: "cmdImageUpload",
            toggle: false,
            title: "UploadImage",
            icon: {
              fa: "fa fa-upload",
              glyph: "glyphicon glyphicon-upload"
            },
            callback: function (e) {
              scope.$imageCallbackArg = e;
              // scope.$eval('editor.uploadImageCall($imageCallbackArg)');
              (scope.dialogCtrl || scope.$parent.dialogCtrl).showDialog(null, imageUploadCallback(e));
            }
          }
        ]
    }]];
}

/**
 * 上传图片回调
 * @param e
 * @returns {Function}
 */
function imageUploadCallback(e) {
  return function (fileItem, response, status, headers) {
    console.log('image upload callback', fileItem, response, status, headers);
    if (status == 200 && response && response.status === '1') {
      // Give ![] surround the selection and prepend the image link
      var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

      if (selected.length === 0) {
        // Give extra word
        chunk = e.__localize('enter image description here');
      } else {
        chunk = selected.text;
      }

      link = response.data[0].url || 'http://localhost:9000/imgs/' + response.data[0].filename;

      var urlRegex = new RegExp('^((http|https)://|(//))[a-z0-9]', 'i');
      if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
        var sanitizedLink = $('<div>'+link+'</div>').text();

        // transform selection and set the cursor into chunked text
        e.replaceSelection('!['+chunk+']('+sanitizedLink+' "'+e.__localize('enter image title here')+'")');
        cursor = selected.start+2;

        // Set the next tab
        e.setNextTab(e.__localize('enter image title here'));

        // Set the cursor
        e.setSelection(cursor,cursor+chunk.length);
      }
    }
  }
}

/** Evaluate a function name passed as string and run it from the scope.
  * The function name could be passed with/without brackets "()", in any case we will run the function
  * @param object self object
  * @param string function passed as a string
  * @param object Markdown Editor object
  * @result mixed result
  */
function runScopeFunction(scope, fnString, editorObject) {
  var result;
  if (!fnString) {
    return;
  }

  // Find if our function has the brackets "()"
  if (/\({1}.*\){1}/gi.test(fnString)) {
    // if yes then run it through $eval else find it in the scope and then run it. That is the only way to evaluate all arguments of the function
    // we'll have to make the object available in the scope so that we can evaluate it inside the controller
    var lastParenthese = fnString.indexOf(")");
    scope.$markdownEditorObject = editorObject;
    fnString = fnString.replace(")", "$markdownEditorObject)");
    result = scope.$eval(fnString);
  } else {
    var fct = objectFindById(scope, fnString, '.');
    if (typeof fct === "function") {
      result = fct(editorObject);
    }
  }
  return result;
}
