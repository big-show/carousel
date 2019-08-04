    let container = document.querySelector("#container");
    let imgList = document.querySelector("#imglist");
    let img = document.querySelectorAll('.img');
    let leftButton = document.querySelector('.left');
    let rightButton = document.querySelector('.right');
    let dotList = document.querySelectorAll('.dot');
    let dotLength = dotList.length;
    let oneImgWidth = img[0].offsetWidth;
    let imgNum = img.length;
    let oldLeft = 0;
    let intervalId = null;
    let newLeft;
    let dotIndex = 0;
    function showDot(dotIndex) {
        dotList[dotIndex].className+=' dot-index';
        dotList.forEach(function (value, index) {
            if(index!==dotIndex)
                dotList[index].className='dot';
        })
    }
    function move() {
        newLeft = oldLeft - oneImgWidth;
        imgList.style.left = newLeft+'px';
        oldLeft = newLeft;
        dotIndex++;
        if(dotIndex>=dotLength)
            dotIndex = 0;
        showDot(dotIndex);
    }
    function autoRoll() {
        intervalId = setInterval(function () {
            move();
            if(oldLeft<=-(imgNum*oneImgWidth))
            {
                imgList.style.left=0;
                oldLeft = 0;
            }
        },1200);
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
        newLeft = oldLeft + oneImgWidth;
        if(newLeft>0)
        {
            oldLeft = -(imgNum-1)*oneImgWidth;
            imgList.style.left=oldLeft+'px';
            dotIndex = dotLength-1;
            showDot(dotIndex);
        }
        else
        {
            imgList.style.left=newLeft+'px';
            oldLeft = newLeft;
            dotIndex--;
            showDot(dotIndex);
        }
    }
    function clickRight()
    {
        newLeft = oldLeft - oneImgWidth;
        if(newLeft<-(imgNum-1)*oneImgWidth)
        {
            oldLeft = 0;
            imgList.style.left=oldLeft+'px';
            dotIndex = 0;
            showDot(dotIndex);
        }
        else
        {
            imgList.style.left=newLeft+'px';
            oldLeft = newLeft;
            dotIndex++;
            showDot(dotIndex);
        }
    }
    leftButton.addEventListener('click',clickLeft);
    rightButton.addEventListener('click',clickRight);
    function dotsClick() {
        for(let i = 0;i<dotLength;i++)
        {

                setTimeout(function () {
                    console.log(i);
                }, 200);
                dotList[i].addEventListener('click', function () {
                    dotIndex = i;
                    showDot(dotIndex);
                    oldLeft = -(dotIndex * oneImgWidth);
                    imgList.style.left = oldLeft + 'px';
                    console.log(i);
                })
        }
    }
    dotsClick();