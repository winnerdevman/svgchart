$(document).ready(function(){
	init_define_chart();
	init_design_chart();
	init_improve_chart();
	init_embed_chart();

	update_chart_value();
});

const center_pos = [336,336];
const middle_r = 227;
const outside_r = 320;
const inside_r = 250;
const value_r = 187;
const round = 12;
const middle_w = 80;
const outside_w = 75;

var define_value = 30;
var design_value = 50;
var improve_value = 27;
var embed_value = 41;

function update_chart_value(){
	define_value = parseInt(Math.random() *60 + 20);
	design_value = parseInt(Math.random() *60 + 20);
	improve_value = parseInt(Math.random() *60 + 20);
	embed_value = parseInt(Math.random() *60 + 20);

    update_define_value(define_value);
    update_design_value(design_value);
    update_improve_value(improve_value);
    update_embed_value(embed_value);
    setTimeout(update_chart_value, 1500);
}

function hoverG(cls, flag ){
	if (flag){
		$("." + cls).addClass("active");
		$(".chart_info").show();
		$(".chart_info").addClass(cls + "_curve");
		$(".chart_info").show();
	}else{
		$("." + cls).removeClass("active");	
		$(".chart_info").removeClass(cls+"_curve");
		$(".chart_info").hide();
	}
}

function init_define_chart(){
    let start = -90;
    let end = 0;
    var define_middle_back_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    // outside arc
    var define_outside_path = arc(center_pos, outside_r, start, end, outside_w, round, false);

    // inside shape
    let a1 = 90;
    let a2 = 180;
    var define_inside_path = getSectorPath(center_pos[0] - 5, center_pos[1] - 5, inside_r, a1, a2);

    $("#defineMiddleBack").attr("d", define_middle_back_path);
    $("#defineOutside").attr("d", define_outside_path);
    $("#defineInside").attr("d", define_inside_path);
}

function update_define_value(value ){
	let center_pos = [336,336];
    let r = 227;
    let start = -90;
    let end = -90 + value;
    var define_middle_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    //middle value
    r = 187;
    var define_value_pos = pointOnArc(center_pos, value_r, -90 + value);

    $("#defineMiddleSelect").attr("d", define_middle_path);
    $("#define_circle").attr("cx", define_value_pos[0]);
    $("#define_circle").attr("cy", define_value_pos[1]);
    $("#define_text").attr("x", define_value_pos[0] - 18);
    $("#define_text").attr("y", define_value_pos[1] + 4);
    $("#define_text").html(value + "%");
}

function init_design_chart(){
    let end = 90;
    let start = 0;
    var design_middle_back_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    // outside arc
    var design_outside_path = arc(center_pos, outside_r, start, end, outside_w, round, false);

    // inside shape
    let a1 = 0;
    let a2 = 90;
    var design_inside_path = getSectorPath(center_pos[0] + 5, center_pos[1] - 5, inside_r, a1, a2);

    $("#designMiddleBack").attr("d", design_middle_back_path);
    $("#designOutside").attr("d", design_outside_path);
    $("#designInside").attr("d", design_inside_path);
}

function update_design_value(value){
    let start = 90 - value;
    let end = 90;
    var design_middle_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    //middle value
    var design_value_pos = pointOnArc(center_pos, value_r, 90 - value);

    $("#designMiddleSelect").attr("d", design_middle_path);
    $("#design_circle").attr("cx", design_value_pos[0]);
    $("#design_circle").attr("cy", design_value_pos[1]);
    $("#design_text").attr("x", design_value_pos[0] - 18);
    $("#design_text").attr("y", design_value_pos[1] + 4);
    $("#design_text").html(value + "%");
}

function init_improve_chart(){
    // middle arc
    let end = -90;
    let start = -180;
    var improve_middle_back_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    // outside arc
    var improve_outside_path = arc(center_pos, outside_r, start, end, outside_w, round, false);

    // inside shape
    let a1 = -180;
    let a2 = -90;
    var improve_inside_path = getSectorPath(center_pos[0] - 5, center_pos[1] + 5, inside_r, a1, a2);

    $("#improveMiddleBack").attr("d", improve_middle_back_path);
    $("#improveOutside").attr("d", improve_outside_path);
    $("#improveInside").attr("d", improve_inside_path);
}

function update_improve_value(value){
    // middle arc
    let start = -90 - value;
    let end = -90;
    var improve_middle_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    //middle value
    var improve_value_pos = pointOnArc(center_pos, value_r, -90 - value);

    $("#improveMiddleSelect").attr("d", improve_middle_path);
    $("#improve_circle").attr("cx", improve_value_pos[0]);
    $("#improve_circle").attr("cy", improve_value_pos[1]);
    $("#improve_text").attr("x", improve_value_pos[0] - 18);
    $("#improve_text").attr("y", improve_value_pos[1] + 4);
    $("#improve_text").html(value + "%");
}

function init_embed_chart(){
	// middle arc
    let start = 90;
    let end = 180;
    var embed_middle_back_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    // outside arc
    var embed_outside_path = arc(center_pos, outside_r, start, end, outside_w, round, false);

    // inside shape
    let a1 = -90;
    let a2 = 0;
    var embed_inside_path = getSectorPath(center_pos[0] + 5, center_pos[1] + 5, inside_r, a1, a2);

    $("#embedMiddleBack").attr("d", embed_middle_back_path);
    $("#embedOutside").attr("d", embed_outside_path);
    $("#embedInside").attr("d", embed_inside_path);
}

function update_embed_value(value){
	// middle arc
    let start = 90;
    let end = 90 + value;
    var embed_middle_path = arc(center_pos, middle_r, start, end, middle_w, round, false);

    //middle value
    var embed_value_pos = pointOnArc(center_pos, value_r, 90 + value);

    $("#embedMiddleSelect").attr("d", embed_middle_path);
    $("#embed_circle").attr("cx", embed_value_pos[0]);
    $("#embed_circle").attr("cy", embed_value_pos[1]);
    $("#embed_text").attr("x", embed_value_pos[0] - 18);
    $("#embed_text").attr("y", embed_value_pos[1] + 4);
    $("#embed_text").html(value + "%");
}