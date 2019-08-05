    let container = document.querySelector("#container");
    let imgList = document.querySelector("#imglist");
    let img = document.querySelectorAll('.img');
    let leftButton = document.querySelector('.left');
    let rightButton = document.querySelector('.right');
    let dotList = document.querySelectorAll('.dot');
    let timer = 800;//滑动一次图片所用时间;
    let times = 50;//滑动一次图片经历次数
    let timesInterval = timer/times;//滑动一次图片的中的interval间隔。
    let dotLength = dotList.length;
    let oneImgWidth = img[0].offsetWidth;
    let imgNum = img.length;
    let oldLeft = 0;
    let intervalId = null;
    let newLeft;
    let dotIndex = 0;
    let init =true;
    //显示选择点dot高亮函数
    function showDot(dotIndex) {
        dotList[dotIndex].className+=' dot-index';
        dotList.forEach(function (value, index) {
            if(index!==dotIndex)
                dotList[index].className='dot';
        })
    }
    //图片每次移动动画函数
    function moveImgInterval(oldLeft,newLeft) {
        let t = 1;
        let imgMoveStepLength = (newLeft-oldLeft)/times;
        let imgIntervalId = 0;
        imgIntervalId = setInterval(function () {
            imgList.style.left=oldLeft+imgMoveStepLength*t+'px';
            t++;
            if (t>times)
            {
                clearInterval(imgIntervalId);
            }
        },timesInterval);
    }
    //单个图片整体自动移动函数
    function move() {
        newLeft = oldLeft - oneImgWidth;
        moveImgInterval(oldLeft,newLeft);
        oldLeft = newLeft;
        dotIndex++;
        if(dotIndex>=dotLength)
            dotIndex = 0;
        showDot(dotIndex);
    }
    //整个图片列表自动滚动函数
    function autoRoll() {
        if(init === true)
        {
            showDot(dotIndex);
            imgList.style.left=-800+'px';
            oldLeft = -800;
            init = false;
        }
        intervalId = setInterval(function () {
            if(oldLeft<=-(imgNum-1)*oneImgWidth)
            {
                oldLeft = -800;
            }
            move();
        },2000);
    }
    container.addEventListener('mouseover',function () {
       clearInterval(intervalId);
    });
    container.addEventListener('mouseout',function () {
        autoRoll();
    });
    autoRoll();
    function clickLeft()
    {
        if(oldLeft>=-800)
        {
            moveImgInterval(oldLeft,oldLeft+oneImgWidth);
            imgList.style.left=-(imgNum-2)*oneImgWidth;
            oldLeft=-(imgNum-2)*oneImgWidth;
            dotIndex = dotLength-1;
            showDot(dotIndex);
        }
        else
        {
            moveImgInterval(oldLeft,oldLeft+oneImgWidth);
            oldLeft = oldLeft+oneImgWidth;
            dotIndex--;
            showDot(dotIndex);
        }
    }
    function clickRight()
    {
        if(oldLeft<=-(imgNum-2)*oneImgWidth)
        {
            moveImgInterval(oldLeft,oldLeft-oneImgWidth);
            imgList.style.left=-800+'px';
            oldLeft = -800;
            dotIndex = 0;
            showDot(dotIndex);
        }
        else
        {
            moveImgInterval(oldLeft,oldLeft-oneImgWidth);
            oldLeft = oldLeft-oneImgWidth;
            dotIndex++;
            showDot(dotIndex);
        }
    }
    leftButton.addEventListener('click',clickLeft);
    rightButton.addEventListener('click',clickRight);
    //点击选择dots移动到对应图片
    function dotsClick() {
        for(let i = 0;i<dotLength;i++)
        {


                dotList[i].addEventListener('click', function () {
                    dotIndex = i;
                    showDot(dotIndex);
                    let desLeft = -(dotIndex+1) * oneImgWidth;
                    moveImgInterval(desLeft+800,desLeft);
                })
        }
    }
    dotsClick();