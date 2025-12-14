var level = 3;

var hosts = [
    {'id':'A', 'type':'host', 'name':'Host_A', 'geometry':'200x220+700+800', 'img':'host.png', 'labelpos':'-150,150'},
    {'id':'B', 'type':'host', 'name':'Host_B', 'geometry':'200x220+600+200', 'img':'host.png', 'labelpos':'190,30'},
    {'id':'C', 'type':'host', 'name':'Host_C', 'geometry':'200x220+200+500', 'img':'host.png', 'labelpos':'-150,150'},
    {'id':'S', 'type':'switch', 'name':'Switch_1', 'geometry':'150x150+600+500', 'img':'switch.png', 'labelpos':'80,110'}
];

// routes are processed in order, first match only is used => default must be last - KEEP routes before interfaces for random reference
var routes = [
];


var ifs = [
    {'if':'A1', 'hid':'A', 'ip':'104.198.[1-254]a.125', 'mask':'255.255.255.0', 'ip_edit':'false', 'mask_edit':'true', 'type':'std', 'pos':'40,-70'},
    {'if':'B1', 'hid':'B', 'ip':'127.168.42.42', 'mask':'255.255.0.0', 'ip_edit':'true', 'mask_edit':'true', 'type':'std', 'pos':'100,220'},
    {'if':'C1', 'hid':'C', 'ip':'104.198.[a].[260-299]b', 'mask':'255.255.255.128', 'ip_edit':'true', 'mask_edit':'false', 'type':'std', 'pos':'190,10'},
    {'if':'S1', 'hid':'S', 'ip':'0.0.0.0', 'mask':'/32', 'ip_edit':'false', 'mask_edit':'false', 'pos':'0,0', 'type':'hidden'}
];


var links = [
    {'if1':'C1', 'if2':'S1'},
    {'if1':'S1', 'if2':'A1'},
    {'if1':'S1', 'if2':'B1'}
];

var goals = [
    {'id':'1', 'type':'reach', 'id1':'A', 'id2':'B'},
    {'id':'2', 'type':'reach', 'id1':'A', 'id2':'C'},
    {'id':'3', 'type':'reach', 'id1':'B', 'id2':'C'}
];

// NEW ELEMENT: store flag for this level
var level_flag = "FLAG{SWITCH_MASTER}";

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
