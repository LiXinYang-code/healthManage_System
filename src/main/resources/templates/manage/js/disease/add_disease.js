 function add(){
        var disease_name=$("#disease_name").val();

        var disease_des=$("#disease_des").val();

        var formData = new FormData();
        formData.append("diseaseName", disease_name);
        formData.append("description", disease_des);

        $.ajax({
                            type:"POST",
                            url:"disease/addDisease.do",
                            async:true,
                            xhrFields:{
                                withCredentials:true
                            },
                            processData: false,   // jQuery不要去处理发送的数据
                            contentType: false,   // jQuery不要去设置Content-Type请求头
                            mimeType:"multipart/form-data",
                            datatype:"json",
                            data:formData,
                            //contentType:"application/json;charset=utf-8",这个不能设置否则后台不能接受值
                            success:function (data) {

                                    data01=JSON.parse(data);

                                        alert(data01.msg);
                                    $('#modal-form').modal('hide');
                                    $.ajax({
                                        type:"POST",
                                        url:"disease/selectDisease.do",
                                        data:"",
                                        processData: false,   // jQuery不要去处理发送的数据
                                        contentType: false,   // jQuery不要去设置Content-Type请求头
                                        datatype:"json",
                                        success:function(data){
                                            $("#table_list_2").jqGrid('clearGridData');  //清空表格
                                            $("#table_list_2").jqGrid('setGridParam',{  // 重新加载数据
                                            datatype:'local',
                                            data : data,   //  newdata 是符合格式要求的需要重新加载的数据
                                            page:1
                                            }).trigger("reloadGrid");
                                         }
                                     });
                            }
                        });
   }