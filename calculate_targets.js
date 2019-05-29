ctx.instance.setValueToField('last_time', dt.now());
ctx.instance.save();

//resource planning v2 targets filling
custom.getModelByAlias('resource_planning_2_targets').massDelete({});
var allTeams = custom.getModelByAlias('resource_planning_2').execQuery({});
var params = {};
var userList = [];
for (var team in allTeams) {
    userList = getUsersByGroup(allTeams[team].getValueByField('team'));
    for (var user in userList) {
        params = getUserResource(userList[user]);
        params.resource_planning = allTeams[team].getValueByField('id');
        params.user = userList[user];
        createTargetRecord(params);
    }
}

function createTargetRecord(params) {
    custom.getModelByAlias('resource_planning_2_targets').create(params);
}

function getUsersByGroup(groupId) {
    var records = custom.getModelByAlias('users').execQuery({where: {
        status : 'working',
        group : groupId
    }});
    return utils.getResultValues(records, 'id');
}

function getUserResource(userId) {
    var test = [];
    var weekValues = {
       week_1_resource : 0,
       week_2_resource : 0,
       week_3_resource : 0,
       week_4_resource : 0,
       week_5_resource : 0
    };
    var records = custom.getModelByAlias('task').execQuery({where: {
        end_day : {'>=' : new Date()},
        executor : userId
    }});
    for (var task in records) {
      weekValues.week_1_resource = weekValues.week_1_resource + records[task].getValueByField('week_1');
      weekValues.week_2_resource += records[task].getValueByField('week_2');
      weekValues.week_3_resource += records[task].getValueByField('week_3');
      weekValues.week_4_resource += records[task].getValueByField('week_4');
      weekValues.week_5_resource += records[task].getValueByField('week_5');
    }
    weekValues.week_1_resource = weekValues.week_1_resource.toFixed(2);
    weekValues.week_2_resource = weekValues.week_2_resource.toFixed(2);
    weekValues.week_3_resource = weekValues.week_3_resource.toFixed(2);
    weekValues.week_4_resource = weekValues.week_4_resource.toFixed(2);
    weekValues.week_5_resource = weekValues.week_5_resource.toFixed(2);
    return weekValues;
}