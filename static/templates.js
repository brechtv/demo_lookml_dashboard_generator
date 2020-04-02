const templates = {
    "header": `
- dashboard: business_pulse_dashboard
  title: {{ company_title }} - {{ dashboard_name }}
  layout: newspaper
  description: ''
  embed_style:
    background_color: white
    show_title: false
    title_color: "{{ color_primary }}"
    show_filters_bar: false
    tile_text_color: "{{ color_secondary }}"
    tile_separator_color: "#bdb7b7"
    tile_border_radius: 2
    show_tile_shadow: false
    text_tile_text_color: "{{ color_primary }}"
  filters:
  - name: Date
    title: Date
    type: date_filter
    default_value: 90 days
    allow_multiple_values: true
    required: false
  - name: State
    title: State
    type: field_filter
    default_value: ''
    allow_multiple_values: true
    required: false
    model: thelook
    explore: order_items
    listens_to_filters: [Country]
    field: users.state
  - name: City
    title: City
    type: field_filter
    default_value: ''
    allow_multiple_values: false
    required: false
    model: thelook
    explore: order_items
    listens_to_filters: [State, Country]
    field: users.city
  - name: User ID
    title: User ID
    type: number_filter
    default_value: ''
    allow_multiple_values: true
    required: false
  elements:
  - name: {{ company_title }}
    type: text
    title_text: <font color="{{ color_primary }}" size="7"><strong>{{ company_title }}</strong></font>
    subtitle_text: <font color= "{{ color_secondary }}" size="5">{{ dashboard_name }}</font>
    body_text: ''
    row: 0
    col: 0
    width: 24
    height: 3
  `,
// 
// 
//  first row single value viz's
// 
// 
// 
// 
    "wf-1-1": `
  - title: Average Order Sale Price
    name: Average Order Sale Price
    model: thelook
    explore: order_items
    type: single_value
    fields: [order_items.average_sale_price]
    filters:
      order_items.created_date: 90 days
      users.state: ''
      users.city: ''
      users.id: ''
    limit: 500
    column_limit: 50
    dynamic_fields: [{table_calculation: date, label: Date, expression: now(), value_format: !!null '',
        value_format_name: !!null '', _kind_hint: dimension, _type_hint: date}]
    custom_color_enabled: true
    custom_color: "{{ color_primary }}"
    show_single_value_title: true
    show_comparison: false
    comparison_type: value
    comparison_reverse_colors: false
    show_comparison_label: true
    listen: {}
    row: 3
    col: 0
    width: 6
    height: 4
    `,



    "wf-1-2": `
  - title: Repeat Purchase Rate
    name: Repeat Purchase Rate
    model: thelook
    explore: order_items
    type: single_value
    fields: [order_items.30_day_repeat_purchase_rate]
    filters:
      order_items.created_date: 90 days
      users.country: "{{ _user_attributes['country'] }}"
    limit: 500
    column_limit: 50
    dynamic_fields: [{table_calculation: date, label: Date, expression: now(), value_format: !!null '',
        value_format_name: !!null '', _kind_hint: dimension, _type_hint: date}]
    custom_color_enabled: true
    custom_color: "{{ color_primary }}"
    show_single_value_title: true
    show_comparison: false
    comparison_type: value
    comparison_reverse_colors: false
    show_comparison_label: true
    listen: {}
    row: 3
    col: 6
    width: 6
    height: 4
    `,



    "wf-1-3": `
  - name: Number of First Purchasers
    title: Number of First Purchasers
    model: thelook
    explore: order_items
    type: single_value
    fields: [order_items.first_purchase_count]
    filters: {}
    sorts: [order_items.first_purchase_count desc]
    limit: 500
    column_limit: 50
    dynamic_fields: [{table_calculation: goal, label: Goal, expression: '15000', value_format: !!null '',
        value_format_name: decimal_0, _kind_hint: dimension, _type_hint: number}]
    query_timezone: America/Los_Angeles
    custom_color_enabled: true
    custom_color: "{{ color_primary }}"
    show_single_value_title: true
    single_value_title: New Users Acquired
    show_comparison: true
    comparison_type: progress_percentage
    comparison_reverse_colors: false
    show_comparison_label: true
    font_size: medium
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    text_color: black
    hidden_fields: []
    y_axes: []
    note_state: collapsed
    note_display: above
    note_text: ''
    listen:
      Date: order_items.created_date
      State: users.state
      City: users.city
      User ID: users.id
    row: 3
    col: 12
    width: 6
    height: 4
    `,



    "wf-1-4": `
  - title: Orders this year
    name: Orders this year
    model: thelook
    explore: order_items
    type: single_value
    fields: [order_items.count, order_items.reporting_period]
    filters:
      order_items.reporting_period: "-NULL"
    sorts: [order_items.count desc]
    limit: 500
    column_limit: 50
    dynamic_fields: [{table_calculation: percent_change, label: Percent Change, expression: "\${order_items.count}/offset(\${order_items.count},1)\
          \ - 1", value_format: !!null '', value_format_name: percent_0, _kind_hint: measure,
        _type_hint: number}]
    custom_color_enabled: true
    custom_color: "{{ color_primary }}"
    show_single_value_title: true
    show_comparison: true
    comparison_type: change
    comparison_reverse_colors: false
    show_comparison_label: true
    listen: {}
    row: 3
    col: 18
    width: 6
    height: 4
`,
 // 
// 
//  second row
//  
// 
// 
// 
    "wf-2-1":`
  - title: Number on Hand vs Sold Count
    name: Number on Hand vs Sold Count
    model: thelook
    explore: order_items
    type: looker_column
    fields: [inventory_items.number_on_hand, inventory_items.days_in_inventory, inventory_items.sold_count]
    filters:
      inventory_items.days_in_inventory: "[1, 103]"
    sorts: [inventory_items.number_on_hand desc]
    limit: 500
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: 3a25c52e-dc99-e85c-83aa-9acac13aaf3c
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
        reverse: false
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    y_axes: [{label: '', maxValue: !!null '', minValue: !!null '', orientation: left,
        showLabels: true, showValues: true, tickDensity: default, tickDensityCustom: 5,
        type: linear, unpinAxis: false, valueFormat: !!null '', series: [{id: inventory_items.sold_count,
            name: Sold Count, axisId: inventory_items.sold_count}]}, {label: !!null '',
        maxValue: !!null '', minValue: !!null '', orientation: right, showLabels: true,
        showValues: true, tickDensity: default, tickDensityCustom: 5, type: linear,
        unpinAxis: false, valueFormat: !!null '', series: [{id: inventory_items.number_on_hand,
            name: Number on Hand, axisId: inventory_items.number_on_hand}]}]
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    colors: ['palette: Santa Cruz']
    series_types: {}
    point_style: none
    series_colors:
      inventory_items.number_on_hand: "{{ color_primary }}"
      inventory_items.sold_count: "#d45087"
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    reference_lines: [{reference_type: line, line_value: mean, range_start: max, range_end: min,
        margin_top: deviation, margin_value: mean, margin_bottom: deviation, label_position: right,
        color: "#000000"}]
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    hidden_fields: []
    listen: {}
    row: 7
    col: 0
    width: 12
    height: 9`,




    "wf-2-2": `
  - name: Highest Spending Users
    title: Highest Spending Users
    model: thelook
    explore: order_items
    type: looker_map
    fields: [users.approx_location, users.gender, order_items.order_count, users.count,
      order_items.total_sale_price, order_items.average_spend_per_user, users.country]
    pivots: [users.gender]
    filters:
      users.country: USA
    sorts: [users.gender 0, order_items.total_sale_price desc 0]
    limit: 500
    column_limit: 50
    query_timezone: America/Los_Angeles
    map_plot_mode: points
    heatmap_gridlines: true
    heatmap_gridlines_empty: false
    heatmap_opacity: 0.2
    show_region_field: true
    draw_map_labels_above_data: true
    map_tile_provider: light
    map_position: custom
    map_latitude: 36.85764758564407
    map_longitude: -94.83020782470705
    map_zoom: 4
    map_scale_indicator: 'off'
    map_pannable: true
    map_zoomable: true
    map_marker_type: circle
    map_marker_icon_name: default
    map_marker_radius_mode: proportional_value
    map_marker_units: pixels
    map_marker_radius_max: 15
    map_marker_proportional_scale_type: linear
    map_marker_color_mode: value
    map_marker_color: ["{{ color_1 }}", "{{ color_2 }}"]
    show_view_names: false
    show_legend: true
    map_value_colors: [white, purple]
    quantize_map_value_colors: false
    reverse_map_value_colors: false
    map_value_scale_clamp_min: 0
    map_value_scale_clamp_max: 200
    stacking: ''
    show_value_labels: false
    label_density: 25
    legend_position: center
    x_axis_gridlines: false
    y_axis_gridlines: true
    y_axis_combined: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    x_axis_scale: auto
    ordering: none
    show_null_labels: false
    loading: false
    hidden_fields: [orders.count, users.count, order_items.total_sale_price, order_items.order_count]
    map: usa
    map_projection: ''
    quantize_colors: false
    colors: [whitesmoke, "#64518A"]
    outer_border_color: "#64518A"
    inner_border_color: ''
    inner_border_width: 0.6
    outer_border_width: 2
    empty_color: ''
    y_axes: []
    note_state: collapsed
    note_display: hover
    note_text: Bubble size corresponds to average user spend
    listen:
      Date: order_items.created_date
      State: users.state
      City: users.city
    row: 7
    col: 12
    width: 12
    height: 9`,
// 
// 
//  third row
// 
// 
// 
//     
    "wf-3-1": `
  - name: Total Spend by Cohort
    title: Total Spend by Cohort
    model: thelook
    explore: order_items
    type: looker_area
    fields: [order_items.months_since_signup, users.created_month, order_items.total_sale_price]
    pivots: [users.created_month]
    filters:
      order_items.created_month: 12 months ago for 12 months
      order_items.months_since_signup: "[0, 12]"
      users.created_month: 12 months
    sorts: [order_items.months_since_signup, users.created_month desc]
    limit: 500
    column_limit: 50
    dynamic_fields: [{table_calculation: total_sale_price, label: Total Sale Price,
        expression: "if(\nis_null(\${order_items.total_sale_price})\n,null\n,running_total(\${order_items.total_sale_price}))",
        value_format: "$#,###"}]
    query_timezone: America/Los_Angeles
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: f338adea-6b36-aa8d-f4a3-76d9a6694273
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    y_axes: []
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    y_axis_value_format: "$#,##0"
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    series_types: {}
    point_style: none
    series_colors: {}
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    show_null_points: false
    interpolation: linear
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    hidden_fields: [cumulative_lifetime_spend, order_items.total_sale_price]
    note_state: collapsed
    note_display: below
    note_text: ''
    listen: {}
    row: 16
    col: 0
    width: 12
    height: 9`,



    "wf-3-2": `
  - name: Total Sales, Year over Year
    title: Total Sales, Year over Year
    model: thelook
    explore: order_items
    type: looker_line
    fields: [order_items.created_year, order_items.created_month_num, order_items.total_sale_price]
    pivots: [order_items.created_year]
    filters:
      order_items.created_date: before 0 months ago
      order_items.created_year: 5 years
    sorts: [order_items.created_year desc, order_items.created_month_num]
    limit: 500
    column_limit: 50
    query_timezone: America/Los_Angeles
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: 14868f19-8321-e57a-dc41-9e97c36db938
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
    x_axis_gridlines: false
    y_axis_gridlines: false
    show_view_names: false
    y_axes: []
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    y_axis_value_format: "$#,##0"
    show_x_axis_label: true
    x_axis_label: Month of Year
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: right
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    series_types: {}
    point_style: circle_outline
    series_colors:
      2015 - order_items.total_sale_price: "{{ color_1 }}"
      2019 - order_items.total_sale_price: "{{ color_2 }}"
      2018 - order_items.total_sale_price: "{{ color_3 }}"
      2017 - order_items.total_sale_price: "{{ color_4 }}"
      2016 - order_items.total_sale_price: "{{ color_5 }}"
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    show_null_points: false
    interpolation: monotone
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    hidden_fields: [calculation_1]
    note_state: collapsed
    note_display: above
    note_text: ''
    listen: {}
    row: 16
    col: 12
    width: 12
    height: 9
    `,
// 
// 
// 
// fourth row
// 
// 
// 
    "wf-4-1": `
  - name: Percent of Cohort Still Active by Traffic Source
    title: Percent of Cohort Still Active by Traffic Source
    model: thelook
    explore: order_items
    type: looker_line
    fields: [order_items.months_since_signup, users.count, users.traffic_source]
    pivots: [users.traffic_source]
    filters:
      order_items.months_since_signup: "[0, 12]"
      users.created_month: 12 months
    sorts: [order_items.months_since_signup, users.age_tier__sort_, users.traffic_source]
    limit: 500
    column_limit: 50
    dynamic_fields: [{table_calculation: pct_cohort_still_active, label: Pct Cohort
          Still Active, expression: '100.0 * \${users.count} / max(\${users.count})',
        value_format: "#.#%"}]
    query_timezone: America/Los_Angeles
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: a22bbef1-638a-ebdb-fe2e-687ff6cc3cd6
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    y_axes: [{label: '', orientation: left, series: [{axisId: pct_cohort_still_active,
            id: Display - pct_cohort_still_active, name: Display}, {axisId: pct_cohort_still_active,
            id: Email - pct_cohort_still_active, name: Email}, {axisId: pct_cohort_still_active,
            id: Facebook - pct_cohort_still_active, name: Facebook}, {axisId: pct_cohort_still_active,
            id: Organic - pct_cohort_still_active, name: Organic}, {axisId: pct_cohort_still_active,
            id: Search - pct_cohort_still_active, name: Search}], showLabels: true,
        showValues: true, maxValue: 20, minValue: 0, unpinAxis: false, tickDensity: default,
        type: linear}]
    y_axis_max: ['50']
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_labels: [Percent of Cohort still Active]
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    y_axis_value_format: "#%"
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    series_types: {}
    point_style: none
    series_colors:
      Organic - pct_cohort_still_active: "#FFEB3B"
      Email - pct_cohort_still_active: "#c347f4"
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    show_null_points: false
    interpolation: monotone
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    hidden_fields: [cumulative_lifetime_spend, order_items.total_sale_price, users.count]
    note_state: collapsed
    note_display: below
    note_text: ''
    listen: {}
    row: 25
    col: 0
    width: 12
    height: 8`,



    "wf-4-2": `
  - name: User Behaviors by Traffic Source
    title: User Behaviors by Traffic Source
    model: thelook
    explore: order_items
    type: looker_column
    fields: [users.traffic_source, order_items.average_sale_price, user_order_facts.average_lifetime_orders]
    filters: {}
    sorts: [user_order_facts.lifetime_orders_tier__sort_, users.traffic_source]
    limit: 500
    column_limit: 50
    query_timezone: America/Los_Angeles
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: 8d9f9bd4-c1b7-6b8d-2c3e-24c08ba464cc
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
        reverse: true
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    y_axes: [{label: '', orientation: left, series: [{id: order_items.average_sale_price,
            name: Average Sale Price, axisId: order_items.average_sale_price}], showLabels: true,
        showValues: true, unpinAxis: false, tickDensity: default, type: linear}, {
        label: !!null '', orientation: right, series: [{id: user_order_facts.average_lifetime_orders,
            name: Average Lifetime Orders, axisId: user_order_facts.average_lifetime_orders}],
        showLabels: true, showValues: true, unpinAxis: false, tickDensity: default,
        type: linear}]
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_labels: [Average Sale Price ($)]
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    y_axis_value_format: '0'
    show_x_axis_label: false
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    hide_legend: false
    legend_position: center
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    font_size: '13'
    point_style: circle_outline
    series_colors:
      user_order_facts.average_lifetime_orders: "{{ color_1 }}"
      order_items.average_sale_price: "{{ color_2 }}"
    show_value_labels: true
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: false
    y_axis_orientation: [left, right]
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    hidden_fields: [percent_repeat_customers]
    value_labels: legend
    label_type: labPer
    show_null_points: true
    interpolation: linear
    listen:
      Date: order_items.created_date
    row: 25
    col: 12
    width: 12
    height: 8`,

// 
// 
// 
// fifth row
// 
// 
// 
    "wf-5-1": `
  - name: Website Visit Volume vs Conversion Rate
    title: Website Visit Volume vs Conversion Rate
    model: thelook
    explore: events
    type: looker_column
    fields: [events.event_day_of_week, events.sessions_count, events.unique_visitors,
      sessions.overall_conversion]
    filters: {}
    sorts: [events.event_day_of_week]
    limit: 500
    column_limit: 50
    query_timezone: America/Los_Angeles
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: 81728d3b-9501-9411-5520-3682570a072e
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
    x_axis_gridlines: false
    y_axis_gridlines: false
    show_view_names: false
    y_axes: [{label: '', maxValue: !!null '', minValue: !!null '', orientation: left,
        showLabels: true, showValues: true, tickDensity: default, tickDensityCustom: 5,
        type: linear, unpinAxis: false, valueFormat: !!null '', series: [{id: events.unique_visitors,
            name: Unique Visitors}, {id: events.sessions_count, name: Sessions Count}]},
      {label: '', maxValue: !!null '', minValue: !!null '', orientation: right, showLabels: true,
        showValues: true, tickDensity: default, tickDensityCustom: 5, type: linear,
        unpinAxis: false, valueFormat: !!null '', series: [{id: sessions.overall_conversion,
            name: Conversion Rate}]}]
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: false
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    size_by_field: events.unique_visitors
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    series_types:
      events.sessions_count: line
      events.unique_visitors: line
    point_style: circle
    series_colors:
      events.unique_visitors: "{{ color_1 }}"
      events.sessions_count: "{{ color_2 }}"
      sessions.overall_conversion: "{{ color_3 }}"
    series_labels:
      sessions.overall_conversion: Conversion Rate
      events.sessions_count: Total Visitors
    show_value_labels: false
    label_density: 25
    label_color: ["{{ color_secondary }}"]
    x_axis_scale: auto
    y_axis_combined: false
    y_axis_orientation: [left, right]
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    show_null_points: true
    interpolation: linear
    hidden_fields: []
    note_state: collapsed
    note_display: below
    note_text: ''
    listen:
      Date: events.event_date
      State: users.state
      City: users.city
    row: 33
    col: 0
    width: 24
    height: 9`,

// 
// 
// 
// sixth row
// 
// 
// 
// 

    "wf-6-1": `
  - name: User Basic Demographic Profile
    title: User Basic Demographic Profile
    model: thelook
    explore: order_items
    type: looker_donut_multiples
    fields: [users.gender, users.traffic_source, order_items.count]
    pivots: [users.traffic_source]
    filters:
      users.gender: "-NULL"
    sorts: [user_order_facts.lifetime_orders_tier__sort_, users.traffic_source, order_items.count
        desc 0]
    limit: 500
    column_limit: 15
    query_timezone: America/Los_Angeles
    show_value_labels: true
    font_size: 16
    hide_legend: false
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: 6e5d1f56-cc96-414a-fdeb-b0be52120ec6
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
        reverse: false
    series_colors:
      Search - order_items.count: "{{ color_1 }}"
      Organic - order_items.count: "{{ color_2 }}"
      Email - order_items.count: "{{ color_3 }}"
      Display - order_items.count: "{{ color_4 }}"
      Facebook - order_items.count: "{{ color_5 }}"
    show_view_names: true
    stacking: ''
    label_density: 25
    legend_position: center
    x_axis_gridlines: false
    y_axis_gridlines: true
    y_axis_combined: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    x_axis_scale: auto
    ordering: none
    show_null_labels: false
    hidden_fields: []
    y_axes: []
    note_state: collapsed
    note_display: below
    note_text: ''
    listen:
      Date: order_items.created_date
    row: 42
    col: 0
    width: 12
    height: 8
`,



    "wf-6-2": `
  - name: Most Viewed Brands Online
    title: Most Viewed Brands Online
    model: thelook
    explore: sessions
    type: looker_grid
    fields: [product_viewed.brand, sessions.count, sessions.cart_to_checkout_conversion]
    filters:
      product_viewed.brand: "-NULL"
    sorts: [sessions.count desc]
    limit: 15
    column_limit: 50
    query_timezone: America/Los_Angeles
    show_view_names: false
    show_row_numbers: true
    truncate_column_names: true
    hide_totals: false
    hide_row_totals: false
    series_labels:
      sessions.cart_to_checkout_conversion: Cart Conversion
    table_theme: gray
    limit_displayed_rows: false
    enable_conditional_formatting: false
    conditional_formatting: [{type: along a scale..., value: !!null '', background_color: !!null '',
        font_color: !!null '', palette: {name: White to Green, colors: ["#FFFFFF",
            "#4FBC89"]}, bold: false, italic: false, strikethrough: false, fields: [
          sessions.count], color_application: {collection_id: legacy, custom: {id: 4e0a9d2c-7e4b-5ea9-8b33-117687aea8e5,
            label: Custom, type: continuous, stops: [{color: "#003f5c", offset: 0},
              {color: "{{ color_primary }}", offset: 25}, {color: "#665191", offset: 50}, {color: "#a05195",
                offset: 75}, {color: "#d45087", offset: 100}]}, options: {steps: 8,
            constraints: {min: {type: minimum}}, stepped: true, reverse: true}}}]
    conditional_formatting_include_totals: false
    conditional_formatting_include_nulls: false
    conditional_formatting_ignored_fields: []
    transpose: false
    size_to_fit: false
    stacking: ''
    show_value_labels: false
    label_density: 25
    legend_position: center
    x_axis_gridlines: false
    y_axis_gridlines: true
    y_axis_combined: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    x_axis_scale: auto
    ordering: none
    show_null_labels: false
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    hidden_fields: []
    y_axes: []
    series_types: {}
    note_state: collapsed
    note_display: above
    note_text: ''
    listen:
      Date: events.event_date
      State: users.state
    row: 42
    col: 12
    width: 12
    height: 8`,
// 
// 
// seventh row
// 

    "wf-7-1": `
  - name: Orders by Day and Category
    title: Orders by Day and Category
    model: thelook
    explore: order_items
    type: looker_area
    fields: [products.category, order_items.count, order_items.created_date]
    pivots: [products.category]
    fill_fields: [order_items.created_date]
    filters:
      products.category: Blazers & Jackets,Sweaters,Pants,Shorts,Fashion Hoodies &
        Sweatshirts,Accessories
    sorts: [products.category, order_items.created_date desc]
    limit: 500
    column_limit: 50
    query_timezone: America/Los_Angeles
    color_application:
      collection_id: f14810d2-98d7-42df-82d0-bc185a074e42
      custom:
        id: 294d9831-b0c8-3f9d-76a5-49de06d4db81
        label: Custom
        type: discrete
        colors:
        - "{{ color_1 }}"
        - "{{ color_2 }}"
        - "{{ color_3 }}"
        - "{{ color_4 }}"
        - "{{ color_5 }}"
      options:
        steps: 5
        reverse: false
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    y_axes: []
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_labels: ["# Order Items"]
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: false
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: normal
    limit_displayed_rows: false
    hidden_series: []
    hide_legend: false
    legend_position: center
    colors: ["{{ color_1 }}", "{{ color_2 }}", "{{ color_3 }}", "{{ color_4 }}", "{{ color_5 }}"]
    point_style: none
    series_colors: {}
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    x_axis_datetime_tick_count: 4
    show_null_points: true
    interpolation: linear
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    x_axis_datetime: true
    hide_points: true
    hidden_fields: []
    note_state: collapsed
    note_display: hover
    note_text: ''
    listen:
      Date: order_items.created_date
      State: users.state
      City: users.city
    row: 50
    col: 0
    width: 24
    height: 10`


}
