
var orders = [
    {
        id: "1",
        OrderInfo: {
            createdAt	: "10.08.1991",
            customer	: "Alfreds Futterkiste",
            status		: "Accepted",
            shippedAt	: "8.09.1991"
        },
        ShipTo: {
            name: "Maria Anders",
            Address: "Obere Str. 57",
            ZIP: "12209",
            Region: "Germany",
            Country: "Germany"
        },
        CustomerInfo: {
            firstName: "Maria",
            lastName: "Anders",
            address: "Obere Str. 57",
            phone: "030-0074321",
            email: "Maria.Anders@company.com"
        },
        products: [
            {
                id			: "1",
                name		: "Chai",
                price		: "18",
                currency	: "EUR",
                quantity	: "2",
                totalPrice	: "36"
            },
            {
                id			: "2",
                name		: "Aniseed Syrup",
                price		: "10",
                currency	: "USD",
                quantity	: "3",
                totalPrice	: "30"
            },
            {
                id			: "3",
                name		: "Chef Anton's Cajun Seasoning",
                price		: "22",
                currency	: "USD",
                quantity	: "2",
                totalPrice	: "44"
            },
            {
                id			: "4",
                name		: "Chef Anton's Gumbo Mix",
                price		: "36",
                currency	: "EUR",
                quantity	: "21",
                totalPrice	: "756"
            },
            {
                id			: "5",
                name		: "Grandma's Boysenberry Spread",
                price		: "25",
                currency	: "USD",
                quantity	: "5",
                totalPrice	: "125"
            }
        ]
    },
    {
        id: "2",
        OrderInfo: {
            createdAt	: "23.12.2006",
            customer	: "Bon app",
            status		: "Pending",
            shippedAt	: "13.02.2007"
        },
        ShipTo: {
            name: "Laurence Lebihan",
            Address: "12, rue des Bouchers",
            ZIP: "13008",
            Region: "France",
            Country: "France"
        },
        CustomerInfo: {
            firstName: "Laurence",
            lastName: "Lebihan",
            address: "12, rue des Bouchers",
            phone: "91.24.45.40",
            email: "Laurence.Lebihan@company.com"
        },
        products: [
            {
                id			: "1",
                name		: "Queso Cabrales",
                price		: "21",
                currency	: "EUR",
                quantity	: "5",
                totalPrice	: "105"
            },
            {
                id			: "2",
                name		: "Queso Manchego La Pastora",
                price		: "38",
                currency	: "EUR",
                quantity	: "3",
                totalPrice	: "114"
            },
            {
                id			: "3",
                name		: "Pavlova",
                price		: "120",
                currency	: "RUB",
                quantity	: "5",
                totalPrice	: "600"
            },
            {
                id			: "4",
                name		: "Sir Rodney's Marmalade",
                price		: "5",
                currency	: "BYN",
                quantity	: "3",
                totalPrice	: "15"
            },
            {
                id			: "5",
                name		: "Genen Shouyu",
                price		: "40",
                currency	: "USD",
                quantity	: "7",
                totalPrice	: "280"
            },
            {
                id			: "6",
                name		: "Tofu",
                price		: "23.25",
                currency	: "USD",
                quantity	: "1",
                totalPrice	: "23.25"
            },
            {
                id			: "7",
                name		: "Alice Mutton",
                price		: "32",
                currency	: "UAH",
                quantity	: "39",
                totalPrice	: "1248"
            }
        ]
    }
];
var leftSearch = document.querySelector('#leftSearch');
var leftRow = document.querySelector('#leftRow');
var switchBetweenAddressAndCustomer = document.querySelector('#switchBetweenAddressAndCustomer');




function createDivWithClass (className) {
    var createNewDiv = document.createElement('div');
    createNewDiv.className = className;
    return createNewDiv;
}

function isStatusEqualsTo(status, ordersToShow, ordersToShowCount) {
    return (ordersToShow[ordersToShowCount].OrderInfo['status'] === status);
}

function getColorForStatus(ordersToShow, ordersToShowCount) {
    if (isStatusEqualsTo('Accepted', ordersToShow, ordersToShowCount)) return 'green';
    if (isStatusEqualsTo('Pending', ordersToShow, ordersToShowCount))  return 'orange';
}

function setOrderStatusColor(pId, ordersToShow, ordersToShowCount) {
    document.getElementById(pId).style.color = getColorForStatus(ordersToShow, ordersToShowCount);
}

function createOrders (ordersToShow) {
    for (var ordersToShowCount =0; ordersToShowCount< ordersToShow.length; ordersToShowCount++) {
        createSearchResultCell(ordersToShow, ordersToShowCount);

    }
}
function HtmlForShippedDetails (ordersToShow, ordersToShowCount) {
    return "<h4>" + ordersToShow[ordersToShowCount].id + "</h4>" +
        "<p>" + ordersToShow[ordersToShowCount].OrderInfo['customer'] +
        "</p>" + "<p>" + "Shipped: " + ordersToShow[ordersToShowCount].OrderInfo['shippedAt'] + "</p>";
}

function HtmlForOrderedDetails (ordersToShow, ordersToShowCount, pId) {
    return "<h4>" + ordersToShow[ordersToShowCount].OrderInfo['createdAt'] + "</h4>" + "<p id='"+pId+"'>" +
        ordersToShow[ordersToShowCount].OrderInfo['status'] + "</p>";
}

function createSearchResultCell (ordersToShow, ordersToShowCount) {
    var a = createDivWithClass('column-left');
    var b = createDivWithClass('column-right');
    var c = createDivWithClass('row');
    c.id = 'row' + ordersToShowCount;
    document.getElementById('leftRow').appendChild(c);
    a.innerHTML = HtmlForShippedDetails(ordersToShow, ordersToShowCount);
    var pId = 'status' + ordersToShowCount;
    b.innerHTML = HtmlForOrderedDetails(ordersToShow, ordersToShowCount, pId);
    document.getElementById('row'+ordersToShowCount).appendChild(a);
    document.getElementById('row'+ordersToShowCount).appendChild(b);
    setOrderStatusColor(pId, ordersToShow, ordersToShowCount);
}









leftSearch.addEventListener("keyup", function search() {
    document.getElementById('leftRow').innerHTML ='';
    var filteredOrders = [];
    var nameKey = document.getElementById('leftSearch').value;
    var sFilter = nameKey.toUpperCase();
    for (var i=0; i < orders.length; i++) {
        if ((orders[i].OrderInfo.createdAt.toUpperCase().indexOf(sFilter) > -1) ||
            (orders[i].OrderInfo.customer.toUpperCase().indexOf(sFilter) > -1) ||
            (orders[i].OrderInfo.status.toUpperCase().indexOf(sFilter) > -1) ||
            (orders[i].OrderInfo.shippedAt.toUpperCase().indexOf(sFilter) > -1))  {
            filteredOrders.push(orders[i]);
        }
    }
    createOrders(filteredOrders);
} );
function pageLoad () {
    var id = 'row0';
    for (var i = 0; i < orders.length ;i++) {
        var a = createDivWithClass('column-left');
        var b = createDivWithClass('column-right');
        var c = createDivWithClass('row');
        c.id = 'row' + i;
        document.getElementById('leftRow').appendChild(c);
        a.innerHTML = "<h4>" + orders[i].id + "</h4>" + "\n" + "<p>" + orders[i].OrderInfo['customer'] + "</p>" + "\n" + "<p>" + "Shipped: " + orders[i].OrderInfo['shippedAt'] + "</p>";
        var pId = 'status' + i;
        b.innerHTML = "<h4>" + orders[i].OrderInfo['createdAt'] +"</h4>" + "<p id='"+pId+"'>" + orders[i].OrderInfo['status'] + "</p>";
        document.getElementById('row'+i).appendChild(a);
        document.getElementById('row'+i).appendChild(b);
        if (orders[i].OrderInfo['status'] === "Accepted"){
            document.getElementById(pId).style.color = 'green';
        }
        if (orders[i].OrderInfo['status'] === "Pending"){
            document.getElementById(pId).style.color = 'orange';
        }
    }
    document.getElementById('row0').style.backgroundColor = '#E8EFF7';
    loadPage(id);
}

leftRow.addEventListener('click', function(e) {
    var id = e.target.parentElement.parentElement.id;
    for (var i = 0; i< leftRow.childElementCount; i++) {
        document.getElementById('row'+i).style.backgroundColor = 'white';
    }
    if (id === 'leftRow') {
        id = e.target.parentElement.id;
        document.getElementById(id).style.backgroundColor = '#E8EFF7';
    }
    document.getElementById(id).style.backgroundColor = '#E8EFF7';
    loadPage(id);

    switchBetweenAddressAndCustomer.addEventListener ('click', function(e) {
        var iconID = e.target.id;
        switch(iconID){
            case 'iconShipping':
                document.getElementById('ulParam1').innerHTML = 'Name:';
                document.getElementById('ulParam2').innerHTML = 'Address:';
                document.getElementById('ulParam3').innerHTML = 'ZIP Code:';
                document.getElementById('ulParam4').innerHTML = 'Region:';
                document.getElementById('ulParam5').innerHTML = 'Country:';

                document.getElementById('shipToName').innerHTML = orders[id[3]].ShipTo.name;
                document.getElementById('shipToAddress').innerHTML = orders[id[3]].ShipTo.Address;
                document.getElementById('shipToZIP').innerHTML = orders[id[3]].ShipTo.ZIP;
                document.getElementById('shipToRegion').innerHTML = orders[id[3]].ShipTo.Region;
                document.getElementById('shipToCountry').innerHTML = orders[id[3]].ShipTo.Country;
                document.getElementById('iconShipping').style.borderBottom = '2px #417AAE solid';
                document.getElementById('iconUser').style.borderBottom = 'none';
                break;
            case 'iconUser':
                document.getElementById('ulParam1').innerHTML = 'First Name:';
                document.getElementById('ulParam2').innerHTML = 'Last Name:';
                document.getElementById('ulParam3').innerHTML = 'Address:';
                document.getElementById('ulParam4').innerHTML = 'Phone:';
                document.getElementById('ulParam5').innerHTML = 'Email:';

                document.getElementById('shipToName').innerHTML = orders[id[3]].CustomerInfo.firstName;
                document.getElementById('shipToAddress').innerHTML = orders[id[3]].CustomerInfo.lastName;
                document.getElementById('shipToZIP').innerHTML = orders[id[3]].CustomerInfo.address;
                document.getElementById('shipToRegion').innerHTML = orders[id[3]].CustomerInfo.phone;
                document.getElementById('shipToCountry').innerHTML = orders[id[3]].CustomerInfo.email;
                document.getElementById('iconShipping').style.borderBottom = 'none';
                document.getElementById('iconUser').style.borderBottom = '2px #417AAE solid';
                document.getElementById('iconUser').style.paddingBottom = '4px';
                break;
        }
    })
});

function loadPage(id) {
    document.getElementById('orderId').innerHTML = "<h3>" + "Order " + orders[id[3]].id + "</h3>";
    document.getElementById('orderCustomer').innerHTML = "<p>" + "Customer: " + orders[id[3]].OrderInfo.customer + "</p>";
    document.getElementById('orderOrdered').innerHTML = "<p>" + "Ordered: " + orders[id[3]].OrderInfo.createdAt + "</p>";
    document.getElementById('orderShipped').innerHTML = "<p>" + "Shipped: " + orders[id[3]].OrderInfo.shippedAt + "</p>";
    document.getElementById('shipToName').innerHTML = orders[id[3]].ShipTo.name;
    document.getElementById('shipToAddress').innerHTML = orders[id[3]].ShipTo.Address;
    document.getElementById('shipToZIP').innerHTML = orders[id[3]].ShipTo.ZIP;
    document.getElementById('shipToRegion').innerHTML = orders[id[3]].ShipTo.Region;
    document.getElementById('shipToCountry').innerHTML = orders[id[3]].ShipTo.Country;
    document.getElementById('tableCaption').innerHTML = "<h4 style='margin-left: 30px;'>" + "Line items " + '(' + orders[id[3]].products.length + ')' + "</p>";
    createTable(id);
}
function createTable(id) {
    var tableObj = document.createElement('table');
    tableObj.className = 'table-order-bottom';
    tableObj.setAttribute('id', 'productTable');
    document.getElementById('tableCaption').appendChild(tableObj);
    var rowTable = tableObj.insertRow(0);
    rowTable.className = 'table-order-bottom-caption';
    for (var i = 0; i < 5;i++) {
        rowTable.insertCell(i);
        rowTable.cells[i].className = 'table-order-bottom-caption-padd';
    }
    rowTable.cells[0].innerHTML = 'Name';
    rowTable.cells[1].innerHTML = 'Price';
    rowTable.cells[2].innerHTML = 'Currency';
    rowTable.cells[3].innerHTML = 'Quantity';
    rowTable.cells[4].innerHTML = 'Total Price';
    var mas1 = Object.keys(orders[id[3]].products[1]);
    mas1.splice(0,1);
    for (var j = 0; j < orders[id[3]].products.length; j++) {
        var tr = document.createElement('tr');
        tr.className = 'table-order-bottom-inside';
        for (var h = 0; h < 5; h++) {
            var tdH = document.createElement('td');
            tdH.className = 'table-order-bottom-inside-padd';
            var textH1 = document.createTextNode(orders[id[3]].products[j][mas1[h]]);
            tdH.appendChild(textH1);
            tr.appendChild(tdH);
        }
        tableObj.appendChild(tr);
    }
}