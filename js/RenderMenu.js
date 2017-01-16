  function RenderMenu(el,opts) {
      this.opts = $.extend({}, RenderMenu.DEFAULTS, opts);
      var ths = this;
      ths.Render(el, this.opts.dataName);
      ths.setArw();
      ths.setNav();
  }

  RenderMenu.DEFAULTS = {
      dataName: data
  };
  //添加箭头
  RenderMenu.prototype.setArw = function() {
          $('.f-down li').each(function() {
              var $ths = $(this),
                  num = $ths.find('.s-down').length;
              if (num) {
                  $ths.children('a').append("<i class='m-icon raw-icon'>");
              }
          });
      }
      //修改导航字体
  RenderMenu.prototype.setNav = function() {
          $('.pub-down a').click(function() {
              var $ths = $(this),
                  txt;
              txt = $ths.text();
              $ths.parents('.m-item').find('a').find('span').text(txt);
          });
      }
      //读取json数据
  RenderMenu.prototype.Render = function(className, data) {
      var mhtml, lhtml,
          $ul = $(className);

      function setMenu(mName, mClass) {
          if (mClass !== "arw-icon") {
              mhtml = " <li class='m-item'><a href='javascript:void(0);'><i class='m-icon " + mClass + "'></i><span>" + mName + "</span></a></li>";
          } else {
              mhtml = " <li class='m-item'><a href='javascript:void(0);'><span>" + mName + "</span><i class='m-icon " + mClass + "'></i></a></li>";
          }
      }

      $.each(data, function(i, e) {
          setMenu(e.menuName, e.className);
          //设置一级导航
          $ul.append(mhtml);
          var val = data[i].menuName,
              index = i,
              $pul = $('<ul class="down pub-down"></ul>');
          //设置二级导航
          if (e.nextMenu) {
              $('.m-item').eq(i).append($pul);
              $.each(data[i].nextMenu, function(i, e) {
                  lhtml = "<li><a href='javascript:void(0);'>" + e.menuName + "</a></li>";
                  $('.m-item').eq(index).children('.pub-down').append(lhtml);
                  //设置三级导航
                  if (e.nextMenu) {
                      var $box = $("<div class='s-down pub-down fixed'></div>");
                      $('.m-item').eq(index).children('.pub-down').removeClass('down').addClass('f-down');
                      $.each(e.nextMenu, function(i, el) {
                          var el_a = "<a href='javascript:void(0);'>" + el.menuName + "</a>";
                          $box.append(el_a);
                      });
                      $('.f-down li').eq(i).append($box);
                  }
              });
          }
      })
  }
  $.fn.extend({
      RenderMenu: function(opts) {
          return this.each(function() {
              new RenderMenu(this,opts);
          });
      }
  });
