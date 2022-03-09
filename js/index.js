window.addEventListener('load', function() {
    var left_btn = this.document.querySelector('.left_btn');
    var right_btn = this.document.querySelector('.right_btn');
    var focus = this.document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var flag = true; //节流阀
    var num = 0; //定义滑动距离参数
    var index = 0; //定义下标
    //获取图片宽度
    var focusWidth = focus.offsetWidth;
    //自动播放
    var timer = setInterval(function() {
        //手动调用点击事件
        right_btn.click();
    }, 2000);
    //监听鼠标进入轮播图窗,鼠标放在图片上显示左右按钮
    focus.addEventListener('mouseenter', function() {
        left_btn.style.display = 'block';
        right_btn.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    });
    //监听鼠标离开轮播图窗
    focus.addEventListener('mouseleave', function() {
        left_btn.style.display = 'none';
        right_btn.style.display = 'none';
        timer = setInterval(function() {

            //手动调用点击事件
            right_btn.click();
        }, 2000)
    });
    //创建下标
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        ol.children[0].style.backgroundColor = '#fff';
        ol.children[0].style.height = 14 + 'px';
        //监听下标
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '#c0c4c6';
                ol.children[i].style.height = 8 + 'px';
            }
            this.style.backgroundColor = '#fff';
            this.style.height = 14 + 'px';
            index = this.getAttribute('index');
            num = index;
            animate(ul, -index * focusWidth);
        })
    }

    //克隆第一张图片（li）放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮实现图片滚动
    right_btn.addEventListener('click', function() {
            if (flag == true) {
                flag = false;
                //6 0--5
                if (num == ul.children.length - 1) {
                    //回到最初第一张 
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    //打开节流阀
                    flag = true;
                });
                //清除其余下标样式
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].style.backgroundColor = '#c0c4c6';
                    ol.children[i].style.height = 8 + 'px';
                }
                //下标回到初始 5
                if (num == ul.children.length - 1) {
                    ol.children[0].style.backgroundColor = '#fff';
                    ol.children[0].style.height = 14 + 'px';
                } else {
                    ol.children[num].style.backgroundColor = '#fff';
                    ol.children[num].style.height = 14 + 'px';
                }
            }
        })
        ////点击左侧按钮实现图片滚动
    left_btn.addEventListener('click', function() {
        if (flag == true) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            //清除其余下标样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '#c0c4c6';
                ol.children[i].style.height = 8 + 'px';
            }
            //下标回到初始
            if (num == ul.children.length - 1) {
                ol.children[0].style.backgroundColor = '#fff';
                ol.children[0].style.height = 14 + 'px';
            }
            ol.children[num].style.backgroundColor = '#fff';
            ol.children[num].style.height = 14 + 'px';
        }
    })
    var nav = this.document.getElementById('nav_ul');
    var nav_li_a = nav.getElementsByTagName('a');
    nav.addEventListener('click', function() {
        //清除链接下划线样式
        for (var i = 0; i < nav_li_a.length; i++) {
            nav_li_a[i].style.border = '0px';
        }
        //设置下划线
        for (var i = 0; i < nav_li_a.length; i++) {
            nav_li_a[i].onclick = function() {
                this.style['border-bottom'] = '2px solid #C0EAFA';
            }
        }
    }, true);
})