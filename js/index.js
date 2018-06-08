/**
 * Created by Tancky on 2018/6/17 0017.
 */

// 原生JS封装轮播图
var log = console.log.bind(console);

function Carousel(el) {
  this.el = document.querySelector(el);
  this.imgWrap = this.el.querySelectorAll('div')[0];
  this.img = this.imgWrap.querySelectorAll('div');
  this.elW = parseInt(getComputedStyle(this.el).width);
  this.elH = parseInt(getComputedStyle(this.el).height);
  this.prev = this.el.querySelector('.prev');
  this.next = this.el.querySelector('.next');
  this.imgW = this.elW * this.img.length;
  this.timer = null;
  this.navButton = null;
  this.iNow = 0;
  this.init();
};

Carousel.prototype = {
  constructor: Carousel,

  init: function () {
    this.imgWrap.style.width = this.imgW + 'px';
    this.addIndicator();
    this.autoPlay();
    this.prevClick();
    this.nextClick();
    this.mouseHover();
  },
  addIndicator: function () {
    var self = this;
    // 创建导航圆点父级
    var indicator = document.createElement('div');
    indicator.setAttribute('class', 'inner-indicator');
    this.el.appendChild(indicator);
    // 循环添加导航圆点
    for (var j = 0; j < this.img.length; j++) {
      var pagination = document.createElement('i');
      indicator.appendChild(pagination);
    }
    self.navButton = indicator.querySelectorAll('i');
    self.navButton[0].className = 'active';
    for (var i = 0;i < this.navButton.length; i++) {
      self.navButton[i].index = i;
      self.navButton[i].onclick = function () {
        self.iNow = this.index;
        for(var z = 0;z < self.navButton.length; z++) {
          self.navButton[z].className = '';
        }
        self.navButton[self.iNow].className = 'active';
        self.imgWrap.style.left = -self.iNow * self.elW + 'px';
      }
    }
  },
  toLeft: function () {
    var self = this;
    self.iNow--;
    if (self.iNow == -1) {
      self.imgWrap.style.left = -(self.img.length - 1) * self.elW + 'px';
      self.iNow = self.img.length - 1;
    }
    self.imgWrap.style.left = -self.elW * self.iNow + 'px'
  },
  toRight: function () {
    var self = this;
    self.iNow++;
    if (self.iNow > self.img.length - 1) {
      self.imgWrap.style.left = '0px'
      self.iNow = 0;
    }
    self.imgWrap.style.left = -self.elW * self.iNow + 'px';
  },
  autoPlay: function () {
    var self = this;
    self.timer = setInterval(function () {
      self.toRight()
    }, 2000)
  },
  mouseHover: function () {
    var self = this;
    self.el.onmouseover = function () {
      clearInterval(self.timer);
    }
    self.el.onmouseout = function () {
      self.autoPlay();
    }
  },
  prevClick: function () {
    var self = this;
    self.prev.addEventListener('click', function () {
      self.toLeft();
    }, false)
  },
  nextClick: function () {
    var self = this;
    self.next.addEventListener('click', function () {
      self.toRight();
    }, false)
  }
};
