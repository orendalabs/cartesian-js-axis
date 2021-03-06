var axis = axis || {};
(function () {

  axis.localization = axis.localization || {};

  axis.localization.languages = [];

  axis.localization.currentLanguage = {};

  axis.localization.sources = [];

  axis.localization.values = {};

  axis.localization.localize = function (key, sourceName) {
    sourceName = sourceName || axis.localization.defaultSourceName;

    var source = axis.localization.values[sourceName];

    if (!source) {
      axis.log.warn("Could not find localization source: " + sourceName);
      return key;
    }

    var value = source[key];
    if (value == undefined) {
      return key;
    }

    var copiedArguments = Array.prototype.slice.call(arguments, 0);
    copiedArguments.splice(1, 1);
    copiedArguments[0] = value;

    return axis.utils.formatString.apply(this, copiedArguments);
  };

  axis.localization.getSource = function (sourceName) {
    return function (key) {
      var copiedArguments = Array.prototype.slice.call(arguments, 0);
      copiedArguments.splice(1, 0, sourceName);
      return axis.localization.localize.apply(this, copiedArguments);
    };
  };

  axis.localization.isCurrentCulture = function (name) {
    return (
      axis.localization.currentCulture &&
      axis.localization.currentCulture.name &&
      axis.localization.currentCulture.name.indexOf(name) == 0
    );
  };

  axis.localization.defaultSourceName = undefined;
  axis.localization.axisWeb = axis.localization.getSource("AxisWeb");
})();
