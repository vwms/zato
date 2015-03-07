
// /////////////////////////////////////////////////////////////////////////////

$.fn.zato.data_table.ProcessDefinition = new Class({
    toString: function() {
        var s = '<ProcessDefinition id:{0} name:{1}>';
        return String.format(s, this.id ? this.id : '(none)',
                                this.name ? this.name : '(none)');
    }
});

// /////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
    $('#data-table').tablesorter();
    $.fn.zato.data_table.password_required = false;
    $.fn.zato.data_table.class_ = $.fn.zato.data_table.ProcessDefinition;
    $.fn.zato.data_table.new_row_func = $.fn.zato.process.definition.imap.data_table.new_row;
    $.fn.zato.data_table.parse();
    $.fn.zato.data_table.setup_forms(['name', 'host', 'port', 'timeout', 'mode', 'get_criteria']);
})


$.fn.zato.process.definition.imap.create = function() {
    $.fn.zato.data_table._create_edit('create', 'Create a new process definition', null);
}

$.fn.zato.process.definition.imap.edit = function(id) {
    $.fn.zato.data_table._create_edit('edit', 'Update the process definition', id);
}

$.fn.zato.process.definition.imap.data_table.new_row = function(item, data, include_tr) {
    var row = '';

    if(include_tr) {
        row += String.format("<tr id='tr_{0}' class='updated'>", item.id);
    }

    var is_active = item.is_active == true
    var username = item.username ? item.username : "<span class='form_hint'>(None)</span>";

    row += "<td class='numbering'>&nbsp;</td>";
    row += "<td class='impexp'><input type='checkbox' /></td>";
    row += String.format('<td>{0}</td>', item.name);
    row += String.format('<td>{0}</td>', is_active ? "Yes" : "No");
    row += String.format('<td>{0}</td>', item.host);
    row += String.format('<td>{0}</td>', item.port);
    row += String.format('<td>{0}</td>', username);
    row += String.format('<td>{0}</td>', String.format("<a href=\"javascript:$.fn.zato.data_table.change_password('{0}')\">Change password</a>", item.id));
    row += String.format('<td>{0}</td>', String.format("<a href=\"javascript:$.fn.zato.process.definition.imap.edit('{0}')\">Edit</a>", item.id));
    row += String.format('<td>{0}</td>', String.format("<a href='javascript:$.fn.zato.process.definition.imap.delete_({0});'>Delete</a>", item.id));
    row += String.format('<td>{0}</td>', String.format("<a href='javascript:$.fn.zato.data_table.ping({0});'>Ping</a>", item.id));
    row += String.format("<td class='ignore item_id_{0}'>{0}</td>", item.id);
    row += String.format("<td class='ignore'>{0}</td>", is_active);
    row += String.format("<td class='ignore'>{0}</td>", item.timeout);
    row += String.format("<td class='ignore'>{0}</td>", item.debug_level);
    row += String.format("<td class='ignore'>{0}</td>", item.mode);
    row += String.format("<td class='ignore'>{0}</td>", item.get_criteria ? item.get_criteria : "");
    row += String.format("<td class='ignore'>{0}</td>", item.username ? item.username : "");

    if(include_tr) {
        row += '</tr>';
    }

    return row;
}

$.fn.zato.process.definition.imap.delete_ = function(id) {
    $.fn.zato.data_table.delete_(id, 'td.item_id_',
        'Process definition [{0}] deleted',
        'Are you sure you want to delete the process definition [{0}]?',
        true);
}
