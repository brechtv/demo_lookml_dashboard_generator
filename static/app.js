(function() {

    const lastFormValues = JSON.parse(localStorage.getItem('lastFormValues'));
    if(lastFormValues) {
        $("#settings-company-name").val(lastFormValues.company_title);
        $("#settings-dashboard-name").val(lastFormValues.dashboard_name);
        $("#settings-color-palette").val(lastFormValues.color_palette);
        $("#settings-color-primary").val(lastFormValues.color_primary);
        $("#settings-color-secondary").val(lastFormValues.color_secondary);
    }


    $("#show-instructions").click(function() {
        if ($("#instructions").is(':visible')) {
            $("#instructions").hide();
            $("#show-instructions").text("?");
        } else {
            $("#instructions").show();
            $("#show-instructions").text("x");
        }

    })

    const firstPrimary = $("#settings-color-primary").val() || "#343434";
    $("#settings-color-primary").css({
        "border-bottom": `solid 5px ${firstPrimary}`
    });

    const firstSecondary = $("#settings-color-secondary").val() || "#343434";
    $("#settings-color-secondary").css({
        "border-bottom": `solid 5px ${firstSecondary}`
    });
    $("#wf-title").css("color", `${firstPrimary}`);
    $("#wf-title").text($("#settings-company-name").val());
    $("#wf-dash-title").css("color", `${firstSecondary}`);
    $("#wf-dash-title").text($("#settings-dashboard-name").val());
    setColorsOnWireframe(["#2196F3", "#F44336", "#FFC107", "#4CAF50"]);





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

        const colors = palette_input.val().split(", ");
        setColorsOnWireframe(colors);
    })

    $(".wf-viz").click(function() {
        if ($(this).hasClass("wf-viz-included")) {
            $(this).removeClass("wf-viz-included").addClass("wf-viz-omitted");
        } else {
            $(this).removeClass("wf-viz-omitted").addClass("wf-viz-included");
        }
    });

    $('#settings-company-name').on("input", function() {
        $("#wf-title").text($(this).val());
    });

    $('#settings-dashboard-name').on("input", function() {
        $("#wf-dash-title").text($(this).val());
    });

    $('#settings-color-primary').on("input", function() {
        if (isColor($(this).val())) {
            $("#wf-title").css("color", $(this).val());
        }
    });
    $('#settings-color-secondary').on("input", function() {
        if (isColor($(this).val())) {
            $("#wf-dash-title").css("color", $(this).val());
        }
    });

    $('#settings-color-primary').on("input", function() {
        if ($(this).val() === "") {
            $("#settings-color-primary").css({
                "border-bottom": "solid 5px #dedede"
            });
        }
        try {
            const color = $(this).val().trim();
            if (isColor(color)) {
                $("#settings-color-primary").css({
                    "border-bottom": `solid 5px ${color}`
                });
            }
        } catch (err) {}
    });

    $('#settings-color-secondary').on("input", function() {
        if ($(this).val() === "") {
            $("#settings-color-secondary").css({
                "border-bottom": "solid 5px #dedede"
            });
        }
        try {
            const color = $(this).val().trim();
            if (isColor(color)) {
                $("#settings-color-secondary").css({
                    "border-bottom": `solid 5px ${color}`
                });
            }
        } catch (err) {}
    });

    $('#settings-color-palette').on("input", function() {
        if ($(this).val() === "") {
            setColorsOnWireframe(["#2196F3", "#F44336", "#FFC107", "#4CAF50"]);
        }
        try {
            const colors = $(this).val().split(",").map(item => item.trim());
            if (colors.every(isColor)) {
                setColorsOnWireframe(colors);
            }
        } catch (err) {}
    });
})()



function generateDashboard() {
    (() => {
        const formValues = {
            company_title: $("#settings-company-name").val(),
            dashboard_name: $("#settings-dashboard-name").val(),
            color_palette: $("#settings-color-palette").val(),
            color_primary: $("#settings-color-primary").val(),
            color_secondary: $("#settings-color-secondary").val()
        }
        localStorage.setItem('lastFormValues', JSON.stringify(formValues));
    })()

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


    const color_primary = $("#settings-color-primary").val().trim() || "#2196F3";
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
        if ($(this).hasClass("wf-viz-included")) {
            const template_id = $(this)[0].id;
            const template_body = templates[template_id];
            dashboard_template += template_body;
        }
    })


    const template = dashboard_template;
    console.log(template);

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

function isColor(stringToTest) {
    if (stringToTest === "") {
        return false;
    }
    if (stringToTest === "inherit") {
        return false;
    }
    if (stringToTest === "transparent") {
        return false;
    }

    var image = document.createElement("img");
    image.style.color = "rgb(0, 0, 0)";
    image.style.color = stringToTest;
    if (image.style.color !== "rgb(0, 0, 0)") {
        return true;
    }
    image.style.color = "rgb(255, 255, 255)";
    image.style.color = stringToTest;
    return image.style.color !== "rgb(255, 255, 255)";
}

function setColorsOnWireframe(colors) {
    $(".wf-viz-title").css({
        background: `-webkit-linear-gradient(70deg, ${colors[0]}  30%, rgba(0,0,0,0) 30%), -webkit-linear-gradient(30deg, ${colors[1]} 60%, ${colors[2]} 60%)`,
        background: `-o-linear-gradient(70deg, ${colors[0]}  30%, rgba(0,0,0,0) 30%), -o-linear-gradient(30deg, ${colors[1]} 60%, ${colors[2]} 60%)`,
        background: `-moz-linear-gradient(70deg, ${colors[0]}  30%, rgba(0,0,0,0) 30%), -moz-linear-gradient(30deg, ${colors[1]} 60%, ${colors[2]} 60%)`,
        background: `linear-gradient(70deg, ${colors[0]}  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, ${colors[1]} 60%, ${colors[2]} 60%)`
    })
}