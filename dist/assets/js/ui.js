LBDMSUI = (function () {
  'use strict';

  var LBDMSUI = {
    /**
     * 공통 UI
     */
    common: {
      init: function () {
        LBDMSUI.common.select();
      },
      select: function () {
        $('select').selectBox();
      },
    }
  };

  return LBDMSUI;
}());

$(function () {
  LBDMSUI.common.init();
});