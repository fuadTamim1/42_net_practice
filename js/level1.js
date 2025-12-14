var level = 1;

var hosts = [
    {'id':'A', 'type':'host', 'name':'my PC', 'geometry':'200x220+250+600', 'img':'host.png', 'labelpos':'0,220'},
    {'id':'B', 'type':'host', 'name':'my little brother\'s computer', 'geometry':'200x220+250+200', 'img':'host.png', 'labelpos':'190,30'},
    {'id':'C', 'type':'host', 'name':'my Mac', 'geometry':'200x220+700+600', 'img':'host.png', 'labelpos':'0,220'},
    {'id':'D', 'type':'host', 'name':'my little sister\'s computer', 'geometry':'200x220+700+200', 'img':'host.png', 'labelpos':'190,30'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
];

var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'104.93.23.[260-399]a', 'mask':'255.255.255.0', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'-90,-70'},
    {'if':'B1', 'hid':'B', 'ip':'104.[94-99]b.23.12', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'110,220'},
    {'if':'C1', 'hid':'C', 'ip':'211.191.[1-254]c.75', 'mask':'255.255.0.0', 'ip_edit':'false', 'mask_edit':'false', 'type':'std', 'pos':'-90,-70'},
    {'if':'D1', 'hid':'D', 'ip':'211.190.[260-399]d.42', 'mask':'255.255.0.0', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'110,220'}
];


var links = [
    {'if1':'A1', 'if2':'B1'},
    {'if1':'C1', 'if2':'D1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'C', 'id2':'D'}
];

// NEW ELEMENT: store flag for this level
var level_flag = "FLAG{IP_MASTER}";  // NEW ELEMENT

// NEW ELEMENT: function to show the flag
function showFlag() {
    var popup = document.getElementById('flag-popup');
    var flagText = document.getElementById('flag-text');
    flagText.textContent = level_flag;
    popup.classList.remove('hidden');
}

// NEW ELEMENT: function to check if all goals are completed
function checkGoals() {
    var allOK = true;
    goals.forEach(g => {
        var result = sim_goal({
            dst_name: 'destination',
            src_name: 'source',
            dst: g.id2,
            src: g.id1,
            dst_type: 'hid',
            src_type: 'hid',
            h1: hosts.find(h => h.id === g.id1),
            h2: hosts.find(h => h.id === g.id2)
        });
        if (result.status !== 1) allOK = false;
    });
    if (allOK) showFlag();
}

// Example: call checkGoals() after the user submits their configuration
// You can attach this to your "Start!" button or after IP editing is done
