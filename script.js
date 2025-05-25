//js的作用主要是在 html中写好的标签的基础上进行实现交互
//因此在写js代码之前，应先获取到要操作的标签，也就是获取节点（最好用id）再进行 DOM操作
let ipt=document.querySelector('#title');
let ol=document.querySelector('#todolist');
let count=document.querySelector('#count');

//1.先写输入框的交互：用户在输入框输入，按下回车，记录下输入内容
let data=[];

//给输入框定义一个键盘事件，按下e(某个键)，触发函数
ipt.onkeydown=function(e)
{
    //用户按下Enter键
    if(e.key=="Enter")
    {
        //记录输入内容
        let input_value=ipt.value  ;
        
        // 清除value的左右空白，防止用户在文本前输入空格后将空格也作为文本内容
        input_value=input_value.trim();

        //如果输入不为空
        if(input_value.length!=0)
        {
            //将输入内容存入数组
            data.push(input_value);
            
            //清空输入框
            ipt.value="";

            //容易忽略的一点：每次输入新的数据要把之前的ol内容删去，防止重复出现（运行之后就知道了）
            ol.innerHTML="";
            
            //渲染：调用函数将data里面保存的输入内容给带li，再把li添加到ol中，从而显示到页面上
            render();
            
            getCount();

        }
        else
        {
            alert("输入不能为空！");   //alert弹框：若输入为空，则弹框提示
        }
    }
}

//渲染函数：使用户输入的内容呈现出来（输入内容-->data数组-->li-->ol）
function render()
{
    //循环遍历data数组，将输入数据取出并给到li中，进一步添加到ol中
    for(let i=0;i<data.length;i++)
    {
        //每次循环都创建一个li标签
        let li=document.createElement("li");

        //添加li内容：1.data数组中的内容 2.删除按钮
        li.innerHTML=`
        <p>${data[i]}</p>
        <a href="javascript:;" onclick="del(this)"></a>
        `;
        //href="javascript:;"-->防止点击a标签跳转新页面
        //点击事件：点击调用delete函数，实现删除功能

        //将li标签添加到ol中(相当于在html中嵌套)
        ol.append(li);
    }
}

//删除某一件事项
//根据前面 <a href="javascript:;" onclick="del(this)"></a>-->这里t代表a标签
function del(t)
{
    //a标签父元素li的所有子元素文本，也就是p标签中的内容，也就是data中的数据，也就是用户输入的内容
    let text=t.parentNode.innerText;

    //找到要删除元素的下标
    let index=data.indexOf(text);

    //根据下标删除源数据
    data.splice(index,1);
    // 参数一根据哪个索引位置删除，参数二是删除个数

    //页面效果删除（删的是li标签）
    ol.removeChild(t.parentNode);

    //更新计数
    getCount();
}

function getCount()
{
    //表示ol子元素li标签的个数
    count.innerHTML=ol.children.length;
}