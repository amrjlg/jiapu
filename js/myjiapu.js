getDataFromServer("/api/pedigree/myPedigreeUserInfo",null,function (res) {
    if (res.code == "SUCCESS") {
        let user = res.result;
        $("img").attr("src", imgBase+ user.headImg);
        if (user) {
            localStorage.setItem(user.userId+"jiapuInfo",JSON.stringify(user));
            $("#submit").click(function () {
                window.location.href = "chuangjianjiapu.html"
            })
        }
    }else{
        window.location.href="login.html"
    }
},function (error) {
    alert(error);
});

getDataFromServer("/api/pedigree/myPedigreeInfo",null,function (res) {
    if (res.code == "SUCCESS"){
        let jiapu = res.result;
        if (jiapu) {
            $("#submit").val("编辑家谱");
            $("#submit").click(function () {
                localStorage.getItem("userInfo")
                window.location.href = "editship.html?pedigreeId="+jiapu.pedigreeId;
            })
        }
    }
},function (error) {
    alert(error);
});
function jiapuInfo(id){
    window.location.href = "editship.html?pedigreeId="+id;
}
getDataFromServer("/api/pedigree/myJoinlist",{currentPage:1,limit:2},function (res) {
    if (res.code == "SUCCESS") {
        let  list = res.result.content;
        if (list && list.length > 0) {
            var record ="";
            for (let item of list) {
              record +='<li class="mui-table-view-cell mui-media" onclick="jiapuInfo('+item.pedigreeId+')">' +
                    '<div class="jiapu mui-h3">' +
                    '<span class="jiapu-xing">'+item.surname +'</span>' +
                    '</div>' +
                    '<div class="jiapu mui-h4">' +
                    '<span class="jiapu-addr">'+item.city+item.county +'</span>' +
                    '</div>' +
                    '<div class="jiapu mui-h4">' +
                    '<span>'+item.nickname +'</span>创' +
                    '<span class="shu">|</span>' +
                    '<span>'+item.personNumber +'</span>人</div>' +
                    '</li>';

            }
            if (res.totalElements > 2 ){
                record += '<li class="mui-table-view-cell mui-media">' +
                    '<a id="icon-more" style="text-align: center;">' +
                    '<span class="mui-icon mui-icon-more-filled"></span>' +
                    '</a>' +
                    '</li>'
            }
            $("ul").append(record)
        }else {
            $("ul").append('<li class="mui-table-view-cell mui-media"><div class="mui-h3 jiapu">你还没有加入家谱</div></li>')
        }
    }
},function (error) {
    alert(error);
});