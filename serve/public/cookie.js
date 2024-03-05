// 封装Cookie
    //   封装三个函数
    //   setCookie()  -- 创建 Cookie
    //   getCookie()  -- 获取 Cookie
    //   removeCookie() -- 删除 Cookie
    function setCookie(name,value,iDay){  //分别代表cookie名称、cookie值、存储时间
        //首先将cookie的格式拼出来
        //document.cookie="name=value;expires=date";
        //然后name就换为name,vlaue就换为value，至于date就要算出这个日期对象
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+"="+value+"; expires="+oDate;
    }
    
    //     //a=12; b=5; c=8; d=99
    // function getCookie(name){
    //         //1、先给cookie做一下字符串分割，
    //     var arr=document.cookie.split("; ");//分割后变为数组，a=12 b=5 c=8 d=99
    //         //2、循环数组
    //     for(var i=0;i<arr.length;i++){
    //         var arr2=arr[i].split("=");  //根据“=”再次分割
    //             //arr2[0]——》存储的名称 abcd
    //             //arr2[1]——》存储的值 12 5 8 99
    //         if(arr2[0]==name){  //代表找到我想要的东西了
    //             return arr2[1];
    //         }
    //     }
    //         //另一种可能，用户第一次来网站，还没有cookie，所以肯定什么也找不到。所以在循环一次后就直接return 一个字符串，告诉用户什么也没找到。
    //         return "";
    // }
    // function removeCookie(name){
    //     //name名称，再随便来个值1，后面的才是重点-1，时间过期了，所以就成为了负值
    //     setCookie(name,1,-1);
    //  }
    
    