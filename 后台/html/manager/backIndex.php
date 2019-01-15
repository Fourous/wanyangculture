<!DOCTYPE html>
<?php session_start();?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>万洋后台平台</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/back.css">
    <script type="application/javascript" src="js/jquery-1.11.1.js"></script>
    <script type="application/javascript" src="js/bootstrap.min.js"></script>
</head>
<body>
    <header>
        <div class="header">
            <img src="img/logo_01.png" alt="">
            <a href="index.html" class="btn">退出登录</a>
        </div>
    </header>
    <div class="index_main">
        <div class="tabbable">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">RFID书籍录入</a></li>
                <li><a href="#tab2" data-toggle="tab">书籍审核</a></li>
                <li><a href="#tab3" data-toggle="tab">咨询更新</a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab1">
                    <form action="#" method="post" class="form-horizontal">
                        <h1 class="col-lg-offset-5">RFID书籍录入</h1>
                        <!--<div class="form-group">-->
                            <!--<label for="ISBN" class="col-lg-3 text-right">ISBN：</label>-->
                            <!--<div class="col-lg-5">-->
                                <!--<input type="text" class="form-control" id="ISBN" placeholder="书籍背面的ISBN号码">-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-group">-->
                            <!--<label for="biaoqian" class="col-lg-3 text-right">标签号码：</label>-->
                            <!--<div class="col-lg-5">-->
                                <!--<input type="text" class="form-control" id="biaoqian" placeholder="RFID识别标签号码">-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-group">-->
                            <!--<label for="xiangzi" class="col-lg-3 text-right">箱子号码：</label>-->
                            <!--<div class="col-lg-5">-->
                                <!--<input type="text" id="xiangzi" class="form-control" placeholder="箱子号码">-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-group">-->
                            <!--<label for="guimen" class="col-lg-3 text-right">柜门号码：</label>-->
                            <!--<div class="col-lg-5">-->
                                <!--<input type="text" id="guimen" class="form-control" placeholder="箱子柜门号码">-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-group">-->
                            <!--<a href="#" class="btn col-lg-4 col-lg-offset-3">确认</a>-->
                        <!--</div>-->
                        <table id="j_tb" class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <td>书名</td>
                                    <td>ISBN</td>
                                    <td>作者</td>
                                    <td>柜号</td>
                                    <td>门号</td>
                                    <td>RFID号</td>
                                    <td>书籍简介</td>
                                    <td>图片名称</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>你好</td>
                                    <td>你好</td>
                                    <td>你好</td>
                                    <td>你好</td>
                                    <td>你好</td>
                                    <td>你好</td>
                                    <td>你好</td>
                                    <td>你好</td>
                                    <td class="text-center"><a onclick="dodel(this)">删除</a></td>
                                    <td class="text-center"><a data-toggle="modal" data-backdrop="false" data-keyboard="false" data-target="#modal">详情</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <button class="col-lg-1 col-lg-offset-5 btn" data-toggle="modal" data-backdrop="false" data-keyboard="false" data-target="#modal">新增书籍</button>
                </div>
                <div class="tab-pane" id="tab2">
                    <form action="#" method="post" class="form-horizontal">
                        <h1 class="col-lg-offset-5">书籍审核</h1>
                        <div class="shenhe row">
                            <div class="col-lg-3 shenhe_pic">
                                <!--这里放图片，只要加简单的imges就行，样式已经设置好了-->
                                <img src="./img/rightbook1.jpg" alt="">
                            </div>
                            <div class="col-lg-3 shenhe_pic">
                                <!--这里放图片，只要加简单的imges就行，样式已经设置好了-->
                                <img src="./img/rightbook1.jpg" alt="">
                            </div>
                            <div class="col-lg-3 shenhe_pic">
                                <!--这里放图片，只要加简单的imges就行，样式已经设置好了-->
                                <img src="./img/rightbook1.jpg" alt="">
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                <label for="yonghu" class="col-lg-4 text-right m">用户：</label>
                                <div class="col-lg-8">
                                <input type="text" id="yonghu" class="form-control" disabled value="当前日期">
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="shenheren" class="col-lg-4 text-right m">审核号：</label>
                                <div class="col-lg-8">
                                <input type="text" id="shenheren" class="form-control" disabled value="当前员工号">
                                </div>
                                </div>
                                <div class="form-group">
                                <a href="#" class="btn col-lg-12">确认</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="tab-pane" id="tab3">
                    <form action="#" method="post" class="form-horizontal">
                        <h1 class="col-lg-offset-5">咨询更新</h1>
                        <div class="zixun">
                            <div class="form-group">
                                <label for="tupian1" class="col-lg-3 text-right">新闻图片：</label>
                                <div class="col-lg-5">
                                    <input id="tupian1" class="file" type="file" placeholder="新闻图片">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jianjie1" class="col-lg-3 text-right">新闻简介：</label>
                                <div class="col-lg-5">
                                    <textarea id="jianjie1" cols="60" rows="5" placeholder="新闻简介，字数限制300"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="lianjie1" class="col-lg-3 text-right">新闻链接：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="lianjie1" class="form-control" placeholder="新闻链接" row="3">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="date1" class="col-lg-3 text-right">新闻发布日期：</label>
                                <div class="col-lg-3">
                                    <input type="date" id="date1" class="form-control" value="2000-01-01">
                                </div>
                            </div>
                            <div class="form-group">
                                <a href="#" class="btn col-lg-4 col-lg-offset-3">确认</a>
                            </div>
                        </div>
                        <div class="zixun">
                            <div class="form-group">
                                <label for="tupian2" class="col-lg-3 text-right">新闻图片：</label>
                                <div class="col-lg-5">
                                    <input id="tupian2" class="file" type="file" placeholder="新闻图片">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jianjie2" class="col-lg-3 text-right">新闻简介：</label>
                                <div class="col-lg-5">
                                    <textarea id="jianjie2" cols="60" rows="5" placeholder="新闻简介，字数限制300"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="lianjie2" class="col-lg-3 text-right">新闻链接：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="lianjie2" class="form-control" placeholder="新闻链接" row="3">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="date2" class="col-lg-3 text-right">新闻发布日期：</label>
                                <div class="col-lg-3">
                                    <input type="date" id="date2" class="form-control" value="2000-01-01">
                                </div>
                            </div>
                            <div class="form-group">
                                <a href="#" class="btn col-lg-4 col-lg-offset-3">确认</a>
                            </div>
                        </div>
                        <div class="zixun">
                            <div class="form-group">
                                <label for="tupian3" class="col-lg-3 text-right">新闻图片：</label>
                                <div class="col-lg-5">
                                    <input id="tupian3" class="file" type="file" placeholder="新闻图片">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jianjie3" class="col-lg-3 text-right">新闻简介：</label>
                                <div class="col-lg-5">
                                    <textarea id="jianjie3" cols="60" rows="5" placeholder="新闻简介，字数限制300"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="lianjie3" class="col-lg-3 text-right">新闻链接：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="lianjie3" class="form-control" placeholder="新闻链接" row="3">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="date3" class="col-lg-3 text-right">新闻发布日期：</label>
                                <div class="col-lg-3">
                                    <input type="date" id="date3" class="form-control" value="2000-01-01">
                                </div>
                            </div>
                            <div class="form-group">
                                <a href="#" class="btn col-lg-4 col-lg-offset-3">确认</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="modal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal">×</button>
                        <h1>书籍录入</h1>
                    </div>
                    <div class="modal-body">
                        <form action="add_book.php" class="form-horizontal" method="post">
                            <div class="form-group">
                                <label for="name" class="col-lg-3 text-right">书籍名称：</label>
                                <div class="col-lg-5">
                                    <input type="text" class="form-control" id="name" name = "bookname">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="zuozhe" class="col-lg-3 text-right">书籍作者：</label>
                                <div class="col-lg-5">
                                    <input type="text" class="form-control" id="zuozhe" name = "author">
                                </div>
							</div>
							 <div class="form-group">
                                <label for="zuozhe" class="col-lg-3 text-right">书籍类型：</label>
                                <div class="col-lg-5">
                                    <input type="text" class="form-control" id="type" name = "type">
                                </div>
                            </div>
							<div class="form-group">
                                <label for="zuozhe" class="col-lg-3 text-right">出版信息：</label>
                                <div class="col-lg-5">
                                    <input type="text" class="form-control" id="edition" name = "edition">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="ISBN" class="col-lg-3 text-right">书籍ISBN号：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="ISBN" class="form-control" name = "ISBN">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="guihao" class="col-lg-3 text-right">书籍柜号：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="guihao" class="form-control" name = "boxid">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="menhao" class="col-lg-3 text-right">书籍门号：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="menhao" class="form-control" name = "cpdid">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="RFID" class="col-lg-3 text-right">书籍RFID号：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="RFID" class="form-control" name = "rfid">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="pic" class="col-lg-3 text-right">图片名称：</label>
                                <div class="col-lg-5">
                                    <input type="text" id="pic" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jianjie" class="col-lg-3 text-right">书籍简介：</label>
                                <div class="col-lg-5">
                                    <textarea id="jianjie" cols="45" rows="6" name = "desc"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <input class="btn col-lg-4 col-lg-offset-3" type = "submit" value = "确认">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-info" data-dismiss="modal">关闭</button>
                    </div>
                </div>
             </div>
        </div>
    </div>
    <script type="text/javascript">
        function dodel(bt){
            //获取表格节点
            var tab = document.getElementById("j_tb");
            tab.deleteRow(bt.parentNode.parentNode.rowIndex);
        }

    </script>
</body>

</html>