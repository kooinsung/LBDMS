LBDMSUI = (function () {
  'use strict';

  var LBDMSUI = {
    /**
     * 공통 UI
     */
    common: {
      init: function () {
        LBDMSUI.common.datepicker();
      },
      datepicker: function () {
        $( ".datepicker > input" ).datepicker({
          showOn: "button",
          buttonImage: "../assets/images/ico_cal.svg",
          buttonImageOnly: true,
        });
      },
    }
  };

  return LBDMSUI;
}());

$(function () {
  LBDMSUI.common.init();
});