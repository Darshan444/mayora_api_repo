/* 
GENERATE RANDOM NUMBER FROM SPECIFIED RANGE
*/
function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomInRange(min, max, fixed) {
    return (Math.random() * (max - min) + min).toFixed(fixed) * 1;
}

function getRandomString() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getRandomStringInRange(max) {
    return Array(max + 1).join((Math.random().toString(36) + 'awd7awsda48c9498asdasd').slice(2, 18)).slice(0, max)
}

/* 
CHECK IF OBJECT IS EMPTY
*/
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/* 
CHECK IF TWO ARRAYS ARE EQUAL
*/
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i)  if (a[i] !== b[i]) return false;

    return true;
}

/* 
DIFFERENCE BETWEEN TWO ARRAYS
*/
function arraysDiff(a1, a2) {
    let a = [], diff = [];

    for (let i = 0; i < a1.length; i++)  a[a1[i]] = true;

    for (let i = 0; i < a2.length; i++)
        if (a[a2[i]])
            delete a[a2[i]];
        else
            a[a2[i]] = true;

    for (let k in a) diff.push(k);

    return diff;
}

function arrayNewValues(a1, a2) {
    return a1.filter((elem) => a2.indexOf(elem) === -1)
}

function arrayCommonValues(a1, a2) {
    return a1.filter((elem) => a2.indexOf(elem) !== -1)
}

function arrayUnique(a1) {
    return a1.filter((value, index, self) => self.indexOf(value) === index)
}

/* 
 * Generate Random Token
 */
function generateCustomToken() {
    let randomString = require("randomstring"),
        Encrypt = require('./../Configs/encrypt'),
        encrypt = new Encrypt();

    let tokenString = randomString.generate({
        length: 25,
        charset: 'alphanumeric'
    });

    return encrypt.encryptEntity(tokenString);
}

/*
 * Convert minutes to hours in decimal value
 */
function convertStringToUnix(date, type) {
    if (type === 'start')
        return MOMENT(date, 'DD-MM-YYYY').utcOffset(0, true).startOf('day').unix('X');

    if (type === 'end')
        return MOMENT(date, 'DD-MM-YYYY').utcOffset(0, true).endOf('day').unix('X');

    return '';
}

function unixToTime(timeStamp) {
    return MOMENT.unix(timeStamp).format("HH:mm:ss")
}

/*
 * Convert minutes to hours in decimal value
 */
function minutesToDecimal(minutes) {
    // return Math.ceil((minutes / 60) * 100) / 100;

    let time = time_convert(minutes);
    let timeArray = time.split(':');
    let decimalValue = parseInt((timeArray[1] / 6) * 10, 10);

    return parseFloat(parseInt(timeArray[0], 10) + '.' + (decimalValue < 10 ? '0' : '') + decimalValue);
}

function time_convert(num) {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + ":" + minutes;
}

/*
 * Convert minutes to hours in decimal value
 */
function getAdditionOfTwoFloat(first, second) {
    return Math.round((parseFloat(first) + parseFloat(second)) * 100) / 100;
}

/*
 * Get start and end of Date
 */
function getStartAndEndOfDate(data) {
    if (!data.time) data.time = MOMENT().tz(data.timezone).unix('X');

    if (data.type === 'start') {
        if (data.isUnix) {
            if (data.addOrSubTrack === 'subtract') {
                return MOMENT.unix(data.time).tz(data.timezone).startOf(data.of).add(START_OF_WEEK, 'days').subtract(data.addOrSubTrackCount, data.addOrSubTrackCountBy).unix('X');
            } else {
                return MOMENT.unix(data.time).tz(data.timezone).startOf(data.of).add(START_OF_WEEK, 'days').add(data.addOrSubTrackCount, data.addOrSubTrackCountBy).unix('X');
            }
        } else {
            if (data.addOrSubTrack === 'subtract') {
                return MOMENT.unix(data.time).tz(data.timezone).startOf(data.of).add(START_OF_WEEK, 'days').subtract(data.addOrSubTrackCount, data.addOrSubTrackCountBy).format(data.format);
            } else {
                return MOMENT.unix(data.time).tz(data.timezone).startOf(data.of).add(START_OF_WEEK, 'days').add(data.addOrSubTrackCount, data.addOrSubTrackCountBy).format(data.format);
            }
        }
    } else {
        if (data.isUnix) {
            if (data.addOrSubTrack === 'subtract') {
                return MOMENT.unix(data.time).tz(data.timezone).endOf(data.of).add(START_OF_WEEK, 'days').subtract(data.addOrSubTrackCount, data.addOrSubTrackCountBy).unix('X');
            } else {
                return MOMENT.unix(data.time).tz(data.timezone).endOf(data.of).add(START_OF_WEEK, 'days').add(data.addOrSubTrackCount, data.addOrSubTrackCountBy).unix('X');
            }
        } else {
            if (data.addOrSubTrack === 'subtract') {
                return MOMENT.unix(data.time).tz(data.timezone).endOf(data.of).add(START_OF_WEEK, 'days').subtract(data.addOrSubTrackCount, data.addOrSubTrackCountBy).format(data.format);
            } else {
                return MOMENT.unix(data.time).tz(data.timezone).endOf(data.of).add(START_OF_WEEK, 'days').add(data.addOrSubTrackCount, data.addOrSubTrackCountBy).format(data.format);
            }
        }
    }
}


/* Converting to Tree */


function convertToTree(list, main_parent_id, options = {}) {
    let map = {},
        roots = [],
        { childId } = options;

    /* INIT MAP */
    list.forEach((listItem, index) => {
        map[listItem.id] = index  // Create map for each entry. This will be used to identify Location of particular cell
        listItem.children = [];
    });


    list.forEach(listItem => {
        /* 
            CHECK IF THIS IS ROOT 
            If node's parent is actually main parent than we can say it's root of this tree.
        */

        if (listItem.parent_id === main_parent_id)
            roots.push(listItem)
        else { // else add node to parent's child
            if (list[map[listItem.parent_id]]) // only if parent exist in case of status deleted/ de activated
                list[map[listItem.parent_id]].children.push(listItem)
        }

    });

    if (childId) return list[map[childId]]

    return roots;
}

/* 
    This function takes flat array of Json.
    It converts flat children in all_children into tree

    Note: This will convert Sequelize model object to plain json


    Option : {
        hasDataValues : true // If object has a form of dataValues /sequelize model.
        childId : return tree of only child
    }
*/
function setChildrenTree(data, options = {}) {

    if (options.hasDataValues)
        data = data.map(function (item) { return item.toJSON() })


    data.forEach(item => {
        item.children = convertToTree(item.all_children, item.id)
        delete item["all_children"]
    });

    return data;
}

/* 
    This function takes object

    additional options
    Option : {
        childId : return tree of only child
    }
*/

function setChildrenTreeSingle(item, options = {}) {
    if (!item) return {}

    if (options.hasDataValues) item = item.get({ plain: true });

    let tree = convertToTree(item.all_children, item.id, options);

    if (options.childId) return tree;

    item.children = tree;
    delete item["all_children"]

    return item;
}

/* 
    this function takes flat tree in the form below and generate reverse tree from the child to parent
    {
        parent
        ...
        all_children [
            {child1},
            {child2},
            {child3},
        ]
    }
*/

function setParentTreeFromFlatTree(tree, childValue, options = { traversalKey: String, hasDataValues: Boolean, childValueKey: String, parentKey: String }) {
    let { hasDataValues = false, ...otherOptions } = options,
        { traversalKey = "all_children", childValueKey = "id", parentKey = "parent_id" } = otherOptions;
    finalTree = {}

    if (hasDataValues) tree = tree.get({ plain: true });


    // if parent is the tree to return
    if (childValue === tree[childValueKey]) {
        delete tree[traversalKey]
        finalTree = { ...tree };
    } else {
        // search from child for a key
        tree[traversalKey].forEach(child => {
            if (child[childValueKey] === childValue) {
                let parent = setParentTreeFromFlatTree(tree, child[parentKey], otherOptions)
                finalTree = { ...child }
                finalTree.parent = parent;
            }
        })

    }

    return finalTree
}

/* 
    this function takes tree generated in above step and returns array of ids.
    
    options
    - returnHierarchyIds
        - This will return hierarchy id instead of main id
    - returnObject
        - This will return object instead of only id
    - reduceHierarchyArrayToId
        - This will convert hierarchy id to single id
*/
function getIdsFromTree(tree, options = {}) {
    let ids = []

    if (options.returnHierarchyIds)
        ids = ids.concat(tree.category_hierarchies.map(hierarchy => hierarchy.id))
    else if (options.returnObject)
        ids.push(tree)
    else
        ids.push(tree.id)

    // convert hierarchy array to id
    if (options.reduceHierarchyArrayToId) {
        tree.category_hierarchy_id = tree.category_hierarchies[0].id
        delete tree["category_hierarchies"]
    }

    if (tree.children.length > 0) {
        tree.children.forEach(element => {
            ids = ids.concat(getIdsFromTree(element, options))
        });
    }

    /* GET UNIQUE VALUES */
    let pushedTree = []
    ids = ids.filter((value, index, self) => {

        // filter logic in case of object
        if (typeof value === "object" && !Array.isArray(value)) {
            let treeIndex = pushedTree.indexOf(value.id)
            if (treeIndex === -1) pushedTree.push(value.id)
            return treeIndex === -1
        }

        return self.indexOf(value) === index;
    });

    return ids;
}

/* 
    this function takes tree with single recursive node and return your key in array

    ex 
    {
        "id" : ...
        ...
        parent : {
            "id" : ...
            ...
            parent : {
                "id" : ...
                ...
                parent : {
                    "id" : ...
                }
            }
        }
    }

    then getSpecificKeyFromSingleNodeTree(tree, "parent", "id")
    
*/
function getSpecificKeyFromSingleNodeTree(tree, traversalKey, keyToReturn = "id") {
    if (!tree) return [];

    let values = [tree[keyToReturn]],
        childTree = tree[traversalKey];

    if (childTree !== null)
        values = values.concat(getSpecificKeyFromSingleNodeTree(childTree, traversalKey, keyToReturn))

    return values
}


/* 
    this function can be used to mark tree node if perticular key contains specific value
    params
        - tree : object with children as array
        - keyToCheck : key to compare
        - keyword : value of `keyToCheck`
        - options
            - markKey : result json will have this key for marked objects
*/
function markTreeIfFound(tree, keyToCheck, keyword, options = {}) {
    let { markKey = "valid", nestedCall = false } = options;

    let shouldMarkParent = false

    if (tree[keyToCheck].toLowerCase().includes(keyword.toLowerCase())) {
        tree[markKey] = true
        shouldMarkParent = true
    }

    tree.children.forEach(child => {
        let { markParent } = markTreeIfFound(child, keyToCheck, keyword, { markKey, nestedCall: true })

        if (markParent) {
            tree[markKey] = true;
            shouldMarkParent = true;
        }
    });

    return nestedCall ? { tree, markParent: shouldMarkParent } : tree;
}

/* 
    this function filter and keeps only nodes which has specific value
    params
        - tree : object with children as array
        - key : key to compare
        - value : value of `keyToCheck`
        - options
            - removeKey : pass this as true if after filter key should be removed from node
*/

function keepOnlyWithSpecificValue(tree, key, value, options = {}) {

    tree.children = tree.children.filter(child => child[key] === value)

    tree.children.forEach((child, index) => {
        tree.children[index] = keepOnlyWithSpecificValue(child, key, value, options)
    })

    if (options.removeKey) delete tree[key];

    return tree;
}

/* 
    this function filter tree and keeps only nodes which has specific value
    params
        - tree : object with children as array
        - keyToCheck : key to compare
        - keyword : value of `keyToCheck`
*/

function filterTreeWithSpecificValue(tree, keyToCheck, keyword) {
    let newTree = markTreeIfFound(tree, keyToCheck, keyword)
    return keepOnlyWithSpecificValue(newTree, "valid", true, { removeKey: true });
}

/* 
    this function is same as `filterTreeWithSpecificValue` just accepts array of tree
*/

function filterTreeWithSpecificValueMultiple(treeArray, keyToCheck, keyword) {
    treeArray.forEach((tree, index) => {
        treeArray[index] = filterTreeWithSpecificValue(tree, keyToCheck, keyword)
    })

    return treeArray
}

/* 
    this function takes array of tree and 
*/

function clubParentKey(tree, separator) {
    tree.slug = tree.slug || "";
    tree.slug_url = tree.slug_url || tree.slug;

    tree.children.forEach(childTree => {
        childTree.slug_url = tree.slug_url.concat(separator, childTree.slug || "");
        clubParentKey(childTree, separator);
    })
}
function clubParentKeyMultiple(treeArray, options = {}) {
    const { separator = "/" } = options;

    treeArray.forEach((tree, index) => {
        clubParentKey(tree, separator)
    })

    return treeArray
}


/* 
    This function gives you the random alpha numeric string value
    Input : Just send the length as you need
*/
function getRandomString(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
/*
    This function used to first character upper case for given string
 */
function capitalizeString(text) {
    return text.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));;
}

/* 
    this function swaps position in nested object
    ex : 
    input :
        category_hierarchy : {
            category : {
            }
        }
    output : 
        category : {
            category_hierarchy : {
            }
        }
    
    Option : {
        hasDataValues : true // If object has a form of dataValues /sequelize model.
    }

    Note: This will convert Sequelize model object to plain json
*/

function swapPositionInObject(data, outerKey, innerKey, options = {}) {
    let isArray = Array.isArray(data);

    if (options.hasDataValues)
        data = isArray ? data.map(function (item) { return item.toJSON() }) : data.get({ plain: true })

    function swapPosition(object) {
        if (object[outerKey] && object[outerKey][innerKey]) {
            object[innerKey] = object[outerKey][innerKey]
            object[innerKey][outerKey] = object[outerKey]
            delete object[innerKey][outerKey][innerKey]
            delete object[outerKey]
        }
        return object
    }
    return isArray ? data.map(element => swapPosition(element)) : swapPosition(data)
}

/**
 * This function for the contact number convert into the US format 
 */
function setUSContactFormat(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
}

//GET MONTH NAME FROM PASSED DATE
function getMonthsBetweenDates(startDate, endDate) {
    var startDate = MOMENT(startDate).startOf('month');
    var endDate = MOMENT(endDate).startOf('month');
    var dates = [];

    var month = MOMENT(startDate); //clone the startDate
    dates.push(month.format('MMMM'));
    while (month < endDate) {
        month.add(1, "month");
        dates.push(month.format('MMMM'));
    }

    return dates;
}

// GET ALL DATE THAT FALL BETWEEN THIS 2 DATES
function getDatesBetweenDates(startDate, endDate) {
    var startDate = MOMENT(startDate);
    var endDate = MOMENT(endDate);
    var dates = [];

    var month = MOMENT(startDate); //clone the startDate
    dates.push(month.format('YYYY-MM-DD'));
    while (month < endDate) {
        month.add(1, "day");
        dates.push(month.format('YYYY-MM-DD'));
    }

    return dates;
}

// GET ALL DAY NAME THAT FALL BETWEEN THIS 2 DATES
function getDaysBetweenDates(startDate, endDate) {
    var startDate = MOMENT(startDate);
    var endDate = MOMENT(endDate);
    var dates = [];

    var month = MOMENT(startDate); //clone the startDate
    dates.push(month.format('dddd'));
    while (month < endDate) {
        month.add(1, "day");
        dates.push(month.format('dddd'));
    }

    return dates;
}

//GET UNIQUE VALUE FROM ARRAY
function onlyUniqueValue(value, index, self) {
    return self.indexOf(value) === index;
}

//CONVERT PST DATE TO UTC
function convertPstToUtcDate(date, type) {
    if (type === 'start') {
        return newDate = date + " "+TIME_SETTINGS['070000'];
    } else {
        return newDate = date + " "+TIME_SETTINGS['065959'];
    }
}

//CONVERT PST DATE TO UTC
function convertUtcToPstDateTime(dateTime,format) {
    return MOMENT(dateTime).subtract({ hours: TIME_SETTINGS['07'], minutes: "00" }).format(format);
}

//GET FIRST CHAR OF EVERY WORD IN STRING
function getFirstCharOfString(string,type=""){

    //type = upper for upper case , small for small case , nothing for as it is 
    if(type == "upper"){   
        return firstLetters = string.replace(/[^a-zA-Z ]/g, "").split(' ').map(word => word[0]).join('').toUpperCase();
    }else if (type == "small"){
        return firstLetters = string.replace(/[^a-zA-Z ]/g, "").split(' ').map(word => word[0]).join('').toLowerCase();
    }else{    
        return firstLetters = string.replace(/[^a-zA-Z ]/g, "").split(' ').map(word => word[0]).join('');
    }
    
}

module.exports = {
    generateRandom,
    getRandomInRange,
    getRandomString,
    getRandomStringInRange,
    generateCustomToken,
    isEmpty,

    arraysEqual,
    arraysDiff,
    arrayNewValues,
    arrayCommonValues,
    arrayUnique,

    minutesToDecimal,
    getAdditionOfTwoFloat,
    convertStringToUnix,
    unixToTime,
    getStartAndEndOfDate,

    setChildrenTree,
    setChildrenTreeSingle,
    setParentTreeFromFlatTree,
    getIdsFromTree,
    getSpecificKeyFromSingleNodeTree,
    keepOnlyWithSpecificValue,
    filterTreeWithSpecificValue,
    filterTreeWithSpecificValueMultiple,
    clubParentKey,
    clubParentKeyMultiple,

    getRandomString,
    capitalizeString,
    swapPositionInObject,

    setUSContactFormat,
    getMonthsBetweenDates,
    getDatesBetweenDates,
    getDaysBetweenDates,
    onlyUniqueValue,
    convertPstToUtcDate,
    convertUtcToPstDateTime,
    getFirstCharOfString
}