$(function() {
    $('#my-ajax-table').dynatable({
        features: {
            paginate: false,
            search: false
        },
        dataset: {
            ajax: true,
            ajaxUrl: '/dynatable-ajax.json',
            ajaxOnLoad: true,
            records: []
        }
    });
});