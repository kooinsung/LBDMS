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

        $.datepicker.regional['ko'] = {
          closeText: '닫기',
          prevText: '이전달',
          nextText: '다음달',
          currentText: '오늘',
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          dayNames: ['일', '월', '화', '수', '목', '금', '토'],
          dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
          dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
          weekHeader: 'Wk',
          dateFormat: 'yy-mm-dd',
          firstDay: 0,
          showMonthAfterYear: true,
          yearSuffix: '년'
        };
        $.datepicker.setDefaults($.datepicker.regional['ko']);

        $( ".datepicker > input" ).datepicker({
          showOn: "button",
          buttonImage: "../assets/images/ico_cal.svg",
          buttonImageOnly: true,
        });
        $(".datepicker input").click(function () {
          $(this).parent().find('input').datepicker("show");
        });


        var currentYear = (new Date()).getFullYear();
        var startYear = currentYear - 10;
        $(".datepicker-month > input").monthpicker({
          startYear: startYear,
          finalYear: currentYear,
          pattern: 'yyyy-mm',
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
        });
        $(".datepicker-month > button").click(function () {
          $(this).parent().find('input').monthpicker("show");
        })
      },
    }
  };

  return LBDMSUI;
}());

$(function () {
  LBDMSUI.common.init();
});