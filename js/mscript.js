$(function(){
	function imgpolling()
	{
		var polling_time = 3000;
		var timeout;
		var img1_left = 0;
		var imglist = $("#title_img").find("img");
		var img_w = $(imglist[0]).width();
		var time1 ;
		var imgname=["1.jpg","2.jpg","3.jpg"];

		function resetimgcircle()
		{
			var cur_src = $(imglist[1]).attr("src");
			var index = 0;
			for(i=0;i<3;i++)
			{
				if(cur_src.indexOf(imgname[i])>=0)
				{
					index=i;
					break;
				}
			}
			var imgc_list = $(".img_circle").find(".img_c");
			for(i=0;i<imgc_list.length;i++)
				$(imgc_list[i]).removeClass("img_c_select");
			$(imgc_list[index]).addClass("img_c_select");
		}

		function resetimgsrc(flag)
		{
			var curimg_src = "";
			if(flag==1)
			{
				curimg_src = $(imglist[2]).attr("src")
			}
			else if(flag==-1)
			{
				curimg_src = $(imglist[0]).attr("src")
			}
			var imgpath = "";
			var img_index =0;
			for(i=0;i<3;i++)
			{
				if(curimg_src.indexOf(imgname[i])>=0)
				{
					img_index = i;
					imgpath = curimg_src.substring(0,curimg_src.indexOf(imgname[i]));
					break;
				}
			}
			var preimg_i=0;
			var nextimg_i = 0;

			if(img_index-1<0)
				preimg_i=2;
			else
				preimg_i=(img_index-1);
			if(img_index+1>2)
				nextimg_i=0;
			else
				nextimg_i=(img_index+1);


			$(imglist[0]).attr("src",imgpath+imgname[preimg_i]);
			$(imglist[0]).attr("style","margin-left:-25%");
			$(imglist[1]).attr("src",imgpath+imgname[img_index]);
			$(imglist[1]).attr("style","margin-left:0");

			$(imglist[2]).attr("src",imgpath+imgname[nextimg_i]);

			resetimgcircle();
		}

		function polling_left()
		{

			time1=setInterval(function()
			{
				if((img_w+img1_left)<=0)
				{
					resetimgsrc(1);
					clearInterval(time1);
					clearTimeout(timeout);
					img1_left = 0;
					timeout = setTimeout(polling_left,polling_time);
				}
				else
				{
					img1_left-=10;
					var str = "margin-left:"+img1_left+"px";
					$(imglist[1]).attr("style",str)
				}

			},1);
		}
		timeout = setTimeout(polling_left,polling_time);

		var x= 0;
		var y=0;
		var mleft=0;

		$("#title_img").mousedown(function(event){ 
			x = event.pageX;
			y = event.pageY;
			clearInterval(time1);
			$("#title_img").mousemove(function(event){
				mleft = event.pageX-x;

				if(mleft>0)
				{
					var img0_mleft=-$(imglist[0]).width()+(mleft);
					var str2="margin-left:"+img0_mleft+"px";
					$(imglist[0]).attr("style",str2);
				}
				else
				{
					var str = "margin-left:"+mleft+"px";
					$(imglist[1]).attr("style",str);
				}
			});
		});
		$("#title_img").mouseup(function(event){
			var newX = event.pageX;
			$("#title_img").off('mousemove')

			var time2 = setInterval(function(){
				if(newX<x)
				{
					if((img_w+mleft)<=0)
					{
						resetimgsrc(1);
						clearInterval(time2);
						clearTimeout(timeout);
						timeout = setTimeout(polling_left,polling_time);
					}
					else
					{
						mleft-=10;
						var str = "margin-left:"+mleft+"px";

						$(imglist[1]).attr("style",str)
					}

				}
				else if(newX>x)
				{
					if(img_w-mleft<=0)
					{
						resetimgsrc(-1);
						clearInterval(time2);
						clearTimeout(timeout);
						timeout = setTimeout(polling_left,polling_time);
					}
					else
					{
						mleft+=10;
						var img0_mleft=-$(imglist[0]).width()+(mleft);
						var str2="margin-left:"+img0_mleft+"px";
						$(imglist[0]).attr("style",str2);

					}
				}

			},1);
		});
	}
	imgpolling();



	$(".clearfix li").mouseenter(function(){
		var cn = Number($(this).find("p").attr("class").substring(2));
		console.log(cn);
		$(".clearfix li").find("b").css("display","none");
		$(this).find("b").css("display","block");
		var ol_li = $(".become_wrap ol").find("li");
		$(".become_wrap ol").find("li").attr("style","display:none");
		$(ol_li[cn-1]).attr("style","display:list-item")
		console.log($(ol_li[cn]))

	})

	var pageArray=["#home","#zscq","#zscq_sbfw","#xmsb","#gxrd","#gbrd","#item"];
	$(".title").find("a").click(function(){
		var parent = $(this).parent();
		var children = $(this).children();

		$(".title").find("div").removeClass("title_bt_active");

		var page = $(this).attr("href").split("#")
		var pageid = page[1];
		console.log("page:"+page);
		console.log("pageid:"+page[1]);


		console.log("pageid:"+pageid);
		for(i=0;i<pageArray.length;i++)
		{
			var sel = "div[mid='"+pageArray[i].substring(1)+"']";
			console.log("sel:"+sel);
			console.log("pageid:"+pageid+",pageArray:"+pageArray[i]);
			if(pageid!=pageArray[i].substring(1))
			{
				$(sel).hide();
			}
			else
			{
				console.log(sel+":show");
				$(sel).show();
			}
		}
		console.log("page.length:"+page.length);
		if(page.length>2 && page[2].length>0)
			$('#'+page[2]).show();
		$(".dropbtn").removeClass("title_bt_active");
		$(".d_c_a").removeClass("d_c_a_active");

		var bt = $(this).children(".dropbtn");
		console.log(this);
		console.log($(bt).length);
		if(bt.length>0)
		{
			$(bt).addClass("title_bt_active");

		}
		else
		{
			$(this).addClass("d_c_a_active");
			$(this).parents(".dropdown").find(".dropbtn").addClass("title_bt_active");

		}



	});



	function initTitleActive()
	{
		var hash = window.location.hash;
		var urls = hash.split("#");
		var url = "#"+urls[1];
		console.log("url:"+url);
		if(url.length<=0)
			url="#home";
		var item_a = $(".title").find("a");
		for(var i=0;i<item_a.length;i++)
		{
			var href = $(item_a[i]).attr("href");

			if(hash == href)
			{
				$(item_a[i]).children("div").addClass("title_bt_active");
			}
		}
		var sel = "div[mid='"+url.substring(1)+"']";

		$(sel).show();

		if(urls.length>2 && urls[2].length>0)
		{

			$('#'+urls[2]).show();
			var li_a = $("#item_ul").find("a");
			var cur_lia = "a[href='"+hash+"']";

			for(i=0;i<li_a.length;i++)
			{
				console.log($(li_a[i]).attr("href"));
				if($(li_a[i]).attr("href")==hash)
				{
					var parent = $(li_a[i]).parents(".item_ul2");

					$(parent).show();
					$(li_a[i]).addClass("item_r_a_active");


				}
			}


		}

	}
	initTitleActive();




	function item_list()
	{
		var item_ul = $("#item_ul");
		var item_li1 = $("#item_ul").find(".item_li1");
		for(var i = 0;i<item_li1.length;i++)
		{
			$(item_li1[i]).click(function(){

				if($(this).find("ul").length>0)
				{
					$(this).find("ul").show();


				}
				else
				{
					console.log("none");
				}



			});

		}
	}
	item_list();


	$(".item_l").find("a").click(function(){
		var href = $(this).attr("href");
		if(href)
		{
			var id = href.substr(href.lastIndexOf("#"));
			$(".item_r").children("div").hide();
			$(id).show();
			var a = $(".item_l").find("a");
			for(var i=0;i<a.length;i++)
				$(a[i]).removeClass("item_r_a_active");
			$(this).addClass("item_r_a_active");
		}


	});

})
