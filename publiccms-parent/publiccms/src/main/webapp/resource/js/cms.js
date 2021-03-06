function addTagType(id,name){
    if(name){
        name=name.trim();
    }
    if(id&&name){
        $('.tagsBox',navTab.getCurrentPanel()).append("<span>"+name+" <input type=\"hidden\" name=\"tagTypes[].id\" value=\""+id+"\"/><a href=\"javascript:;\"><i class=\"icon-remove-sign\"></i></a></span>");
    }else if(name){
        $('.tagsBox',navTab.getCurrentPanel()).append("<span>"+name+" <input type=\"hidden\" name=\"tagTypes[].name\" value=\""+name+"\"/><a href=\"javascript:;\"><i class=\"icon-remove-sign\"></i></a></span>");
    }
    reIndexTagType();
    $('input[name=\'type[].id\']',navTab.getCurrentPanel()).val('');
    $('input[name=\'type[].name\']',navTab.getCurrentPanel()).val('');
}
function clickAddTagType(){
    $('.tagTypes .icon-ok',navTab.getCurrentPanel()).parent().click();
}
function reIndexTagType(){
    $('.tagsBox span',navTab.getCurrentPanel()).each(function(tagIndex){
        $('input[name$=\\.id]',this).attr('name','tagTypes['+tagIndex+'].id');
        $('input[name$=\\.name]',this).attr('name','tagTypes['+tagIndex+'].name');
    });
}
function addTag(typeId,id,name){
    if(name){
        name=name.trim();
    }
    if(id&&name){
        $('.tags_'+typeId,navTab.getCurrentPanel()).append("<span>"+name+" <input type=\"hidden\" name=\"tags[].id\" value=\""+id+"\"/><a href=\"javascript:;\"><i class=\"icon-remove-sign\"></i></a></span>");
    }else if(name){
        $('.tags_'+typeId,navTab.getCurrentPanel()).append("<span>"+name+" <input type=\"hidden\" name=\"tags[].name\" value=\""+name+"\"/><input type=\"hidden\" name=\"tags[].typeId\" value=\""+typeId+"\"/><a href=\"javascript:;\"><i class=\"icon-remove-sign\"></i></a></span>");
    }
    reIndexTag();
    $('input[name=\'tag['+typeId+'].id\']',navTab.getCurrentPanel()).val('');
    $('input[name=\'tag['+typeId+'].typeId\']',navTab.getCurrentPanel()).val('');
    $('input[name=\'tag['+typeId+'].name\']',navTab.getCurrentPanel()).val('');
}
function clickAddTag(){
    $('.tags .icon-ok',navTab.getCurrentPanel()).parent().click();
}
function reIndexTag(){
    var tagIndex=0;
    $('.tags .tagsBox span',navTab.getCurrentPanel()).each(function(){
        $('input[name$=\\.id]',this).attr('name','tags['+tagIndex+'].id');
        $('input[name$=\\.name]',this).attr('name','tags['+tagIndex+'].name');
        $('input[name$=\\.typeId]',this).attr('name','tags['+tagIndex+'].typeId');
        tagIndex++;
    });
}
function checkCategoryModel(){
    $('.categoryModelContent',navTab.getCurrentPanel()).hide();
    $('.categoryModelContentPath',navTab.getCurrentPanel()).hide().find('input[name=contentPath]').removeClass("required");
    if($('input[name=showAdvancedOptions]',navTab.getCurrentPanel()).is(':checked')){
        $('.categoryModel',navTab.getCurrentPanel()).show();
        $('.categoryModelControl',navTab.getCurrentPanel()).show();
        $('.categoryModel dl',navTab.getCurrentPanel()).each(function(){
            if($(this).find('input[type=checkbox]').is(':checked')){
                $(this).find('dd ul li input[name$=\\.use]').val('true');
                $('.categoryModelContent',navTab.getCurrentPanel()).show();
                if(0 == $(this).find('dd').children().length || $(this).find('dd').is(":visible")){
                    $('.categoryModelContentPath',navTab.getCurrentPanel()).show().find('input[name=contentPath]').addClass("required");
                    return ;
                }
            }
        });
    }else{
        $('.categoryModel',navTab.getCurrentPanel()).hide();
        $('.categoryModelControl',navTab.getCurrentPanel()).hide();
        $('.categoryModel dl',navTab.getCurrentPanel()).each(function(){
            if($(this).find('input[type=checkbox]').is(':checked')){
                $(this).find('dd ul li input[name$=\\.use]').val('true');
            }
        });
    }
}
function checkPageSize(){
    if(parseInt($('input[name=size]',navTab.getCurrentPanel()).val())>0){
        $('.placeExtend',navTab.getCurrentPanel()).show();
        $('textarea[name=content]',navTab.getCurrentPanel()).val($('.content',navTab.getCurrentPanel()).val());
        $('.placeExtend input,.placeExtend textarea',navTab.getCurrentPanel()).removeAttr('disabled');
    } else {
        $('.placeExtend',navTab.getCurrentPanel()).hide();
        $('textarea[name=content]',navTab.getCurrentPanel()).val('place');
        $('.placeExtend input,.placeExtend textarea',navTab.getCurrentPanel()).attr('disabled','disabled');
    }
}
function addUser(id,name){
    if(name){
        name=name.trim();
    }
    if(id&&name){
        $('.adminIds',navTab.getCurrentPanel()).append("<span>"+name+" <input type=\"hidden\" name=\"adminIds\" value=\""+id+"\"/><a href=\"javascript:;\"><i class=\"icon-remove-sign\"></i></a></span>");
    }
    $('input[name=\'userId\']',navTab.getCurrentPanel()).val('');
    $('input[name=\'nickName\']',navTab.getCurrentPanel()).val('');
}
var apiCounter=0;
function getApi(base,apisArray,authorizedApis){
    for (var api in apisArray){
        apiRequest(base,api,apisArray,authorizedApis);
    }
}
function apiRequest(base,api,apisArray,authorizedApis){
    $.ajax({
        url:base+apisArray[api],
        dataType: 'json',
        success: function (dataList) {
            $(dataList).each(function(index,data){
                if('true'==data.needAppToken){
                    $('.authorizedApis a[data-id='+api+']',navTab.getCurrentPanel()).next().append('<li><a tname="apis" tvalue="'+data.name+'">'+data.name+'</a></li>');
                }
            });
            if(++apiCounter==apisArray.length){
                $(".authorizedApis", navTab.getCurrentPanel()).addClass('tree').jTree();
                for(authorizedApi in authorizedApis){
                    $("input[type=checkbox][value="+authorizedApis[authorizedApi]+"]", navTab.getCurrentPanel()).click();
                }
                apiCounter=0;
            }
        }
    });
}
function command(command,parametersName){
    $('input[name=sqlcommand]',navTab.getCurrentPanel()).val(command);
    $('.sqlcommandBox',navTab.getCurrentPanel()).empty();
    if(parametersName ) {
        var parameters = parametersName.split(",");
        for(i=0; i<parameters.length; i++ ){
            $('.sqlcommandBox',navTab.getCurrentPanel()).append('<label>'+parameters[i]+':</label><input name="sqlparameters" type="text" class="required"/>').initUI();
        }
    }
}