(function() {
    $(".color-palette-item").click(function() {
        const palette_input = $("#settings-color-palette");
        switch ($(this).attr('id')) {
            case 'material':
                palette_input.val(`#2196F3, #F44336, #FFC107, #4CAF50, #9C27B0`)
                break;
            case 'material-light':
                palette_input.val(`#42A5F5, #EF5350, #FFCA28, #66BB6A, #AB47BC`)
                break;
            case 'smtn':
                palette_input.val(`#5DA5DA, #F15854, #DECF3F, #60BD68, #B276B2`)
                break;
            case 'google-charts':
                palette_input.val(`#3366CC, #DC3912, #FF9900, #109618, #990099`)
                break;
            default:
                palette_input.val(`#42A5F5, #EF5350, #FFCA28, #66BB6A, #AB47BC`)
        }
    })

    $(".wf-viz").click(function() {
        if ($(this).hasClass("wf-viz-included")) {
            $(this).removeClass("wf-viz-included").addClass("wf-viz-omitted");
        } else {
            $(this).removeClass("wf-viz-omitted").addClass("wf-viz-included");
        }
    });

    $('#settings-company-name').on("input", function(){
        // Print entered value in a div box
        $("#wf-title").text($(this).val());
    });

})()



function generateDashboard() {

    const company_title = $("#settings-company-name").val() || "Looker";
    const dashboard_name = $("#settings-dashboard-name").val() || "Business Pulse";
    const company_image = $("#settings-company-img").val() || "https://looker.com/assets/img/images/logos/looker_black.svg";

    const color_palette = $("#settings-color-palette").val() || "#2196F3, #F44336, #FFC107, #4CAF50, #9C27B0, #E91E63";
    const color_palette_arr = color_palette.split(",").map(item => item.trim());
    const color_1 = color_palette_arr[0];
    const color_2 = color_palette_arr[1];
    const color_3 = color_palette_arr[2];
    const color_4 = color_palette_arr[3];
    const color_5 = color_palette_arr[4];


    const color_primary = $("#settings-color-primary").val().trim() || "#5A2FC2";
    const color_secondary = $("#settings-color-secondary").val().trim() || "#282828";

    console.log(
        company_title,
        dashboard_name,
        company_image,
        color_palette_arr,
        color_primary,
        color_secondary
    )

    let dashboard_template = templates["header"];

    $(".wf-viz").each(function() {
        if($(this).hasClass("wf-viz-included")) {
            const template_id = $(this)[0].id;
            const template_body = templates[template_id];
            dashboard_template += template_body;
        }
    })


    const template = dashboard_template;

    Mustache.parse(template);

    const rendered = Mustache.render(template, {
        company_title: company_title,
        dashboard_name: dashboard_name,
        company_image: company_image,
        color_primary: color_primary,
        color_secondary: color_secondary,
        color_1: color_1,
        color_2: color_2,
        color_3: color_3,
        color_4: color_4,
        color_5: color_5
    });

    $('#generated-dashboard-lookml').html(rendered);
    $('#generated-dashboard-lookml-container').show();
    $('#generated-dashboard-lookml-container').get(0).scrollIntoView();
}